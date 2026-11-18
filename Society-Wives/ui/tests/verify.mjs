import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const here=dirname(fileURLToPath(import.meta.url));
const repo=resolve(here,'../..'),ui=resolve(here,'..');
const read=path=>JSON.parse(readFileSync(resolve(repo,path),'utf8'));
const source=path=>readFileSync(resolve(ui,'src/'+path),'utf8');
const ep01=read('episode-01.json'),ep03=read('episode-03-reader.json');
assert.equal(ep01.scenes.length,17,'Episode 01 prose scenes must remain');
assert.equal(ep03.episode,'03');
for(const lead of ['ankita','shivani','taniya','meenakshi','shreya'])assert.ok(ep03.chapters[lead]?.length,'Episode 03 prose missing for '+lead);
for(const lead of ['ankita','shivani','taniya','soniya','meenakshi','shreya'])assert.ok(read('continuity-verbatim/episode-02/'+lead+'.json').scenes.length,'Episode 02 source missing for '+lead);
for(const filename of ['episode-04a-ankita-plan.json','episode-04a-shivani-plan.json','episode-04a-shreya-night-plan.json','episode-04a-taniya-soniya-night-review.json'])assert.ok(read(filename).scenes.length,'Episode 04A plot missing: '+filename);
assert.equal(read('episode-04-chotu-six-leads-review.json').leads.length,5);
assert.equal(read('episode-04b-ankita-chotu-archive.json').tracks.length,2);
const office04b=read('episode-04b-office-chotu-jan02-five-leads.json');
assert.equal(office04b.date,'2026-01-02');
assert.equal(office04b.leads.length,5);
const officePairings={ankita:'Rohit',shivani:'Sunny',taniya:'Punit',shreya:'Station Chotu',meenakshi:'Naveen'};
for(const [lead,chotu] of Object.entries(officePairings)){
 const plan=office04b.leads.find(x=>x.id===lead);
 assert.ok(plan,'Jan 2 office Chotu plot missing '+lead);
 assert.ok(plan.chotu.name.includes(chotu),'wrong office Chotu for '+lead);
 assert.ok(plan.scenes.length>=5,'incomplete Jan 2 office day for '+lead);
 assert.equal(plan.secondaryEncounters?.length,4,'parallel colleague scenes missing for '+lead);
 for(const subplot of plan.secondaryEncounters){
  assert.equal(subplot.track,'OTHER_COLLEAGUES');
  assert.ok(subplot.start<subplot.end,'bad colleague clock for '+lead);
  assert.ok(subplot.characters.length>=2,'missing adult colleague cast for '+lead);
  assert.ok(subplot.beats.length>=2,'missing plot progression for '+lead);
 }
 assert.ok(!/\b(Karan|Aman|Uday|Utkarsh|Samar|Shaan|Harsh|Laksh)\b/.test(plan.secondaryEncounters.flatMap(x=>x.characters).join(' ')),'twins in parallel scenes for '+lead);
 assert.ok(plan.scenes.some(x=>x.beats.some(b=>/waist|shoulder|neckline|sari.pallu|back/i.test(b.actionName||''))),'missing deliberate physical action for '+lead);
 assert.ok(!/\bkiss(?:ing)?\b/i.test(plan.scenes.flatMap(x=>x.beats).map(b=>b.actionName||'').join(' ')),'kiss action should be excluded');
}
assert.ok(!/\b(Karan|Aman|Uday|Utkarsh|Samar|Shaan|Harsh|Laksh)\b/.test(office04b.leads.flatMap(l=>l.scenes.flatMap(x=>x.characters)).join(' ')),'twins must be entirely absent from Jan 2 office scene casts/actions');
assert.match(read('episode-04b-meenakshi-jan02-discussion-plan.json').status,/REJECTED/,'previous Meenakshi proposal must remain rejected');
assert.ok(read('episode-04b-office-chotu-jan02-five-leads.json').leads.reduce((n,l)=>n+l.secondaryEncounters.length,0)===20,'20 colleague scenes required');
const society04b=read('episode-04b-society-chotu-jan02-five-leads.json');
assert.equal(society04b.date,'2026-01-02');
assert.equal(society04b.leads.length,5);
const societyPairs={ankita:'Rinku',shivani:'Deepu',taniya:'Guddu',shreya:'Chintu',meenakshi:'Babloo'};
const twinsRegex=/\b(?:Karan|Aman|Uday|Utkarsh|Samar|Shaan|Harsh|Laksh)\b/;
for(const [lead,chotu] of Object.entries(societyPairs)){
 const work=office04b.leads.find(x=>x.id===lead),plot=society04b.leads.find(x=>x.id===lead);
 assert.ok(work&&plot,'Missing 04B society extension for '+lead);
 assert.equal(plot.chotu,chotu,'Wrong society Chotu for '+lead);
 assert.equal(plot.scenes.length,3,'Society 04B needs return, encounter and after-effect for '+lead);
 assert.ok(plot.scenes.every(s=>s.track==='SOCIETY_CHOTU'),'Wrong scene track for '+lead);
 assert.ok(plot.scenes.every(s=>s.start<s.end),'Invalid society clock for '+lead);
 assert.ok(plot.scenes[0].start>=work.scenes.at(-1).end,'Society beat before office exit for '+lead);
 assert.ok(!twinsRegex.test(plot.scenes.flatMap(s=>s.characters).join(' ')),'Twins must be absent in society encounters for '+lead);
 assert.ok(plot.scenes.some(s=>s.beats.some(b=>/reveal|display|back|waist/i.test(b.actionName||''))),'No deliberate visual action for '+lead);
 assert.ok(plot.scenes.some(s=>s.beats.some(b=>/consensual|mutually agreed/i.test(b.actionName||''))),'No clearly agreed contact for '+lead);
 assert.ok(!plot.scenes.some(s=>s.beats.some(b=>/\bkiss\b/i.test(b.actionName||''))),'Kissing is excluded for '+lead);
}
assert.match(read('episode-04b-meenakshi-jan02-discussion-plan.json').status,/REJECTED/,'Old rejected plot must remain rejected');


const app=source('App.tsx'),reading=source('Reading.tsx'),planning=source('Planning.tsx');
assert.ok(app.includes("['reading','Read Story']")&&app.includes("['planning','Episode 04 Plot']"));
assert.ok(reading.includes('EpisodeSelector')&&reading.includes("episode==='01'")&&reading.includes("episode==='03'"));
assert.ok(planning.includes("Episode 04 · Plot Planning")&&planning.includes('episode-04a-ankita-plan.json')&&planning.includes('episode-04-chotu-six-leads-review.json'));
assert.ok(!app.includes('Gallery')&&!app.includes('Characters'),'Unused image and character screens should not be rendered');
assert.ok(!/<img\b/i.test(app+reading+planning+source('Home.tsx')),'Published Society Wives UI must not request image assets');
for(const path of ['Gallery.tsx','FemaleLibrary.tsx','Characters.tsx','data/gallery.json','data/female-library.json'])assert.ok(!existsSync(resolve(ui,'src/'+path)),'Unused UI module still present: '+path);
console.log('Verified: Episode 01–03 story, Episode 04A/B plot, no image UI, no unused image modules.');
