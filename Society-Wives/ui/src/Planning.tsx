import { useEffect } from 'react';
import { Plan, openPage, titleCase, useData } from './lib';
const str=(v:unknown)=>typeof v==='string'?v:'';
type AuthorRevisionNote={id:string;status:string;reference:string;focus:string;mistakesIdentified:string[];mandatoryRules:string[];shreyaB07B09Reference:{date:string;publicEvent:string;allowedWitnesses:string[];excludedWitnesses:string;observationWindow:string;preciseAuthorFigure:string;wardrobe:string;memories:string;status:string}};
type NarrativeCalibration={id:string;title:string;status:string;referenceFile:string;sourceScope:string;diagnosis:{fault:string;correction:string}[];sourceObservations:string[];principles:string[];prohibitions:string[];plotSuggestionFormat:string;proseStandard:string};
type NarratorStyleRule={status:string;origin:string;appliesTo:string;methods:string[];examplePhrases:string[];useInstructions:string[];sceneTemplate:string[];};
type AnkitaFuturePresentation={status:string;decision:string;planning:{idea:string;duration:string;date:string;episode:string;proseStatus:string;sceneStatus:string;characterLock:string};originalAuthorPromptVerbatim:string;originalPlotBeatVerbatim:{name:string;plot:string}};
type ShivaniSceneReference={schemaVersion:number;id:string;title:string;status:string;source:{googleDocId:string;url:string;title:string;capturedDate:string;capturedFromRevision:string;readBeforeWriting:string};storyDate:string;sceneStart:string;sceneEnd:string;cast:string[];timeline:string[];femaleReferences:{name:string;status:string;heading:string;content:string}[];editorial:{wordForWordNote:string;sourceProtection:string;ritika:string;historicalTime:string}};
type ShivaniNewBeat={id:string;time:string;title:string;cast:string[];plot:string;dialogue?:{speaker:string;line:string}[];reaction?:string;narratorDirection?:string;knowledge?:{readerOnly:boolean;shivaniAware:boolean;actualContact:boolean}};
type ShivaniSocietyReturn={title:string;status:string;proseStatus:string;date:string;time:{start:string;end:string};priorFoundation:string[];beats:ShivaniNewBeat[];restrictions:string[]};
type ShivaniNightPlan={title:string;status:string;proseStatus:string;date:string;episodePlacement:string;time:{firstHomeBeat:string;nightEncounter:string};beats:ShivaniNewBeat[];continuityLocks:string[];relationshipSetup:{shivaniOm:{established:string;proposedNewCharacterAngle:string;fantasyPresentation:string;tone:string};deepuShivani:{established:string;proposedTonight:string};deepuKavya:{new:string;agency:string};twinsKavya:{new:string;distinctVoices:string}};futureArc:Record<string,string>};
type TaniyaEpisode03Beat={id:string;time:string;title:string;location:string;cast:string[];purpose:string;action:string;physical?:string;teasing?:string;visual:string;dialogue:{speaker:string;line:string}[];turn:string;status:string};
type TaniyaEpisode03Plot={visualAssets?:{id:string;beatId:string;title:string;url:string;status:string;continuity:string}[];visualAssetFolder?:{title:string;url:string;note:string};schemaVersion:number;episode:string;lead:string;title:string;date:string;start:string;end:string|null;status:string;goal:string;timeIntegrity?:{verifiedStart:string;verifiedCutoff:string;officeEnd:string;commuteAfterWork:string;societyArrival:string;soniyaFirstAppearance:string;consequence:string};plotPhases?:{key:string;beatIds:string[];time:string;state:string;note?:string}[];interactionAudit?:{status:string;officeWomen:{name:string;age:number|null;role:string;status:string}[];males:{name:string;age:number;beatIds:string[];physical:string;relationship:string}[];femalePhysical?:{pair:string;beatId:string;contact:string;reaction:string}[];societyPhysical?:{pair:string;beatId:string;contact:string;reaction:string;romance?:string}[];taniyaReaction?:string;uncleFantasyHint?:string;note:string};figureMapping:{group:string;members:string[];why:string}[];wardrobeStatus:string;wardrobe:string;beats:TaniyaEpisode03Beat[];authorLocks:string[];ending:string;sourceAnchors:{source:string;facts:string}[]};
type ShreyaBeat={editorialIssueToDiscuss?:{id:string;status:string;headline:string;reason:string;requiredDiscussion:string;approvalBoundary:string};id:string;time:string|null;type?:string;status:string;title:string;place:string|null;characters:string[];history:string;distinctEvent:string;reaction:string;dialogue?:string[][];exit:string;readerOnlyAfterbeat?:string;readerOnlyFantasy?:{trigger:string;fantasy:string;status?:string};wardrobeProposals?:Record<string,string>;wardrobeContinuity?:string;approvalScope?:string;sceneBeats?:{id:string;time:string;heading:string;plot:string;narration?:string;dialogue?:string[][];reaction?:string}[];sharedMemory?:{status:string;event:string;shreya:string;karan:string;aman:string;laterUse:string;sharedBanter:string};styleLock?:string;futureArc?:{coreConflict:string;nonsexualStakes:string;trajectory:string};};
type ShreyaEpisode03Proposal={title:string;status:string;date:string;weekday:string;dayScope:{start:string;end:string;certainty:string};anchor:string;userLocks:string[];timeline:ShreyaBeat[];parkedFutureEncounters:ShreyaBeat[];mergedTransitions:{from:string;into:string;time:string;text:string;status:string}[];reviewBeatSequence:{number:number;id:string;kind:string;title:string;label:string}[];reviewSequencePolicy:string;editorial:{approvalRule:string;sequence:string;sourceIntegrity:string}};
type ShreyaBeat10Review={title:string;time:string;status:string;sourcePlot:string;sourceApprovalBoundary:string;prose:string;timeMarks:{clock:string;moment:string}[];grokInsertions:{id:string;purpose:string;status:string}[];editorialReview:{issue:string;thisDraftChoice:string;notYetAuthorized:string;nextBeat:string;imageReferenceDirection:string;approval:string}};
type ShreyaBeats0709Draft={title:string;date:string;status:string;sourcePlan:string;styleGuide:string;locks:{event:string;onlookers:string[];publicOnlookers:number;exactVisualFigure:string;duration:string;uniform:string;aftermath:string};beats:{id:string;number:number;time:string;title:string;status:string;raw:string}[]};
type ShreyaEpisode04Future={title:string;episodeDate:string|null;planningStatus:string;dependency:string;futurePlots:{id:string;title:string;status:string;cast:{id:string;trainingRole:string;age:number;ageStatus:string}[];identityReveal:{truth:string;maleAwareness:string;femaleAwareness:string;readerAwareness:string};purpose:string;preservedArc:string;futureAttraction:string;episode04Continuity:string;scheduling:string}[];authorLocks:string[]};
type ShivaniStaffroomPlot={scene:string;status:string;date:string;start:string;end:string;location:string;purpose:string;wardrobeStatus:string;wardrobe:{name:string;age:number;role:string;outfit:string;narratorView:string;referenceColor:string}[];imageReference:{origin:string;status:string;use:string};beats:{id:string;time:string;title:string;focus:string;action:string;narrator?:string;dialogue?:{speaker:string;line:string}[];seed?:string;note?:string}[];plotLocks:string[];};
type ShivaniCastLock={title:string;status:string;officeTwinsStudentCore:{id:string;name:string;age:number}[];officeChotu:{name:string;age:number;role:string};societyChotu:{name:string;age:number;role:string};juniorFacultyExcluded:{name:string;age:number}[];futureOnly:{name:string;age:number;note:string};biologicalTwinsNote:string;episode02End:string;nextWork:string;prologueBaselineReference?:{source:string;sourceScene:string;status:string;establishedPreviously:string[];episode03Difference:string}};
type ChotuMoment={date:string;start:string;end:string;title:string;cause?:string;physical:string;sightline?:string;duration?:string;reaction?:string;hook?:string;choice?:string;test?:string;result?:string;after?:string};
type ChotuTrack={lead:string;chotu:string;lane:string;age:number;setting:string;twinsContext:string;a:ChotuMoment;b:ChotuMoment};
type ChotuWorkshop={title:string;status:string;scope:string;invariants:string[];leads:{id:string;name:string;endJan01:string;twins:string;tracks:ChotuTrack[]}[]};
const planningLeads=['ankita','shivani','taniya','soniya','meenakshi','shreya'];
type RohitFirstShow={title:string;status:string;date:string;wardrobe:{jan02:string;accidental:string;deliberate:string};encounters:{id:string;title:string;phase:string;beats:{id:string;name:string;plot:string}[]}[];validation:{jan1IntroductionOnly:boolean;jan1UpperButtonsClosed:boolean;jan2AccidentFirst:boolean;jan2DeliberateFirstShowLaterSameDay:boolean;exactJan2Clock:string;jan2Wardrobe:string};};
export default function Planning({lead,initialScene}:{lead:string;initialScene?:string|null}){
 const active=planningLeads.includes(lead)?lead:'meenakshi';
 
 
 
 
 
 
 
 
 const {data:meenaFuture}=useData<Plan>('episode-03-meenakshi-plan.json');
 const {data:chotuWorkshop,error:chotuWorkshopError}=useData<ChotuWorkshop>('episode-04-chotu-six-leads-review.json');
 
 
  const {data:ankitaFuturePresentation,error:ankitaFuturePresentationError}=useData<AnkitaFuturePresentation>('episode-future-ankita-private-presentation-seed.json');
 const {data:rohitFirstShow,error:rohitFirstShowError}=useData<RohitFirstShow>('ankita-rohit-jan02-future-office.json');
 const {data:writingStyle,error:writingStyleError}=useData<Plan>('flirting-style.json');
  const {data:shivaniCastLock,error:shivaniCastLockError}=useData<ShivaniCastLock>('episode-03-shivani-cast-lock.json');
 const {data:shivaniStaffroomPlot,error:shivaniStaffroomError}=useData<ShivaniStaffroomPlot>('episode-03-shivani-staffroom-scene-plot.json');
 const {data:shivaniSceneReference,error:shivaniSceneReferenceError}=useData<ShivaniSceneReference>('episode-03-shivani-scene02-master-reference.json');
 const {data:shivaniSocietyReturn,error:shivaniSocietyReturnError}=useData<ShivaniSocietyReturn>('episode-03-shivani-scene-03-society-return-plot.json');
 const {data:shivaniNightPlan,error:shivaniNightPlanError}=useData<ShivaniNightPlan>('shivani-jan01-night-next-episode-chotu-kavya-twins-om-plot.json');
 const {data:taniyaEpisode03Plot,error:taniyaEpisode03PlotError}=useData<TaniyaEpisode03Plot>('episode-03-taniya-solo-proposed-timeline.json');
 const {data:shreyaFuture}=useData<Plan>('episode-03-shreya-plan.json');
 const {data:shreyaEpisode03Proposal,error:shreyaEpisode03ProposalError}=useData<ShreyaEpisode03Proposal>('episode-03-shreya-jan01-proposed-timeline.json');
 const {data:shreyaEpisode04Future,error:shreyaEpisode04Error}=useData<ShreyaEpisode04Future>('episode-04-shreya-future-plan.json');
 const {data:shreyaBeats0709,error:shreyaBeats0709Error}=useData<ShreyaBeats0709Draft>('episode-03-shreya-beats-07-09-refined-draft.json');
 const {data:shreyaBeat10,error:shreyaBeat10Error}=useData<ShreyaBeat10Review>('episode-03-shreya-beat-10-training-ground-review.json');
 useEffect(()=>{
  if(!initialScene)return;
  if(initialScene==='chotu-review'){
   const timer=window.setTimeout(()=>document.getElementById('ep04-chotu-planning')?.scrollIntoView({behavior:'smooth',block:'start'}),130);
   return ()=>clearTimeout(timer);
  }
  if((active==='ankita'&&['01','02','03','04','05','06','07','08'].includes(initialScene))||(active==='meenakshi'&&['01','02','03','04'].includes(initialScene))||(active==='shreya'&&['SR10','S03-01','SR11'].includes(initialScene))){openPage('reading',{episode:'03',character:active,scene:active==='shreya'&&initialScene==='SR10'?'10':initialScene});return;}
  const id=active==='ankita'
   ?(initialScene==='rohit-first-show'?'ankita-ep04-rohit-first-show':'ankita-ep03-written-moved')
   :active==='shivani'
   ?(initialScene==='cast'?'shivani-ep03-cast-lock':initialScene==='staffroom'?'shivani-ep03-staffroom-scene':initialScene==='reference'?'shivani-ep03-scene02-master-reference':initialScene==='03'?'shivani-ep03-scene03-society-return':initialScene==='night'?'shivani-jan01-night-next-episode':'')
   :active==='taniya'?(initialScene==='timeline'?'taniya-ep03-timeline':initialScene?'taniya-ep03-'+initialScene:'taniya-ep03-timeline')
   :active==='shreya'?(initialScene==='timeline'?'shreya-ep03-jan01-timeline':initialScene?'shreya-ep03-'+initialScene:'')
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
 const authorRevisionNote=writingStyle?.authorRevisionNotes20261117 as AuthorRevisionNote|undefined;
 
 
 
 
 
 
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">Writers' room · works in progress</span><h1>Episode Planning</h1><p>Only unwritten outlines and future story plans stay here. Written story scenes live in Episode Reading.</p></header>
  <button type="button" className="button subtle planning-global-link" onClick={()=>openPage('timeline')}>Open Universal Timeline</button>
  <details className="edition-note"><summary>How approvals work</summary><p>DRAFT → DISCUSSION → PLOT LOCKED → WRITING → APPROVED → PUBLISHED. Only the author can approve or lock content.</p></details>

  <div className="reading-heading"><div><span className="eyebrow">Choose a storyline</span><h2>What happens next?</h2></div></div>
  <div className="perspective-tabs" role="group" aria-label="Choose planning character">{planningLeads.map(w=><button type="button" aria-pressed={w===active} onClick={()=>openPage('planning',{lead:w})} className={w===active?'selected':''} key={w}>{titleCase(w)}</button>)}</div>
  <section className="continuity-cards" id="ep04-chotu-planning">
   <article className="episode-plan-card">
    <span className="eyebrow">Episode 04 · Chotu encounters · 1–2 January 2026 · Review only</span>
    <h2>Chotu A/B Workshop — Six Women</h2>
    <p className="source-note"><strong>NOT APPROVED / NOT PROSE:</strong> These are discussion-ready physical encounter plots. Each A is an accident; each B is a willing, independently chosen follow-up, with a different physical setup, sightline and outcome. Existing Episode 03 scenes and twins' timelines are untouched.</p>
    <p><strong>Focus:</strong> Only the established society and workplace Chotu helpers. Twins are continuity references, not added events; Soniya is a separate selectable lead. No romantic relationship is assumed from a single physical moment.</p>
    {chotuWorkshopError&&<p className="source-note">Workshop unavailable: {chotuWorkshopError}</p>}
    {chotuWorkshop?.leads.filter(person=>person.id===active).map(person=><div key={person.id} className="beat-list">
     <h3>{person.name} · A then B · by 2 January night</h3>
     <p><strong>Existing EP03 boundary:</strong> {person.endJan01}</p>
     <p><strong>Twins continuity:</strong> {person.twins}</p>
     {person.tracks.map(track=><details className="episode-outline" key={person.id+'-'+track.chotu} open>
      <summary><strong>{track.lane} Chotu — {track.chotu} ({track.age})</strong> · A {track.a.date.slice(5)} {track.a.start} → B {track.b.date.slice(5)} {track.b.start}</summary>
      <p><strong>Location:</strong> {track.setting}</p>
      <div className="beat-list">
       <div className="beat-item"><p className="eyebrow">A · Accident · {track.a.date} · {track.a.start}–{track.a.end}</p>
        <h3>{track.a.title}</h3>
        <p><strong>Actual cause:</strong> {track.a.cause}</p>
        <p><strong>Physical instant:</strong> {track.a.physical}</p>
        <p><strong>Sightline / witnesses / wardrobe:</strong> {track.a.sightline}</p>
        <p><strong>Duration:</strong> {track.a.duration}</p>
        <p><strong>Immediate psychology:</strong> {track.a.reaction}</p>
        <p><strong>Next-visit reason:</strong> {track.a.hook}</p>
       </div>
       <div className="beat-item"><p className="eyebrow">B · Willing choice · {track.b.date} · {track.b.start}–{track.b.end}</p>
        <h3>{track.b.title}</h3>
        <p><strong>Her decision:</strong> {track.b.choice}</p>
        <p><strong>Physical action:</strong> {track.b.physical}</p>
        <p><strong>Distinct test:</strong> {track.b.test}</p>
        <p><strong>Actual result and emotional reaction:</strong> {track.b.result}</p>
        <p><strong>Cut:</strong> {track.b.after}</p>
       </div>
      </div>
      <p className="source-note"><strong>Prior twins slot protected:</strong> {track.twinsContext}</p>
     </details>)}
    </div>)}
   </article>
  </section>
  {active==='taniya'&&<section className="continuity-cards" id="taniya-ep03-timeline">
    <article className="episode-plan-card">
      <span className="eyebrow">Taniya · Episode 03 · 1 January 2026 · author-approved plot · prose pending</span>
      <h2>Taniya — Episode 03: 10:50 AM Office → Second Flat Choice → Society → Home</h2>
      <p className="source-note"><strong>AUTHOR-APPROVED EP03 PLOT · PUBLISHED IN PLANNING · PROSE PENDING:</strong> Twelve concise encounter beats: Phase A (10:50–13:15, deferred EP02 office), Phase B (13:15–19:30, full shift), Phase C (Guddu, Karan/Aman, Soniya/Rahul). Redundant standalone commute and separate disclosure beats merged; Taniya's main romance remains deferred. Episode 02 source unchanged.</p>
      <p><strong>Absolute POV boundary:</strong> Soniya does not enter the story until Taniya reaches the shared flat in the final doorway beat. There are no earlier Soniya calls, messages, cutaways or dialogue.</p>
      {taniyaEpisode03Plot?<>
        <p><strong>Office shift (author-confirmed): 10:30 AM–7:30 PM (9 hours).</strong> Episode 03 officially OPENS ON-PAGE at 10:50 AM, adapting the intentionally deferred EP02 office plot; former TS16 at 1:15 PM ends Phase A, not this episode. Society arrival is only an estimate after commute.</p>
        <p className="source-note"><strong>CONTINUITY NOTE:</strong> The earlier 1:15 PM episode start and 4:05 PM office exit were superseded assistant assumptions. Defer original EP02 office TS12, TS13, TS14 and TS16 into the EP03 Phase A beats, without editing EP02 source prose or promoting old TS15 (Soniya-at-home) into the office.</p>
        {taniyaEpisode03Plot.timeIntegrity&&<p><strong>Scheduling impact:</strong> {taniyaEpisode03Plot.timeIntegrity.consequence}</p>}
        {taniyaEpisode03Plot.plotPhases&&<div className="beat-list">{taniyaEpisode03Plot.plotPhases.map(phase=><div className="beat-item" key={phase.key}><p><strong>{phase.key.toUpperCase()}:</strong> {phase.time} — {phase.state}</p>{phase.note&&<p>{phase.note}</p>}</div>)}</div>}
        <p>{taniyaEpisode03Plot.goal}</p>
        <details className="episode-outline" open>
          <summary><strong>Male figure roles — actual twins, office duo, helpers, senior/uncle figures</strong></summary>
          <div className="beat-list">{taniyaEpisode03Plot.figureMapping.map(group=><div className="beat-item" key={group.group}>
            <p><strong>{group.group}:</strong> {group.members.join(', ')}</p>
            <p>{group.why}</p>
          </div>)}</div>
        </details>
        {taniyaEpisode03Plot.interactionAudit&&<details className="episode-outline" open id="taniya-ep03-contact-audit">
          <summary><strong>CONTACT AUDIT · Taniya reactions, female duo progression and Uncle's private fantasy</strong></summary>
          <p className="source-note"><strong>Physical plot boundary:</strong> Raghav briefly steadies Taniya at her clothed waist in the office, no kiss; Andrea gives Chirag one playful cheek peck. After the earlier 19:11–19:23 Shivani/Kavya/Deepu encounter, Karan has ONE accidental clothed rear-hip contact with Taniya in the society foyer and immediately withdraws/apologizes. Guddu gives a packet only. Rahul and Soniya exchange familiar married affection at home. No new romance.</p>
          <h3>Female duo vs backend colleagues</h3>
          <div className="beat-list">{taniyaEpisode03Plot.interactionAudit.officeWomen.map(w=><div className="beat-item" key={w.name}><p><strong>{w.name} {w.age!==null?`(${w.age})`:''} — {w.role}:</strong> {w.status}</p></div>)}</div>
          <h3>Male interactions — exact plot physical contact</h3>
          <div className="beat-list">{taniyaEpisode03Plot.interactionAudit.males.map(m=><div className="beat-item" key={m.name}>
            <p><strong>{m.name} ({m.age}) · {m.beatIds.join(', ')}</strong></p>
            <p><strong>Physical:</strong> {m.physical}</p><p><strong>Relationship:</strong> {m.relationship}</p>
          </div>)}</div>
          {taniyaEpisode03Plot.interactionAudit.femalePhysical&&<><h3>Female-duo physical progression</h3><div className="beat-list">{taniyaEpisode03Plot.interactionAudit.femalePhysical.map(w=><div className="beat-item" key={w.pair}><p><strong>{w.pair} · {w.beatId}</strong></p><p><strong>Actual contact:</strong> {w.contact}</p><p><strong>Immediate reaction:</strong> {w.reaction}</p></div>)}</div></>}
          {taniyaEpisode03Plot.interactionAudit.societyPhysical&&<><h3>Society and home — exact physical contacts</h3><div className="beat-list">{taniyaEpisode03Plot.interactionAudit.societyPhysical.map(w=><div className="beat-item" key={w.pair}><p><strong>{w.pair} · {w.beatId}</strong></p><p><strong>Contact:</strong> {w.contact}</p><p><strong>Immediate response:</strong> {w.reaction}</p></div>)}</div></>}
          {taniyaEpisode03Plot.interactionAudit.taniyaReaction&&<p><strong>Taniya's reaction:</strong> {taniyaEpisode03Plot.interactionAudit.taniyaReaction}</p>}
          {taniyaEpisode03Plot.interactionAudit.uncleFantasyHint&&<p><strong>UNCLE · Reader-only fantasy hint:</strong> {taniyaEpisode03Plot.interactionAudit.uncleFantasyHint}</p>}
          <p>{taniyaEpisode03Plot.interactionAudit.note}</p>
        </details>}
        <details className="episode-outline">
          <summary>Wardrobe continuity and scene-writing restrictions</summary>
          <p>{taniyaEpisode03Plot.wardrobe}</p>
          <div className="beat-list">{taniyaEpisode03Plot.authorLocks.map((lock,i)=><p key={i}>{lock}</p>)}</div>
        </details>
        <div className="beat-list" id="taniya-ep03-ordered-beats">{taniyaEpisode03Plot.beats.map((beat,i)=>
          <details className="episode-outline" key={beat.id} id={'taniya-ep03-'+beat.id}>
            <summary><strong>{String(i+1).padStart(2,'0')} · {beat.title}</strong> — <span>{beat.time} · plot approved / prose pending</span></summary>
            <p><strong>Location:</strong> {beat.location} · <strong>Cast:</strong> {beat.cast.join(', ')}</p>
            <p><strong>Reason for this beat:</strong> {beat.purpose}</p>
            <p><strong>Plot:</strong> {beat.action}</p>
            {beat.physical&&<p><strong>Physical contact / staging:</strong> {beat.physical}</p>}
            {beat.teasing&&<p><strong>Teasing / speech direction:</strong> {beat.teasing}</p>}
            <p className="source-note"><strong>Visual direction:</strong> {beat.visual}</p>
            {beat.dialogue?.map((line,j)=><p className="dialogue" key={j}><strong>{line.speaker}:</strong> {line.line}</p>)}
            <p><strong>After-effect / transition:</strong> {beat.turn}</p>
            {taniyaEpisode03Plot.visualAssets?.filter(img=>img.beatId===beat.id).map(img=><div className="source-note" key={img.id}>
              <p><strong>EP03 GENERATED SCENE IMAGE · FOR REVIEW:</strong> <a href={img.url} target="_blank" rel="noopener noreferrer">{img.title} — View in Drive</a></p>
              <p><strong>Continuity note:</strong> {img.continuity}</p>
            </div>)}
          </details>)}</div>
        {taniyaEpisode03Plot.visualAssetFolder&&<p className="source-note"><strong>Episode 03 visual library:</strong> <a href={taniyaEpisode03Plot.visualAssetFolder.url} target="_blank" rel="noopener noreferrer">{taniyaEpisode03Plot.visualAssetFolder.title} — Drive folder</a>. {taniyaEpisode03Plot.visualAssetFolder.note}</p>}
        <p><strong>Cut at home:</strong> {taniyaEpisode03Plot.ending}</p>
      </>:<p role="status">{taniyaEpisode03PlotError||'Loading Taniya Episode 03 working draft…'}</p>}
    </article>
  </section>}
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
    <article className="episode-plan-card" id="ankita-ep03-written-moved">
      <span className="eyebrow">Ankita · EP03 · written scenes in Reader</span>
      <h2>Scenes 01–08 are already written</h2>
      <p>All eight Ankita scenes are available in Episode Reading, including revised and review-pending versions. Their duplicate plot/beat cards are removed from Planning, and the original content remains intact. Prose approval still follows each scene's recorded author decision.</p>
      <button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'03',character:'ankita',scene:'01'})}>Read all Ankita EP03 scenes →</button>
    </article>
    <article className="episode-plan-card" id="ankita-future-personal-presentation">
      <span className="eyebrow">Ankita · Future setup only · Not in Episode 03</span>
      <h2>Parked idea: Ankita’s personal presentation</h2>
      <p>The original twenty-minute self-presentation concept was removed from 1 January’s briefing. It is preserved as a possible future storyline, <strong>not</strong> an event that occurred and not an approved scene.</p>
      {ankitaFuturePresentation&&<><p><strong>Future premise:</strong> {ankitaFuturePresentation.planning.idea}</p><p className="muted">Unscheduled · No date or episode assigned · Dialogue and prose to be decided later.</p>
      <details className="episode-outline"><summary>Original author concept — preserved for future review</summary><p>{ankitaFuturePresentation.originalAuthorPromptVerbatim}</p><p><strong>Former plot:</strong> {ankitaFuturePresentation.originalPlotBeatVerbatim.plot}</p></details></>}
      {ankitaFuturePresentationError&&<p role="alert">Future Ankita presentation seed not loaded: {ankitaFuturePresentationError}</p>}
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
   {active==='shreya'&&<section className="continuity-cards" id="shreya-ep03-jan01-timeline">
     <article className="episode-plan-card">
       <span className="eyebrow">Shreya · Episode 03 · Thursday 1 January 2026 · numbered beat review</span>
       <h2>Shreya · Episode 03 Beat Index (Beat 05 moved to Episode 04)</h2>
       <p><strong>Source continuity:</strong> Episode 02 ends with SR09 at 10:15 AM. Previously approved Episode 02 prose remains untouched. SR10 and Strong-Chai prose are final and published; later Episode 03 beats remain in planning.</p>
       <p className="source-note"><strong>Different helpers:</strong> Police-station Chotu is the station chaiwala (exact full name and age provisional). Society Chintu (23) works security and was already familiar from the visitor log. The two are not the same person.</p>
       <p className="source-note"><strong>Training roster:</strong> Three formal police trainees: Rohas (24), Lokesh (24), Meera (24); Kavita (23) is a Constable in Shreya's training group. Society twins Samar and Shaan (24) are not station trainees.</p>
       {shreyaEpisode03Proposal?<>
         <p><strong>Episode clock:</strong> {shreyaEpisode03Proposal.dayScope.start}–{shreyaEpisode03Proposal.dayScope.end} · <strong>Anchor:</strong> {shreyaEpisode03Proposal.anchor}</p>
         <p className="source-note"><strong>Sequence rule:</strong> {shreyaEpisode03Proposal.reviewSequencePolicy}</p>
         <p className="muted">Approved SR10 and Strong-Chai are already published prose. Beat 05 (SR12) has moved to the Episode 04 Future Plot section below; Beat 06 numbering remains unchanged. Beats 7–9 have the author-approved Karan–Aman college plot direction: their shared incident is remembered by all three, their morning-style banter resumes, and exact prose remains pending review. Beat 10 remains the independently approved five-person training-ground plot.</p>
         <p className="source-note"><strong>Written scenes → Reader:</strong> SR10 / Beat 02 and Strong-Chai / Beat 03 are author-approved final prose. DCP SR11 / Beat 04 has a written draft, still pending author approval. They are removed from plot cards below. Remaining scene and future-held beat numbers retain their original sequence.</p>
         <div className="hero-actions"><button className="button subtle" type="button" onClick={()=>openPage('reading',{episode:'03',character:'shreya',scene:'10'})}>Read SR10</button><button className="button subtle" type="button" onClick={()=>openPage('reading',{episode:'03',character:'shreya',scene:'S03-01'})}>Read Strong-Chai</button><button className="button subtle" type="button" onClick={()=>openPage('reading',{episode:'03',character:'shreya',scene:'SR11'})}>Read DCP draft</button></div>
         <div className="beat-list" id="shreya-ordered-beats">
           {shreyaEpisode03Proposal.reviewBeatSequence.filter(slot=>!['SR10','S03-01','SR11'].includes(slot.id)).map(slot=>{
             const beat=slot.kind==='held'?shreyaEpisode03Proposal.parkedFutureEncounters.find(b=>b.id===slot.id):shreyaEpisode03Proposal.timeline.find(b=>b.id===slot.id);
             const merged=shreyaEpisode03Proposal.mergedTransitions.find(t=>t.from===slot.id);
             const held=slot.kind==='held',optional=slot.kind==='optional',bridge=slot.kind==='merged'||slot.kind==='bridge';
             return <details className={'episode-outline '+(held?'shreya-hold-beat':optional?'shreya-optional-beat':bridge?'shreya-bridge-beat':'')} key={slot.id} id={'shreya-ep03-'+slot.id}>
               <summary><strong>Beat {String(slot.number).padStart(2,'0')} · {slot.title}</strong> — <span>{slot.label}</span></summary>
               {merged&&<p><strong>One-line transition ({merged.time}):</strong> {merged.text} <em>No standalone scene.</em></p>}
               {beat&&<>
                 <p><strong>{held?'On hold · scheduled time:':'Time:'}</strong> {held?'Not scheduled (author hold)':beat.time||'Unassigned'} · <strong>Location:</strong> {held?'To be decided':beat.place||'To be decided'}</p>
                 <p><strong>Cast:</strong> {beat.characters.join(', ')}</p>
                 <p><strong>Established context:</strong> {beat.history}</p>
                 <p><strong>Event:</strong> {beat.distinctEvent}</p>
                 {beat.editorialIssueToDiscuss&&<section className="source-note" id={'shreya-review-issue-'+beat.id}>
                   <p><strong>EDITORIAL ISSUE · TO DISCUSS · {beat.editorialIssueToDiscuss.status}</strong></p>
                   <p><strong>{beat.editorialIssueToDiscuss.headline}</strong></p>
                   <p><strong>What went wrong:</strong> {beat.editorialIssueToDiscuss.reason}</p>
                   <p><strong>Next author discussion:</strong> {beat.editorialIssueToDiscuss.requiredDiscussion}</p>
                   <p><strong>Preserve prior approval:</strong> {beat.editorialIssueToDiscuss.approvalBoundary}</p>
                 </section>}
                 {held&&<p className="source-note"><strong>AUTHOR HOLD:</strong> This slot is preserved for discussion but has no active January 1 scene. Do not write, assume, or auto-advance this scene.</p>}
                 {beat.approvalScope&&<p className="source-note"><strong>Approval boundary:</strong> {beat.approvalScope}</p>}
                 {beat.wardrobeContinuity&&<p><strong>Clothing continuity:</strong> {beat.wardrobeContinuity}</p>}
                 {beat.sceneBeats&&beat.sceneBeats.length>0&&<>
                   <h3>Beat-by-beat scene plan</h3>
                   <div className="beat-list">{beat.sceneBeats.map(step=><details className="episode-outline" key={step.id}>
                     <summary><strong>{step.id} · {step.time} · {step.heading}</strong></summary>
                     <p><strong>Plot:</strong> {step.plot}</p>
                     {step.narration&&<p className="source-note"><strong>Sample visual narration (draft):</strong> {step.narration}</p>}
                     {step.dialogue?.map((line,i)=><p className="dialogue" key={i}><strong>{line[0]}:</strong> {line[1]}</p>)}
                     {step.reaction&&<p><strong>Reaction:</strong> {step.reaction}</p>}
                   </details>)}</div>
                 </>}
                 {!held&&<p><strong>Immediate reaction:</strong> {beat.reaction}</p>}
                 {beat.dialogue?.map((line,i)=><p className="dialogue" key={i}><strong>{line[0]}:</strong> {line[1]}</p>)}
                 {beat.readerOnlyAfterbeat&&<p className="source-note"><strong>Reader-only afterbeat:</strong> {beat.readerOnlyAfterbeat}</p>}
                 {beat.readerOnlyFantasy&&<p className="source-note"><strong>DCP's reader-only fantasy — proposed:</strong> {beat.readerOnlyFantasy.trigger} {beat.readerOnlyFantasy.fantasy}</p>}
                 {beat.wardrobeProposals&&<details className="episode-outline"><summary>Training outfits &amp; visual narration (plot-approved details)</summary>
                   <div className="beat-list">{Object.entries(beat.wardrobeProposals).map(([person,description])=><p key={person}><strong>{person}:</strong> {description}</p>)}</div>
                 </details>}
                 {beat.sharedMemory&&<details className="episode-outline" open>
                   <summary><strong>NEW · College encounter remembered by all three</strong> — plot locked</summary>
                   <p><strong>Shared incident:</strong> {beat.sharedMemory.event}</p>
                   <p><strong>Shreya remembers:</strong> {beat.sharedMemory.shreya}</p>
                   <p><strong>Karan remembers:</strong> {beat.sharedMemory.karan}</p>
                   <p><strong>Aman remembers:</strong> {beat.sharedMemory.aman}</p>
                   <p><strong>Normal teasing:</strong> {beat.sharedMemory.sharedBanter}</p>
                   <p className="source-note"><strong>Later continuity:</strong> {beat.sharedMemory.laterUse}</p>
                 </details>}
                 {beat.styleLock&&<p className="muted"><strong>Writing style:</strong> {beat.styleLock}</p>}
                 {held&&beat.futureArc&&<p className="source-note"><strong>Later arc only:</strong> {beat.futureArc.coreConflict} {beat.futureArc.nonsexualStakes} {beat.futureArc.trajectory}</p>}
                 {!held&&<p><strong>Cut:</strong> {beat.exit}</p>}
               </>}
               {optional&&<p className="source-note"><strong>NOT APPROVED:</strong> This offsite college segment is retained as an optional earlier proposal. Do not treat it as an obligatory event or auto-insert it into prose.</p>}
             </details>
           })}
         </div>
         <details className="episode-outline"><summary>Source locks and writing guide</summary>
           <div className="beat-list">{shreyaEpisode03Proposal.userLocks.map((lock,i)=><div className="beat-item" key={i}><p>{lock}</p></div>)}</div>
           <p>{shreyaEpisode03Proposal.editorial.sequence}</p>
         </details>
         <p className="muted">{shreyaEpisode03Proposal.editorial.approvalRule}</p>
       </>:<p role="status">{shreyaEpisode03ProposalError||'Loading the saved Shreya Episode 03 proposal…'}</p>}
     </article>
   </section>}
   {active==='shreya'&&<section className="continuity-cards" id="shreya-ep03-beats-07-09-revised-prose">
     <article className="episode-plan-card">
       <span className="eyebrow">Shreya · Episode 03 · Beats 07–09 · corrected draft (author review pending)</span>
       <h2>College encounter — private accident, compact prose</h2>
       <p className="source-note"><strong>Author correction applied:</strong> Public cyber-safety seminar, but accident happens in a private adjoining prep room with only Karan and Aman. Exact author figure: <strong>one-third (1/3)</strong> visible, in one <strong>5–6-second</strong> instant. No public witnesses, no additional button opening or long aftermath.</p>
       {shreyaBeats0709?<>
         <div className="beat-list">{shreyaBeats0709.beats.map(beat=><details className="episode-outline" key={beat.id} open id={'shreya-refined-'+beat.id}>
           <summary><strong>Beat {String(beat.number).padStart(2,'0')} · {beat.title}</strong> — {beat.time} · Draft</summary>
           <div className="source-scene prose-exact">{beat.raw.split(/\n\s*\n/).filter(Boolean).map((block,i)=><p key={i} className="ep03-paragraph" style={{whiteSpace:'pre-line',lineHeight:1.7,...(block.includes('KAM-G0')?{backgroundColor:'rgba(221,162,43,0.12)',borderLeft:'4px solid #c08a23',padding:'10px 12px',borderRadius:8}:{})}}>{block.replace(/^### /,'').replace(/\*\*/g,'').replace(/^\*(.*?)\*$/,'$1')}</p>)}</div>
         </details>)}</div>
         <p className="muted">KAM-G01 and KAM-G02 are now inserted verbatim from the author, inside one continuous 5–6-second private accident. They are highlighted in Beat 08. Beats 07–09 remain a revised draft pending overall author approval; approved older scenes were not rewritten.</p>
       </>:<p role="status">{shreyaBeats0709Error||'Loading refined Beats 07–09 draft…'}</p>}
     </article>
   </section>}
   {active==='shreya'&&<section className="continuity-cards" id="shreya-ep03-beat-10-training-ground-review">
     <article className="episode-plan-card">
       <span className="eyebrow">Shreya · Episode 03 · Beat 10 · 3:40–4:05 PM · Prose draft for author review</span>
       <h2>Training Ground — Meaningful Contest &amp; Lokesh's Clean Win</h2>
       <p className="source-note"><strong>Original approved plot protected:</strong> Five-person flag drill, Kavita's Round 1 win, Shreya's first advantage over Rohas, Lokesh reading her second pivot and winning the tag. The single closer-contact interception below is an <strong>alternate writing proposal</strong>, not a finalized correction.</p>
       {shreyaBeat10?<>
          <details className="episode-outline" open><summary>Read full revised Beat 10 prose</summary>
            <div className="source-scene prose-exact">{shreyaBeat10.prose.split(/\n\s*\n/).filter(Boolean).map((block,i)=><p key={i} style={{whiteSpace:'pre-line',lineHeight:1.7,...(block.includes('TG-G0')?{backgroundColor:'rgba(221,162,43,0.12)',borderLeft:'4px solid #c08a23',padding:'10px 12px',borderRadius:8}:{})}}>{block.replace(/^### /,'').replace(/\*\*/g,'').replace(/^\*(.*?)\*$/,'$1')}</p>)}</div>
          </details>
          <details className="episode-outline"><summary>Timing, contact issue &amp; Grok marker locations</summary>
            {shreyaBeat10.timeMarks.map((time,i)=><p key={i}><strong>{time.clock}:</strong> {time.moment}</p>)}
            <p><strong>What was weak:</strong> {shreyaBeat10.editorialReview.issue}</p>
            <p><strong>Revised proposal:</strong> {shreyaBeat10.editorialReview.thisDraftChoice}</p>
            {shreyaBeat10.grokInsertions.map(g=><p key={g.id}><strong>{g.id}:</strong> {g.purpose}</p>)}
            <p className="source-note"><strong>Author approval still needed:</strong> {shreyaBeat10.editorialReview.notYetAuthorized}</p>
          </details>
       </>:<p role="status">{shreyaBeat10Error||'Loading Training Ground draft…'}</p>}
     </article>
   </section>}
   {active==='shreya'&&<section className="continuity-cards" id="shreya-ep04-future-plots">
     <article className="episode-plan-card">
       <span className="eyebrow">Shreya · Episode 04 · Future Plot · Unscheduled</span>
       <h2>Episode 04 — The Cellblock Bet · Three Disguised Trainers</h2>
       <p className="source-note"><strong>Moved from Episode 03 Beat 05 (SR12).</strong> This is a future-training plot only. There is no Episode 03 cellblock scene, and no date or time is assigned until Episode 04 is written.</p>
       {shreyaEpisode04Future?<>
         <p><strong>Dependency:</strong> {shreyaEpisode04Future.dependency}</p>
         {shreyaEpisode04Future.futurePlots.map(plot=><details className="episode-outline" key={plot.id} open id={'shreya-ep04-'+plot.id}>
           <summary><strong>{plot.id} · {plot.title}</strong> — FUTURE / ON HOLD</summary>
           <p><strong>Real identity:</strong> {plot.identityReveal.truth}</p>
           <p><strong>Who knows:</strong> {plot.identityReveal.maleAwareness}</p>
           <p><strong>Who does not know:</strong> {plot.identityReveal.femaleAwareness}</p>
           <p><strong>Training purpose:</strong> {plot.purpose}</p>
           <p><strong>Original wager arc preserved:</strong> {plot.preservedArc}</p>
           <p><strong>Possible later attraction arc:</strong> {plot.futureAttraction}</p>
           <div className="beat-list">{plot.cast.map(person=><div className="beat-item" key={person.id}>
             <p><strong>{person.id}:</strong> {person.trainingRole} · Age {person.age} ({person.ageStatus})</p>
           </div>)}</div>
           <p className="source-note"><strong>Timing:</strong> {plot.scheduling}</p>
         </details>)}
         <p className="muted">No new actual-inmate encounter, role-play result, real sexual event or relationship is established in Episode 03.</p>
       </>:<p role="status">{shreyaEpisode04Error||'Loading Shreya Episode 04 future plot…'}</p>}
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
   <article className="episode-plan-card" id="society-wives-20261117-author-revision-rules">
      <span className="eyebrow">Author writing corrections · 17 Nov 2026 · required with Dhika style guide</span>
      <h2>Private staging · exact numbers · variable Grok markers · short aftermath</h2>
      <p><strong>Numeric fidelity:</strong> Preserve each author-specified count, fraction, duration or view angle exactly (for Shreya: one-third / 1/3; 5–6 seconds; two named observers). Never substitute a vague "small glimpse" or invent a new figure.</p>
      <p><strong>Privacy:</strong> Public college session can remain public, but this accident belongs in an adjoining private prep room, witnessed only by Karan and Aman. No invented audience or humiliation.</p>
      <p><strong>Marker selection:</strong> No fixed count: zero, one, two, ten or more if truly warranted. Keep author-specified visual segments as placeholders until supplied; do not silently convert or remove them. If too many would create a porn-like montage rather than story pacing, explain the tonal trade-off and ask which emphasis the author wants.</p>
      <p><strong>Rhythm:</strong> Dhika EP01–EP03 is a reference for brief established familiarity, a memorable incident, distinct instant reactions and a natural cut. Beat 07 brief setup; Beat 08 only significant accident; Beat 09 minimal exit/training transition.</p>
      {authorRevisionNote&&<details className="episode-outline"><summary>All author directives ({authorRevisionNote.mandatoryRules.length} rules)</summary>
        <div className="beat-list">{authorRevisionNote.mandatoryRules.map((rule,i)=><div className="beat-item" key={i}><p>{rule}</p></div>)}</div>
      </details>}
      <p className="muted">Source: flirting-style.json + WRITING-STYLE-DHIKA-EP01-EP03-RECALIBRATION.md. This note is a writing guide, not retroactive approval of any Episode 03 draft.</p>
   </article>
   <details className="episode-outline" id="society-wives-author-narrator-instructions"><summary>Author writing instructions · visual descriptions &amp; flirting style</summary>
    <p><strong>Narrator image, not a character's spoken line.</strong> Describe adult female characters using distinct body-shape metaphors/similes, walking gait, stance, silhouette, outfit fit, fabric movement and turns only when grounded in their wardrobe and scene.</p>
    <p><strong>Separate:</strong> narrator visual description · observer's glance · spoken teasing · woman's own response. Never silently omit an author-requested beat or invent new body canon.</p>
    {narratorRule?<><p><strong>Reference technique:</strong> {narratorRule.origin}</p><div className="beat-list">{narratorRule.methods.map((method,i)=><div key={i} className="beat-item"><p>{method}</p></div>)}</div><p><strong>Example vocabulary (not established body shapes):</strong> {narratorRule.examplePhrases.join(' · ')}</p><p className="muted">{narratorRule.status.replace(/_/g,' ')}</p></>:<p className="muted">{writingStyleError||'Writer style notes loading…'}</p>}
   </details>
   <div className="split"><div><span className="eyebrow">Working story lane</span><h2>{titleCase(active)}</h2><p>{active==='ankita'?'Ankita’s Scenes 01–08 have written text in Episode Reading; their duplicate scene plots are removed from Planning. The separate parked personal-presentation seed and 2 January Rohit plan are preserved unchanged. Some written text is still pending prose-level approval.':activePlan?.plan?.title||'No separate Episode 03 working draft is available here yet.'}</p></div></div>
   {active==='taniya'&&<p className="source-note">Episode 03 Taniya–Soniya plot is author-approved across twelve beats in Planning; its prose is not yet written. Soniya enters only after the full office day and society encounters.</p>}
   {active==='shivani'&&<p className="source-note">Shivani's Episode 03 group labels follow “Twins (people having same image)” — a visual/story shorthand, never an automatic biological relationship. College four: Harsh, Laksh, Nandini, Ritika. Proposed society duo: Ayaan, Armaan. Karan and Aman are occupied by Ankita's 5:20–5:50 PM scene. Separate Office/Society Chotu roles and junior teachers remain unchanged. The staffroom master reference above remains the source for writing; no new home-return plot prose is approved.</p>}
   {activePlan?.plan&&<><p><strong>Original status:</strong> {str(activePlan.plan.status)||'REVIEW'}</p>{active==='meenakshi'&&<p><strong>Older separate outline — 2 January 2026.</strong> This is not part of 1 January's Scene 01–03 sequence. Senior Review M08 stays on Jan 2.</p>}
    {active==='shreya'&&<p><strong>Date:</strong> Thursday, 1 January 2026 (author-corrected). SR10 and Strong-Chai are published and final. SR11 is a reader draft awaiting approval; SR13 is an approved short plot awaiting prose. SR12 is in Episode 04 Future Plot, unscheduled. The superseded 3 January file is archived as historical planning only.</p>}
    {active==='ankita'&&<p><strong>Date:</strong> Original draft date requires review; it has not been silently assigned to the Episode 03 canonical timeline.</p>}
    <details><summary>Full planning notes</summary><pre>{JSON.stringify(activePlan.plan,null,2)}</pre></details></>}
  </section>
 </main>
}
