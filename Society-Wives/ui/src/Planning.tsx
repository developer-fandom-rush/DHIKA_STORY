import { useEffect } from 'react';
import { leadOrder, Plan, openPage, titleCase, useData } from './lib';
const str=(v:unknown)=>typeof v==='string'?v:'';
type PublishedLine={time?:string|null;kind:'narration'|'dialogue'|'cut';speaker?:string;text:string};
type AnkitaStage={id:string;title:string;start:string;end:string;approval:string;sequence?:{id:string;time?:string;summary:string;dialogue?:{speaker:string;line:string}[];storyIntent?:string;editorFlags?:string[]}[];beats?:{id:string;summary:string}[];openChoices?:string[];};
type NarratorStyleRule={status:string;origin:string;appliesTo:string;methods:string[];examplePhrases:string[];useInstructions:string[];sceneTemplate:string[];};
export default function Planning({lead,initialScene}:{lead:string;initialScene?:string|null}){
 const active=leadOrder.includes(lead)?lead:'meenakshi';
 const {data:current,error:currentError}=useData<Plan>('episode-03-meenakshi-scene-01.json');
 const {data:farmhouse,error:farmhouseError}=useData<Plan>('episode-03-meenakshi-scene-02.json');
 const {data:twins,error:twinsError}=useData<Plan>('episode-03-meenakshi-scene-03-twins.json');
 const {data:bablooIntro,error:bablooIntroError}=useData<Plan>('episode-03-meenakshi-scene-04-babloo-intro.json');
 const {data:meenaFuture}=useData<Plan>('episode-03-meenakshi-plan.json');
 const {data:ankitaFuture}=useData<Plan>('episode-03-ankita-pending.json');
 const {data:ankitaOpening,error:ankitaOpeningError}=useData<Plan>('episode-03-ankita-a11-scene-01-opening.json');
 const {data:writingStyle,error:writingStyleError}=useData<Plan>('flirting-style.json');
 const {data:shreyaFuture}=useData<Plan>('episode-03-shreya-plan.json');
 useEffect(()=>{
  if(active!=='meenakshi'||!initialScene)return;
  const id=initialScene==='01'?'ep03-meenakshi-scene-01':initialScene==='handoff'?'ep04-meenakshi-handoff':'ep03-meenakshi-scene-'+initialScene;
  const timer=window.setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),130);
  return ()=>clearTimeout(timer);
 },[active,initialScene]);
 const leadPlans=[{lead:'ankita',file:'episode-03-ankita-pending.json',plan:ankitaFuture},{lead:'shivani',file:'',plan:null},{lead:'taniya',file:'',plan:null},{lead:'meenakshi',file:'episode-03-meenakshi-plan.json',plan:meenaFuture},{lead:'shreya',file:'episode-03-shreya-plan.json',plan:shreyaFuture}];
 const activePlan=leadPlans.find(x=>x.lead===active);
 const ankitaStages=Array.isArray(ankitaOpening?.blocks)?ankitaOpening.blocks as AnkitaStage[]:[];
 const narratorRule=writingStyle?.narratorVisualDescription as NarratorStyleRule|undefined;
 const authorNotes=(twins?.authorRequirement as {exactText?:string}|undefined)?.exactText;
 const publishedProse=(Array.isArray(current?.publishedProse)?current.publishedProse:[]) as PublishedLine[];
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">Writers' room · works in progress</span><h1>Episode Planning</h1><p>Follow each character's planned scenes here. The cross-character universal timeline is a separate top-level view.</p></header>
  <button type="button" className="button subtle planning-global-link" onClick={()=>openPage('timeline')}>Open Universal Timeline</button>
  <details className="edition-note"><summary>How approvals work</summary><p>DRAFT → DISCUSSION → PLOT LOCKED → WRITING → APPROVED → PUBLISHED. Only the author can approve or lock content.</p></details>

  <div className="reading-heading"><div><span className="eyebrow">Choose a storyline</span><h2>What happens next?</h2></div></div>
  <div className="perspective-tabs" role="group" aria-label="Choose planning character">{leadOrder.map(w=><button type="button" aria-pressed={w===active} onClick={()=>openPage('planning',{lead:w})} className={w===active?'selected':''} key={w}>{titleCase(w)}</button>)}</div>
  {active==='meenakshi'&&<section className="continuity-cards"><article id="ep03-meenakshi-scene-01"><span className="eyebrow">EP 03 · Scene 01 · Author-approved &amp; published prose</span><h2>The Glance at the Corridor — Meenakshi × Naveen</h2><p>1 January 2026 · Hospital · 13:50–14:15</p><p>Meenakshi aur Naveen ki first focused on-screen conversation hai, first meeting nahi. Their workplace familiarity is already established.</p><strong>Scene cuts at 14:15 · Episode 04 continues from exactly here</strong>
   {publishedProse.length?<div className="source-scene prose-exact" aria-label="Approved Episode 03 Meenakshi scene">{publishedProse.map((line,i)=><div key={i}>{line.time&&<p className="scene-label"><strong>{line.time} PM</strong></p>}{line.kind==='dialogue'?<p className="dialogue"><strong>{line.speaker}:</strong> “{line.text}”</p>:<p className={line.kind==='cut'?'reader-end':''}>{line.text}</p>}</div>)}</div>:<p role="status">Loading approved scene text…</p>}
   {currentError&&<p role="alert">SOURCE MISSING: {currentError}</p>}
  </article>

  <article className="episode-plan-card" id="ep03-meenakshi-scene-02"><span className="eyebrow">EP 03 · Scene 02 · Approved plot direction, no finished prose</span><h2>The Farmhouse Evening</h2><p>1 January 2026 · From 17:00 · Meenakshi, Aditi, Avi and Yash</p><p>After duty the group heads to a farmhouse gathering. Dancing, conversations, photographs and a ride home unfold as separate beats. This remains a plot outline, not a published chapter.</p><strong>Return travel and finishing time are not yet verified.</strong>
   {farmhouse?.beats?.length?<details className="episode-outline"><summary>Read {farmhouse.beats.length} planned beats</summary><div className="beat-list">{farmhouse.beats.map((b,i)=><div key={b.id||i} className="beat-item"><span className="eyebrow">{str(b.phase)||b.id||'Plot beat'}</span><h3>{b.title||'Untitled beat'}</h3><p>{str(b.detail)}</p></div>)}</div></details>:<p>{farmhouseError||'Loading farmhouse outline…'}</p>}
  </article>
  <article className="episode-plan-card" id="ep03-meenakshi-scene-03"><span className="eyebrow">EP 03 · Scene 03 · Author notes and scene beats under review</span><h2>The Badminton Bet</h2><p>1 January 2026 · 18:15 proposed · Uday, Utkarsh and Meenakshi</p><p>At a badminton court about five minutes from Gulmohar Heights, the twins renew their morning banter with Meenakshi. Her original car-not-starting and return-ride proposal is preserved as author planning, not locked or finished prose.</p>
   <div className="continuity-warning" role="note"><strong>Timeline needs review:</strong> Scene 02 starts at 17:00 with farmhouse dancing, photographs and return travel. The 18:15 badminton start and 18:45 return are targets only, not confirmed travel times. The three-person bike proposal is also not a safe transport plan.</div>
   {twins?.beats?.length?<details className="episode-outline"><summary>Read {twins.beats.length} active badminton beats</summary><div className="beat-list">{twins.beats.map((b,i)=><div key={b.id||i} className="beat-item"><span className="eyebrow">{b.time||b.id||'Plot beat'}</span><h3>{b.title||'Untitled beat'}</h3><p>{str(b.action)}</p></div>)}</div></details>:<p>{twinsError||'Loading twins outline…'}</p>}
   {authorNotes&&<details className="episode-outline author-notes"><summary>Author's original requirements (verbatim, planning only)</summary><pre>{authorNotes}</pre></details>}
   <p className="muted">The Ishita doubles invitation is planned for a future scene (date pending), not cancelled. No ride outcome or accidental car interference has been promoted to canon.</p>
  </article>
  <article className="episode-plan-card" id="ep03-meenakshi-scene-04"><span className="eyebrow">EP 03 · Scene 04 · Author-approved plot, no prose</span><h2>The First Different Look — Babloo</h2>
   <p>1 January 2026 · Around 18:45–19:00 · Tower C entrance and lift lobby</p>
   <p>Babloo (23) is already Meenakshi's familiar society pharmacy pickup helper. This is their first proper personal on-page encounter, not their first-ever introduction.</p>
   {bablooIntro?<div className="babloo-intro">
     <p>{str(bablooIntro.introAndHistory)}</p>
     <div className="beat-list">{(bablooIntro.beats||[]).map((b,i)=><div className="beat-item" key={b.id||i}><span className="eyebrow">{b.id||'Plot beat'}</span><h3>{b.title||'Untitled beat'}</h3><p>{str(b.action)}</p>
       {Array.isArray(b.dialogue)&&b.dialogue.map((line,i)=><p key={i}><strong>{str(line.speaker)}:</strong> {str(line.line)}</p>)}
       {b.internal&&<p className="muted">{str(b.internal)}</p>}
     </div>)}</div>
     <p><strong>EP03 Meenakshi ending:</strong> She accepts Babloo's offer to help with her car tomorrow, and parts by the lift. EP04 car recovery is a possible continuation, not written yet.</p>
   </div>:<p>{bablooIntroError||'Loading approved Babloo outline…'}</p>}
   <p className="muted">Five-beat author-approved plot only. Timing remains provisional pending the farmhouse-to-badminton continuity review. No missing-parcel or second-doorbell plot.</p>
  </article>
    <article id="ep04-meenakshi-handoff"><span className="eyebrow">EP 04 · Reserved continuation</span><h2>Same moment, next episode</h2><p>1 January 2026 · 14:15 onwards</p><p>No continuation prose approved or written. This marker is a handoff, not a generated scene.</p><p className="muted">This continuation will appear here once its outline is written and approved.</p></article></section>}
  {active==='ankita'&&<section className="continuity-cards" id="ankita-ep03-first-block">
    <article className="episode-plan-card" id="ankita-ep03-a11"><span className="eyebrow">Ankita · EP03 · 1 Jan 2026 · User-directed plot, no prose</span><h2>A11 — Rajeev's Call &amp; Private Afterbeat</h2>
      <p>About 13:05–13:15 · Ankita at Cyber City; Rajeev at home (exact arrival/time provisional)</p>
      {ankitaStages.filter(b=>b.id==='A11').map(b=><div key={b.id} className="beat-list">{b.sequence?.map(q=><div key={q.id} className="beat-item"><span className="eyebrow">{q.time||'Time pending'}</span><h3>{q.id==='A11-CALL'?'A short parcel call':'Rajeev alone · reader-only direction'}</h3><p>{q.summary}</p>{q.dialogue?.map((line,i)=><p key={i}><strong>{line.speaker}:</strong> {line.line}</p>)}{q.storyIntent&&<p className="muted">{q.storyIntent}</p>}</div>)}</div>)}
      <p className="muted">Continuity: Rajeev has the parcel after P08. The origin of the previously used garment is unverified. Grok's full scene expansion remains unwritten; the fantasy is not Ankita's consent.</p>
    </article>
    <article className="episode-plan-card" id="ankita-ep03-scene01-opening"><span className="eyebrow">Ankita · EP03 · Scene 01 opening only · Discussion</span><h2>Vivan, Reyansh, Sana &amp; Aishwarya join Ankita</h2><p>About 13:15 · Cyber City office · Five people together</p>
      {ankitaStages.filter(b=>b.id==='SCENE01-OPENING').map(b=><div key={b.id} className="beat-list">{b.beats?.map(q=><div key={q.id} className="beat-item"><p>{q.summary}</p></div>)}</div>)}
      <p className="muted">Sana (24, QA Automation) and Aishwarya (24, HR) were proposed in the cast directory, but not previously on-page in A08. They arrive late because of evening surprise preparations; the funny late-arrival forfeit is an author-directed option. No outing route, vehicle, physical interaction or later scene has been locked.</p>
    </article>
    {ankitaOpeningError&&<p role="alert">Ankita opening plot source missing: {ankitaOpeningError}</p>}
  </section>}
  <section className="planning-panel">
   <details className="episode-outline" id="society-wives-author-narrator-instructions"><summary>Author writing instructions · visual descriptions &amp; flirting style</summary>
    <p><strong>Narrator image, not a character's spoken line.</strong> Describe adult female characters using distinct body-shape metaphors/similes, walking gait, stance, silhouette, outfit fit, fabric movement and turns only when grounded in their wardrobe and scene.</p>
    <p><strong>Separate:</strong> narrator visual description · observer's glance · spoken teasing · woman's own response. Never silently omit an author-requested beat or invent new body canon.</p>
    {narratorRule?<><p><strong>Reference technique:</strong> {narratorRule.origin}</p><div className="beat-list">{narratorRule.methods.map((method,i)=><div key={i} className="beat-item"><p>{method}</p></div>)}</div><p><strong>Example vocabulary (not established body shapes):</strong> {narratorRule.examplePhrases.join(' · ')}</p><p className="muted">{narratorRule.status.replace(/_/g,' ')}</p></>:<p className="muted">{writingStyleError||'Writer style notes loading…'}</p>}
   </details>
   <div className="split"><div><span className="eyebrow">Working story lane</span><h2>{titleCase(active)}</h2><p>{activePlan?.plan?.title||'No separate Episode 03 working draft is available here yet.'}</p></div></div>
   {active==='taniya'&&<p className="source-note">Soniya's independent scenes belong to Taniya's continuity lane. Their existing joint plan is preserved; those scenes have not been promoted to finished prose.</p>}
   {active==='shivani'&&<p className="source-note">Shivani's future planning is not independently indexed as an Episode 03 scene in the audited sources. Earlier plot notes are preserved in the story archive.</p>}
   {activePlan?.plan&&<><p><strong>Original status:</strong> {str(activePlan.plan.status)||'REVIEW'}</p>{active==='meenakshi'&&<p><strong>Older separate outline — 2 January 2026.</strong> This is not part of 1 January's Scene 01–03 sequence. Senior Review M08 stays on Jan 2.</p>}
    {active==='shreya'&&<p><strong>Date:</strong> 3 January 2026. These events were rescheduled here from 1 January. They remain writing-pending, not cancelled.</p>}
    {active==='ankita'&&<p><strong>Date:</strong> Original draft date requires review; it has not been silently assigned to the Episode 03 canonical timeline.</p>}
    <details><summary>Full planning notes</summary><pre>{JSON.stringify(activePlan.plan,null,2)}</pre></details></>}
  </section>
 </main>
}
