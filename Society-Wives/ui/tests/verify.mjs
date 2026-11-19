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
assert.equal(ep03.status,'AUTHOR_APPROVED_FINAL_FROZEN','All Episode 03 reader scenes are final');
const allEp03Scenes=Object.values(ep03.chapters).flat();
assert.equal(allEp03Scenes.length,34,'Finalized Episode 03 should retain 34 scenes');
assert.ok(allEp03Scenes.every(s=>s.status==='AUTHOR_APPROVED_FINAL'),'Every Episode 03 reader scene must have final approval');
const ep03Catalog=read('episode-catalog.json').episodes.find(e=>e.number==='03');
assert.equal(ep03Catalog.status,'AUTHOR_APPROVED_FINAL_FROZEN');
assert.equal(ep03Catalog.chapters.length,34);
assert.equal(ep03.chapters.shivani.length,3,'Shivani EP03 must have all three final scenes');
assert.ok(ep03.chapters.shivani.slice(1).every(s=>s.format==='shivani-merged'&&s.segments?.some(p=>p.origin==='grok')),'Shivani Grok-highlighted segments must remain intact');
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
const unifiedJan02=read('episode-04b-jan02-merged-day-five-leads.json');
assert.equal(unifiedJan02.date,'2026-01-02');
assert.equal(unifiedJan02.leads.length,5,'Five lead integrated day required');
const expectedChotus={ankita:['Rohit','Rinku'],shivani:['Sunny','Deepu'],taniya:['Punit','Guddu'],shreya:['Station Chotu','Chintu'],meenakshi:['Naveen','Babloo']};
for(const [id,[officeChotu,societyChotu]] of Object.entries(expectedChotus)){
 const lead=unifiedJan02.leads.find(x=>x.id===id);
 assert.ok(lead,'Missing merged 2 Jan lead: '+id);
 assert.ok(lead.officeChotu.includes(officeChotu)&&lead.societyChotu===societyChotu,'Wrong Chotu mapping: '+id);
 assert.ok(lead.chronologicalScenes.length>=13,'Missing morning society or office/colleague/society scenes: '+id);
 assert.ok(lead.chronologicalScenes.every((s,i,a)=>i===0||a[i-1].start<=s.start),'Out-of-order merged plot: '+id);
 assert.equal(lead.chronologicalScenes[0].track,'SOCIETY_MORNING_BRIDGE','Missing before-office society bridge: '+id);
 assert.ok(lead.chronologicalScenes.some(x=>x.track==='SOCIETY_CHOTU'),'Missing evening society: '+id);
 assert.equal(lead.proseScenes.length,5,'Five expanded dialogue-driven prose anchor scenes required: '+id);
 assert.ok(lead.proseScenes.every(x=>x.paragraphs.length>=2),'Prose passage too vague or absent: '+id);
 assert.ok(!/\b(Karan|Aman|Uday|Utkarsh|Samar|Shaan|Harsh|Laksh)\b/.test(lead.chronologicalScenes.flatMap(x=>x.characters).join(' ')),'Twins absent 2 Jan: '+id);
}
const society04b=read('episode-04b-society-chotu-jan02-five-leads.json');
assert.equal(society04b.date,'2026-01-02');
assert.equal(society04b.leads.length,5);
const society04aContinuity=read('episode-04a-society-chotu-uncertainty-register.json');
assert.equal(society04aContinuity.leads.length,5,'04A/04B continuity register must cover five leads');
for(const [lead,chotu] of Object.entries({ankita:'Rinku',shivani:'Deepu',taniya:'Guddu',shreya:'Chintu',meenakshi:'Babloo'})){
 const row=society04aContinuity.leads.find(x=>x.id===lead);
 assert.ok(row&&row.societyChotu===chotu,'Wrong 04A continuity reference for '+lead);
 assert.ok(row.bodyRegions.chestBreast&&row.bodyRegions.navelAbdomen&&row.bodyRegions.back&&row.bodyRegions.hipsButtocks,'Missing specific sightline fields: '+lead);
 assert.ok(row.touchConfirmed&&row.herResponse&&row.hisResponse&&row.uncertainty,'Incomplete uncertainty and sensation record: '+lead);
 assert.ok(row.proposed04AMicrobeat&&row.followUp04B,'Missing 04A POV proposal or 04B follow-up: '+lead);
}
assert.match(society04aContinuity.leads.find(x=>x.id==='meenakshi').reference,/NO confirmed Babloo encounter in 04A/);
assert.match(society04aContinuity.leads.find(x=>x.id==='taniya').visibleConfirmed,/NO garment exposure/);
assert.match(society04aContinuity.leads.find(x=>x.id==='shreya').uncertainty,/UNKNOWN/);

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
const merged04b=read('episode-04b-five-leads-merged-chronology.json');
const prose04b=read('episode-04b-five-leads-prose-drafts.json');
assert.equal(merged04b.date,'2026-01-02');
assert.equal(merged04b.leads.length,5);
assert.equal(prose04b.chapters.length,5);
for(const lead of ['ankita','shivani','taniya','shreya','meenakshi']){
 const chapter=prose04b.chapters.find(x=>x.id===lead);
 const timeline=merged04b.leads.find(x=>x.id===lead);
 const office=office04b.leads.find(x=>x.id===lead);
 const society=society04b.leads.find(x=>x.id===lead);
 assert.ok(timeline&&chapter&&office&&society,'missing merged/prose lead '+lead);
 assert.equal(chapter.scenes.length,4,'Four draft prose scenes needed for '+lead);
 assert.equal(timeline.events.length,1+office.scenes.length+office.secondaryEncounters.length+society.scenes.length,'Chronology must include all original scenes without duplication for '+lead);
 assert.equal(timeline.events[0].sourceProseId,chapter.scenes[0].id,'Morning society/home callback must link prose for '+lead);
 assert.ok(timeline.events.every((scene,i,arr)=>i===0||scene.start>=arr[i-1].start),'Unsorted timeline for '+lead);
 assert.ok(timeline.events.some(e=>e.track==='SOCIETY_CHOTU'),'After-office society Chotu missing '+lead);
 assert.ok(timeline.events.some(e=>e.track==='OTHER_COLLEAGUES'),'Other colleague track missing '+lead);
 assert.equal(timeline.dhikaInspiredProgression.length,5,'Source-derived emotional progression must be five clear beats '+lead);
 assert.deepEqual(timeline.proseSceneIds,chapter.scenes.map(x=>x.id),'Prose IDs do not match for '+lead);
 for(const prose of chapter.scenes){
  assert.ok(prose.start<prose.end,'Invalid prose time '+prose.id);
  assert.ok(prose.lines.length>=3,'Vague/empty prose scene '+prose.id);
  assert.ok(prose.lines.every(line=>line.text&&['narration','dialogue','thought'].includes(line.kind)),'Invalid prose block '+prose.id);
 }
 assert.ok(!/\b(Karan|Aman|Uday|Utkarsh|Samar|Shaan|Harsh|Laksh)\b/.test(timeline.events.flatMap(e=>e.characters).join(' ')),'Twins must be absent on 2 Jan in all tracks '+lead);
}
assert.match(prose04b.status,/NOT_AUTHOR_APPROVED/);
assert.match(merged04b.status,/NOT_AUTHOR_APPROVED/);



