import { assetUrl, openPage, useData } from './lib';

type Beat={id:string;title:string;plot?:string;action?:string};
type PlanScene={id:string;order:number;title:string;dateCandidate?:string;time?:string;location?:string;status:string;purpose?:string;cast?:string[];beats?:Beat[];historyAnchors?:string[];existingAnchors?:string[];proseStatus?:string;publication?:string};
type SlipProposal={status:string;relativePlacement:string;purpose:string;mechanism:string;reactions:Record<string,string>;continuity:string;reviewQuestion:string};
type LeadPlan={title:string;lead:string;episode:string;status:string;authorDirection:string;sceneOrder:PlanScene[];marriageSetupLocks?:Record<string,unknown>;societyRoutine?:Record<string,string>;officeActiveWomen?:string[];officeOthers?:string;nextScenes?:string[];rules?:string[];karanAmanFirstAccidentalVisibilityProposal?:SlipProposal};
type MentorMember={name:string;age?:number;profession?:string;sourceOccupation?:string;mentoringFit?:string;role?:string;expertise?:string};
type MentorWindow={date:string;day:string;time:string;location:string;status:string};
type MentorSlip={status:string;candidate?:string;mechanism?:string;reactionOrder?:string[];reactions?:string;reason?:string;novelty?:string};
type MentorLane={id:string;label:string;kind:string;members:MentorMember[];frequency?:string;formalSessions?:string;project?:{name:string;objective:string;roles:Record<string,string>};firstWeekCandidates?:MentorWindow[];firstAccidentalSlipProposal?:MentorSlip;introduction?:string;outsideTechSession?:string;mentoringFit?:string;schedule?:string};
type MentorPlan={title:string;status:string;authorPrinciples:string[];lanes:MentorLane[];scheduleCollisionPolicy:string[]};
type Slot={window:string;use:string;participants:string[];status:string;notes?:string};
type Availability={title:string;status:string;pair:{names:string[];relationship:string;priorScene:string;academics:Record<string,string>};fiveLeadLinks:{lead:string;status:string;existing:string;dateStatus:string}[];dailyFramework:{date:string;label:string;slots:Slot[]}[];schedulingRules:string[]};
const routes=[{id:'ankita',label:'Ankita × Kabir'},{id:'shreya',label:'Shreya × Vikram'}];
const tidy=(s:string)=>s.replace(/_/g,' ');
export default function Episode06LeadPlanning({lead}:{lead:'ankita'|'shreya'}){
 const {data:plan,loading,error}=useData<LeadPlan>(lead==='ankita'?'episode-06-ankita-plan.json':'episode-06-shreya-plan.json');
 const {data:twins,loading:twinsLoading,error:twinsError}=useData<Availability>('episode-06-karan-aman-shared-availability.json');
 const {data:mentoring,loading:mentoringLoading,error:mentoringError}=useData<MentorPlan>('episode-06-ankita-mentoring-setup.json');
 return <main className="page-width" id={'episode06-plan-'+lead}>
  <header className="section-intro"><span className="eyebrow">Story Plot · Episode 06 · 3–5 January 2026</span>
   <h1>{lead==='ankita'?'Ankita':'Shreya'} · Marriage first</h1>
   <p>The author has locked scene order, not an invented wedding date or unpublished prose. Start with the husband-wife relationship foundation, then discuss other encounters one at a time.</p></header>
  <div className="chapter-controls" role="group" aria-label="Choose Episode 06 lead">
   {routes.map(r=><button key={r.id} className={lead===r.id?'button primary':'button subtle'} type="button" aria-pressed={lead===r.id} onClick={()=>openPage('planning',{lead:r.id,part:'06'})}>{r.label}</button>)}
   <button className="button subtle" type="button" onClick={()=>openPage('planning',{lead:'shivani',part:'06'})}>Shivani · EP06 →</button>
  </div>
  {loading&&<p role="status">Loading Episode 06 plan…</p>}
  {error&&<p role="alert" className="error">Episode 06 plan unavailable: {error}</p>}
  {plan&&<>
   <section className="episode-plan-card" id="ep06-first-scene"><h2>Scene 01 · Author-locked first position</h2><p><strong>{plan.sceneOrder[0]?.title}</strong></p>
    <p><strong>Status:</strong> {tidy(plan.sceneOrder[0]?.status||'OPEN')}</p><p>{plan.authorDirection}</p>
    <p className="muted">This is the source-backed planning order, not final Reader prose. Exact Saturday clock and relationship origin are still open.</p>
   </section>
   <section className="episode-plan-card" id="ep06-scene-list"><h2>Episode 06 · Scene sequence</h2>
    {plan.sceneOrder.map((scene,i)=><details className="episode-outline" key={scene.id} open={i===0} id={'ep06-scene-'+scene.id}>
     <summary><strong>Scene {String(scene.order).padStart(2,'0')} · {scene.title}</strong></summary>
     <p><strong>Approval:</strong> {tidy(scene.status)}</p>{scene.time&&<p><strong>Clock:</strong> {scene.time}</p>}{scene.location&&<p><strong>Setting:</strong> {scene.location}</p>}{scene.purpose&&<p><strong>Purpose:</strong> {scene.purpose}</p>}
     {(scene.historyAnchors||scene.existingAnchors)?.length? <><h3>Prior history · do not rewrite</h3><ul>{(scene.historyAnchors||scene.existingAnchors||[]).map((x,k)=><li key={k}>{x}</li>)}</ul></>:null}
     {scene.beats?.length?<><h3>Action & emotional outline</h3><ol>{scene.beats.map(b=><li key={b.id}><strong>{b.title}:</strong> {b.plot||b.action}</li>)}</ol></>:<p className="muted">Discussion remains open; no new prose or encounter invented.</p>}
    </details>)}
   </section>
   {lead==='ankita'&&<section className="episode-plan-card" id="ep06-ankita-home-workout-reference">
    <h2>Ankita × Karan–Aman · indoor workout look</h2>
    <p><strong>Visual reference selected:</strong> olive racerback sports bra and matching fitted athletic shorts. It fulfills Karan's earlier request by Ankita's own choice; it was not a prior promise.</p>
    <figure style={{margin:'1rem 0',maxWidth:'520px'}}>
      <a href={assetUrl('assets/ankita-home-workout-reference.svg')} target="_blank" rel="noreferrer" aria-label="Open front and back workout reference">
        <img src={assetUrl('assets/ankita-home-workout-reference.svg')} alt="Indoor front and back outfit views of Ankita in olive gym clothes, with Karan and Aman reacting naturally" loading="lazy" style={{display:'block',width:'100%',height:'auto',borderRadius:'12px'}} />
      </a>
      <figcaption className="muted">Front / back / reactions · private home workout, no accident. Compressed preview of the generated reference image.</figcaption>
    </figure>
    <p><strong>3 January:</strong> Keep the 20-push-up challenge, teasing and Aman Java doubts unchanged. A separate accidental slip is optional and not depicted here.</p>
    <h3>Ayaan–Armaan · independent JAM support proposal</h3>
    <p>The existing 1 January lift contact can lead to a direct request to Ankita. Proposed first approach: Saturday 3 January, 16:20–16:35, in the society's quiet common area. No Shivani introduction is required.</p>
    <p><strong>Ankita's credible subjects:</strong> CBT test interface, mock timing, mistake tracking, score analysis. Tuesday 19:30–20:15 and Saturday 17:00–17:45 are suggested—not confirmed—weekly blocks.</p>
    <p><strong>Kabir:</strong> After the marriage-foundation opening, Ankita discusses these two commitments with her husband and agrees a household routine together. Ayaan–Armaan's accident idea stays postponed until their academic rapport is established.</p>
    <p className="muted">Plot-only reference. <a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/ankita-ep06-home-workout-reference.json" target="_blank" rel="noreferrer">Full status, schedule and continuity record</a>.</p>
   </section>}
   {lead==='ankita'&&<section className="episode-plan-card" id="ep06-office-cast"><h2>Ankita office group · active cast</h2><p>Female colleagues: <strong>{plan.officeActiveWomen?.join(' and ')}</strong>. Vivan–Reyansh are a workplace design duo, not biological twins. All other tentative female office names are archived historically, but excluded from new EP06 participation.</p><p>{plan.officeOthers}</p><p><strong>2 January missed walk:</strong> {plan.societyRoutine?.jan02MissedReason}</p></section>}
   {lead==='ankita'&&<section className="episode-plan-card" id="ep06-ankita-mentor-lanes"><h2>Ankita's three separate pair tracks · schedule under review</h2>
    <p>Household Karan–Aman are already in daily contact with Ankita. Only long structured practice and outside meetings require calendar bookings. An office design duo is not biological twins, and the JAM study pair is separate.</p>
    {mentoringLoading&&<p role="status">Loading learning paths…</p>}
    {mentoringError&&<p role="alert" className="error">{mentoringError}</p>}
    {mentoring&&<><p className="muted"><strong>Source status:</strong> {tidy(mentoring.status)}</p>
     {mentoring.lanes.map((lane,i)=><details className="episode-outline" key={lane.id} open={i===0} id={'ep06-mentor-'+lane.id}>
      <summary><strong>{lane.label}</strong> · {tidy(lane.kind)}</summary>
      <p><strong>Participants:</strong> {lane.members.map(x=>x.name).join(' · ')}</p>
      {lane.mentoringFit&&<p><strong>Ankita's credible fit:</strong> {lane.mentoringFit}</p>}
      {lane.frequency&&<p><strong>Cadence:</strong> {lane.frequency}</p>}
      {lane.formalSessions&&<p><strong>Structured sessions:</strong> {lane.formalSessions}</p>}
      {lane.introduction&&<p><strong>First connection:</strong> {lane.introduction}</p>}
      {lane.project&&<><p><strong>Legitimate project:</strong> {lane.project.name} — {lane.project.objective}</p>{Object.entries(lane.project.roles).map(([name,role])=><p key={name}><strong>{name}:</strong> {role}</p>)}</>}
      {lane.outsideTechSession&&<p><strong>HR role:</strong> {lane.outsideTechSession}</p>}
      {lane.schedule&&<p><strong>Study constraint:</strong> {lane.schedule}</p>}
      {lane.firstWeekCandidates&&<><h3>First-week session suggestions — not booked</h3>{lane.firstWeekCandidates.map(w=><p key={w.date}><strong>{w.day} {w.date} · {w.time}:</strong> {w.location} · {tidy(w.status)}</p>)}</>}
      {lane.firstAccidentalSlipProposal&&<><h3>Accidental moment · {tidy(lane.firstAccidentalSlipProposal.status)}</h3>{lane.firstAccidentalSlipProposal.candidate&&<p><strong>When:</strong> {lane.firstAccidentalSlipProposal.candidate}</p>}{lane.firstAccidentalSlipProposal.mechanism&&<p><strong>Staging:</strong> {lane.firstAccidentalSlipProposal.mechanism}</p>}{lane.firstAccidentalSlipProposal.reactionOrder?.map((r,i)=><p key={i}><strong>Reaction {i+1}:</strong> {r}</p>)}{lane.firstAccidentalSlipProposal.reactions&&<p>{lane.firstAccidentalSlipProposal.reactions}</p>}{lane.firstAccidentalSlipProposal.reason&&<p><strong>Why reserved:</strong> {lane.firstAccidentalSlipProposal.reason}</p>}</>}
     </details>)}
     <p className="muted">Canonical source: <a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/episode-06-ankita-mentoring-setup.json" target="_blank" rel="noreferrer">Ankita's three-pair mentoring plan</a>. All newly proposed times and wardrobe beats require author confirmation.</p></>}
   </section>}
      {lead==='ankita'&&plan.karanAmanFirstAccidentalVisibilityProposal&&<section className="episode-plan-card" id="ep06-twin-accident-proposal"><h2>Karan–Aman · first accidental wardrobe shift (proposal only)</h2><p><strong>{tidy(plan.karanAmanFirstAccidentalVisibilityProposal.status)}</strong></p><p>{plan.karanAmanFirstAccidentalVisibilityProposal.mechanism}</p><p><strong>Why here:</strong> {plan.karanAmanFirstAccidentalVisibilityProposal.purpose}</p>{Object.entries(plan.karanAmanFirstAccidentalVisibilityProposal.reactions).map(([name,reaction])=><p key={name}><strong>{name}:</strong> {reaction}</p>)}<p className="muted">{plan.karanAmanFirstAccidentalVisibilityProposal.continuity}</p><p><strong>Awaiting discussion:</strong> {plan.karanAmanFirstAccidentalVisibilityProposal.reviewQuestion}</p></section>}
      {lead==='shreya'&&<section className="episode-plan-card" id="ep06-shreya-next"><h2>After the marriage opening</h2><ul>{(plan.nextScenes||[]).map((s,i)=><li key={i}>{s}</li>)}</ul></section>}
  </>}
  <section className="episode-plan-card" id="ep06-twin-calendar"><h2>Karan–Aman · shared 3-day availability (soft holds)</h2><p>One twin pair across five female leads, with Kavya's separate approved bridge. Provisional windows prevent conflicts, but are <strong>not confirmed visits</strong>.</p>
   {twinsLoading&&<p role="status">Loading shared calendar…</p>}{twinsError&&<p role="alert" className="error">{twinsError}</p>}
   {twins&&<>
    <p><strong>{twins.pair.relationship}</strong></p><p><strong>Previous approved ride:</strong> {twins.pair.priorScene}</p>
    <h3>Character roles</h3><p><strong>Karan:</strong> {twins.pair.academics.Karan}</p><p><strong>Aman:</strong> {twins.pair.academics.Aman}</p>
    {twins.dailyFramework.map(day=><details key={day.date} className="episode-outline" open={day.date==='2026-01-04'}><summary><strong>{day.label} · {day.date}</strong> · {day.slots.length} proposed/available windows</summary>
     <div className="continuity-cards">{day.slots.map((slot,i)=><article className="encounter-card" key={i}><h3>{slot.window}</h3><p>{slot.use}</p><p className="muted">{tidy(slot.status)}</p>{slot.notes&&<p>{slot.notes}</p>}</article>)}</div>
    </details>)}
    <h3>Who needs cross-lead confirmation?</h3>{twins.fiveLeadLinks.map(x=><p key={x.lead}><strong>{x.lead}:</strong> {x.dateStatus} · <span className="muted">{tidy(x.status)}</span></p>)}
    <p className="muted">Planning source: <a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/episode-06-karan-aman-shared-availability.json" target="_blank" rel="noreferrer">Five-lead daily availability ledger</a></p>
   </>}
  </section>
 </main>;
}
