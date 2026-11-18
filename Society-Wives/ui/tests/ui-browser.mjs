import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:800}});
const base='http://127.0.0.1:4173/DHIKA_STORY/Society-Wives/';
try {
 await page.goto(base+'#/reading?episode=01');
 await page.locator('.novel-scene').first().waitFor();
 assert.equal(await page.locator('.novel-scene').count(),17);
 assert.equal(await page.locator('img').count(),0);
 await page.getByRole('button',{name:'Episode 02 · Story'}).click();
 await page.locator('.scene-link').first().waitFor();
 assert.ok(await page.locator('.scene-link').count()>0);
 await page.getByRole('button',{name:'Episode 03 · Prose'}).click();
 await page.locator('.scene-link').first().waitFor();
 assert.ok((await page.locator('h1').allTextContents()).some(x=>x.includes('Episode 03')));
 await page.getByRole('link',{name:'Episode 04 Plot'}).click();
 await page.getByRole('heading',{name:'Episode 04 · Plot Planning'}).waitFor();
 await page.locator('#episode04-active-plan details').first().waitFor();
 await page.getByRole('button',{name:'Episode 04B · Next Day'}).click();
 await page.locator('#episode04-next-day').waitFor();
 assert.ok((await page.locator('#episode04-next-day').innerText()).includes('Rohit'));
 for(const [lead,chotu] of [['Shivani','Sunny'],['Taniya','Punit'],['Shreya','Station Chotu'],['Meenakshi','Naveen']]){
  await page.getByRole('button',{name:lead,exact:true}).click();
  await page.locator('#episode04-next-day').waitFor();
  const content=await page.locator('#episode04-next-day').innerText();
  assert.ok(content.includes(chotu),'Office Chotu missing for '+lead);
  assert.ok(content.includes('Twins absent'),'Twins absence lock missing for '+lead);
  assert.ok(content.includes('Colleague track'),'parallel colleague scenes missing for '+lead);
 }
 assert.equal(await page.locator('img').count(),0);
 console.log('Browser smoke check passed: Reader 01–03 and Planning 04A/B.');
} finally {await browser.close();}