const readerPage=readFileSync(resolve(repo,'episode-04b-reader.html'),'utf8');
const readerTemplate=readFileSync(resolve(ui,'public/episode-04b-reader.html'),'utf8');
assert.equal(readerPage,readerTemplate,'Standalone Episode 04B reader must survive Vite rebuild');
assert.equal(readFileSync(resolve(ui,'public/episode-04b-five-leads-merged-chronology.json'),'utf8'),readFileSync(resolve(repo,'episode-04b-five-leads-merged-chronology.json'),'utf8'),'Vite public timeline must match source');
assert.equal(readFileSync(resolve(ui,'public/episode-04b-five-leads-prose-drafts.json'),'utf8'),readFileSync(resolve(repo,'episode-04b-five-leads-prose-drafts.json'),'utf8'),'Vite public prose must match source');
assert.ok(readFileSync(resolve(ui,'index.html'),'utf8').includes('ep04b-reader-shortcut'),'Vite template must offer Episode 04B reader link');
assert.ok(readFileSync(resolve(repo,'index.html'),'utf8').includes('ep04b-reader-shortcut'),'Current deployed index must offer Episode 04B reader link');
const app=source('App.tsx'),reading=source('Reading.tsx'),planning=source('Planning.tsx');
assert.ok(app.includes("['reading','Read Story']")&&app.includes("['planning','Episode 04 Plot']"));
assert.ok(reading.includes('EpisodeSelector')&&reading.includes("episode==='01'")&&reading.includes("episode==='03'"));
assert.ok(reading.includes("['ankita','shivani','meenakshi','shreya','taniya']"),'Episode 03 must expose Shivani tab and route');
assert.ok(reading.includes("scene.format==='shivani-merged'")&&reading.includes('ep03-shivani-grok'),'Shivani Episode 03 source segments must render with highlights');
assert.ok(!reading.includes('Clean seven-beat review draft')&&!reading.includes('GROK ADDITION ·')&&!reading.includes('Unwritten plots →'),'Episode 03 obsolete approval labels must be gone');
const shivaniHtml=readFileSync(resolve(repo,'shivani-ep03-review.html'),'utf8');
assert.ok(!shivaniHtml.includes("class='status'")&&!shivaniHtml.includes('User-supplied Grok addition (highlighted)'),'Standalone Shivani page must not show old editorial badges');
assert.ok(planning.includes("Episode 04 · Plot Planning")&&planning.includes('episode-04a-ankita-plan.json')&&planning.includes('episode-04-chotu-six-leads-review.json'));
assert.ok(planning.includes('episode-04a-society-chotu-uncertainty-register.json')&&planning.includes('ContinuityDetails record={continuityRecord} part="A"')&&planning.includes('ContinuityDetails record={continuityRecord} part="B"'),'04A/04B must display source-verified visual/touch continuity');
assert.ok(planning.includes('episode-04b-jan02-merged-day-five-leads.json')&&planning.includes('UnifiedProseDetails scenes={unifiedLead.proseScenes}'),'Expanded merged 04B plot and prose must render in Planning');
assert.ok(planning.includes('episode-04b-five-leads-merged-chronology.json')&&planning.includes('episode-04b-five-leads-prose-drafts.json')&&planning.includes('ProseDetails chapter={proseChapter}'),'04B must show merged chronology and actual prose drafts');
assert.ok(!app.includes('Gallery')&&!app.includes('Characters'),'Unused image and character screens should not be rendered');
assert.ok(!/<img\b/i.test(app+reading+planning+source('Home.tsx')),'Published Society Wives UI must not request image assets');
for(const path of ['Gallery.tsx','FemaleLibrary.tsx','Characters.tsx','data/gallery.json','data/female-library.json'])assert.ok(!existsSync(resolve(ui,'src/'+path)),'Unused UI module still present: '+path);
console.log('Verified: Episode 01–03 story, Episode 04A/B plot, no image UI, no unused image modules.');
