import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const here=dirname(fileURLToPath(import.meta.url));
const root=resolve(here,'../..');
const ui=resolve(here,'..');
const read=p=>JSON.parse(readFileSync(resolve(root,p),'utf8'));
const ep01=read('episode-01.json');
assert.equal(ep01.scenes.length,17,'EP01 original scene count changed');
assert.ok(ep01.status.includes('NOT_APPROVED'),'EP01 status conflict must remain visible');
const originalHtml=readFileSync(resolve(root,'episode-02.html'),'utf8');
const leads=['ankita','shivani','taniya','soniya','meenakshi','shreya'];
let total=0;
for(const lead of leads){
 const archive=read('continuity-verbatim/episode-02/'+lead+'.json');
 const strict=read('continuity-verbatim/episode-02-APPROVED/'+lead+'.json');
 assert.equal(archive.lead.toLowerCase(),lead);
 assert.equal(strict.lead.toLowerCase(),lead);
 assert.ok(Array.isArray(archive.scenes)&&archive.scenes.length>0,lead+' scenes missing');
 assert.ok(Array.isArray(strict.scenes),lead+' strict archive missing');
 const ids=new Set(archive.scenes.map(s=>s.scene_id));
 for(const s of archive.scenes){
  assert.ok(s.source_html_lines_exact?.length,lead+'/'+s.scene_id+' source lines missing');
  const exact=s.source_html_lines_exact.join('\n');
  assert.ok(exact.includes('<'),lead+'/'+s.scene_id+' source HTML missing');
  assert.ok(originalHtml.includes(exact),lead+'/'+s.scene_id+' verbatim content not present in original EP02');
 }
 for(const id of (strict.approved_scene_ids||[]))assert.ok(ids.has(id),lead+' approved ID not in full archive '+id);
 total+=archive.scenes.length;
}
const scene=read('episode-03-meenakshi-scene-01.json');
assert.equal(scene.date,'2026-01-01');
assert.equal(scene.start,'13:50');assert.equal(scene.end,'14:15');
assert.equal(scene.beats.length,4);

const farmhouse=read('episode-03-meenakshi-scene-02.json');
assert.equal(farmhouse.episode,'03');
assert.equal(farmhouse.start,'17:00');
assert.equal(farmhouse.status,'USER_APPROVED_PLOT_DIRECTION_SAVED_NO_PROSE');
assert.equal(farmhouse.beats.length,22,'Farmhouse plot beats must remain unchanged');
const twins=read('episode-03-meenakshi-scene-03-twins.json');
assert.equal(twins.episode,'03');
assert.equal(twins.start,'18:15');
assert.ok(twins.status.includes('UNDER_REVIEW'),'Badminton scene must remain a review-only proposal');
assert.equal(twins.beats.length,6,'Six active badminton plot beats must remain unchanged');
assert.ok(twins.authorRequirement?.exactText?.includes('badminton court society se thora dur'),'Preserve author-verbatim requirements');
const ending=read('episode-03-meenakshi-scene-04-babloo-intro.json');
assert.equal(ending.episode,'03');
assert.ok(ending.status.includes('INTRO_ONLY'),'Scene 04 is introductory planning, not finished prose');
assert.ok(ending.noEncounterRule.includes('No Babloo'),'Episode 03 Babloo encounter must remain deferred');
assert.ok(ending.setupAndCut.includes('Doorbell'),'Scene 04 ends on the doorbell');
const later=read('episode-03-meenakshi-plan.json');
assert.equal(later.date,'2026-01-02','Jan2 future planning changed');
assert.ok(JSON.stringify(later).includes('M08'),'Reserved M08 missing');
const shreya=read('episode-03-shreya-plan.json');
assert.equal(shreya.date,'2026-01-03');
const gallery=JSON.parse(readFileSync(resolve(ui,'src/data/gallery.json'),'utf8'));
const paths=new Set(),ids=new Set();
for(const image of gallery.images){
 assert.ok(!ids.has(image.id),'Duplicated gallery ID '+image.id);ids.add(image.id);
 if(image.source==='GitHub'){assert.ok(!paths.has(image.path),'Duplicate GitHub image '+image.path);paths.add(image.path);assert.ok(existsSync(resolve(root,image.path)),'Missing asset '+image.path);}
 else assert.equal(image.restricted,true,'Private Drive assets must never be embedded directly');
}
assert.equal(paths.size,37,'Expected 27 previous + 10 selected character artwork assets');
const inline=originalHtml.match(new RegExp('data:image/webp;base64,([a-zA-Z0-9+/=]+)'));
assert.ok(inline,'Original embedded WebP source missing');
assert.deepEqual(readFileSync(resolve(root,'assets/shivani-a03-inline-original.webp')),Buffer.from(inline[1],'base64'),'Extracted original WebP differs');
assert.equal(gallery.images.filter(x=>x.source==='Google Drive').length,17,'Expected 17 still-private Drive image references after four office portraits are published');
const directory=read('character-directory.json');
assert.equal(directory.leads.length,5);
assert.ok(directory.people.some(x=>x.id==='soniya'),'Soniya profile missing');
assert.equal(new Set(directory.people.map(x=>x.id)).size,directory.people.length,'Canonical person IDs duplicated');
console.log('PASS: EP01 17 original scenes; EP02 '+total+' published source scenes in 6 archives.');
console.log('PASS: original scene HTML present, approved-only source separate, no source rewritten.');
console.log('PASS: Meenakshi 01 Jan scenes 01/02/03/04, with farmhouse approved plot and badminton under review; Jan2/Jan3 unchanged.');
const office=gallery.images.filter(x=>x.storyline==='shreya');
assert.equal(office.length,11,'Eleven Shreya office/portrait image records must be indexed');
for(const row of office)assert.ok(row.characters.length,'Office image must have canonical cast tag');
const portraitIds=['meenakshi','meenakshi_woman_01','ishita','meenakshi_woman_02','meenakshi_woman_04','shreya_woman_01','shreya_woman_02','shreya_woman_03','shreya_woman_04','shruti'];
for(const id of portraitIds)assert.ok(gallery.images.some(x=>x.characters.length===1&&x.characters[0]===id&&x.visualCategory==='Character portrait'&&x.path&&!x.restricted),'Missing public cast portrait for '+id);
console.log('PASS: '+paths.size+' GitHub images, 17 restricted Drive references, 10 curated cast portraits, unique character IDs.');
