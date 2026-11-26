import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('../../',import.meta.url)));
const ui=resolve(root,'ui');
const read=(name)=>readFileSync(resolve(ui,name),'utf8');
const nav=read('src/StoryNavigation.tsx');
const app=read('src/App.tsx');
const plan=read('src/Planning.tsx');
const reader=read('src/Reading.tsx');
const ep06=read('src/Episode06LeadPlanning.tsx');
const leads=['ankita','shivani','taniya','meenakshi','shreya'];
const episodes=['04A','04B','05','06'];

for(const name of leads)assert.ok(nav.includes("'"+name+"'"),'Missing navigable wife '+name);
for(const ep of ['01','02','03',...episodes])assert.ok(nav.includes("'"+ep+"'"),'Missing episode '+ep);
assert.ok(nav.includes("requestedLead"),'Episode links must preserve current wife');
assert.ok(nav.includes("route(ep,w,mode)"),'Switching wife must preserve episode and mode');
assert.ok(nav.includes("'#/planning?lead='"),'Deep-linked plot routes missing');
assert.ok(nav.includes("'#/reading?episode='"),'Deep-linked reader routes missing');

assert.ok(app.includes("(page==='reading'||page==='planning')&&<StoryNavigation"),'Global nav must be visible in Reader AND Plot');
assert.ok(app.includes("href={navHref(id)}"),'Header links must preserve reader/plot context');
assert.ok(app.includes('episode06-lead-not-yet-plotted'),'Unplotted EP06 wives require an explicit placeholder');
assert.ok(!reader.includes('<EpisodeSelector episode={episode}/>'),'Reader must not display a competing episode menu');

assert.ok(plan.includes("part==='B'||part==='04B'"),'EP04B route alias must be supported for all wives');
assert.ok(plan.includes("part:p==='B'?'04B':'04A'"),'Switching wife must not silently reset 04B to 04A');
assert.ok(plan.includes("active==='ankita'&&part==='05'"),'Ankita EP05 must not mask her EP04B plot');
assert.ok(plan.includes('id="shivani-04b-source-path"'),'Shivani 04B source and plotting path is missing');

for(const file of [
 'episode-04b-office-chotu-jan02-five-leads.json',
 'episode-05-reader.json',
 'source-vault/ep04b-shivani-office-jan02.json',
 'source-vault/ep05-meenakshi-shivani-jan02.json',
 'source-vault/ep05-taniya-jan02.json',
 'episode-06-ankita-plan.json',
 'shivani-episode-06-three-day-plot.json',
 'assets/ankita-ep06-office-slip-01.svg',
 'assets/ankita-ep06-office-slip-02.svg'
])assert.ok(existsSync(resolve(root,file)),'Historical plot/image missing: '+file);

for(const image of ['ankita-ep06-office-slip-01.svg','ankita-ep06-office-slip-02.svg'])
 assert.ok(ep06.includes(image),'Episode06 office visual is no longer linked: '+image);

console.log('PASS episode navigation contract: Reader/Plot, EP04B/05/06, all five wives, preserved sources, EP06 images.');
