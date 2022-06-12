import dotenv from 'dotenv';
import UserAgent from 'user-agents';
import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import fetch, { Headers } from 'node-fetch';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // based on body parser
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/:word', async (req, res) => {
  const userAgent = new UserAgent();

  const { word } = req.params;

  const browser = await puppeteer.launch({
    args: [`--user-agent=${userAgent.data.userAgent}`, '--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(`https://translate.google.com/?sl=en&tl=id&text=${word}&op=translate`);
  await page.waitForSelector('.J0lOec .Q4iAWc');
  const element = await page.$('.J0lOec .Q4iAWc');

  const value = await page.evaluate((el) => el?.textContent, element);
  console.log(value);

  // await page.waitForNavigation();
  // await page.$$eval('div', (divs) => console.log(divs.length));

  res.send({
    message: value,
    timestamp: new Date(),
  });
  await browser.close();
});

// If using serverful than init server
if (process.env.SERVERFUL) {
  const PORT = process.env.PORT || 3001;

  app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`Success! Your application is running on  http://localhost:${PORT}/`);
  });
}

export default app;
