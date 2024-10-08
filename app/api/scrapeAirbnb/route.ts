import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
      const getText = (selector) => document.querySelector(selector)?.textContent?.trim() || '';

      const name = getText('h1');
      const address = getText("div[data-section-id='LOCATION_DEFAULT'] h3");
      const description = getText("div[data-section-id='DESCRIPTION_DEFAULT'] div span.lrl13de");
      const numBedrooms = getText('li.l7n4lsf:nth-child(2)').match(/\d+/)?.[0] || null;
      const numBathrooms = getText('li.l7n4lsf:nth-child(4)').match(/\d+/)?.[0] || null;
      const guestCapacity = getText('li.l7n4lsf').match(/\d+/)?.[0] || null;

      return { name, address, description, numBedrooms, numBathrooms, guestCapacity };
    });

    await browser.close();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (browser) await browser.close();
    return NextResponse.json({ error: 'Error scraping data', details: error.message }, { status: 500 });
  }
}