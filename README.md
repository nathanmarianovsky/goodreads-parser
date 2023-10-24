# goodreads-scraper

Goodreads book scraper for Node.js

### Install

```bash
npm install goodreads-scraper
```

### Usage

Begin by importing the library:

```js
const GoodReadsScraper = require("goodreads-scraper");
```

Once imported there are two functions available to be called. The first of which performs a general search based on the parameters provided:

```js
GoodReadsScraper.searchBooks(searchObj);
```

where searchObj is an object consisting of the three parameters q, page, and field which takes on one of the values 'title', 'author', or 'genre'. The only required parameter is q corresponding to the query which is to be searched yielding a response in the form:

```js
{
  id: string,
  url: string,
  title: string,
  author: string | null,
  coverSmall: string | null,
  coverLarge: string | null,
  rating: number | null,
  ratingCount: number | null,
  publicationYear: number | null
}
```

The second function deals with obtaining specific details on a book:

```js
GoodReadsScraper.getBook(bookObj);
```

where bookObj is an object consisting of the three parameters isbn, isbn13, and url. At least one of these parameters has to be provided in order to produce a response in the form:

```js
{
  id: string,
  url: string,
  title: string,
  originalTitle: string || null,
  bookLinks: string[],
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
}
```

### Example

Executing the following:

```js
try {
  const data = await GoodReadsScraper.getBook({ "url": "https://www.goodreads.com/book/show/36262331-the-three-body-problem" });
  console.log("Response:", data);
} catch (error) {
  console.log("Error:", error);
}
```

yields the response:

```js
Response: {
  id: '36262331',
  url: 'https://www.goodreads.com/en/book/show/20518872',
  title: 'The Three-Body Problem (Remembrance of Earth’s Past, #1)',
  originalTitle: '三体',
  bookLinks: [
    'http://www.amazon.com/gp/product/1788543009/ref=x_gr_bb_amazon?ie=UTF8/u0026tag=x_gr_bb_amazon-20/u0026linkCode=as2/u0026camp=1789/u0026creative=9325/u0026creativeASIN=1788543009/u0026SubscriptionId=1MGPYB6YW3HWK55XCGG2',
    'https://www.amazon.com/s?k=The+Three-Body+Problem/u0026i=audible/u0026ref=x_gr_w_bb_audible-20/u0026tag=x_gr_w_bb_audible-20',
    'https://www.barnesandnoble.com/w/?ean=9781788543002',
    'http://affiliates.abebooks.com/c/64613/77416/2029?u=http%3A%2F%2Fwww.abebooks.com%2Fservlet%2FSearchResults%3Fisbn%3D1788543009',
    'https://click.linksynergy.com/fs-bin/click?id=GwEz7vxblVU/u0026subid=/u0026offerid=361251.1/u0026type=10/u0026tmpid=9309/u0026u1=x_gr_w_bb/u0026RD_PARM1=https%3A%2F%2Fwww.kobo.com%2Fus%2Fen%2Fsearch%3FQuery%3D9781788543002',
    'https://geo.itunes.apple.com/us/book/isbn9781788543002?at=11lvdC/u0026mt=11/u0026ls=1',
    'https://play.google.com/store/search?q=9781788543002/u0026c=books/u0026PCamrefID=bookpage/u0026PAffiliateID=10lHMS',
    'http://click.linksynergy.com/fs-bin/click?id=GwEz7vxblVU/u0026subid=/u0026offerid=189673.1/u0026type=10/u0026tmpid=939/u0026/u0026u1=x_gr_w_bb/u0026RD_PARM1=http%3A%2F%2Fwww.alibris.com%2Fbooksearch%3Fkeyword%3D1788543009',
    'https://www.chapters.indigo.ca/en-ca/home/search/?keywords=9781788543002',
    'http://www.tkqlhce.com/ob117vpyvpxCFFFKMHLCEDHLGHKECEFMIGDFFHJDDD?url=http%3A%2F%2Fwww.betterworldbooks.com%2FThe+Three-Body+Problem-H0.aspx%3FSearchTerm%3D1788543009',
    'https://www.indiebound.org/book/9781788543002',
    'https://prf.hn/click/camref:1101ljNE7/pubref:1788543009/destination:https://www.thriftbooks.com/browse/?b.search=1788543009',
    'http://www.worldcat.org/isbn/1788543009?loc='
  ],
  authors: [ 'Liu Cixin' ],
  description: `"1967: Ye Wenjie witnesses Red Guards beat her father to death during China's Cultural Revolution. This singular event will shape not only the rest of her life but also the future of mankind.Four decades later, Beijing police ask nanotech engineer Wang Miao to infiltrate a secretive cabal of scientists after a spate of inexplicable suicides. Wang's investigation will lead him to a mysterious online game and immerse him in a virtual world ruled by the intractable and unpredicatable interaction of its three suns.This is the Three-Body Problem and it is the key to everything: the key to the scientists' deaths, the key to a conspiracy that spans light-years and the key to the extinction-level threat humanity now faces."`,
  coverSmall: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1545742427i/36262331.jpg',
  coverLarge: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1545742427i/36262331.jpg',
  asin: '1788543009',
  isbn: 1788543002,
  isbn13: 9781788543002,
  media: 'Paperback',
  pages: 434,
  publicationDate: 'May 1, 2006',
  publisher: 'Head of Zeus',
  rating: 4.09,
  ratingCount: 288801,
  reviewsCount: 27406,
  language: 'English',
  genres: [
    'Science Fiction',
    'Fiction',
    'China',
    'Fantasy',
    'Science Fiction Fantasy',
    'Audiobook',
    'Aliens',
    'Novels',
    'Speculative Fiction',
    'Asia'
  ]
}
```

### API

You can fetch book data by providing ISBN13 or just the url of the book in format like this: `https://www.goodreads.com/book/show/{ID}`