import axios from 'axios';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

export default async function fetch( url: string, params?: { [name: string]: string | number }) {
  try {
    const queryString = (obj = {}) => {
      '?'.concat(
        Object.keys(obj)
          .filter(key => obj[key] !== undefined && obj[key] !== null)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
          .join('&')
      );
    };
    const fullUrl = `${url}${queryString(params)}`,
      response = await axios(fullUrl, { params });
    return {
      document: new JSDOM(response.data).window.document,
      responseUrl: response.request.res.responseUrl as string | undefined
    }
  } catch (error) {
    console.log(error.message || error);
    throw new Error("Can't fetch data from Goodreads, url: " + url);
  }
}