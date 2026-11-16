import { useEffect } from 'react';
import { assetUrl, leadOrder, Plan, openPage, titleCase, useData } from './lib';
const str=(v:unknown)=>typeof v==='string'?v:'';
type NarrativeCalibration={id:string;title:string;status:string;referenceFile:string;sourceScope:string;diagnosis:{fault:string;correction:string}[];sourceObservations:string[];principles:string[];prohibitions:string[];plotSuggestionFormat:string;proseStandard:string};
type NarratorStyleRule={status:string;origin:string;appliesTo:string;methods:string[];examplePhrases:string[];useInstructions:string[];sceneTemplate:string[];};
type AnkitaFuturePresentation={status:string;decision:string;planning:{idea:string;duration:string;date:string;episode:string;proseStatus:string;sceneStatus:string;characterLock:string};originalAuthorPromptVerbatim:string;originalPlotBeatVerbatim:{name:string;plot:string}};
type AnkitaScene03={title:string;status:string;start:string;end:string;beats:{id:string;time:string;name:string;plot:string;suggestedCliffDialogue?:string}[];validation:{requirement:string;status:string;beat:string}[];proseStatus:string;nextSceneSeed:string;};
type RohitPlot={title:string;status:string;date:string;beats:{id:string;name:string;plot:string;dialogue?:{speaker:string;line:string}[]}[];costumeContinuity?:{scene04Entry:string};authorLocks?:string[];};
type AnkitaScene05={title:string;status:string;date:string;time:{start:string;end:string;certainty:string};continuity:{vehicle:string;seats:{driver:string;frontPassenger:string;rearLeft:string;rearMiddle:string;rearRight:string};deadline:string;destination:string};beats:{id:string;heading:string;plot:string;dialogue?:{speaker:string;line:string}[]}[];proseStatus:string;};
type AnkitaScene06={title:string;status:string;date:string;time:{start:string;end:string;status:string};proseStatus:string;setting:{otherPeople:string};choreography:{id:string;formation:string;participants:string;contact:string;reaction:string}[];prose:{language:string;lines:{type:'narration'|'dialogue';speaker?:string;text:string}[]};handoff:{nextScene:string;scope:string;status:string};};
type AnkitaScene07={title:string;status:string;date:string;time:{start:string;end:string;certainty:string};continuity:{carProposition:string;deadline:string};beats:{id:string;time:string;heading:string;plot:string;dialogue?:{speaker:string;line:string}[]}[];proseStatus:string;};
type RinkuScene08={title:string;status:string;date:string;time:{start:string;end:string;certainty:string};purpose:string;beats:{id:string;time:string;heading:string;plot:string}[];knowledgeLocks:{ankitaKnows:string;readerOnly:string;rajeev:string;rinku:string};wardrobe:{arrival:string;homeChange:string;firstRinkuView:string};nextEpisode:{focus:string;firstLook:string;date:string}};
type ShivaniSceneReference={schemaVersion:number;id:string;title:string;status:string;source:{googleDocId:string;url:string;title:string;capturedDate:string;capturedFromRevision:string;readBeforeWriting:string};storyDate:string;sceneStart:string;sceneEnd:string;cast:string[];timeline:string[];femaleReferences:{name:string;status:string;heading:string;content:string}[];editorial:{wordForWordNote:string;sourceProtection:string;ritika:string;historicalTime:string}};
type ShivaniNewBeat={id:string;time:string;title:string;cast:string[];plot:string;dialogue?:{speaker:string;line:string}[];reaction?:string;narratorDirection?:string;knowledge?:{readerOnly:boolean;shivaniAware:boolean;actualContact:boolean}};
type ShivaniSocietyReturn={title:string;status:string;proseStatus:string;date:string;time:{start:string;end:string};priorFoundation:string[];beats:ShivaniNewBeat[];restrictions:string[]};
type ShivaniNightPlan={title:string;status:string;proseStatus:string;date:string;episodePlacement:string;time:{firstHomeBeat:string;nightEncounter:string};beats:ShivaniNewBeat[];continuityLocks:string[];relationshipSetup:{shivaniOm:{established:string;proposedNewCharacterAngle:string;fantasyPresentation:string;tone:string};deepuShivani:{established:string;proposedTonight:string};deepuKavya:{new:string;agency:string};twinsKavya:{new:string;distinctVoices:string}};futureArc:Record<string,string>};
type ShivaniStaffroomPlot={scene:string;status:string;date:string;start:string;end:string;location:string;purpose:string;wardrobeStatus:string;wardrobe:{name:string;age:number;role:string;outfit:string;narratorView:string;referenceColor:string}[];imageReference:{origin:string;status:string;use:string};beats:{id:string;time:string;title:string;focus:string;action:string;narrator?:string;dialogue?:{speaker:string;line:string}[];seed?:string;note?:string}[];plotLocks:string[];};
type ShivaniCastLock={title:string;status:string;officeTwinsStudentCore:{id:string;name:string;age:number}[];officeChotu:{name:string;age:number;role:string};societyChotu:{name:string;age:number;role:string};juniorFacultyExcluded:{name:string;age:number}[];futureOnly:{name:string;age:number;note:string};biologicalTwinsNote:string;episode02End:string;nextWork:string;prologueBaselineReference?:{source:string;sourceScene:string;status:string;establishedPreviously:string[];episode03Difference:string}};
type RohitFirstShow={title:string;status:string;date:string;wardrobe:{jan02:string;accidental:string;deliberate:string};encounters:{id:string;title:string;phase:string;beats:{id:string;name:string;plot:string}[]}[];validation:{jan1IntroductionOnly:boolean;jan1UpperButtonsClosed:boolean;jan2AccidentFirst:boolean;jan2DeliberateFirstShowLaterSameDay:boolean;exactJan2Clock:string;jan2Wardrobe:string};};
export default function Planning({lead,initialScene}:{lead:string;initialScene?:string|null}){
 const active=leadOrder.includes(lead)?lead:'meenakshi';
 
 
 
 
 
 
 
 
 const {data:meenaFuture}=useData<Plan>('episode-03-meenakshi-plan.json');
 
 
 const {data:ankitaScene03,error:ankitaScene03Error}=useData<AnkitaScene03>('episode-03-ankita-scene-03.json');
  const {data:ankitaFuturePresentation,error:ankitaFuturePresentationError}=useData<AnkitaFuturePresentation>('episode-future-ankita-private-presentation-seed.json');
 const {data:rohitIntro,error:rohitIntroError}=useData<RohitPlot>('episode-03-ankita-scene-04-rohit-intro.json');
 const {data:ankitaScene05,error:ankitaScene05Error}=useData<AnkitaScene05>('episode-03-ankita-scene-05-combined-surprise-ride.json');
 const {data:ankitaScene06,error:ankitaScene06Error}=useData<AnkitaScene06>('episode-03-ankita-scene-06-dance-draft.json');
 const {data:ankitaScene07,error:ankitaScene07Error}=useData<AnkitaScene07>('episode-03-ankita-scene-07-twins-pickup-homecoming.json');
  const {data:ankitaScene08,error:ankitaScene08Error}=useData<RinkuScene08>('episode-03-ankita-scene-08-rinku-setup.json');
 const {data:rohitFirstShow,error:rohitFirstShowError}=useData<RohitFirstShow>('ankita-rohit-jan02-future-office.json');
 const {data:writingStyle,error:writingStyleError}=useData<Plan>('flirting-style.json');
  const {data:shivaniCastLock,error:shivaniCastLockError}=useData<ShivaniCastLock>('episode-03-shivani-cast-lock.json');
 const {data:shivaniStaffroomPlot,error:shivaniStaffroomError}=useData<ShivaniStaffroomPlot>('episode-03-shivani-staffroom-scene-plot.json');
 const {data:shivaniSceneReference,error:shivaniSceneReferenceError}=useData<ShivaniSceneReference>('episode-03-shivani-scene02-master-reference.json');
 const {data:shivaniSocietyReturn,error:shivaniSocietyReturnError}=useData<ShivaniSocietyReturn>('episode-03-shivani-scene-03-society-return-plot.json');
 const {data:shivaniNightPlan,error:shivaniNightPlanError}=useData<ShivaniNightPlan>('shivani-jan01-night-next-episode-chotu-kavya-twins-om-plot.json');
 const {data:shreyaFuture}=useData<Plan>('episode-03-shreya-plan.json');
 useEffect(()=>{
  if(!initialScene)return;
  if((active==='ankita'&&['01','02','06'].includes(initialScene))||(active==='meenakshi'&&['01','02','03','04'].includes(initialScene))){openPage('reading',{episode:'03',character:active,scene:initialScene});return;}
  const id=active==='ankita'
   ?(initialScene==='01'?'ankita-ep03-a11':initialScene==='02'?'ankita-ep03-scene02':initialScene==='03'?'ankita-ep03-scene03':initialScene==='04'?'ankita-ep03-scene04-rohit':initialScene==='05'?'ankita-ep03-scene05':initialScene==='06'?'ankita-ep03-scene06':initialScene==='07'?'ankita-ep03-scene07':initialScene==='08'?'ankita-ep03-scene08':initialScene==='rohit-first-show'?'ankita-ep04-rohit-first-show':'')
   :active==='shivani'
   ?(initialScene==='cast'?'shivani-ep03-cast-lock':initialScene==='staffroom'?'shivani-ep03-staffroom-scene':initialScene==='reference'?'shivani-ep03-scene02-master-reference':initialScene==='03'?'shivani-ep03-scene03-society-return':initialScene==='night'?'shivani-jan01-night-next-episode':'')
   :active==='meenakshi'
   ?(initialScene==='01'?'ep03-meenakshi-scene-01':initialScene==='handoff'?'ep04-meenakshi-handoff':'ep03-meenakshi-scene-'+initialScene)
   :'';
  const timer=window.setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),130);
  return ()=>clearTimeout(timer);
 },[active,initialScene]);
 const leadPlans=[{lead:'ankita',file:'',plan:null},{lead:'shivani',file:'',plan:null},{lead:'taniya',file:'',plan:null},{lead:'meenakshi',file:'episode-03-meenakshi-plan.json',plan:meenaFuture},{lead:'shreya',file:'episode-03-shreya-plan.json',plan:shreyaFuture}];
 const activePlan=leadPlans.find(x=>x.lead===active);
 
 const narratorRule=writingStyle?.narratorVisualDescription as NarratorStyleRule|undefined;
  const eventFirstGuide=writingStyle?.sourceGroundedNarrativeCalibration as NarrativeCalibration|undefined;
 
 
 
 
 
 
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">Writers' room · works in progress</span><h1>Episode Planning</h1><p>Only unwritten outlines and future story plans stay here. Written story scenes live in Episode Reading.</p></header>
  <button type="button" className="button subtle planning-global-link" onClick={()=>openPage('timeline')}>Open Universal Timeline</button>
  <details className="edition-note"><summary>How approvals work</summary><p>DRAFT → DISCUSSION → PLOT LOCKED → WRITING → APPROVED → PUBLISHED. Only the author can approve or lock content.</p></details>

  <div className="reading-heading"><div><span className="eyebrow">Choose a storyline</span><h2>What happens next?</h2></div></div>
  <div className="perspective-tabs" role="group" aria-label="Choose planning character">{leadOrder.map(w=><button type="button" aria-pressed={w===active} onClick={()=>openPage('planning',{lead:w})} className={w===active?'selected':''} key={w}>{titleCase(w)}</button>)}</div>
  {active==='shivani'&&<section className="continuity-cards" id="shivani-ep03-scene02-master-reference">
    <article className="episode-plan-card">
      <span className="eyebrow">Shivani · Episode 03 · Scene 02 · master writing reference · 5:00–5:20 PM</span>
      <h2>Scene 02 — Google Doc &amp; Female-wise Beat Reference</h2>
      <p><strong>IMPORTANT — READ BEFORE WRITING:</strong> This document is the reference for Shivani Episode 03, Scene 02. When expanding this scene into prose, please read the complete document first. Follow the 5:00–5:20 PM chronological timeline for the order of events and consult each woman's female-wise beat layout for the exact established dialogue, visual description, physical moments, character reactions, and interactions. Do not delete, replace, or change an approved beat without the author's approval.</p>
      <p><strong>Source:</strong> <a href="https://docs.google.com/document/d/1nHM10B--o9fEpjX6zfSOe6Nl_p-0gTdefkYEtr8UgVk/edit" target="_blank" rel="noreferrer">Open the master Google Doc</a> · The Google Doc is the primary editable source; the reference displayed below is a read-only snapshot.</p>
      {shivaniSceneReference?<>
        <p className="muted"><strong>Scene clock:</strong> {shivaniSceneReference.sceneStart}–{shivaniSceneReference.sceneEnd} on {shivaniSceneReference.storyDate}. <strong>Cast:</strong> {shivaniSceneReference.cast.join(', ')}. This is a working reference, not approved prose.</p>
        <details className="episode-outline" id="shivani-scene02-timeline-reference" open>
          <summary><strong>Chronological Scene Timeline — 5:00–5:20 PM</strong></summary>
          <div className="beat-list">{shivaniSceneReference.timeline.filter(t=>/^17:/.test(t)).map((t,i)=><div className="beat-item" key={i}><p>{t}</p></div>)}</div>
          <p className="muted">{shivaniSceneReference.editorial.historicalTime}</p>
        </details>
        <h3>Female-wise original beat layouts — review before prose</h3>
        <p className="muted">The five reference sections below preserve the source beat wording. The timeline determines their interleaved reading order, not five separate female scenes.</p>
        {shivaniSceneReference.femaleReferences.map(ref=><details className="episode-outline" id={'shivani-scene02-female-'+ref.name.toLowerCase()} key={ref.name}>
          <summary><strong>{ref.name}</strong> — {ref.status==='AUTHOR_APPROVED'?'Author-approved beats':ref.status.includes('PROVISIONAL')?'Latest discussed version · approval pending':'Saved beat reference'}</summary>
          <p className="muted">{ref.heading}</p>
          <pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',fontFamily:'inherit',fontSize:'inherit',lineHeight:1.6}}>{ref.content}</pre>
        </details>)}
        <p className="muted">{shivaniSceneReference.editorial.ritika}</p>
        <p className="muted">{shivaniSceneReference.editorial.wordForWordNote}</p>
      </>:<p role="status">{shivaniSceneReferenceError||'Loading the complete Google Doc reference snapshot…'}</p>}
    </article>
   </section>}
  {active==='meenakshi'&&<section className="continuity-cards" id="meenakshi-ep03-prose-moved"><article className="episode-plan-card"><span className="eyebrow">Episode 03 · Story text moved to Episode Reading</span><h2>Meenakshi · Written scenes</h2><p>Scene 01 approved; Scene 02 complete F01–F19 source with mixed approvals; Scene 03 author T01–T07 text under review; Scene 04 B01–B05 full prose draft. Read all four in the same Episode Reading UI; source approvals are retained.</p><div className="hero-actions">{['01','02','03','04'].map(id=><button type="button" className="button subtle" key={id} onClick={()=>openPage('reading',{episode:'03',character:'meenakshi',scene:id})}>Read Scene {id} →</button>)}</div></article><article className="episode-plan-card" id="ep04-meenakshi-handoff"><span className="eyebrow">Still planning · future continuation</span><h2>Unwritten Meenakshi plans</h2><p>Jan 2 future outline, the 14:15 Naveen handoff and late-night Harish–Sunil seed remain separate planning references. No new prose was invented.</p></article></section>}
  {active==='ankita'&&<section className="continuity-cards" id="ankita-ep03-first-block">
    <article className="episode-plan-card" id="ankita-ep03-a11"><span className="eyebrow">Ankita · EP03 · Scenes 01–02 · prose now in Reading</span><h2>Rajeev's Parcel Call &amp; The Five-Person Stamina Challenge</h2><p>Scene 01 contains the author-completed narrative. Scene 02 preserves author-original full prose with additive framing, pending review.</p><div className="hero-actions"><button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'03',character:'ankita',scene:'01'})}>Read Scene 01 →</button><button type="button" className="button subtle" onClick={()=>openPage('reading',{episode:'03',character:'ankita',scene:'02'})}>Read Scene 02 →</button></div></article>
     <article className="episode-plan-card" id="ankita-ep03-scene03"><span className="eyebrow">Ankita · EP03 · Scene 03 · 1 Jan 2026 · Writer plot for review</span>
      <h2>{ankitaScene03?.title||'The Private Briefing — Ankita’s Beauty Test'}</h2>
      <p>13:45–15:10 · Cyber City IT office · Ankita, Mr. Bhalla (58), Sandeep Khurana (38); Aishwarya at the exit cliff</p>
      <p className="muted">Beats 1–3 are in Reading: Beat 1 approved, Beat 2 author-verbatim, Beat 3 confrontation cleaned per author. The former 15:00–15:20 personal presentation is parked for future only.</p>
      <button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'03',character:'ankita',scene:'03'})}>Read Scene 03 · Beats 1–3 →</button>
      <figure className="ankita-scene03-image" style={{margin:'1rem 0'}}>
       <img src={assetUrl('assets/ankita-ep03-scene03-private-briefing.webp')} alt="Ankita presenting the successful New Year production release in a cream embroidered kurti and beige blazer to Mr. Bhalla and Sandeep" loading="lazy" style={{width:'min(100%, 440px)',height:'auto',borderRadius:'12px',display:'block'}}/>
       <figcaption className="muted">Scene 03 generated visual reference · office presentation · illustration, not a face-canon photograph.</figcaption>
      </figure>
      {ankitaScene03&&<><div className="beat-list">{ankitaScene03.beats.map(q=><div className="beat-item" key={q.id}><span className="eyebrow">{q.time}</span><h3>{q.name}</h3><p>{q.plot}</p>{q.suggestedCliffDialogue&&<p><strong>Cliff:</strong> {q.suggestedCliffDialogue}</p>}</div>)}</div>
      <details className="episode-outline"><summary>Author instruction validation · 4 active plot beats</summary><div className="beat-list">{ankitaScene03.validation.map(v=><div className="beat-item" key={v.beat}><p><strong>{v.beat} · {v.status}:</strong> {v.requirement}</p></div>)}</div></details>
      <p className="muted">{ankitaScene03.status.replace(/_/g,' ')} · {ankitaScene03.proseStatus.replace(/_/g,' ')}. Next: {ankitaScene03.nextSceneSeed}</p></>}
      {ankitaScene03Error&&<p role="alert">Ankita Scene 03 plot source unavailable: {ankitaScene03Error}</p>}
    </article>

    <article className="episode-plan-card" id="ankita-future-personal-presentation">
      <span className="eyebrow">Ankita · Future setup only · Not in Episode 03</span>
      <h2>Parked idea: Ankita’s personal presentation</h2>
      <p>The original twenty-minute self-presentation concept was removed from 1 January’s briefing. It is preserved as a possible future storyline, <strong>not</strong> an event that occurred and not an approved scene.</p>
      {ankitaFuturePresentation&&<><p><strong>Future premise:</strong> {ankitaFuturePresentation.planning.idea}</p><p className="muted">Unscheduled · No date or episode assigned · Dialogue and prose to be decided later.</p>
      <details className="episode-outline"><summary>Original author concept — preserved for future review</summary><p>{ankitaFuturePresentation.originalAuthorPromptVerbatim}</p><p><strong>Former plot:</strong> {ankitaFuturePresentation.originalPlotBeatVerbatim.plot}</p></details></>}
      {ankitaFuturePresentationError&&<p role="alert">Future Ankita presentation seed not loaded: {ankitaFuturePresentationError}</p>}
    </article>
    <article className="episode-plan-card" id="ankita-ep03-scene04-rohit"><span className="eyebrow">Ankita · EP03 · 1 Jan 2026 · Scene 04 · User-finalized INTRO only</span>
      <h2>{rohitIntro?.title||'Office Chotu — Rohit Babu Introduction'}</h2>
      <p>After 15:10 (proposed) · Cyber City IT office · Ankita and Rohit (22)</p>
      <p className="muted">Rohit Babu’s introduction prose is in Episode 03 Reading as a user-selected draft. The seven-point plot below stays as continuity reference.</p>
      <button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'03',character:'ankita',scene:'04'})}>Read Scene 04 · Rohit Babu intro →</button>
      {rohitIntro&&<><p><strong>Outfit continuity:</strong> {rohitIntro.costumeContinuity?.scene04Entry}</p>
      <div className="beat-list">{rohitIntro.beats.map(q=><div className="beat-item" key={q.id}><h3>{q.name}</h3><p>{q.plot}</p>{q.dialogue?.map((d,i)=><p key={i}><strong>{d.speaker}:</strong> {d.line}</p>)}</div>)}</div>
      <p className="muted">INTRO only — no accidental glance or deliberate first show on Jan 1. {rohitIntro.status.replace(/_/g,' ')}</p></>}
      {rohitIntroError&&<p role="alert">Rohit introduction not loaded: {rohitIntroError}</p>}
    </article>
    <article className="episode-plan-card" id="ankita-ep03-scene05">
      <span className="eyebrow">Ankita · EP03 · Scene 05 · 1 Jan 2026 · Original prose in Reading, approved plot below</span>
      <p className="muted">Five author-supplied prose beats are now available in Reading. No text rewritten; one venue-arrival sentence added at 16:40. Four original outline beats remain below for reference.</p>
      <button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'03',character:'ankita',scene:'05'})}>Read Scene 05 · Office to car →</button>
      <h2>{ankitaScene05?.title||'Three Against Two — The Surprise Ride'}</h2>
      <p>Approx. 16:00–16:40 · Office exit → Reyansh's car → nearby surprise venue. Two earlier proposed scenes are merged here.</p>
      {ankitaScene05&&<><p><strong>Car:</strong> {ankitaScene05.continuity.vehicle}</p>
        <p><strong>Seating:</strong> Reyansh drives, Aishwarya front; Vivan – Ankita – Sana in the rear. Ankita must be home by 18:00.</p>
        <div className="beat-list">{ankitaScene05.beats.map(q=><div className="beat-item" key={q.id}><h3>{q.heading}</h3><p>{q.plot}</p>{q.dialogue?.map((d,i)=><p key={i}><strong>{d.speaker}:</strong> {d.line}</p>)}</div>)}</div>
        <p className="muted">Party venue name not yet approved. No dinner; no new outfit changes. {ankitaScene05.status.replace(/_/g,' ')} · {ankitaScene05.proseStatus.replace(/_/g,' ')}.</p></>}
      {ankitaScene05Error&&<p role="alert">Scene 05 plot unavailable: {ankitaScene05Error}</p>}
    </article>
    <article className="episode-plan-card" id="ankita-ep03-scene06">
      <span className="eyebrow">Ankita · EP03 · Scene 06 · 1 Jan 2026 · Author-directed prose DRAFT · approval pending</span>
      <h2>{ankitaScene06?.title||'The Stamina Challenge — The Five-Person Dance'}</h2>
      <p>Approx. 16:40–17:20 · Private dance floor, after Scene 05 arrival · Only Ankita, Sana, Aishwarya, Vivan and Reyansh with venue service staff in the background.</p>
      {ankitaScene06&&<>
        <p className="muted">Working prose for author review; not canon-approved or final published episode. {ankitaScene06.setting.otherPeople}</p>
        <button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'03',character:'ankita',scene:'06'})}>Read Scene 06 complete prose →</button>
        <details className="episode-outline"><summary>Dance choreography · {ankitaScene06.choreography.length} ordered movements</summary><div className="beat-list">{ankitaScene06.choreography.map(q=><div className="beat-item" key={q.id}><h3>{q.formation}</h3><p><strong>Participants:</strong> {q.participants}</p><p><strong>Movement:</strong> {q.contact}</p><p><strong>Reaction:</strong> {q.reaction}</p></div>)}</div></details>
        <p className="muted"><strong>Cut:</strong> 17:20 after dance. Exit, Ankita home drop and the remaining four's next party belong to Scene 07 and are not written here. {ankitaScene06.status.replace(/_/g,' ')}.</p>
      </>}
      {ankitaScene06Error&&<p role="alert">Ankita Scene 06 working draft not loaded: {ankitaScene06Error}</p>}
    </article>
    <article className="episode-plan-card" id="ankita-ep03-scene07">
      <span className="eyebrow">Ankita · EP03 · Scene 07 · 1 Jan 2026 · User-directed exit plot · prose pending</span>
      <h2>{ankitaScene07?.title||'Two Minutes, Two Twins — The Ride Home'}</h2>
      <p>~17:20–17:50 · Venue exit → Karan and Aman on separate two-wheelers → Gopal's silent glance → Home. No Reyansh/Vivan drop-off.</p>
      {ankitaScene07&&<>
       <p><strong>Ride:</strong> {ankitaScene07.continuity.carProposition}</p>
       <div className="beat-list">{ankitaScene07.beats.map(q=><div className="beat-item" key={q.id}><span className="eyebrow">{q.time}</span><h3>{q.heading}</h3><p>{q.plot}</p>{q.dialogue?.map((d,i)=><p key={i}><strong>{d.speaker}:</strong> {d.line}</p>)}</div>)}</div>
       <p className="muted">Plot only. Gopal has no conversation; Mahendra and other elders do not meet Ankita. Rajeev is away and keeps her parcel. Next: 18:10–18:25 fresh-up and Rinku setup. {ankitaScene07.status.replace(/_/g,' ')}.</p>
      </>}
      {ankitaScene07Error&&<p role="alert">Scene07 source unavailable: {ankitaScene07Error}</p>}
    </article>
    <article className="episode-plan-card" id="ankita-ep03-scene08">
       <span className="eyebrow">Ankita · EP03 · Scene 08 · 1 Jan 2026 · 18:10–18:25 · Rinku setup plot, no prose</span>
       <h2>{ankitaScene08?.title||'The Quiet Reset — Rinku at the Door'}</h2>
       <p>Fresh-up → known/reader-only day recap → familiar Rinku's maintenance request → doorbell CUT. Rajeev is away; no parcel handover or discovery.</p>
       {ankitaScene08&&<>
         <div className="beat-list">{ankitaScene08.beats.map(q=><div className="beat-item" key={q.id}><span className="eyebrow">{q.time}</span><h3>{q.heading}</h3><p>{q.plot}</p></div>)}</div>
         <details className="episode-outline"><summary>Knowledge and wardrobe locks</summary>
           <p><strong>Ankita knows:</strong> {ankitaScene08.knowledgeLocks.ankitaKnows}</p>
           <p><strong>Reader-only:</strong> {ankitaScene08.knowledgeLocks.readerOnly}</p>
           <p><strong>Rajeev:</strong> {ankitaScene08.knowledgeLocks.rajeev}</p>
           <p><strong>Rinku familiarity:</strong> {ankitaScene08.knowledgeLocks.rinku}</p>
           <p><strong>Homewear:</strong> {ankitaScene08.wardrobe.homeChange}</p>
           <p><strong>Next episode first look only:</strong> {ankitaScene08.wardrobe.firstRinkuView}</p>
         </details>
         <p className="muted">Last Ankita Jan 1 EP03 scene. No Gopal/Mahendra follow-up, family dinner or inventory. {ankitaScene08.status.replace(/_/g,' ')}.</p>
       </>}
       {ankitaScene08Error&&<p role="alert">Rinku setup source unavailable: {ankitaScene08Error}</p>}
     </article>
     <article className="episode-plan-card" id="ankita-ep04-rohit-first-show"><span className="eyebrow">Ankita · Future Jan 2 office plot · episode number to be assigned after Rinku</span>
      <h2>{rohitFirstShow?.title||'Rohit Babu — The Accidental Look and First Show'}</h2>
      <p>2 January · First encounter in morning, second later on the same office day · Exact clock and wardrobe color provisional</p>
      {rohitFirstShow&&<><details className="episode-outline"><summary>Next-day outfit and visual triggers (proposed)</summary><p>{rohitFirstShow.wardrobe.jan02}</p><p><strong>Accidental:</strong> {rohitFirstShow.wardrobe.accidental}</p><p><strong>Deliberate:</strong> {rohitFirstShow.wardrobe.deliberate}</p></details>
      {rohitFirstShow.encounters.map(enc=><div key={enc.id} className="beat-list"><h3>{enc.title}</h3>{enc.beats.map(q=><div className="beat-item" key={q.id}><span className="eyebrow">{q.id} · {enc.phase}</span><h3>{q.name}</h3><p>{q.plot}</p></div>)}</div>)}
      <p className="muted">{rohitFirstShow.status.replace(/_/g,' ')} · Clock and next-day outfit need separate author approval; no prose written.</p></>}
      {rohitFirstShowError&&<p role="alert">Rohit Jan 2 first-show plot not loaded: {rohitFirstShowError}</p>}
    </article>
  </section>}
  {active==='shivani'&&<section className="continuity-cards" id="shivani-ep03-cast-lock">
    <article className="episode-plan-card">
      <span className="eyebrow">Shivani · Episode 03 · Character groups locked · Staffroom scene proposed</span>
      <h2>Office Twins (people having same image) — four college students</h2>
      <p className="source-note"><strong>UI terminology:</strong> “Twins (people having same image)” is the author's visual/story grouping label. It does NOT, by itself, establish a biological or family relationship. Harsh and Laksh are separately documented as brothers; Nandini and Ritika are close peers, not sisters.</p>
      <p className="source-note"><strong>Society Twins (people having same image) — proposed Shivani pairing:</strong> Ayaan and Armaan, both 23, are society event/printing helpers. This is the proposed society duo for Shivani's next home-return discussion; do not substitute Karan and Aman, who are already committed to Ankita's 5:20–5:50 PM Scene 07. Ayaan and Armaan have no approved biological-twin relationship or new Shivani encounter yet.</p>
      {shivaniCastLock?<>
        <p><strong>Core:</strong> {shivaniCastLock.officeTwinsStudentCore.map(c=>c.name+' ('+c.age+')').join(' · ')}.</p>
        <p><strong>Office Chotu:</strong> {shivaniCastLock.officeChotu.name} ({shivaniCastLock.officeChotu.age}) — college AV assistant. <strong>Society Chotu:</strong> {shivaniCastLock.societyChotu.name} ({shivaniCastLock.societyChotu.age}) — society helper.</p>
        <p><strong>Junior teachers, NOT Office Twins:</strong> {shivaniCastLock.juniorFacultyExcluded.map(c=>c.name+' ('+c.age+')').join(' · ')}. Pooja and Kriti remain faculty.</p>
        <p><strong>Future occasional appearance only:</strong> {shivaniCastLock.futureOnly.name}; no cultural committee role and excluded from the four-member group.</p>
        {shivaniCastLock.prologueBaselineReference&&<details className="episode-outline" id="shivani-ep03-prior-contact-baseline">
          <summary>Prologue S07 · Physical familiarity ALREADY established (not Episode 03 escalation)</summary>
          <p>The following ordinary hand/forearm/shoulder/elbow contacts belong to earlier campus familiarity, documented in the Episode 01 Prologue.</p>
          <div className="beat-list">{shivaniCastLock.prologueBaselineReference.establishedPreviously.map((q,i)=><div className="beat-item" key={i}><p>{q}</p></div>)}</div>
          <p className="muted">{shivaniCastLock.prologueBaselineReference.episode03Difference}</p>
        </details>}
        <p className="muted"><strong>Separate kinship canon:</strong> {shivaniCastLock.biologicalTwinsNote} {shivaniCastLock.episode02End} The “Twins” UI grouping itself makes no biological claim. This locks cast only, not a Scene 01 or written encounter.</p>
      </>:<p role="alert">Shivani cast lock not loaded: {shivaniCastLockError||'Loading…'}</p>}
    </article>
   </section>}
   {active==='shivani'&&<section className="continuity-cards" id="shivani-ep03-scene03-society-return">
    <article className="episode-plan-card">
      <span className="eyebrow">Shivani · Episode 03 · Scene 03 · Jan 1, 2026 · 5:20–5:57 PM · plot only</span>
      <h2>Society Return — Mahendra Suri, Ayaan &amp; Armaan</h2>
      <p><strong>Reference before prose:</strong> Read the complete Scene 02 Google Doc and the original Episode 01–02 source scene records before expanding this plot. Do not overwrite the existing Scene 02 beat bank.</p>
      <p className="source-note"><strong>Continuity:</strong> Shivani returns on the same scooty and in her college outfit. Society chairman Mahendra openly pursues personal attention. Ayaan and Armaan are the established event-printing pair, not newly introduced strangers or confirmed biological twins. Karan and Aman remain occupied by Ankita's Scene 07 until about 5:50 PM.</p>
      {shivaniSocietyReturn?<>
        <p><strong>Time:</strong> {shivaniSocietyReturn.time.start}–{shivaniSocietyReturn.time.end} · <strong>Status:</strong> Working plot · NOT approved prose</p>
        <details className="episode-outline"><summary>Established familiarity and source continuity</summary><div className="beat-list">{shivaniSocietyReturn.priorFoundation.map((line,i)=><div className="beat-item" key={i}><p>{line}</p></div>)}</div></details>
        <div className="beat-list">{shivaniSocietyReturn.beats.map(b=><details className="episode-outline" key={b.id}>
          <summary><strong>{b.id} · {b.time} · {b.title}</strong></summary>
          <p><strong>Characters:</strong> {b.cast.join(' · ')}</p><p>{b.plot}</p>
          {b.dialogue?.map((d,i)=><p className="dialogue" key={i}><strong>{d.speaker}:</strong> {d.line}</p>)}
          {b.reaction&&<p><strong>Immediate reaction:</strong> {b.reaction}</p>}
        </details>)}</div>
        <p className="muted">{shivaniSocietyReturn.status.replace(/_/g,' ')} · plot only; no prose published.</p>
      </>:<p role="status">{shivaniSocietyReturnError||'Loading society return plot…'}</p>}
    </article>
   </section>}
   {active==='shivani'&&<section className="continuity-cards" id="shivani-jan01-night-next-episode">
    <article className="episode-plan-card">
      <span className="eyebrow">Shivani · same Jan 1 night · next Shivani episode · working plot, not prose</span>
      <h2>Om's Private Reveal &amp; the Kavya–Deepu–Karan–Aman Romantic Setup</h2>
      <p><strong>Time locks:</strong> Om home setup around 6:35–6:46 PM; outdoor adult ensemble 7:05–7:23 PM. Karan–Aman return from Ankita's ride by approximately 5:50 PM; Ankita's private Rinku doorbell cut remains at 6:25 PM.</p>
      {shivaniNightPlan?<>
        <p className="source-note"><strong>Character boundary:</strong> Om is a socially treated household uncle, not Shivani's actual father-in-law. His fantasy is a one-sided reader-only private image, not a real encounter or her consent. Society Chotu = Deepu (22), not college Sunny or Ankita's Rinku.</p>
        <details className="episode-outline" open><summary><strong>Relationship history — Om × Shivani</strong></summary><p>{shivaniNightPlan.relationshipSetup.shivaniOm.established}</p><p>{shivaniNightPlan.relationshipSetup.shivaniOm.proposedNewCharacterAngle}</p><p><strong>Reader-only fantasy:</strong> {shivaniNightPlan.relationshipSetup.shivaniOm.fantasyPresentation}</p></details>
        <details className="episode-outline"><summary><strong>Relationship history — Deepu, Shivani and Kavya</strong></summary><p>{shivaniNightPlan.relationshipSetup.deepuShivani.established}</p><p>{shivaniNightPlan.relationshipSetup.deepuShivani.proposedTonight}</p><p><strong>First spark:</strong> {shivaniNightPlan.relationshipSetup.deepuKavya.new}</p><p>{shivaniNightPlan.relationshipSetup.deepuKavya.agency}</p></details>
        <details className="episode-outline"><summary><strong>Karan–Aman × Kavya — new three-way interest</strong></summary><p>{shivaniNightPlan.relationshipSetup.twinsKavya.new}</p><p>{shivaniNightPlan.relationshipSetup.twinsKavya.distinctVoices}</p></details>
        <div className="beat-list">{shivaniNightPlan.beats.map(b=><details className="episode-outline" key={b.id}>
          <summary><strong>{b.id} · {b.time} · {b.title}</strong></summary><p><strong>Characters:</strong> {b.cast.join(' · ')}</p><p>{b.plot}</p>
          {b.dialogue?.map((d,i)=><p className="dialogue" key={i}><strong>{d.speaker}:</strong> {d.line}</p>)}
          {b.reaction&&<p><strong>Immediate reaction:</strong> {b.reaction}</p>}
          {b.narratorDirection&&<p><em>Narrator direction:</em> {b.narratorDirection}</p>}
        </details>)}</div>
        <details className="episode-outline"><summary>Future relationship threads and continuity locks</summary>
         <div className="beat-list">{Object.entries(shivaniNightPlan.futureArc).map(([k,v])=><div className="beat-item" key={k}><strong>{titleCase(k)}</strong><p>{v}</p></div>)}</div>
         <div className="beat-list">{shivaniNightPlan.continuityLocks.map((v,i)=><div className="beat-item" key={i}><p>{v}</p></div>)}</div>
        </details>
        <p className="muted">Working author-directed outline saved for the next Shivani episode, same calendar date. No romance, physical action or fantasy is approved as finished prose.</p>
      </>:<p role="status">{shivaniNightPlanError||'Loading the Chotu, Kavya, twins and Om night plot…'}</p>}
    </article>
   </section>}
   {active==='shivani'&&<section className="continuity-cards" id="shivani-ep03-staffroom-scene">
    <article className="episode-plan-card">
      <span className="eyebrow">Archived earlier 2:10–2:35 PM working outline · superseded by the 5:00–5:20 PM master reference above</span>
      <p><strong>Historical only:</strong> This earlier draft is retained for audit, not as the current scene order. Read the Google Doc and the female-wise master reference above before writing any Scene 02 prose.</p>
      <h2>{shivaniStaffroomPlot?.scene||'The Staffroom — The Candid Frame'} — archived source draft</h2>
      {shivaniStaffroomPlot?<>
        <p><strong>Story intent:</strong> {shivaniStaffroomPlot.purpose}</p>
        <p><strong>Place:</strong> {shivaniStaffroomPlot.location} · <strong>Cast:</strong> Shivani, Pooja, Kriti, Nandini, Ritika, Harsh, Laksh, Arjun.</p>
        <details className="episode-outline" id="shivani-staffroom-wardrobe" open>
         <summary>Five female outfit references · proposed wardrobe, separate from locked canon</summary>
         <div className="beat-list">{shivaniStaffroomPlot.wardrobe.map(w=><div className="beat-item" key={w.name}><h3>{w.name} · {w.role}</h3><p><strong>Clothes:</strong> {w.outfit}</p><p><strong>Narrator visual:</strong> {w.narratorView}</p></div>)}</div>
         <p className="muted">{shivaniStaffroomPlot.imageReference.use} Five-panel visual reference was supplied in the companion ChatGPT conversation, not added to this GitHub asset library.</p>
        </details>
        <div className="beat-list">{shivaniStaffroomPlot.beats.map(b=><details className="episode-outline" key={b.id} id={'shivani-staffroom-'+b.id} open={b.id==='SR11'?true:undefined}><summary><strong>{b.id} · {b.time} · {b.title}</strong></summary><p><strong>Focus:</strong> {b.focus}</p><p>{b.action}</p>{b.narrator&&<p><em>Narrator:</em> {b.narrator}</p>}{b.dialogue?.map((d,i)=><p key={i} className="dialogue"><strong>{d.speaker}:</strong> {d.line}</p>)}{b.seed&&<p><strong>Future seed:</strong> {b.seed}</p>}{b.note&&<p className="muted">{b.note}</p>}</details>)}</div>
        <p className="muted">Status: {shivaniStaffroomPlot.status.replace(/_/g,' ')}. No episode prose is published by this plan.</p>
      </>:<p role="status">{shivaniStaffroomError||'Loading staffroom scene plot…'}</p>}
    </article>
   </section>}
   <section className="planning-panel">
   <article className="episode-plan-card" id="society-wives-event-first-style">
     <span className="eyebrow">Global writer's guide · Dhika EP01–EP03 source study · 16 Nov 2026 · Style only, not scene canon</span>
     <h2>{eventFirstGuide?.title||'Event-first writing: small encounter, meaningful impact'}</h2>
     <p><strong>New priority:</strong> A character's history may be established in one sentence; an unexpected event can occur without a compulsory progression of minor hand/shoulder contacts. Immediate reaction matters more than an editorial explanation. Double-meaning banter is optional, not a substitute for events.</p>
     {eventFirstGuide?<>
       <p className="muted">{eventFirstGuide.sourceScope}</p>
       <details className="episode-outline">
         <summary>Source evidence — EP01–EP06 comparison ({eventFirstGuide.sourceObservations.length} findings)</summary>
         <div className="beat-list">{eventFirstGuide.sourceObservations.map((v,i)=><div className="beat-item" key={i}><p>{v}</p></div>)}</div>
       </details>
       <details className="episode-outline" open>
         <summary>Corrected writing decisions ({eventFirstGuide.principles.length})</summary>
         <div className="beat-list">{eventFirstGuide.principles.map((v,i)=><div className="beat-item" key={i}><p>{v}</p></div>)}</div>
       </details>
       <details className="episode-outline">
         <summary>Previous mistakes — what will NOT be repeated ({eventFirstGuide.diagnosis.length})</summary>
         <div className="beat-list">{eventFirstGuide.diagnosis.map((v,i)=><div className="beat-item" key={i}><h3>{v.fault}</h3><p>{v.correction}</p></div>)}</div>
       </details>
       <details className="episode-outline">
         <summary>Specific prohibitions ({eventFirstGuide.prohibitions.length})</summary>
         <div className="beat-list">{eventFirstGuide.prohibitions.map((v,i)=><div className="beat-item" key={i}><p>{v}</p></div>)}</div>
       </details>
       <p><strong>Next plot suggestions:</strong> {eventFirstGuide.plotSuggestionFormat}</p>
       <p><strong>Prose:</strong> {eventFirstGuide.proseStandard}</p>
       <p className="muted">Full source study: Society-Wives/WRITING-STYLE-DHIKA-EP01-EP03-RECALIBRATION.md (GitHub). The guide is reference material, not published scene prose.</p>
     </>:<p role="status">Event-first writing guide loading…</p>}
   </article>
   <details className="episode-outline" id="society-wives-author-narrator-instructions"><summary>Author writing instructions · visual descriptions &amp; flirting style</summary>
    <p><strong>Narrator image, not a character's spoken line.</strong> Describe adult female characters using distinct body-shape metaphors/similes, walking gait, stance, silhouette, outfit fit, fabric movement and turns only when grounded in their wardrobe and scene.</p>
    <p><strong>Separate:</strong> narrator visual description · observer's glance · spoken teasing · woman's own response. Never silently omit an author-requested beat or invent new body canon.</p>
    {narratorRule?<><p><strong>Reference technique:</strong> {narratorRule.origin}</p><div className="beat-list">{narratorRule.methods.map((method,i)=><div key={i} className="beat-item"><p>{method}</p></div>)}</div><p><strong>Example vocabulary (not established body shapes):</strong> {narratorRule.examplePhrases.join(' · ')}</p><p className="muted">{narratorRule.status.replace(/_/g,' ')}</p></>:<p className="muted">{writingStyleError||'Writer style notes loading…'}</p>}
   </details>
   <div className="split"><div><span className="eyebrow">Working story lane</span><h2>{titleCase(active)}</h2><p>{active==='ankita'?'Ankita’s Scenes 01–06 (including Scene 05’s five-beat car ride and Scene 06 draft) are in Episode Reading. Scene 03’s former twenty-minute presentation is parked for future; Scene 04’s seven-point Rohit outline remains here as continuity reference. Unwritten Scenes 07–08 and the separate 2 January Rohit plan remain in Planning. Earlier competing home and parcel follow-up outlines were removed; Scene 08 Rinku setup is the final Ankita Jan 1 entry.':activePlan?.plan?.title||'No separate Episode 03 working draft is available here yet.'}</p></div></div>
   {active==='taniya'&&<p className="source-note">Soniya's independent scenes belong to Taniya's continuity lane. Their existing joint plan is preserved; those scenes have not been promoted to finished prose.</p>}
   {active==='shivani'&&<p className="source-note">Shivani's Episode 03 group labels follow “Twins (people having same image)” — a visual/story shorthand, never an automatic biological relationship. College four: Harsh, Laksh, Nandini, Ritika. Proposed society duo: Ayaan, Armaan. Karan and Aman are occupied by Ankita's 5:20–5:50 PM scene. Separate Office/Society Chotu roles and junior teachers remain unchanged. The staffroom master reference above remains the source for writing; no new home-return plot prose is approved.</p>}
   {activePlan?.plan&&<><p><strong>Original status:</strong> {str(activePlan.plan.status)||'REVIEW'}</p>{active==='meenakshi'&&<p><strong>Older separate outline — 2 January 2026.</strong> This is not part of 1 January's Scene 01–03 sequence. Senior Review M08 stays on Jan 2.</p>}
    {active==='shreya'&&<p><strong>Date:</strong> 3 January 2026. These events were rescheduled here from 1 January. They remain writing-pending, not cancelled.</p>}
    {active==='ankita'&&<p><strong>Date:</strong> Original draft date requires review; it has not been silently assigned to the Episode 03 canonical timeline.</p>}
    <details><summary>Full planning notes</summary><pre>{JSON.stringify(activePlan.plan,null,2)}</pre></details></>}
  </section>
 </main>
}
