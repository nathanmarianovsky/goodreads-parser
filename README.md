# goodreads-parser

Goodreads book parser for Node.js

### Install

```bash
yarn add goodreads-parser
```

### Usage

First, import the library:

```js
const GoodReadsParser = require("goodreads-parser");

try {
  const data = await GoodReadsParser.parseByISBN13("9781788543002");
  console.log("Book Data::", data);
} catch (error) {
  console.log("error", error);
}
```

Once imported there are two functions available to be called. The first of which performs a general search based on the parameters provided:

```js
GoodreadsParser.searchBooks(searchObj);
```

where searchObj is an object consisting of the three parameters q, page, and field which takes on one of the values 'title', 'author', or 'genre'. The only required parameter is q corresponding to the query which is to be searched yielding a response in the form:

```js
{
  "id": string,
  "url": string,
  "title": string,
  "author": string | null,
  "coverSmall": string | null,
  "coverLarge": string | null,
  "rating": number | null,
  "ratingCount": number | null,
  "publicationYear": number | null,
}
```

The second function deals with obtaining specific details on a book through:

```js
GoodreadsParser.getBook(bookObj);
```

where bookObj is an object consisting of the three parameters isbn, isbn13, and url. At least one of these parameters has to be provided in order to produce a response in the form:

```js
{
  "id": string,
  "url": string,
  "title": string,
  "originalTitle": string || null,
  "bookLinks": string[],
  "authors": string[] | null,
  "description": string | null,
  "coverSmall": string | null,
  "coverLarge": string | null,
  "asin": string | null,
  "isbn": string | null,
  "isbn13": string | null,
  "media": string | null,
  "pages": number | null,
  "publicationYear": number | null,
  "publisher": string | null,
  "rating": number | null,
  "ratingCount": number | null,
  "reviewsCount": number | null,
  "language": string | null,
  "genres": string[] | null
}
```

### Example

Executing the following:

```js
try {
  const data = await GoodReadsParser.getBook({ "url": "https://www.goodreads.com/book/show/36262331-the-three-body-problem" });
  console.log("Response:", data);
} catch (error) {
  console.log("Error:", error);
}
```

yields the response:

```js
{
  title: 'The Three-Body Problem',
  originalTitle: '三体',
  author: 'Liu Cixin',
  description: `"1967: Ye Wenjie witnesses Red Guards beat her father to death during China's Cultural Revolution. This singular event will shape not only the rest of her life but also the future of mankind.<br><br>Four decades later, Beijing police ask nanotech engineer Wang Miao to infiltrate a secretive cabal of scientists after a spate of inexplicable suicides. Wang's investigation will lead him to a mysterious online game and immerse him in a virtual world ruled by the intractable and unpredicatable interaction of its three suns.<br><br>This is the Three-Body Problem and it is the key to everything: the key to the scientists' deaths, the key to a conspiracy that spans light-years and the key to the extinction-level threat humanity now faces."`,
  cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545742427l/36262331._SY475_.jpg',
  isbn13: '9781788543002',
  pages: 434,
  rating: 4.06,
  ratingCount: 173247,
  reviewsCount: 17086,
  language: undefined,
  genres: [
    'Science Fiction',
    'Fiction',
    'Cultural > China',
    'Science Fiction Fantasy',
    'Audiobook',
    'Fantasy',
    'Science Fiction > Aliens',
    'Novels',
    'Speculative Fiction',
    'Cultural > Asia'
  ],
  id: '36262331',
  url: 'https://www.goodreads.com/book/show/36262331-the-three-body-problem'
}
```

### API

You can fetch book data by providing ISBN13 or just the url of the book in format like this: `https://www.goodreads.com/book/show/{ID}`