import { useEffect } from 'react';
import { assetUrl, leadOrder, Plan, openPage, titleCase, useData } from './lib';
const str=(v:unknown)=>typeof v==='string'?v:'';
type PublishedLine={time?:string|null;kind:'narration'|'dialogue'|'cut';speaker?:string;text:string};
type FarmhouseF01={title:string;status:string;paragraphs:{type:'dialogue'|'narration';speaker?:string;text:string;highlight?:boolean}[];endBoundary:string;};
type FarmhouseMixed={title:string;status:string;paragraphs:{type:'dialogue'|'narration';speaker?:string;text:string;highlight?:boolean;italic?:boolean;origin:string}[];endBoundary:string;};
type GrokArchive={order:string[];beats:Record<string,{title:string;raw:string;source:string}>;alternates:Record<string,{title:string;raw:string;source:string}>;addenda:{id:string;placement:string;source:string;raw:string}[];};
type AuthorSelected={order:string[];beats:Record<string,{title:string;status:string;parts:{source:string;raw:string}[]}>;addenda:{id:string;raw:string;status:string}[];};
const renderGrokRaw=(raw:string)=>raw.split(/\n\s*\n/g).map((part,i)=><p key={i} style={{whiteSpace:'pre-wrap',lineHeight:1.76,margin:'12px 0'}}>{part.split(/(\*\*[^*]+\*\*)/g).map((chunk,j)=>chunk.startsWith('**')&&chunk.endsWith('**')?<strong key={j}>{chunk.slice(2,-2)}</strong>:<span key={j}>{chunk}</span>)}</p>);
const renderBablooProse=(raw:string)=>raw.split(/\n\s*\n/g).map((part,i)=><p key={i} style={{whiteSpace:'pre-wrap',lineHeight:1.76,margin:'12px 0'}}>{part.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((chunk,j)=>chunk.startsWith('**')&&chunk.endsWith('**')?<strong key={j}>{chunk.slice(2,-2)}</strong>:chunk.startsWith('*')&&chunk.endsWith('*')?<em key={j}>{chunk.slice(1,-1)}</em>:<span key={j}>{chunk}</span>)}</p>);
type AnkitaStage={id:string;title:string;start:string;end:string;approval:string;sequence?:{id:string;time?:string;summary:string;dialogue?:{speaker:string;line:string}[];storyIntent?:string;editorFlags?:string[]}[];beats?:{id:string;summary:string}[];openChoices?:string[];};
type NarratorStyleRule={status:string;origin:string;appliesTo:string;methods:string[];examplePhrases:string[];useInstructions:string[];sceneTemplate:string[];};
type AnkitaScene02={scene:string;title:string;status:string;date:string;start:string;end:string;castNames:string[];sequence:{id:string;time:string;heading:string;plot:string;suggestedDialogue?:{speaker:string;line:string}[]}[];lockedDecisions:string[];exclusions:string[];proseStatus:string;nextScene:string;wardrobe:{character:string;look:string;status:string}[];};
type AnkitaScene03={title:string;status:string;start:string;end:string;beats:{id:string;time:string;name:string;plot:string;suggestedCliffDialogue?:string}[];validation:{requirement:string;status:string;beat:string}[];proseStatus:string;nextSceneSeed:string;};
type RohitPlot={title:string;status:string;date:string;beats:{id:string;name:string;plot:string;dialogue?:{speaker:string;line:string}[]}[];costumeContinuity?:{scene04Entry:string};authorLocks?:string[];};
type AnkitaScene05={title:string;status:string;date:string;time:{start:string;end:string;certainty:string};continuity:{vehicle:string;seats:{driver:string;frontPassenger:string;rearLeft:string;rearMiddle:string;rearRight:string};deadline:string;destination:string};beats:{id:string;heading:string;plot:string;dialogue?:{speaker:string;line:string}[]}[];proseStatus:string;};
type AnkitaScene06={title:string;status:string;date:string;time:{start:string;end:string;status:string};proseStatus:string;setting:{otherPeople:string};choreography:{id:string;formation:string;participants:string;contact:string;reaction:string}[];prose:{language:string;lines:{type:'narration'|'dialogue';speaker?:string;text:string}[]};handoff:{nextScene:string;scope:string;status:string};};
type AnkitaScene07={title:string;status:string;date:string;time:{start:string;end:string;certainty:string};continuity:{carProposition:string;deadline:string};beats:{id:string;time:string;heading:string;plot:string;dialogue?:{speaker:string;line:string}[]}[];proseStatus:string;};
type RinkuScene08={title:string;status:string;date:string;time:{start:string;end:string;certainty:string};purpose:string;beats:{id:string;time:string;heading:string;plot:string}[];knowledgeLocks:{ankitaKnows:string;readerOnly:string;rajeev:string;rinku:string};wardrobe:{arrival:string;homeChange:string;firstRinkuView:string};nextEpisode:{focus:string;firstLook:string;date:string}};
type ShivaniCastLock={title:string;status:string;officeTwinsStudentCore:{id:string;name:string;age:number}[];officeChotu:{name:string;age:number;role:string};societyChotu:{name:string;age:number;role:string};juniorFacultyExcluded:{name:string;age:number}[];futureOnly:{name:string;age:number;note:string};biologicalTwinsNote:string;episode02End:string;nextWork:string;prologueBaselineReference?:{source:string;sourceScene:string;status:string;establishedPreviously:string[];episode03Difference:string}};
type RohitFirstShow={title:string;status:string;date:string;wardrobe:{jan02:string;accidental:string;deliberate:string};encounters:{id:string;title:string;phase:string;beats:{id:string;name:string;plot:string}[]}[];validation:{jan1IntroductionOnly:boolean;jan1UpperButtonsClosed:boolean;jan2AccidentFirst:boolean;jan2DeliberateFirstShowLaterSameDay:boolean;exactJan2Clock:string;jan2Wardrobe:string};};
export default function Planning({lead,initialScene}:{lead:string;initialScene?:string|null}){
 const active=leadOrder.includes(lead)?lead:'meenakshi';
 const {data:current,error:currentError}=useData<Plan>('episode-03-meenakshi-scene-01.json');
 const {data:farmhouse,error:farmhouseError}=useData<Plan>('episode-03-meenakshi-scene-02.json');
 const {data:grokOriginals,error:grokOriginalsError}=useData<GrokArchive>('episode-03-meenakshi-scene-02-grok-originals.json');
 const {data:authorSelected,error:authorSelectedError}=useData<AuthorSelected>('episode-03-meenakshi-scene-02-author-selected.json');
 const {data:twins,error:twinsError}=useData<Plan>('episode-03-meenakshi-scene-03-twins.json');
 const {data:bablooIntro,error:bablooIntroError}=useData<Plan>('episode-03-meenakshi-scene-04-babloo-intro.json');
 const bablooProse=(bablooIntro?.proseDraft as {status?:string;beats?:{id:string;title:string;raw:string}[]}|undefined);
 const bablooFoundation=(bablooIntro?.foundationContinuityRule as {prohibitions?:string[];forwardGuidance?:string}|undefined);
 const {data:meenaFuture}=useData<Plan>('episode-03-meenakshi-plan.json');
 const {data:ankitaOpening,error:ankitaOpeningError}=useData<Plan>('episode-03-ankita-a11-scene-01-opening.json');
 const {data:ankitaScene02,error:ankitaScene02Error}=useData<AnkitaScene02>('episode-03-ankita-scene-02.json');
 const {data:ankitaScene03,error:ankitaScene03Error}=useData<AnkitaScene03>('episode-03-ankita-scene-03.json');
 const {data:rohitIntro,error:rohitIntroError}=useData<RohitPlot>('episode-03-ankita-scene-04-rohit-intro.json');
 const {data:ankitaScene05,error:ankitaScene05Error}=useData<AnkitaScene05>('episode-03-ankita-scene-05-combined-surprise-ride.json');
 const {data:ankitaScene06,error:ankitaScene06Error}=useData<AnkitaScene06>('episode-03-ankita-scene-06-dance-draft.json');
 const {data:ankitaScene07,error:ankitaScene07Error}=useData<AnkitaScene07>('episode-03-ankita-scene-07-twins-pickup-homecoming.json');
  const {data:ankitaScene08,error:ankitaScene08Error}=useData<RinkuScene08>('episode-03-ankita-scene-08-rinku-setup.json');
 const {data:rohitFirstShow,error:rohitFirstShowError}=useData<RohitFirstShow>('ankita-rohit-jan02-future-office.json');
 const {data:writingStyle,error:writingStyleError}=useData<Plan>('flirting-style.json');
  const {data:shivaniCastLock,error:shivaniCastLockError}=useData<ShivaniCastLock>('episode-03-shivani-cast-lock.json');
 const {data:shreyaFuture}=useData<Plan>('episode-03-shreya-plan.json');
 useEffect(()=>{
  if(!initialScene)return;
  const id=active==='ankita'
   ?(initialScene==='01'?'ankita-ep03-a11':initialScene==='02'?'ankita-ep03-scene02':initialScene==='03'?'ankita-ep03-scene03':initialScene==='04'?'ankita-ep03-scene04-rohit':initialScene==='05'?'ankita-ep03-scene05':initialScene==='06'?'ankita-ep03-scene06':initialScene==='07'?'ankita-ep03-scene07':initialScene==='08'?'ankita-ep03-scene08':initialScene==='rohit-first-show'?'ankita-ep04-rohit-first-show':'')
   :active==='shivani'
   ?(initialScene==='cast'?'shivani-ep03-cast-lock':'')
   :active==='meenakshi'
   ?(initialScene==='01'?'ep03-meenakshi-scene-01':initialScene==='handoff'?'ep04-meenakshi-handoff':'ep03-meenakshi-scene-'+initialScene)
   :'';
  const timer=window.setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),130);
  return ()=>clearTimeout(timer);
 },[active,initialScene]);
 const leadPlans=[{lead:'ankita',file:'',plan:null},{lead:'shivani',file:'',plan:null},{lead:'taniya',file:'',plan:null},{lead:'meenakshi',file:'episode-03-meenakshi-plan.json',plan:meenaFuture},{lead:'shreya',file:'episode-03-shreya-plan.json',plan:shreyaFuture}];
 const activePlan=leadPlans.find(x=>x.lead===active);
 const ankitaStages=Array.isArray(ankitaOpening?.blocks)?ankitaOpening.blocks as AnkitaStage[]:[];
 const narratorRule=writingStyle?.narratorVisualDescription as NarratorStyleRule|undefined;
 const authorNotes=(twins?.authorRequirement as {exactText?:string}|undefined)?.exactText;
 const twinsStory=(twins?.authorCorrectedProse as {status?:string;beats?:{id:string;title:string;raw:string}[]}|undefined);
 const publishedProse=(Array.isArray(current?.publishedProse)?current.publishedProse:[]) as PublishedLine[];
 const farmhouseF01=(farmhouse?.approvedProse as {F01?:FarmhouseF01}|undefined)?.F01;
 const farmhouseF04=(farmhouse?.approvedProse as {F04?:FarmhouseF01}|undefined)?.F04;
 const farmhouseF06=(farmhouse?.publishedDrafts as {F06?:FarmhouseMixed}|undefined)?.F06;
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

  <article className="episode-plan-card" id="ep03-meenakshi-scene-02"><span className="eyebrow">EP 03 · Scene 02 · CLOSES AT F19 · F18–F19 APPROVED</span><h2>The Farmhouse Evening</h2><p>1 January 2026 · From 17:00 · Meenakshi, Aditi, Avi and Yash</p><p>F01–F04 approved; F05–F12 Grok drafts; F13–F17 working drafts; F18–F19 author-approved closing. F06 consists of two consecutive parts. F20–F22 discarded by author.</p><strong>Return travel and finishing time are not yet verified.</strong>
   <section className="source-note" id="farmhouse-author-selected-F01-F19" aria-label="Author-selected F01 to F19 reading">
    <span className="eyebrow">EP03 · Scene02 · Author-selected primary reading · F01–F19</span>
    <h3>Farmhouse Evening — selected story text</h3>
    <p><strong>F01–F04:</strong> author-approved Grok compact edits. <strong>F05–F12:</strong> Grok source as submitted, not final prose approval. <strong>F13–F17:</strong> edited working drafts. <strong>F18–F19:</strong> author-approved closing at the men's drop-off. F20–F22 discarded, preserved only in archival metadata. F06 Part 2 continues Part 1.</p>
    {authorSelected?<div>{authorSelected.order.map(id=>{const beat=authorSelected.beats[id];return beat?<details key={id} className="episode-outline" id={'author-selected-'+id}>
       <summary><strong>{id} — {beat.title}</strong> · {beat.status==='AUTHOR_APPROVED_COMPACT_REDLINE'?'Approved compact text':beat.status==='AUTHOR_APPROVED_PROSE_PUBLISHED'?'Author-approved prose':beat.status==='AUTHOR_DIRECTED_EDITORIAL_DRAFT_PENDING_APPROVAL'||beat.status==='AUTHOR_REVIEWED_WORKING_DRAFT'?'Edited working draft':'Grok source draft'}</summary>
       <div className="source-scene prose-exact">{beat.parts.map((part,j)=><div key={j}>{beat.parts.length>1&&<h4>{j===0?'F06 · Part 1':'F06 · Part 2 (direct continuation)'}</h4>}{renderGrokRaw(part.raw)}</div>)}</div>
       {id==='F08'&&authorSelected.addenda?.map(a=><details key={a.id} className="episode-outline"><summary>Additional F08 passage · author text preserved</summary><div className="source-scene">{renderGrokRaw(a.raw)}</div></details>)}
      </details>:null})}</div>:<p role="alert">{authorSelectedError||'Loading author-selected farmhouse story…'}</p>}
    <p className="muted">F15–F17 working prose; F18–F19 approved prose. Scene 02 ends with Avi and Yash dropped off and Meenakshi driving onward. F20–F22 are not active.</p>
   </section>
   <details className="source-note" id="grok-originals-F01-F09">
    <summary>Archive: read original Grok submissions without the author-approved cuts</summary>
    <p>Original F01–F09 text, plus F06's second part and F08 addition, preserved for comparison only.</p>
    {grokOriginals?<div>{grokOriginals.order.map(id=>{const beat=grokOriginals.beats[id];return beat?<article key={id} id={'grok-original-'+id} className="beat-item" style={{display:'block',marginBlock:22,paddingBlock:15,borderBottom:'1px solid var(--line, #ccc)'}}>
      <span className="eyebrow">{id} · original archive</span><h3>{beat.title}</h3>
      <div className="source-scene">{renderGrokRaw(beat.raw)}</div>
      {id==='F06'&&grokOriginals.alternates?.F06&&<details className="episode-outline"><summary>F06 Grok second part — continuation</summary><div className="source-scene">{renderGrokRaw(grokOriginals.alternates.F06.raw)}</div></details>}
      {id==='F08'&&grokOriginals.addenda?.map(a=><details className="episode-outline" key={a.id}><summary>F08 original addendum</summary><div className="source-scene">{renderGrokRaw(a.raw)}</div></details>)}
    </article>:null})}</div>:<p>{grokOriginalsError||'Loading Grok archive…'}</p>}
   </details>
   <details className="source-note" id="farmhouse-editorial-history">
    <summary>Separate approved prose / older GPT comparison sections (archived for reference)</summary>
   {farmhouseF01&&<section className="source-note" id="farmhouse-approved-F01" aria-label="Approved Farmhouse Beat F01">
    <span className="eyebrow">F01 · Approved scene prose</span><h3>{farmhouseF01.title}</h3><p className="muted">1 January · Approximately 5:00 PM · Hospital staff exit</p>
    <div className="source-scene prose-exact">{farmhouseF01.paragraphs.map((line,i)=><p key={i} className={line.type==='dialogue'?'dialogue':''}>{line.speaker&&<strong>{line.speaker}: </strong>}{line.highlight?<strong>{line.type==='dialogue'?'“'+line.text+'”':line.text}</strong>:line.type==='dialogue'?'“'+line.text+'”':line.text}</p>)}</div>
    <p className="muted"><strong>Cut:</strong> F01 ends on the walk toward parking. Car seating and drive belong to F02.</p>
   </section>}
   {farmhouse&&!farmhouseF01&&<p role="alert">Approved F01 prose is missing from the farmhouse source.</p>}
   {farmhouseF04&&<section className="source-note" id="farmhouse-approved-F04" aria-label="Approved Farmhouse Beat F04">
    <span className="eyebrow">F04 · Approved scene prose · Aditi's burgundy mini-dress entrance</span><h3>{farmhouseF04.title}</h3><p className="muted">1 January · Farmhouse evening · Exact time pending</p>
    <p className="muted"><strong>Reading order:</strong> F02 (drive) and F03 (drinks and changing clothes) come before this beat; their prose is still awaiting approval.</p>
    <div className="source-scene prose-exact">{farmhouseF04.paragraphs.map((line,i)=><p key={i} className={line.type==='dialogue'?'dialogue':''}>{line.speaker&&<strong>{line.speaker}: </strong>}{line.highlight?<strong>{line.type==='dialogue'?'“'+line.text+'”':line.text}</strong>:line.type==='dialogue'?'“'+line.text+'”':line.text}</p>)}</div>
    <p className="muted"><strong>Cut:</strong> Aditi starts dancing solo and invites Avi. Their close dance belongs to F05, still unwritten.</p>
   </section>}
   {farmhouse&&!farmhouseF04&&<p role="alert">Approved F04 prose is missing from the farmhouse source.</p>}

   {farmhouseF06&&<section className="source-note" id="farmhouse-mixed-F06" aria-label="Farmhouse Beat F06 mixed working version">
    <span className="eyebrow">F06 · Working published draft · Grok opening + italic editorial continuation</span><h3>{farmhouseF06.title}</h3>
    <p className="muted">First 3 body paragraphs: original Grok text, unedited. Following paragraphs: assistant-authored changes in <em>italics</em>. Speaker names in bold. This is not final author-approved prose.</p>
    <p className="muted"><strong>Reading gap:</strong> F05 close dance is still pending final author approval; this working F06 follows it in story order.</p>
    <div className="source-scene prose-exact">{farmhouseF06.paragraphs.map((line,i)=><p key={i} className={line.type==='dialogue'?'dialogue':''}>{line.italic?<em>{line.speaker&&<strong>{line.speaker}: </strong>}{line.highlight?<strong>{line.type==='dialogue'?'“'+line.text+'”':line.text}</strong>:line.type==='dialogue'?'“'+line.text+'”':line.text}</em>:<>{line.speaker&&<strong>{line.speaker}: </strong>}{line.highlight?<strong>{line.type==='dialogue'?'“'+line.text+'”':line.text}</strong>:line.type==='dialogue'?'“'+line.text+'”':line.text}</>}</p>)}</div>
    <p className="muted"><strong>Cut:</strong> Yash surprises Aditi. Avi and Meenakshi notice the contrast. Meenakshi's invitation and dancing belong to F07.</p>
   </section>}
   {farmhouse&&!farmhouseF06&&<p role="alert">Published working F06 is missing from the farmhouse source.</p>}
   </details>
   {farmhouse?.beats?.length?<details className="episode-outline"><summary>Read {farmhouse.beats.length} planned beats</summary><div className="beat-list">{farmhouse.beats.map((b,i)=><div key={b.id||i} className="beat-item"><span className="eyebrow">{str(b.phase)||b.id||'Plot beat'}</span><h3>{b.title||'Untitled beat'}</h3><p>{str(b.detail)}</p></div>)}</div></details>:<p>{farmhouseError||'Loading farmhouse outline…'}</p>}
  </article>
  <article className="episode-plan-card" id="ep03-meenakshi-scene-03"><span className="eyebrow">EP 03 · Scene 03 · Author notes and scene beats under review</span><h2>The Badminton Bet</h2><p>1 January 2026 · 18:15 proposed · Uday, Utkarsh and Meenakshi</p><p>At the badminton court near Gulmohar Heights, Meenakshi meets Uday and Utkarsh again. T01–T06 retain the earlier author-reviewed draft. T07 below merges the original car-breakdown and seating passage with the author's latest bike-ride passage, both verbatim and without rewriting. Earlier versions are archived in scene JSON.</p>
   {twinsStory?.beats?.length?<section className="source-note" id="meenakshi-badminton-full-text"><span className="eyebrow">Scene text · T01–T06 and author-verbatim T07</span>{twinsStory.beats.map(b=><details className="episode-outline" key={b.id} open={b.id==='T07'?true:undefined}><summary><strong>{b.id} — {b.title}</strong></summary><div className="source-scene prose-exact">{renderGrokRaw(b.raw)}</div></details>)}</section>:<p role="status">Loading original author scene text…</p>}
   <div className="continuity-warning" role="note"><strong>Timeline needs review:</strong> Scene 02 starts at 17:00 with farmhouse dancing, photographs and return travel. The 18:15 badminton start and 18:45 return are targets only, not confirmed travel times. The three-person bike proposal is also not a safe transport plan.</div>
   {twins?.beats?.length?<details className="episode-outline"><summary>Read {twins.beats.length} active badminton beats</summary><div className="beat-list">{twins.beats.map((b,i)=><div key={b.id||i} className="beat-item"><span className="eyebrow">{b.time||b.id||'Plot beat'}</span><h3>{b.title||'Untitled beat'}</h3><p>{str(b.action)}</p></div>)}</div></details>:<p>{twinsError||'Loading twins outline…'}</p>}
   {authorNotes&&<details className="episode-outline author-notes"><summary>Author's original requirements (verbatim, planning only)</summary><pre>{authorNotes}</pre></details>}
   <p className="muted">The Ishita doubles invitation is planned for a future scene (date pending), not cancelled. No ride outcome or accidental car interference has been promoted to canon.</p>
  </article>
  <article className="episode-plan-card" id="ep03-meenakshi-scene-04"><span className="eyebrow">EP 03 · Scene 04 · Full B01–B05 prose draft saved for review · Plot approved</span><h2>The First Different Look — Babloo</h2>
   <p>1 January 2026 · Around 18:45–19:00 · Tower C entrance and lift lobby</p>
   <p>Babloo (23) is already Meenakshi's familiar society pharmacy pickup helper. This is their first proper personal on-page encounter, not their first-ever introduction.</p>
   {bablooProse?.beats?.length?<section className="source-note" id="meenakshi-babloo-full-prose"><span className="eyebrow">Read the full story · B01–B05 · Author review draft</span><p>The scene text below is the saved draft, not a newly generated revision.</p>{bablooProse.beats.map(b=><details className="episode-outline" key={b.id} open={b.id==='B01'?true:undefined}><summary><strong>{b.id} — {b.title}</strong></summary><div className="source-scene prose-exact">{renderBablooProse(b.raw)}</div></details>)}<p><a href={assetUrl('episode-03-meenakshi-scene-04-babloo-intro.html')}>Read Scene 04 continuously</a></p></section>:null}
   {bablooFoundation&&<details className="episode-outline" id="babloo-foundation-rule"><summary>Future-writing rule · No repeating Babloo–Meenakshi foundation</summary><p>{bablooFoundation.forwardGuidance}</p><ul>{bablooFoundation.prohibitions?.map((q,i)=><li key={i}>{q}</li>)}</ul></details>}

   {bablooIntro?<div className="babloo-intro">
     <p>{str(bablooIntro.introAndHistory)}</p>
     <div className="beat-list">{(bablooIntro.beats||[]).map((b,i)=><div className="beat-item" key={b.id||i}><span className="eyebrow">{b.id||'Plot beat'}</span><h3>{b.title||'Untitled beat'}</h3><p>{str(b.action)}</p>
       {Array.isArray(b.dialogue)&&b.dialogue.map((line,i)=><p key={i}><strong>{str(line.speaker)}:</strong> {str(line.line)}</p>)}
       {b.internal&&<p className="muted">{str(b.internal)}</p>}
     </div>)}</div>
     <p><strong>EP03 Meenakshi ending:</strong> She accepts Babloo's offer to help with her car tomorrow, and parts by the lift. EP04 car recovery is a possible continuation, not written yet.</p>
   </div>:<p>{bablooIntroError||'Loading approved Babloo outline…'}</p>}
   <p className="muted">B01–B05 plot approved, prose draft now saved for author review. Timing remains provisional pending farmhouse-to-badminton continuity. No missing-parcel or second-doorbell plot.</p>
  </article>
    <article className="source-note" id="ep03-meenakshi-scene-HS-NIGHT"><span className="eyebrow">Future episode seed · 1 January · late night · exact hour TBD</span><h2>Harish &amp; Sunil — Outside Society</h2><p>Only after the others have left: a short reader-only scene outside Gulmohar Heights. The two workers privately consider their hidden attraction and future approach. Female staff remain unaware. This is not Scene 02 prose, and no encounter or outcome has been written.</p><p className="muted">Author-directed placement reserved in the universal timeline; write only in a future episode.</p></article>
    <article id="ep04-meenakshi-handoff"><span className="eyebrow">EP 04 · Reserved continuation</span><h2>Same moment, next episode</h2><p>1 January 2026 · 14:15 onwards</p><p>No continuation prose approved or written. This marker is a handoff, not a generated scene.</p><p className="muted">This continuation will appear here once its outline is written and approved.</p></article></section>}
  {active==='ankita'&&<section className="continuity-cards" id="ankita-ep03-first-block">
    <article className="episode-plan-card" id="ankita-ep03-a11"><span className="eyebrow">Ankita · EP03 · Scene 01 · 1 Jan 2026 · Plot only</span><h2>Scene 01 — Rajeev's Parcel Call &amp; Private Afterbeat</h2>
      <p>About 13:05–13:15 · Ankita at Cyber City; Rajeev at home (time provisional)</p>
      {ankitaStages.filter(b=>b.id==='A11').map(b=><div key={b.id} className="beat-list">{b.sequence?.map(q=><div key={q.id} className="beat-item"><span className="eyebrow">{q.time||'Time pending'}</span><h3>{q.id==='A11-CALL'?'A short parcel call':'Rajeev alone · reader-only direction'}</h3><p>{q.summary}</p>{q.dialogue?.map((line,i)=><p key={i}><strong>{line.speaker}:</strong> {line.line}</p>)}{q.storyIntent&&<p className="muted">{q.storyIntent}</p>}</div>)}</div>)}
      <p className="muted">A11 source continuity: Rajeev has the parcel after P08; used-garment provenance remains unverified. Private fantasy is reader-only, not Ankita's agreement. Full prose has not been written.</p>
    </article>
    <article className="episode-plan-card" id="ankita-ep03-scene02"><span className="eyebrow">Ankita · EP03 · Scene 02 · 1 Jan 2026 · User-finalized plot, prose pending</span>
      <h2>{ankitaScene02?.title||'Scene 02 — The Five-Person Stamina Challenge'}</h2>
      <p>13:15–13:45 · Cyber City IT office · Ankita, Sana, Aishwarya, Vivan and Reyansh</p>
      <p className="muted">Five-person continuous scene. Scene 01 is Rajeev's A11. Earlier short group opening is archived as superseded, not a separate scene. No photo challenge or transport conclusion.</p>
      {ankitaScene02&&<><details className="episode-outline"><summary>Party-ready outfits · agreed scene looks</summary><div className="beat-list">{ankitaScene02.wardrobe.map(w=><div className="beat-item" key={w.character}><h3>{w.character}</h3><p>{w.look}</p></div>)}</div></details>
      <div className="beat-list">{ankitaScene02.sequence.map(q=><div className="beat-item" key={q.id}><span className="eyebrow">{q.time}</span><h3>{q.heading}</h3><p>{q.plot}</p>{q.suggestedDialogue?.map((line,i)=><p key={i}><strong>{line.speaker}:</strong> {line.line}</p>)}</div>)}</div>
      <p className="muted">Status: {ankitaScene02.status.replace(/_/g,' ')} · {ankitaScene02.proseStatus.replace(/_/g,' ')}. Next: {ankitaScene02.nextScene}</p></>}
      {ankitaScene02Error&&<p role="alert">Finalized Ankita Scene 02 plot could not load: {ankitaScene02Error}</p>}
    </article>
    <article className="episode-plan-card" id="ankita-ep03-scene03"><span className="eyebrow">Ankita · EP03 · Scene 03 · 1 Jan 2026 · Writer plot for review</span>
      <h2>{ankitaScene03?.title||'The Private Briefing — Ankita’s Beauty Test'}</h2>
      <p>13:45–15:30 · Cyber City IT office · Ankita, Mr. Bhalla (58), Sandeep Khurana (38); Aishwarya at the exit cliff</p>
      <figure className="ankita-scene03-image" style={{margin:'1rem 0'}}>
       <img src={assetUrl('assets/ankita-ep03-scene03-private-briefing.webp')} alt="Ankita presenting the successful New Year production release in a cream embroidered kurti and beige blazer to Mr. Bhalla and Sandeep" loading="lazy" style={{width:'min(100%, 440px)',height:'auto',borderRadius:'12px',display:'block'}}/>
       <figcaption className="muted">Scene 03 generated visual reference · office presentation · illustration, not a face-canon photograph.</figcaption>
      </figure>
      {ankitaScene03&&<><div className="beat-list">{ankitaScene03.beats.map(q=><div className="beat-item" key={q.id}><span className="eyebrow">{q.time}</span><h3>{q.name}</h3><p>{q.plot}</p>{q.suggestedCliffDialogue&&<p><strong>Cliff:</strong> {q.suggestedCliffDialogue}</p>}</div>)}</div>
      <details className="episode-outline"><summary>Author instruction validation · 5 of 5 beats</summary><div className="beat-list">{ankitaScene03.validation.map(v=><div className="beat-item" key={v.beat}><p><strong>{v.beat} · {v.status}:</strong> {v.requirement}</p></div>)}</div></details>
      <p className="muted">{ankitaScene03.status.replace(/_/g,' ')} · {ankitaScene03.proseStatus.replace(/_/g,' ')}. Next: {ankitaScene03.nextSceneSeed}</p></>}
      {ankitaScene03Error&&<p role="alert">Ankita Scene 03 plot source unavailable: {ankitaScene03Error}</p>}
    </article>

    <article className="episode-plan-card" id="ankita-ep03-scene04-rohit"><span className="eyebrow">Ankita · EP03 · 1 Jan 2026 · Scene 04 · User-finalized INTRO only</span>
      <h2>{rohitIntro?.title||'Office Chotu — Rohit Babu Introduction'}</h2>
      <p>After 15:30 · Cyber City IT office · Ankita and Rohit (22)</p>
      {rohitIntro&&<><p><strong>Outfit continuity:</strong> {rohitIntro.costumeContinuity?.scene04Entry}</p>
      <div className="beat-list">{rohitIntro.beats.map(q=><div className="beat-item" key={q.id}><h3>{q.name}</h3><p>{q.plot}</p>{q.dialogue?.map((d,i)=><p key={i}><strong>{d.speaker}:</strong> {d.line}</p>)}</div>)}</div>
      <p className="muted">INTRO only — no accidental glance or deliberate first show on Jan 1. {rohitIntro.status.replace(/_/g,' ')}</p></>}
      {rohitIntroError&&<p role="alert">Rohit introduction not loaded: {rohitIntroError}</p>}
    </article>
    <article className="episode-plan-card" id="ankita-ep03-scene05">
      <span className="eyebrow">Ankita · EP03 · Scene 05 · 1 Jan 2026 · Author-approved combined PLOT only</span>
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
        <div className="source-scene prose-exact" aria-label="Ankita Scene 06 working prose draft">{ankitaScene06.prose.lines.map((line,i)=><p key={i} className={line.type==='dialogue'?'dialogue':''}>{line.type==='dialogue'?<><strong>{line.speaker}:</strong> “{line.text}”</>:line.text}</p>)}</div>
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
    {ankitaOpeningError&&<p role="alert">Ankita opening plot source missing: {ankitaOpeningError}</p>}
  </section>}
  {active==='shivani'&&<section className="continuity-cards" id="shivani-ep03-cast-lock">
    <article className="episode-plan-card">
      <span className="eyebrow">Shivani · Episode 03 · Character groups locked · Scene plots pending</span>
      <h2>Office Twins (age-cohort label) — four college students</h2>
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
        <p className="muted">{shivaniCastLock.biologicalTwinsNote} {shivaniCastLock.episode02End} This locks cast only, not a Scene 01 or written encounter.</p>
      </>:<p role="alert">Shivani cast lock not loaded: {shivaniCastLockError||'Loading…'}</p>}
    </article>
   </section>}
   <section className="planning-panel">
   <details className="episode-outline" id="society-wives-author-narrator-instructions"><summary>Author writing instructions · visual descriptions &amp; flirting style</summary>
    <p><strong>Narrator image, not a character's spoken line.</strong> Describe adult female characters using distinct body-shape metaphors/similes, walking gait, stance, silhouette, outfit fit, fabric movement and turns only when grounded in their wardrobe and scene.</p>
    <p><strong>Separate:</strong> narrator visual description · observer's glance · spoken teasing · woman's own response. Never silently omit an author-requested beat or invent new body canon.</p>
    {narratorRule?<><p><strong>Reference technique:</strong> {narratorRule.origin}</p><div className="beat-list">{narratorRule.methods.map((method,i)=><div key={i} className="beat-item"><p>{method}</p></div>)}</div><p><strong>Example vocabulary (not established body shapes):</strong> {narratorRule.examplePhrases.join(' · ')}</p><p className="muted">{narratorRule.status.replace(/_/g,' ')}</p></>:<p className="muted">{writingStyleError||'Writer style notes loading…'}</p>}
   </details>
   <div className="split"><div><span className="eyebrow">Working story lane</span><h2>{titleCase(active)}</h2><p>{active==='ankita'?'Current EP03 Scenes 01–08 and the separately preserved 2 January Rohit future-office plot are shown above. Earlier competing home and parcel follow-up outlines were removed; Scene 08 Rinku setup is the final Ankita Jan 1 entry.':activePlan?.plan?.title||'No separate Episode 03 working draft is available here yet.'}</p></div></div>
   {active==='taniya'&&<p className="source-note">Soniya's independent scenes belong to Taniya's continuity lane. Their existing joint plan is preserved; those scenes have not been promoted to finished prose.</p>}
   {active==='shivani'&&<p className="source-note">Shivani's Episode 03 character groups are locked above (four Office Twins, separate Office/Society Chotu roles and junior teachers); individual scene plots have not yet been approved.</p>}
   {activePlan?.plan&&<><p><strong>Original status:</strong> {str(activePlan.plan.status)||'REVIEW'}</p>{active==='meenakshi'&&<p><strong>Older separate outline — 2 January 2026.</strong> This is not part of 1 January's Scene 01–03 sequence. Senior Review M08 stays on Jan 2.</p>}
    {active==='shreya'&&<p><strong>Date:</strong> 3 January 2026. These events were rescheduled here from 1 January. They remain writing-pending, not cancelled.</p>}
    {active==='ankita'&&<p><strong>Date:</strong> Original draft date requires review; it has not been silently assigned to the Episode 03 canonical timeline.</p>}
    <details><summary>Full planning notes</summary><pre>{JSON.stringify(activePlan.plan,null,2)}</pre></details></>}
  </section>
 </main>
}
