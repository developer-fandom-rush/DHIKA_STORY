import type { ReactNode } from 'react';
import { openPage, titleCase, useData } from './lib';

type Beat={id:string;title:string;time?:string;[key:string]:unknown};
type Scene={id?:string;scene?:string;sceneNumber?:string;number?:string;title:string;start?:string;end?:string;location?:string;beats:Beat[];[key:string]:unknown};
type PlotDocument={title:string;scenes:Scene[];proseDraft?:{title?:string;url?:string};[key:string]:unknown};
type ShreyaScene02Part1={id:string;status:string;opening:string[];grokSC062:string[];notes?:string[]};
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

type Episode04PublicationIndex={leads:Record<string,{name:string;source:string;publicationStatus:string;publishedSceneIds:string[];completedPlanSceneIds:string[];pendingPlanSceneIds:string[];publicationScope:string}>};

export default function Planning({lead='ankita',part='A'}:{lead?:string;part?:string}){
 const active=leads.find(x=>x===lead)||'ankita';
 const selectedPart=part==='B'?'B':'A';
 const {data:publicationIndex,error:publicationError,loading:publicationLoading}=useData<Episode04PublicationIndex>('episode-04a-publication-index.json');
 const {data:ankita,error:ankitaError}=useData<PlotDocument>('episode-04a-ankita-plan.json');
 const {data:shivani,error:shivaniError}=useData<PlotDocument>('episode-04a-shivani-plan.json');
 const {data:shreya,error:shreyaError}=useData<PlotDocument>('episode-04a-shreya-night-plan.json');
 const {data:shreyaPart1,error:shreyaPart1Error}=useData<ShreyaScene02Part1>('episode-04a-shreya-scene02-part1-working-draft.json');
 const {data:taniya,error:taniyaError}=useData<PlotDocument>('episode-04a-taniya-soniya-night-review.json');
 const {data:workshop,error:workshopError}=useData<Workshop>('episode-04-chotu-six-leads-review.json');
 const {data:ankitaArchive,error:ankitaArchiveError}=useData<AnkitaArchive>('episode-04b-ankita-chotu-archive.json');
 const {data:officeDay,error:officeDayError}=useData<OfficeMaster>('episode-04b-office-chotu-jan02-five-leads.json');
 const {data:societyDay,error:societyDayError}=useData<SocietyMaster>('episode-04b-society-chotu-jan02-five-leads.json');
 const {data:continuity,error:continuityError}=useData<ContinuityMaster>('episode-04a-society-chotu-uncertainty-register.json');
 const {data:mergedDay,error:mergedError}=useData<MergedDay>('episode-04b-five-leads-merged-chronology.json');
 const {data:proseDraft,error:proseError}=useData<ProseDraft>('episode-04b-five-leads-prose-drafts.json');
 const {data:unifiedDay,error:unifiedError}=useData<UnifiedDay>('episode-04b-jan02-merged-day-five-leads.json');
 const doc=active==='ankita'?ankita:active==='shivani'?shivani:active==='shreya'?shreya:active==='taniya'||active==='soniya'?taniya:null;
 const error=shreyaPart1Error||publicationError||ankitaError||shivaniError||shreyaError||taniyaError||workshopError||ankitaArchiveError||officeDayError||societyDayError||continuityError||mergedError||proseError||unifiedError;
 const officeLead=officeDay?.leads.find(x=>x.id===active);
 const societyLead=societyDay?.leads.find(x=>x.id===active);
 const continuityRecord=continuity?.leads.find(x=>x.id===active);
 const mergedLead=mergedDay?.leads.find(x=>x.id===active);
 const proseChapter=proseDraft?.chapters.find(x=>x.id===active);
 const unifiedLead=unifiedDay?.leads.find(x=>x.id===active);
 const tracks=active==='meenakshi'?[]:active==='ankita'?(ankitaArchive?.tracks||[]):(workshop?.leads.find(x=>x.id===active)?.tracks||[]);
 const go=(who:string=active,p:'A'|'B'=selectedPart)=>openPage('planning',{lead:who,part:p});
 const published=publicationIndex?.leads[active];
 const completed=new Set(published?.completedPlanSceneIds||[]);
 const outstandingScenes=(doc?.scenes||[]).filter(scene=>{const sceneId=scene.id||scene.scene||scene.sceneNumber||scene.number;return !sceneId||!completed.has(sceneId)});
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">Next planning · Episode 04</span><h1>Episode 04 · Plot Planning</h1><p>Only unfinished scenes remain here. Published Episode 04A prose is in Read Story, with the former plan retained as an archive.</p></header>
  <p className="source-note"><strong>Before planning the next scene:</strong> <a href={'#/future-reference?lead='+active}>Future Reference &amp; Locked Decisions</a> — current scene locks, deferred ideas and pending editorial issues, not new story prose.</p>

  <section className="episode-plan-card" id="neutral-action-choreography-rule" aria-label="Neutral actor receiver action workflow">
   <h2>Writing workflow · Actor → Receiver → Action</h2>
   <p><strong>Author instruction (all characters):</strong> Asking for actor, receiver, exact action name, witness, reaction and sensory transition is a <strong>neutral breakdown</strong>, not automatically a request for graphic prose. Keep the named action instead of quietly deleting it or replacing it with a vague euphemism.</p>
   <p>Use one row per action: <strong>Actor → receiver / observer → exact action → what changes → reaction → knowledge limit → next state</strong>. Record ordinary sensory facts (water, airflow, door, position, clothing/object state). Do not invent erotic details or presume another person's private thoughts. Ask once only about truly unresolved facts; keep approvals locked.</p>
   {active==='shreya'&&<details className="episode-outline" open>
    <summary><strong>Shreya · Scene 02 — worked example (for review, not approved prose)</strong></summary>
    <ol>
     <li><strong>Shreya → Self:</strong> Private self-touch; author's action name: fingering, while recalling Vivek.</li>
     <li><strong>Arvind → Door / observes Shreya:</strong> Unexpectedly opens door and witnesses her private action before she notices him.</li>
     <li><strong>Door / airflow → Shreya:</strong> Change in air alerts her to the open doorway.</li>
     <li><strong>Shreya → Self / Arvind:</strong> Startled vocal reaction, stops further shouting, turns away and becomes still.</li>
     <li><strong>Arvind → observes Shreya:</strong> Brief view of her bare back; his earlier interest is reader-only knowledge.</li>
     <li><strong>Arvind → Self:</strong> Regains composure, leaves and retrieves a towel. Her immediate privacy and comfort take priority.</li>
     <li><strong>Arvind → Shreya:</strong> Returns with towel, offers it, apologizes and withdraws.</li>
    </ol>
    <p className="muted">Working author-corrected breakdown, not approved final prose. This workflow update does not rewrite the existing Episode 04A plan.</p>
   </details>}
   <p className="muted">For a separately authored missing passage, keep a stable insertion ID and exact placeholder location; this UI does not contact Grok. Full standard: <a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/WRITING-COLLABORATION-PROTOCOL.md" target="_blank" rel="noreferrer">Writing Collaboration Protocol §2B</a>.</p>
  </section>

  {active==='shreya'&&selectedPart==='A'&&<section className="episode-plan-card" id="shreya-04a-author-manuscript">
   <h2>Shreya · Episode 04A — Current manuscript</h2>
   <p className="muted">Author-supplied Google Docs tab · SHREYA EP-04A</p>
   <p><a className="button primary" href="https://docs.google.com/document/d/1zcFlF9rWeIzaenBEmatt4K8bw3L-LcH3c_45JwoNM3o/edit?tab=t.90gza05r7hjd" target="_blank" rel="noopener noreferrer">Open Shreya Episode 04A manuscript</a></p>
   <p className="muted">Opens the exact Shreya tab in its original document. Document access remains subject to its existing sharing settings. Earlier working material is retained below as an archive.</p>
  </section>}
  {active==='shreya'&&selectedPart==='A'&&<section className="episode-plan-card" id="shreya-scene02-part1-draft">
   <h2>Shreya · Scene 02 · Part 1 — Earlier Draft Archive</h2>
   <p className="muted">18:07–18:29 · SC05 / SC06.1 / SC06.2 · Not approved and not published to Read Story</p>
   {shreyaPart1Error&&<p role="alert" className="error">Draft could not load: {shreyaPart1Error}</p>}
   {!shreyaPart1?<p role="status">Loading scene draft…</p>:<details className="episode-outline">
    <summary><strong>Read assembled Part 1 — with Grok-provided SC06.2 verbatim</strong></summary>
    <div className="reading-surface">
     {shreyaPart1.opening.map((p,i)=>p.startsWith('### ')?<h3 key={'o'+i}>{p.slice(4)}</h3>:<p key={'o'+i}>{p}</p>)}
     <h3>SC06.2 — Grok-provided passage</h3>
     {shreyaPart1.grokSC062.map((p,i)=><p key={'g'+i}>{p}</p>)}
    </div>
    <p className="muted">SC07–SC08 follow after this cut. Earlier repetitive bridge remains unchanged pending review. Door-opening reason is not locked.</p>
   </details>}
  </section>}
  <div className="episode-picker" role="group" aria-label="Choose planning episode">
   <button className={selectedPart==='A'?'episode-picker-current':''} aria-pressed={selectedPart==='A'} type="button" onClick={()=>go(active,'A')}>Episode 04A · Evening</button>
   <button className={selectedPart==='B'?'episode-picker-current':''} aria-pressed={selectedPart==='B'} type="button" onClick={()=>go(active,'B')}>Episode 04B · Next Day</button>
  </div>
  <div className="perspective-tabs" role="group" aria-label="Choose character">{leads.map(w=><button key={w} type="button" aria-pressed={active===w} className={active===w?'selected':''} onClick={()=>go(w)}>{titleCase(w)}</button>)}</div>
  {error&&<p role="alert" className="error">Some planning sources could not load: {error}</p>}
  {selectedPart==='A'&&published&&<section className="episode-plan-card" id={'episode04-published-status-'+active} aria-label="Published prose status">
   <h2>{titleCase(active)} · Episode 04A</h2>
   <p><strong>Published in Read Story.</strong> {published.publishedSceneIds.length===1&&published.publishedSceneIds[0]==='manuscript'?'Author-approved manuscript':published.publishedSceneIds.length+' scene entries'} are available in the main reader.</p>
   <p className="muted">{published.publicationScope}</p>
   <button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'04A',character:active})}>Read published prose →</button>
   <p className="muted">Completed plot notes are retained as source archive but are no longer repeated in Planning.</p>
  </section>}
  {selectedPart==='A'?((active==='ankita'||active==='shivani')&&!publicationIndex
   ?<p role="status">{publicationLoading?'Checking published Episode 04A scenes…':'Publication index unavailable. The legacy plot is archived; check Read Story for the saved manuscript.'}</p>
   :published
   ?(outstandingScenes.length>0?<section id="episode04-active-plan">
     <h2>{titleCase(active)} · Still to write</h2><p className="muted">These remaining plot scenes are not yet in Read Story.</p>
     {outstandingScenes.map((scene,index)=><SceneDetails key={scene.id||index} scene={scene} index={index}/>)}
    </section>:<p className="source-note">No unfinished Episode 04A plot scenes remain for this character. Future work belongs to the next episode or a newly approved scene.</p>)
   :<>{continuityRecord&&<ContinuityDetails record={continuityRecord} part="A"/>}{active==='meenakshi'
   ?<section className="episode-plan-card" id="ep04-meenakshi-handoff"><h2>Meenakshi · Naveen · 14:15 handoff</h2><p>Episode 03 Scene 01 ended at the hospital after Naveen arrived with the handover copy. The next interaction remains open for Episode 04 discussion. No additional action or prose has been approved.</p><button type="button" className="button subtle" onClick={()=>openPage('reading',{episode:'03',character:'meenakshi',scene:'01'})}>Read the preceding scene</button></section>
   :doc?<section id="episode04-active-plan"><h2>{doc.title}</h2>{active==='soniya'&&<p className="muted">Shared Taniya and Soniya household scenes.</p>}
    {(doc.scenes||[]).map((s,i)=><SceneDetails key={s.id||s.scene||i} scene={s} index={i}/>)}
    {doc.proseDraft?.url&&<p className="source-note"><strong>Working prose draft:</strong> <a href={doc.proseDraft.url} target="_blank" rel="noreferrer">{doc.proseDraft.title||'Open draft prose'}</a></p>}
   </section>:<p role="status">Loading Episode 04A plot…</p>}</>)
   :officeLead?<section id="episode04-next-day"><h2>Episode 04B · {titleCase(active)} · Full-day plot and prose</h2>
     <p className="muted">2 January 2026 · {officeLead.office} · Office shift: {officeLead.workday} · Twins absent</p>
     <p><strong>Office Chotu:</strong> {officeLead.chotu.name} · {officeLead.chotu.role}</p>
     <p><strong>Planned exposure:</strong> {officeLead.lockedExposure}</p>
     <p><strong>Planned actions:</strong> {officeLead.lockedAction} · No kissing</p>
     <p><strong>Character direction:</strong> {officeLead.sceneIntent}</p>
     <p className="muted">Merged 2 January timeline: society/home before work → office Chotu and colleagues → society Chotu after work. Working prose is available below; it is not yet author-approved.</p>
     {continuityRecord&&<ContinuityDetails record={continuityRecord} part="B"/>}
     {societyLead&&<div className="episode-plan-card"><h3>Society Chotu continuation · {societyLead.chotu}</h3><p className="muted">After office · {societyLead.societyWindow} · Twins absent</p><p><strong>Chosen styling:</strong> {societyLead.visualSignature}</p><p><strong>Physical choice:</strong> {societyLead.chosenAction}</p><p><strong>Character escalation:</strong> {societyLead.personalEscalation}</p></div>}
     {(unifiedLead?.chronologicalScenes||mergedLead?.events||[...(officeLead.scenes||[]),...(officeLead.secondaryEncounters||[]),...(societyLead?.scenes||[])].sort((a,b)=>(a.start||'').localeCompare(b.start||''))).map((s,i)=><SceneDetails key={s.id||i} scene={s} index={i}/>)}
     {unifiedLead?<UnifiedProseDetails scenes={unifiedLead.proseScenes} lead={active}/>:proseChapter?<ProseDetails chapter={proseChapter}/>:null}
    </section>
   :tracks.length?<section id="episode04-next-day"><h2>Episode 04B · {titleCase(active)}</h2><WorkshopDetails tracks={tracks}/></section>
   :<p role="status">Loading Episode 04B plot…</p>}
 </main>;
}
