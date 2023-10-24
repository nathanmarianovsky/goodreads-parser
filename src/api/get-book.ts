import { element } from '../parsers/element';
import cover from '../utils/cover';
import fetch from '../utils/fetch';

type Params = {
  url?: string,
  isbn?: string,
  isbn13?: string
};

type Book = {
  id: string,
  url: string,
  title: string,
  originalTitle: string | null,
  bookLinks: string[] | null,
  authors: string[] | null,
  description: string | null,
  coverSmall: string | null,
  coverLarge: string | null,
  asin: string | null,
  isbn: string | null,
  isbn13: string | null,
  media: string | null,
  pages: number | null,
  publicationDate: string | null,
  publisher: string | null,
  rating: number | null,
  ratingCount: number | null,
  reviewsCount: number | null,
  language: string | null,
  genres: string[] | null
};

export default async function getBook(params: Params): Promise<Book> {
  if (!params.isbn13 && !params.isbn && !params.url) {
    throw new Error('No params provided');
  }
  const url = params.url || 'https://www.goodreads.com/search?q=' + encodeURIComponent(params.isbn13 || params.isbn),
    { document, responseUrl } = await fetch(url),
    el = element(document);
  function singleFind(container: string, searchItem: string) {
    const pubIndex = searchStr.indexOf(searchItem) + searchItem.length,
      containerSub = container.substring(pubIndex);
    return containerSub.substring(0, containerSub.indexOf('"'));
  }
  function multipleFind(container: string, searchItem: string) {
    const indices = [...container.matchAll(new RegExp(searchItem, 'gi'))].map(a => a.index),
      arr = [];
    indices.forEach(ind => {
      let str = container.substring(ind + searchItem.length);
      arr.push(str.substring(0, str.indexOf('"')));
    });
    return arr;
  }
  const infoScriptText = el.query('[type="application/ld+json"]')?.text(),
    infoScript = infoScriptText !== undefined ? JSON.parse(infoScriptText) : {},
    searchStr = el.query('#__NEXT_DATA__').text(),
    originalTitleTest = singleFind(searchStr, ',"originalTitle":"'),
    asinTest = singleFind(searchStr, ',"asin":"'),
    publisherTest = singleFind(searchStr, ',"publisher":"'),
    publicationDateArr = el.query('.FeaturedDetails [data-testid="publicationInfo"]')?.text().split(" ");
  const result = {
    id: responseUrl?.split('show/')[1]?.split('-')[0],
    url: el.query('[hreflang="en"]')?.attr('href') || responseUrl,
    title: infoScript.name || "",
    originalTitle: originalTitleTest !== 'ops' ? originalTitleTest : null,
    bookLinks: multipleFind(searchStr, '"__typename":"BookLink","name":"')
      .map(source => singleFind(searchStr, '"__typename":"BookLink","name":"' + source + '","url":"').replace(/\\/gi, "/")),
    authors: infoScript.author?.map(authorItem => authorItem.name) || [],
    description: el.query('.DetailsLayoutRightParagraph__widthConstrained')?.text() || null,
    coverSmall: el.query('.BookCover__image>div>img')?.attr('src') || null,
    coverLarge: cover(el.query('.BookCover__image>div>img')?.attr('src')) || null,
    asin: asinTest !== ':{' ? asinTest : null,
    isbn: infoScript.isbn?.substring(3).toInt() || null,
    isbn13: infoScript.isbn?.toInt() || null,
    media: infoScript.bookFormat || null,
    pages: infoScript.numberOfPages || null,
    publicationDate: publicationDateArr.slice(publicationDateArr.length - 3).join(" ") || null,
    publisher: publisherTest !== 'geProps' ? publisherTest : null,
    rating: infoScript.aggregateRating?.ratingValue || null,
    ratingCount: infoScript.aggregateRating?.ratingCount || null,
    reviewsCount: infoScript.aggregateRating?.reviewCount || null,
    language: infoScript.inLanguage || null,
    genres: multipleFind(searchStr, '"__typename":"Genre","name":"')
  }
  return result as any;
}
