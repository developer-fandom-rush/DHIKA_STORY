import type { ReactNode } from 'react';
import { openPage, titleCase, useData } from './lib';

type Beat={id:string;title:string;time?:string;[key:string]:unknown};
type Scene={id?:string;scene?:string;sceneNumber?:string;number?:string;title:string;start?:string;end?:string;location?:string;beats:Beat[];[key:string]:unknown};
type PlotDocument={title:string;scenes:Scene[];proseDraft?:{title?:string;url?:string};[key:string]:unknown};
type Taniya04BPlan=PlotDocument&{status:string;authorLocks:string[];unassigned:Record<string,string>;originalPlotFutureArchive:string};
type WorkshopTrack={chotu:string;lane?:string;setting?:string;a:Record<string,unknown>;b:Record<string,unknown>};
type Workshop={leads:{id:string;name:string;tracks:WorkshopTrack[]}[]};
type AnkitaArchive={tracks:WorkshopTrack[]};
type OfficeLead={id:string;name:string;office:string;workday:string;wardrobe:string;lockedExposure:string;lockedAction:string;sceneIntent:string;chotu:{name:string;age?:number;role?:string};scenes:Scene[];secondaryEncounters?:Scene[]};
type SocietyLead={id:string;name:string;chotu:string;age:number;officeExit:string;societyWindow:string;officeCarryover:string;visualSignature:string;chosenAction:string;personalEscalation:string;scenes:Scene[]};
type SocietyMaster={title:string;date:string;status:string;leads:SocietyLead[]};
type OfficeMaster={title:string;date:string;status:string;leads:OfficeLead[]};
type MergedDay={title:string;date:string;status:string;leads:{id:string;name:string;officeShift:string;events:Scene[];proseSceneIds:string[]}[]};
type ProseLine={kind:'narration'|'dialogue'|'thought';speaker?:string;text:string};
type ProseScene={id:string;start:string;end:string;title:string;location:string;sourceRefs:string[];lines:ProseLine[];approval:string};
type ProseDraft={title:string;status:string;chapters:{id:string;name:string;scenes:ProseScene[]}[]};
type UnifiedProseScene={id:string;time:string;title:string;status:string;paragraphs:string[]};
type UnifiedLead={id:string;name:string;officeChotu:string;societyChotu:string;source04A:string;oldQuestion:string;chronologicalScenes:Scene[];proseScenes:UnifiedProseScene[];endTime:string};
type UnifiedDay={title:string;status:string;date:string;leads:UnifiedLead[]};
type ContinuityRecord={id:string;name:string;societyChotu:string;reference:string;incident:string;visibleConfirmed:string;bodyRegions:{chestBreast:string;navelAbdomen:string;back:string;hipsButtocks:string};touchConfirmed:string;herResponse:string;hisResponse:string;uncertainty:string;proposed04AMicrobeat:string;followUp04B:string;dontRepeat:string;reviewStatus:string};
type ContinuityMaster={title:string;status:string;leads:ContinuityRecord[]};

