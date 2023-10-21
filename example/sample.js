const GoodReadsParser = require('../build/');

;(async () => {
  try {
    // const result = await GoodReadsParser.searchBooks({ q: 'Dark' });
    const result = await GoodReadsParser.getBook({ url: 'https://www.goodreads.com/book/show/36262331-the-three-body-problem' })
    console.log('result:', result);
  } catch (error) { console.log('error', error); }
})();