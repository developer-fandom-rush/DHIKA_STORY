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

const ep05=JSON.parse(readFileSync(resolve(root,'episode-05-reader.json'),'utf8'));
const sh06=JSON.parse(readFileSync(resolve(root,'episode-06-shreya-plan.json'),'utf8'));
assert.equal(ep05.scenes.find(x=>x.id==='06A')?.lead,'Ankita','Ankita original marriage ending must remain in EP05');
assert.equal(ep05.scenes.find(x=>x.id==='06B')?.lead,'Shreya','Shreya original marriage ending must remain in EP05');
assert.ok(ep05.scenes.find(x=>x.id==='06B')?.raw.includes('SHREYA × VIKRAM'),'Shreya original source text missing');
assert.ok(ep05.episode06MorningBridgeOriginal?.raw,'Original Saturday morning reaction must be preserved for EP06, not discarded');
assert.equal(sh06.sceneOrder[0]?.id,'SHR06-S01-GYM-REMATCH','Shreya Episode06 must begin with her approved twin gym-rematch direction');
assert.ok(sh06.historicalMarriageBlueprintMovedToEp05,'Old marriage blueprint must be preserved as superseded history');
assert.ok(ep06.includes('Shreya · Society twin rematch and exam coaching'),'UI must display current Shreya rematch and mentoring plot');
const shreyaChanging=sh06.sceneOrder[0]?.beats?.find(x=>x.id==='R4');
assert.ok(shreyaChanging?.action?.includes('bra')&&shreyaChanging?.action?.includes('latch'),'Shreya changing-area accident is a concrete plot, not an optional vaguely described scene');
assert.ok(sh06.sceneOrder.some(x=>x.id==='SHR06-S03-FOUR-PERSON-SESSION'),'Samar/Shaan/Shruti/Shreya shared-apartment study must remain available');
assert.ok(!sh06.sceneOrder.some(x=>x.cast?.some(y=>/Karan|Aman/.test(y))),'Karan/Aman must not be booked into active Shreya 3-day scenes');
const future=JSON.parse(read('src/data/sw-timeline-future.json'));
for(const ep of sh06.sceneOrder){
 const t=future.events.find(x=>x.scene===ep.id);
 assert.ok(t,'Global Timeline missing Shreya plot scene '+ep.id);
}
const hm=s=>s.split(':').map(Number).reduce((a,b)=>a*60+b,0);
const dated=future.events.filter(x=>['2026-01-03','2026-01-04','2026-01-05'].includes(x.date)&&x.start&&x.end&&!x.flags?.includes('PARALLEL_SEPARATE_LOCATIONS__NOT_COLOCATED'));
for(let i=0;i<dated.length;i++)for(let k=i+1;k<dated.length;k++){
 const a=dated[i],b=dated[k];
 if(a.date!==b.date||hm(a.start)>=hm(b.end)||hm(b.start)>=hm(a.end))continue;
 const same=(a.characters||[]).filter(x=>(b.characters||[]).includes(x));
 assert.deepEqual(same,[],'Double-booked characters '+same.join(', ')+' between '+a.id+' and '+b.id+' on '+a.date);
}
const twinsCross=JSON.parse(readFileSync(resolve(root,'episode-06-karan-aman-shared-availability.json'),'utf8'));
assert.ok(/EP02/.test(twinsCross.fiveLeadLinks.find(x=>x.lead==='Shreya')?.existing||''),'Restore confirmed Shreya Karan/Aman EP02 acquaintance');
console.log('PASS Shreya 3-day rematch/changing-area/flat-study and cross-lead no-overlap checks.');
console.log('PASS EP05 original marriage ending and EP06 morning handoff contract.');
console.log('PASS episode navigation contract: Reader/Plot, EP04B/05/06, all five wives, preserved sources, EP06 images.');
