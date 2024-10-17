import axios from 'axios';
import * as cheerio from 'cheerio';

export const verifyShare = async (_: any, url: string): Promise<boolean> => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const pageContent = $('body').text();

    // Replace these with your actual site URL and hashtag
    const siteUrl = 'https://yoursite.com';
    const hashtag = '#yourhashtag';

    return pageContent.includes(siteUrl) && pageContent.includes(hashtag);
  } catch (error) {
    console.error('Error fetching or parsing URL:', error);
    return false;
  }
}