const leads=['ankita','shivani','taniya','soniya','meenakshi','shreya'] as const;
const words:Record<string,string>={plot:'Plot',action:'Action',physical:'Staging',reaction:'Reaction',internal:'Inner thought',turn:'After-effect',continuity:'Continuity',dialogue:'Dialogue',dialogueSample:'Dialogue',mentalPOV:'Point of view',prosePreview:'Prose preview',reason:'Purpose',purpose:'Purpose',choice:'Choice',cause:'Cause',test:'Character test',result:'Result',after:'After-effect',hook:'Next beat',time:'Time',setting:'Setting'};
const human=(key:string)=>words[key]||key.replace(/([A-Z])/g,' $1').replace(/^./,v=>v.toUpperCase());
const omitted=new Set(['id','time','title','status','reviewStatus','provenance','source','approval','scene','beatId','fadeToBlack','image','visualAssets','visual','visualAssetFolder']);
function FieldValue({value}:{value:unknown}):ReactNode{
 if(value==null||typeof value==='boolean')return null;
 if(typeof value==='string'||typeof value==='number')return <>{String(value)}</>;
 if(Array.isArray(value))return <div>{value.map((entry,i)=><p key={i}><FieldValue value={entry}/></p>)}</div>;
 if(typeof value==='object'){
  const obj=value as Record<string,unknown>;
  if(typeof obj.speaker==='string'&&typeof obj.line==='string')return <><strong>{obj.speaker}:</strong> {obj.line}</>;
  return <div>{Object.entries(obj).filter(([k])=>!omitted.has(k)).map(([k,v])=><p key={k}><strong>{human(k)}:</strong> <FieldValue value={v}/></p>)}</div>;
 }
 return null;
}
function BeatDetails({beat}:{beat:Beat}){
 return <article className="encounter-card" id={'plot-beat-'+beat.id}>
  <h3>{beat.id} · {beat.title}</h3>{beat.time&&<p className="muted">{beat.time}</p>}
  {Object.entries(beat).filter(([k])=>!omitted.has(k)).map(([k,v])=><div key={k}><p><strong>{human(k)}:</strong> <FieldValue value={v}/></p></div>)}
 </article>;
}
function SceneDetails({scene,index}:{scene:Scene;index:number}){
 const number=scene.sceneNumber||scene.number||scene.scene||String(index+1).padStart(2,'0');
 return <details className="episode-outline" open={index===0} id={'episode04-scene-'+(scene.id||number)}>
  <summary><strong>Scene {number} · {scene.title}</strong>{scene.track==='OTHER_COLLEAGUES'&&<span> · Colleague track</span>}{scene.track==='SOCIETY_CHOTU'&&<span> · Society Chotu</span>}{scene.track==='SOCIETY_MORNING_BRIDGE'&&<span> · Morning society</span>}{scene.track==='OFFICE_CHOTU_WORKDAY'&&<span> · Office day</span>}{scene.track==='SOCIETY_BEFORE_OFFICE'&&<span> · Society before office</span>}{scene.track==='HOME_BEFORE_OFFICE'&&<span> · Home before office</span>} {scene.start&&<span>· {scene.start}{scene.end?'–'+scene.end:''}</span>}</summary>
  {scene.location&&<p className="muted">{scene.location}</p>}
  <div className="continuity-cards">{(scene.beats||[]).map(b=><BeatDetails key={b.id} beat={b}/>)}</div>
 </details>;
}
function ContinuityDetails({record,part}:{record:ContinuityRecord;part:'A'|'B'}){
 return <section className="episode-plan-card" id={'society-chotu-continuity-'+part.toLowerCase()+'-'+record.id}>
  <h3>{part==='A'?'04A · Confirmed sightline and unresolved question':'04A → 04B · Deliberate callback'} · {record.societyChotu}</h3>
  <p className="muted">Continuity reference · Existing 04A facts vs proposed follow-up, not approved prose</p>
  <p><strong>Original source:</strong> {record.reference}</p>
  <p><strong>What actually happened:</strong> {record.incident}</p>
  <p><strong>What was visibly confirmed:</strong> {record.visibleConfirmed}</p>
  {part==='A'&&<>
   <p><strong>Chest / breast:</strong> {record.bodyRegions.chestBreast}</p>
   <p><strong>Navel / abdomen:</strong> {record.bodyRegions.navelAbdomen}</p>
   <p><strong>Back:</strong> {record.bodyRegions.back}</p>
   <p><strong>Hips / buttocks:</strong> {record.bodyRegions.hipsButtocks}</p>
   <p><strong>Accidental touch:</strong> {record.touchConfirmed}</p>
   <p><strong>Her reaction:</strong> {record.herResponse}</p>
   <p><strong>His observed reaction:</strong> {record.hisResponse}</p>
  </>}
  <p><strong>Still uncertain:</strong> {record.uncertainty}</p>
  <details className="episode-outline" open={part==='B'}>
   <summary><strong>{part==='A'?'Optional 04A inner-thought refinement':'Saved 04B Society Chotu idea'}</strong></summary>
   <p><strong>04A proposed POV beat:</strong> {record.proposed04AMicrobeat}</p>
   <p><strong>04B deliberate check / saved continuation:</strong> {record.followUp04B}</p>
   <p><strong>Do not repeat or invent:</strong> {record.dontRepeat}</p>
  </details>
 </section>;
}
function UnifiedProseDetails({scenes,lead}:{scenes:UnifiedProseScene[];lead:string}){
 return <section className="episode-plan-card" id={'episode04b-working-prose-'+lead}>
  <h3>Episode 04B · {titleCase(lead)} · Expanded prose draft</h3>
  <p className="muted">Five detailed connected prose scenes: morning Society continuity, office Chotu, deliberate office choice, after-office Society Chotu and private after-effect. These drafts are NOT approved final prose.</p>
  {scenes.map((scene,i)=><details className="episode-outline" key={scene.id} id={'episode04b-prose-scene-'+scene.id} open={i===0}>
   <summary><strong>Prose {i+1} · {scene.title}</strong> · {scene.time}</summary>
   <div className="reading-surface">{scene.paragraphs.map((p,j)=><p key={j}>{p}</p>)}</div>
  </details>)}
 </section>;
}
function ProseDetails({chapter}:{chapter:ProseDraft['chapters'][number]}){
 return <section className="episode-plan-card" id={'episode04b-working-prose-'+chapter.id}>
  <h3>Episode 04B · {chapter.name} · Working scene prose</h3>
  <p className="muted">Four fully written scenes. Scene actions and dialogue are a working draft, NOT author-approved publication. Existing peer subplots remain plot-only.</p>
  {chapter.scenes.map((scene,i)=><details className="episode-outline" key={scene.id} id={'episode04b-prose-scene-'+scene.id} open={false}>
   <summary><strong>Prose {i+1} · {scene.title}</strong> · {scene.start}–{scene.end}</summary>
   <p className="muted">{scene.location}</p>
   <div className="continuity-cards">
    {scene.lines.map((line,j)=><p key={j} className={line.kind==='thought'?'source-note':undefined}>
     {line.kind==='dialogue'?<><strong>{line.speaker}: </strong>{line.text}</>:line.kind==='thought'?<em>{line.text}</em>:line.text}
    </p>)}
   </div>
  </details>)}
 </section>;
}
function WorkshopDetails({tracks}:{tracks:WorkshopTrack[]}){
 return <div className="continuity-cards">{tracks.map((track,i)=><article className="episode-plan-card" key={track.chotu+'-'+i}>
  <h2>{track.chotu}{track.lane?' · '+track.lane:''}</h2>{track.setting&&<p>{track.setting}</p>}
  {(['a','b'] as const).map((phase,i)=><details key={phase} className="episode-outline" open={i===0}>
   <summary><strong>{phase==='a'?'First encounter':'Follow-up'} · {String(track[phase].title||'Plot')}</strong></summary>
   {Object.entries(track[phase]).filter(([key])=>!omitted.has(key)).map(([key,v])=><p key={key}><strong>{human(key)}:</strong> <FieldValue value={v}/></p>)}
  </details>)}
 </article>)}</div>;
}

