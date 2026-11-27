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
const nonBookings=['PARALLEL_SEPARATE_LOCATIONS__NOT_COLOCATED','HOUSEHOLD_PRESENCE_ENVELOPE_NOT_ADDITIONAL_SCENE','DUTY_ENVELOPE_NOT_ADDITIONAL_SCENE','RECAP_ONLY','RECAP_ONLY_NOT_JOINT_MEETING'];
const dated=future.events.filter(x=>['2026-01-03','2026-01-04','2026-01-05'].includes(x.date)&&x.start&&x.end&&!x.flags?.some(f=>nonBookings.includes(f)));
for(let i=0;i<dated.length;i++)for(let k=i+1;k<dated.length;k++){
 const a=dated[i],b=dated[k];
 if(a.date!==b.date||hm(a.start)>=hm(b.end)||hm(b.start)>=hm(a.end))continue;
 const same=(a.characters||[]).filter(x=>(b.characters||[]).includes(x));
 assert.deepEqual(same,[],'Double-booked characters '+same.join(', ')+' between '+a.id+' and '+b.id+' on '+a.date);
}
const twinsCross=JSON.parse(readFileSync(resolve(root,'episode-06-karan-aman-shared-availability.json'),'utf8'));
assert.ok(/EP02/.test(twinsCross.fiveLeadLinks.find(x=>x.lead==='Shreya')?.existing||''),'Restore confirmed Shreya Karan/Aman EP02 acquaintance');
const family=JSON.parse(readFileSync(resolve(root,'episode-06-household-spouse-availability.json'),'utf8'));
assert.deepEqual(family.husbands.map(x=>x.id).sort(),['Kabir','Nikhil','Rohan','Vikram'],'Husband availability must be recorded separately for all four married leads');
assert.deepEqual(family.shreyaPoliceRoster.map(x=>x.leave),[false,false,false],'Shreya must have no leave for Jan3–5 in selected fictional roster');
assert.deepEqual(family.shreyaPoliceRoster.map(x=>x.shift),['08:30–16:30','08:00–13:00','08:00–17:00'],'Selected Shreya station shifts must match story plan');
for(const [date,shift] of [['2026-01-03','08:30'],['2026-01-04','08:00'],['2026-01-05','08:00']]){
 const envelope=future.events.find(x=>x.id==='shr06-'+date.slice(-2)+'-duty-envelope');
 assert.equal(envelope?.start,shift,'Missing expected police duty window on '+date);
}
const allVisuals=[1,2,3,4].map(n=>'assets/shreya-ep06-visual-concept-0'+n+'.svg');
for(const filename of allVisuals){
 assert.ok(existsSync(resolve(root,filename)),'Shreya original concept preview missing from GitHub '+filename);
 assert.ok(ep06.includes(filename),'Shreya concept gallery must display uploaded image '+filename);
 const svg=readFileSync(resolve(root,filename),'utf8');
 assert.ok(svg.includes('data:image/webp;base64,'),'Shreya preview must contain actual image data');
}
assert.ok(ep06.includes('Husband whereabouts · Jan 3–5'),'Husband whereabouts section missing from UI');
const taniya=JSON.parse(readFileSync(resolve(root,'episode-06-taniya-plan.json'),'utf8'));
const taniyaPage=read('src/Taniya06Planning.tsx');
assert.ok(app.includes("currentLead==='taniya'?<Taniya06Planning/>"),'Taniya EP06 must be routable in Story Plot');
assert.ok(taniyaPage.includes("episode-06-taniya-plan.json"),'Taniya planning page must load saved source');
assert.deepEqual(taniya.scenes.filter(s=>s.id.includes('RAO')).map(s=>s.start),['05:00','05:00','05:00'],'User requested 5AM Vivek Rao morning sessions');
assert.ok(taniya.scenes.some(s=>s.id==='TAN06-S02-SONIYA-CALL'),'Keep Soniya wedding-access teasing phone call');
assert.ok(taniya.scenes.some(s=>s.id==='TAN06-S04-CA-HOME-LESSON'),'Office duo home tuition required');
assert.ok(taniya.scenes.some(s=>s.id==='TAN06-S05-SOCIETY-TWINS'&&s.status.includes('CONDITIONAL')),'Karan/Aman author-approved plot still requires household time reconciliation');
assert.ok(taniya.scenes.some(s=>s.id==='TAN06-S08-MONDAY-CA-OFFICE'),'Taniya Monday office return required');
assert.ok(taniya.authorApproval20261127?.karanAccident?.toLowerCase().includes('stole'),'Karan stole-slip content must stay author-approved and visible');
assert.ok(taniya.scenes.some(s=>s.id==='TAN06-S02B-KARAN-REQUEST'&&s.characters.join(',')==='Taniya,Karan'),'Karan, not Aman, makes the first society finance request');
const tKaran=taniya.scenes.find(s=>s.id==='TAN06-S05-SOCIETY-TWINS');
assert.ok(tKaran?.beats.some(b=>b.action.includes('Expense Tracker')),'Aman requires independent Finance API business-rule questions');
assert.ok(tKaran?.beats.some(b=>b.action.includes('Karan')&&b.action.includes('stole')),'Approved Karan stole moment must retain differentiated viewpoints');
const tJAM=taniya.scenes.find(s=>s.id==='TAN06-S06-AYAAN-ARMAAN-HOLD');
assert.deepEqual(tJAM?.characters,['Taniya','Ayaan','Armaan'],'Sunday Ayaan/Armaan introductory visit must be physically scheduled');
assert.equal(tJAM.start,'17:30','First Taniya/Ayaan/Armaan visit editor clock must stay coherent');
assert.ok(tJAM.beats.some(b=>b.action.includes('Shivani')),'First introduction must be referred by Shivani');
assert.ok(tJAM.beats.some(b=>b.action.includes('No accidental')),'Ayaan/Armaan first meeting has no slip');
assert.ok(future.events.some(x=>x.id==='tan06-03-shivani-referral'&&x.characters.includes('Shivani')),'Separate Saturday Shivani/Taniya referral must be indexed');
assert.ok(taniyaPage.includes('tan06-author-approved-pair-logic'),'UI must expose author-approved distinct pair motivations');

assert.ok(taniya.excludedFromActiveEpisode06FemaleCoworkers.includes('Neha')&&taniya.excludedFromActiveEpisode06FemaleCoworkers.includes('Andrea'),'Existing office women stay out of active EP06 without deleting history');
assert.ok(existsSync(resolve(root,'source-vault/ep05-taniya-jan02.json')),'Taniya original EP05 source must remain');
for(const sc of taniya.scenes){
 assert.ok(future.events.some(e=>e.scene===sc.id),'Taniya plot missing global timeline event '+sc.id);
}
assert.ok(taniya.canonLocks.some(x=>x.includes('DREAM')),'Do not re-import Episode05 dream as a real encounter');
const ankita06=JSON.parse(readFileSync(resolve(root,'episode-06-ankita-reader-working.json'),'utf8'));
const ankita07=JSON.parse(readFileSync(resolve(root,'episode-07-ankita-reader-working.json'),'utf8'));
assert.equal(ankita06.scenes.length,9,'Ankita EP06 reader needs all nine new scenes');
assert.equal(ankita07.scenes.length,6,'Ankita EP07 reader needs all six new scenes');
assert.ok(reader.includes("Episode0607Ankita")&&nav.includes("'07'"),'EP06 and EP07 Ankita must be linked in persistent Read Story');
assert.ok(ankita07.scenes.find(x=>x.id==='03')?.raw.includes('kiss karna chahti hoon'),'Rohit first-kiss scene is absent');
assert.ok(ankita07.scenes.find(x=>x.id==='05')?.raw.includes('kiss kar sakta hoon'),'Rinku first-kiss scene is absent');
assert.ok(ankita06.scenes.every(x=>x.visuals?.length>=1)&&ankita07.scenes.every(x=>x.visuals?.length>=1),'Every new scene needs Grok visual insert framing');
assert.ok(ankita07.scenes.find(x=>x.id==='04')?.raw.includes('tuition nahi'),'Wednesday project must not be mistaken for formal tuition');
assert.ok(future.events.find(x=>x.id==='ank07-07-rohit-office-callback')?.reader?.type==='sw-working-ankita','Global Timeline must link Rohit to Reader');
assert.ok(future.events.find(x=>x.id==='ank07-07-rinku-evening-return')?.reader?.scene==='05','Global Timeline must link Rinku scene');
console.log('PASS Ankita 9+6 working reader scenes, two chosen first kisses, storyboard markers, routes and no premature tuition.');
console.log('PASS Taniya 5AM coaching, sister call, work/social tuition, Monday office, archived females and collision contract.');
console.log('PASS Shreya visuals, 3 husbands and no-leave police roster.');
console.log('PASS Shreya 3-day rematch/changing-area/flat-study and cross-lead no-overlap checks.');
console.log('PASS EP05 original marriage ending and EP06 morning handoff contract.');
console.log('PASS episode navigation contract: Reader/Plot, EP04B/05/06, all five wives, preserved sources, EP06 images.');