type Episode04PublicationIndex={leads:Record<string,{name:string;source:string;publicationStatus:string;publishedSceneIds:string[];completedPlanSceneIds:string[];supersededPlanSceneIds?:string[];pendingPlanSceneIds:string[];publicationScope:string}>};

type Shreya05Plan={
 title:string;status:string;dateRange:string[];
 references:{originalDhikaEp05Beat1:string;originalDhikaEp05Beat2:string};
 scenes:{id:string;part:string;date:string;time:string;title:string;setting:string;status:string;participants:string[];beats:string[];end:string}[];
 continuityLocks:string[];openDecisions:{id:string;issue:string;state:string;options:string[]}[];
};
type Ep05Plan={
 title:string;status:string;
 previous:{episode:string;date:string;time:string;event:string};
 comparison:{id:string;sourceBeat:string;ankitaCoverage:string;already:string;left:string}[];
 continuityLocks:string[];
 openDecisions:{id:string;question:string;options:string[];status:string}[];
 episode05ScenePlan:unknown[];
};


/** Proposal-only narrative tension cues, drawn from the saved Shivani 04B beats.
 * This guide deliberately does not approve prose or turn older 04A accident drafts into canon. */
const shivani04BTensionByScene:Record<string,{kind:string;note:string}>={
 'SH-PRE-01':{
  kind:'Unresolved curiosity — not a physical encounter',
  note:'Morning bridge is still under review. Latest 04A Reader: Deepu fell silent and left the registration counter unexpectedly; Shivani does NOT know why. Older backdrop-catch language is superseded.'
 },
 'E04B-SHIVANI-PAR-01':{
  kind:'Verbal attraction / teasing (proposal)',
  note:'Aarav and Shivani exchange quick faculty banter. No established affair and no invented physical escalation.'
 },
 'E04B-SHIVANI-02':{
  kind:'Private uncertainty (planned)',
  note:'Sunny remains reserved during genuine AV work. Shivani has no confirmed knowledge of the unauthorized photo copies.'
 },
 'E04B-SHIVANI-04':{
  kind:'Adult attraction / physical tension (unapproved prose)',
  note:'In the saved rehearsal plan, Shivani chooses an outfit reveal and offers a brief upper-back caress only if Sunny willingly agrees. No kiss or coercive workplace staging.'
 },
 'E04B-SHIVANI-PAR-04':{
  kind:'Verbal attraction (proposal)',
  note:'Aarav acknowledges noticing Shivani personally. Both remain adult faculty peers; no assumed relationship.'
 },
 'E04B-SOC-SH-02':{
  kind:'Deliberate mutual tension (unapproved prose)',
  note:'The saved society plan proposes Shivani showing the event-sari silhouette and a mutually agreed three-count pose with Deepu. No kiss, nudity or further escalation is approved.'
 },
 'E04B-SOC-SH-03':{
  kind:'After-effect / introspection (proposal)',
  note:'Her private reaction may carry into the home scene, but Deepu’s intentions are not presented as known facts.'
 }
};
export default function Planning({lead='ankita',part='A'}:{lead?:string;part?:string}){
 const active=leads.find(x=>x===lead)||'ankita';
 const selectedPart=(active==='taniya'&&part==='B'?'B':'A') as 'A'|'B';
 const {data:publicationIndex,error:publicationError,loading:publicationLoading}=useData<Episode04PublicationIndex>('episode-04a-publication-index.json');
 const {data:ankita,error:ankitaError}=useData<PlotDocument>('episode-04a-ankita-plan.json');
 const {data:shivani,error:shivaniError}=useData<PlotDocument>('episode-04a-shivani-plan.json');
 const {data:shreya,error:shreyaError}=useData<PlotDocument>('episode-04a-shreya-night-plan.json');
 const {data:taniya,error:taniyaError}=useData<PlotDocument>('episode-04a-taniya-soniya-night-review.json');
 const {data:taniya04B,error:taniya04BError,loading:taniya04BLoading}=useData<Taniya04BPlan>('episode-04b-taniya-author-updated-plan.json');
 const {data:workshop,error:workshopError}=useData<Workshop>('episode-04-chotu-six-leads-review.json');
 const {data:ankitaArchive,error:ankitaArchiveError}=useData<AnkitaArchive>('episode-04b-ankita-chotu-archive.json');
 const {data:officeDay,error:officeDayError}=useData<OfficeMaster>('episode-04b-office-chotu-jan02-five-leads.json');
 const {data:societyDay,error:societyDayError}=useData<SocietyMaster>('episode-04b-society-chotu-jan02-five-leads.json');
 const {data:continuity,error:continuityError}=useData<ContinuityMaster>('episode-04a-society-chotu-uncertainty-register.json');
 const {data:mergedDay,error:mergedError}=useData<MergedDay>('episode-04b-five-leads-merged-chronology.json');
 const {data:proseDraft,error:proseError}=useData<ProseDraft>('episode-04b-five-leads-prose-drafts.json');
 const {data:unifiedDay,error:unifiedError}=useData<UnifiedDay>('episode-04b-jan02-merged-day-five-leads.json');
 const {data:episode05,loading:episode05Loading,error:episode05Error}=useData<Ep05Plan>('episode-05-ankita-plan.json');
 const {data:shreya05,loading:shreya05Loading,error:shreya05Error}=useData<Shreya05Plan>('episode-05-shreya-plan.json');
 const doc=active==='ankita'?ankita:active==='shivani'?shivani:active==='shreya'?shreya:active==='taniya'||active==='soniya'?taniya:null;
 const error=publicationError||ankitaError||shivaniError||shreyaError||taniyaError||(active==='taniya'&&selectedPart==='B'&&taniya04BError)||workshopError||ankitaArchiveError||officeDayError||societyDayError||continuityError||mergedError||proseError||unifiedError;
 const officeLead=officeDay?.leads.find(x=>x.id===active);
 const societyLead=societyDay?.leads.find(x=>x.id===active);
 const continuityRecord=continuity?.leads.find(x=>x.id===active);
 const mergedLead=mergedDay?.leads.find(x=>x.id===active);
 const proseChapter=proseDraft?.chapters.find(x=>x.id===active);
 const unifiedLead=unifiedDay?.leads.find(x=>x.id===active);
 const tracks=active==='meenakshi'?[]:active==='ankita'?(ankitaArchive?.tracks||[]):(workshop?.leads.find(x=>x.id===active)?.tracks||[]);
 const go=(who:string=active,p:'A'|'B'=selectedPart)=>openPage('planning',{lead:who,part:who==='taniya'?p:'A'});
 const published=publicationIndex?.leads[active];
 const completed=new Set(published?.completedPlanSceneIds||[]);
 const superseded=new Set(published?.supersededPlanSceneIds||[]);
 const outstandingScenes=(doc?.scenes||[]).filter(scene=>{const sceneId=scene.id||scene.scene||scene.sceneNumber||scene.number;return !sceneId||(!completed.has(sceneId)&&!superseded.has(sceneId))});

 if(active==='shreya'&&part==='05')return <main className="page-width" id="shreya-episode05-planning">
  <header className="section-intro"><span className="eyebrow">Next planning · Episode 05</span><h1>Shreya · Episode 05 · Plot setup</h1>
   <p>Shreya's homecoming, Vikram's private married evening and a later Chintu encounter, aligned to original Dhika Episode 05's Jan 2 evening–Jan 3 morning source order. Plot only, not approved prose.</p></header>
  <div className="perspective-tabs" role="group" aria-label="Episode 05 characters">
   <button type="button" className="selected" aria-pressed="true">Shreya</button>
   <button type="button" onClick={()=>openPage('planning',{lead:'ankita',part:'05'})}>Ankita</button>
   <button type="button" onClick={()=>openPage('reading',{episode:'04B',character:'shreya',scene:'02'})}>Read Shreya 04B</button>
  </div>
  {shreya05Loading&&<p role="status">Loading Shreya Episode 05 outline…</p>}
  {shreya05Error&&<p role="alert" className="error">Shreya Episode 05 outline unavailable: {shreya05Error}</p>}
  {shreya05&&<>
   <section className="episode-plan-card"><h2>Dhika Episode 05 · chronological anchors</h2>
    <p><strong>2 January:</strong> {shreya05.references.originalDhikaEp05Beat1}</p>
    <p><strong>3 January:</strong> {shreya05.references.originalDhikaEp05Beat2}</p>
    <p className="muted">Dhika/John's original timeline supplies the rhythm only. Shreya/Vikram is a separate narrative. No scene below is final or part of the published 4B reader.</p>
   </section>
   <section id="shreya-ep05-sequence"><h2>Scene order · proposal</h2>
    {shreya05.scenes.map((s,i)=><details key={s.id} className="episode-outline" open={i===0}>
     <summary><strong>{i+1}. {s.title}</strong> · {s.date}</summary>
     <p className="muted">{s.part} · {s.time} · {s.setting}</p>
     <ol>{s.beats.map((b,j)=><li key={j}>{b}</li>)}</ol>
     <p><strong>End beat:</strong> {s.end}</p>
     <p className="muted">{s.status.replace(/_/g,' ')}</p>
    </details>)}
   </section>
   <section className="episode-plan-card"><h2>Continuity locks</h2>{shreya05.continuityLocks.map((x,i)=><p key={i}>{x}</p>)}</section>
   <section className="episode-plan-card"><h2>Still open for scene writing</h2>
    {shreya05.openDecisions.map(d=><details key={d.id} className="episode-outline"><summary><strong>{d.issue}</strong> · Open</summary><p>{d.options.join(' / ')}</p></details>)}
   </section>
  </>}
 </main>;
 if(active==='ankita')return <main className="page-width" id="ankita-episode05-planning">
  <header className="section-intro"><span className="eyebrow">Next planning · Episode 05</span><h1>Ankita · Episode 05 · Plot discussion</h1><p>Episode 04B ends Friday, 2 January 2026 at 02:40 PM. No Episode 05 scenes are approved or written yet.</p></header>
  <div className="perspective-tabs" role="group" aria-label="Choose character">{leads.map(w=><button key={w} type="button" aria-pressed={active===w} className={active===w?'selected':''} onClick={()=>go(w)}>{titleCase(w)}</button>)}</div>
  <section className="episode-plan-card" id="ankita-04b-ended">
   <h2>Ankita · Episode 04B — ended</h2>
   <p><strong>Story endpoint:</strong> Friday 2 January · 02:40 PM · Ankita leaves the Cyber City office after Rohit's second encounter.</p>
   <p className="muted">Read Story now contains Scene 01 (Rinku), Scene 02 (home to office), and Scene 03 (Rohit). Closure does not silently freeze editorial revisions. Historical 04B side-plot drafts are not active planning.</p>
   <button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'04B',character:'ankita',scene:'01'})}>Read complete Episode 04B →</button>
   <button type="button" className="button subtle" onClick={()=>openPage('reading',{episode:'04A',character:'ankita'})}>Read earlier Episode 04A</button>
  </section>
  {episode05Loading&&<p role="status">Loading Ankita Episode 05 planning…</p>}
  {episode05Error&&<p role="alert" className="error">Episode 05 planning unavailable: {episode05Error}</p>}
  {episode05&&<>
   <section className="episode-plan-card" id="ankita-ep05-compare">
    <h2>Dhika Episode 05 → Ankita: covered vs left</h2>
    <p className="muted">Dhika's Episode 05 is a reference, not a command to reuse its events. Ankita's knowledge and past choices remain distinct.</p>
    {episode05.comparison.map((item,i)=><details className="episode-outline" key={item.id} open={item.id==='D05-06'}>
     <summary><strong>{i+1}. {item.sourceBeat}</strong> · {item.ankitaCoverage.replace(/_/g,' ').toLowerCase()}</summary>
     <p><strong>Already established:</strong> {item.already}</p>
     <p><strong>Still open:</strong> {item.left}</p>
    </details>)}
   </section>
   <section className="episode-plan-card" id="ankita-ep05-decisions">
    <h2>Episode 05 — decisions to discuss</h2>
    <p className="muted">No scene is decided by this page. These are open alternatives, not prose or an approved timeline.</p>
    {episode05.openDecisions.map(d=><article key={d.id} className="encounter-card">
     <h3>{d.question}</h3>
     <p>{d.options.join(' / ')}</p>
     <p className="muted">Status: open for author discussion</p>
    </article>)}
   </section>
   <section className="episode-plan-card" id="ankita-ep05-continuity">
    <h2>Continuity to carry into Episode 05</h2>
    <div className="continuity-cards">{episode05.continuityLocks.map((note,i)=><p key={i}>{note}</p>)}</div>
   </section>
  </>}
 </main>;

 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">{selectedPart==='B'?'Episode 04B · Friday 2 January 2026':'Episode 04A'}</span><h1>{selectedPart==='B'?'Taniya · Episode 04B · Plot discussion':'Episode 04A · Story status'}</h1><p>{selectedPart==='B'?'Author-supplied new plot sequence · discussion only; no prose published. Original 04B preserved intact in Future Reference.':'Completed scenes are in Read Story. Only unfinished Episode 04A scenes, if any, remain here.'}</p></header>
  <p className="source-note"><strong>Episode 06 marriage-first planning:</strong> <a href="#/planning?lead=ankita&part=06">Ankita × Kabir — Scene 01</a> · <a href="#/planning?lead=shreya&part=06">Shreya × Vikram — Scene 01</a>. Both source-backed opening plot blueprints are saved; detailed marriage origin and dates still need discussion. <a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/episode-06-karan-aman-shared-availability.json" target="_blank" rel="noreferrer">Karan–Aman daily five-lead calendar</a> uses provisional windows, not confirmed scenes.</p>
  <p className="source-note"><strong>Episode 06 five-household hold:</strong> <a href="#/planning?lead=shivani&part=06">3–5 January cross-lead society dependency</a> · <a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/episode-06-cross-household-hold.json" target="_blank" rel="noreferrer">Central gate</a>. Before planning any next lead, map all five households' work, partners, children, and society/movie availability; do not invent husband/fiancé positions.</p>
  <p className="source-note"><strong>Original manuscript archive:</strong> <a href="#/source-vault">Read exact Google Docs copies — Shivani 04B, Meenakshi × Shivani 05, Taniya 05 and Taniya 04B preserved plot</a>. Source text is locked; new scenes belong in new versions, not edits to these copies.</p>
  <p className="source-note"><strong>Cross-lead continuity:</strong> <a href="#/study-circle">Ayaan–Armaan Biotechnology mentoring shared by Ankita, Shivani, Taniya, Meenakshi and Shreya</a>. Read the role, approval and timing notes before planning any January scenes.</p>
  <p className="source-note"><strong>Before planning the next scene:</strong> <a href={'#/future-reference?lead='+active}>Future Reference &amp; Locked Decisions</a> — current scene locks, deferred ideas and pending editorial issues, not new story prose.</p>

  {active==='shivani'&&<section className="episode-plan-card" id="shivani-ep06-entry">
    <h2>Shivani · Episode 06 · 3–5 January 2026</h2>
    <p>Approved A/B/C plot, Group D and Kavya open, society/movie options and five-lead Episode 05 audit. Plot only; existing prose unchanged.</p>
    <button type="button" className="button primary" onClick={()=>openPage('planning',{lead:'shivani',part:'06'})}>Open Shivani EP06 three-day plot →</button>
   </section>}
  {active==='shreya'&&<section className="episode-plan-card" id="shreya-05-next-plan"><h2>Shreya · next: Episode 05</h2>
    <p>Friday evening homecoming and Vikram relationship beat; original Dhika EP05 chronological bridge; then a proposed separate private society-Chintu continuation after the Dhika EP05 cutpoint.</p>
    <button type="button" className="button primary" onClick={()=>openPage('planning',{lead:'shreya',part:'05'})}>Open Shreya Episode 05 planning →</button>
  </section>}
  {active==='shreya'&&selectedPart==='A'&&<section className="episode-plan-card" id="shreya-04a-author-manuscript">
   <h2>Shreya · Episode 04A — Updated manuscript and illustrations</h2>
   <p className="muted">Author-supplied Google Docs tab · SHREYA EP-04A</p>
   <p><a className="button primary" href="https://docs.google.com/document/d/1zcFlF9rWeIzaenBEmatt4K8bw3L-LcH3c_45JwoNM3o/edit?tab=t.90gza05r7hjd" target="_blank" rel="noopener noreferrer">Open Shreya Episode 04A manuscript</a></p>
   <p className="muted">Complete Scenes 01 and 02 are available in Read Story, with images placed in sequence. The original Google Doc is retained as the source manuscript.</p>
  </section>}
  {active==='shreya'&&selectedPart==='A'&&published&&<section className="episode-plan-card" id="shreya-04a-completion">
   <h2>Shreya · Episode 04A — Reading transfer complete</h2>
   <p><strong>Completed:</strong> Scene 01 (Chintu / latch), Scene 02 (shower → consolation → dinner), and Scene 03 (SC09 — Night Closure). The full text is in Read Story, with illustrations in the earlier scenes.</p>
   <p><strong>Legacy plans archived, not completed:</strong> old SHR04A-S03 and SHR04A-S04 used a husband-return timeline that conflicts with the current manuscript. They are not active unfinished scenes and are not duplicated here.</p>
   <p className="muted">Current timeline: Vikram expected home around 6:00 AM on 2 January; Shreya 04A manuscript ends after the new SC09 night closure. Final author freeze still pending.</p>
   <button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'04A',character:'shreya'})}>Read full Shreya 04A →</button>
  </section>}
  <div className="perspective-tabs" role="group" aria-label="Choose character">{leads.map(w=><button key={w} type="button" aria-pressed={active===w} className={active===w?'selected':''} onClick={()=>go(w)}>{titleCase(w)}</button>)}</div>
  {active==='taniya'&&<div className="episode-picker" role="group" aria-label="Choose Taniya episode planning">
   <button type="button" className={selectedPart==='A'?'episode-picker-current':''} aria-pressed={selectedPart==='A'} onClick={()=>go('taniya','A')}>04A · Completed</button>
   <button type="button" className={selectedPart==='B'?'episode-picker-current':''} aria-pressed={selectedPart==='B'} onClick={()=>go('taniya','B')}>04B · 2 January · Active plot</button>
  </div>}
  {error&&<p role="alert" className="error">Some planning sources could not load: {error}</p>}
  {selectedPart==='A'&&published&&<section className="episode-plan-card" id={'episode04-published-status-'+active} aria-label="Published prose status">
   <h2>{titleCase(active)} · Episode 04A</h2>
   <p><strong>Published in Read Story.</strong> {published.publishedSceneIds.length===1&&published.publishedSceneIds[0]==='manuscript'?'Author-approved manuscript':published.publishedSceneIds.length+' scene entries'} are available in the main reader.</p>
   <p className="muted">{published.publicationScope}</p>
   <button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'04A',character:active})}>Read published prose →</button>
   <p className="muted">Completed scenes have been moved out of the active plot into Read Story.</p>
  </section>}
  {selectedPart==='A'?(active==='shivani'&&!publicationIndex
   ?<p role="status">{publicationLoading?'Checking published Episode 04A scenes…':'Publication index unavailable. The legacy plot is archived; check Read Story for the saved manuscript.'}</p>
   :published
   ?(active==='meenakshi'?<section className="episode-plan-card" id="ep04-meenakshi-handoff"><h2>Meenakshi · Episode 04A published</h2><p>All four Meenakshi Episode 04A scenes are now published in Read Story. Scene 04 includes every M04A-04.01–04.12 beat and ends with the couple sleeping together. No unfinished Episode 04A scene remains in the active plot.</p><button type="button" className="button subtle" onClick={()=>openPage('reading',{episode:'04A',character:'meenakshi',scene:'04'})}>Read completed Scene 04</button><p className="muted">Separate earlier-story thread: the Episode 03 Scene 01 hospital cut-point involving Naveen at 14:15 remains open. This is not a pending Meenakshi Episode 04A scene, and no extra incident has been added.</p><button type="button" className="button subtle" onClick={()=>openPage('reading',{episode:'03',character:'meenakshi',scene:'01'})}>Read earlier hospital scene</button></section>:outstandingScenes.length>0?<section id="episode04-active-plan">
     <h2>{active==='shreya'?'Shreya · Legacy later beats — author review required':titleCase(active)+' · Still to write'}</h2><p className="muted">{active==='shreya'?'The new manuscript ends after the SC09 night closure. Vikram now returns around 6 AM next morning; old 20:40–20:50 arrival and the planned married-night beats below conflict and must be superseded or re-plotted before drafting. These are reference notes only, not approved future events.':'These remaining plot scenes are not yet in Read Story.'}</p>
     {outstandingScenes.map((scene,index)=><SceneDetails key={scene.id||index} scene={scene} index={index}/>)}
    </section>:<p className="source-note">No unfinished Episode 04A plot scenes remain for this character. Future work belongs to the next episode or a newly approved scene.</p>)
   :<>{continuityRecord&&<ContinuityDetails record={continuityRecord} part="A"/>}{active==='meenakshi'
   ?<section className="episode-plan-card" id="ep04-meenakshi-handoff"><h2>Meenakshi · Naveen · 14:15 handoff</h2><p>Episode 03 Scene 01 ended at the hospital after Naveen arrived with the handover copy. The next interaction remains open for Episode 04 discussion. No additional action or prose has been approved.</p><button type="button" className="button subtle" onClick={()=>openPage('reading',{episode:'03',character:'meenakshi',scene:'01'})}>Read the preceding scene</button></section>
   :doc?<section id="episode04-active-plan"><h2>{doc.title}</h2>{active==='soniya'&&<p className="muted">Shared Taniya and Soniya household scenes.</p>}
    {(doc.scenes||[]).map((s,i)=><SceneDetails key={s.id||s.scene||i} scene={s} index={i}/>)}
    {doc.proseDraft?.url&&<p className="source-note"><strong>Working prose draft:</strong> <a href={doc.proseDraft.url} target="_blank" rel="noreferrer">{doc.proseDraft.title||'Open draft prose'}</a></p>}
   </section>:<p role="status">Loading Episode 04A plot…</p>}</>)
   :active==='taniya'?(taniya04B?<section id="episode04-next-day">
      <h2>{taniya04B.title}</h2>
      <p className="muted">Friday 2 January 2026 · Gym Reader Scene 01 is now imported from the author's Doc, as a working manuscript with 3 source images. Editing/final freeze is pending. The other scenes remain plot-only.</p>
      <p><button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'04B',character:'taniya',scene:'01'})}>Read Taniya Gym · Scene 01 + 3 original images →</button></p>
      <p className="source-note"><strong>Scene numbering:</strong> Master plot TAN04B-01 (empty flat/missing garments) is an unwritten morning prelude. The first written reader scene is the gym (TAN04B-02). Our next Reader Scene 02 discussion covers Guddu after the gym; not yet prose.</p>
      <p><strong>Current focus:</strong> empty flat → Vivek Rao gym → Guddu society/home → later CA office → Vivek Suri senior lane → Punit genuine unforeseen accident → separate deliberate follow-up.</p>
      <div className="continuity-cards">{taniya04B.scenes.map((scene,i)=><SceneDetails key={scene.id} scene={scene} index={i}/>)}</div>
      <section className="episode-plan-card">
       <h3>Open staging questions (no assumptions)</h3>
       {Object.entries(taniya04B.unassigned).map(([key,value])=><p key={key}><strong>{human(key)}:</strong> {value}</p>)}
      </section>
      <p className="source-note"><strong>Historical plot archived unchanged:</strong> <a href="#/future-reference?lead=taniya">Taniya Future Reference</a>. Do not use old full-team / post-office Guddu drafts as current 04B scenes.</p>
     </section>:<p role="status">{taniya04BLoading?'Loading author-updated Taniya Episode 04B plot…':'Taniya Episode 04B plot is unavailable; check repository for source.'}</p>)
   :officeLead?<section id="episode04-next-day"><h2>Episode 04B · {titleCase(active)} · Full-day plot and prose</h2>
     <p className="muted">2 January 2026 · {officeLead.office} · Office shift: {officeLead.workday} · Twins absent</p>
     <p><strong>Office Chotu:</strong> {officeLead.chotu.name} · {officeLead.chotu.role}</p>
     {active==='shreya'?<p className="source-note"><strong>Author update · Station Chotu:</strong> The four-women 'Seduce Him' group game has moved to <a href="#/future-reference?lead=shreya">Future Reference</a> for an unscheduled episode. It is not a January 2 event. The old after-duty individual draft is pending an accident-first replan. The Station tea helper is not Society Chintu.</p>:<>
      <p><strong>Planned exposure:</strong> {officeLead.lockedExposure}</p>
      <p><strong>Planned actions:</strong> {officeLead.lockedAction} · No kissing</p>
      <p><strong>Character direction:</strong> {officeLead.sceneIntent}</p></>}
     <p className="muted">{active==='shreya'?'Shreya 04B · Morning and station Keshav/chai accident are saved verbatim with nine original Google Doc images in Read Story (working manuscript, not final frozen). Active Planning below begins after the published cabin encounter; former 09:00–11:34 proposals are archived in Git history. Delayed acting-game ideas remain future-only.':'Merged 2 January timeline: society/home before work → office Chotu and colleagues → society Chotu after work. Working prose is available below; it is not yet author-approved.'}</p>
     {active==='shreya'&&<p><button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'04B',character:'shreya',scene:'01'})}>Read Shreya 04B · published Doc and 9 images →</button></p>}
     {continuityRecord&&<ContinuityDetails record={continuityRecord} part="B"/>}
     {societyLead&&<div className="episode-plan-card"><h3>Society Chotu continuation · {societyLead.chotu}</h3><p className="muted">After office · {societyLead.societyWindow} · Twins absent</p><p><strong>Chosen styling:</strong> {societyLead.visualSignature}</p><p><strong>Physical choice:</strong> {societyLead.chosenAction}</p><p><strong>Character escalation:</strong> {societyLead.personalEscalation}</p></div>}
     {(unifiedLead?.chronologicalScenes||mergedLead?.events||[...(officeLead.scenes||[]),...(officeLead.secondaryEncounters||[]),...(societyLead?.scenes||[])].sort((a,b)=>(a.start||'').localeCompare(b.start||''))).filter(s=>active!=='shreya'||!['E04B-SHREYA-04','E04B-SHREYA-05','E04B-SHREYA-06'].includes(s.id||'')).map((s,i)=><div key={s.id||i}><SceneDetails scene={s} index={i}/>{active==='shivani'&&s.id&&shivani04BTensionByScene[s.id]&&<div className="source-note" style={{borderLeft:'3px solid var(--accent)',paddingLeft:'14px',margin:'0 0 16px'}}><strong>Attraction / erotic tension — planning marker:</strong> <strong>{shivani04BTensionByScene[s.id].kind}</strong><p>{shivani04BTensionByScene[s.id].note}</p><small>Proposal / source distinction only; not a published story beat or approved physical action.</small></div>}</div>)}
     {active==='shreya'?null:unifiedLead?<UnifiedProseDetails scenes={unifiedLead.proseScenes} lead={active}/>:proseChapter?<ProseDetails chapter={proseChapter}/>:null}
    </section>
   :tracks.length?<section id="episode04-next-day"><h2>Episode 04B · {titleCase(active)}</h2><WorkshopDetails tracks={tracks}/></section>
   :<p role="status">Loading Episode 04B plot…</p>}
 </main>;
}
