import { openPage, useData } from './lib';

type Beat={id:string;title:string;plot?:string;action?:string};
type PlanScene={id:string;order:number;title:string;dateCandidate?:string;time?:string;location?:string;status:string;purpose?:string;cast?:string[];beats?:Beat[];historyAnchors?:string[];existingAnchors?:string[];proseStatus?:string;publication?:string};
type SlipProposal={status:string;relativePlacement:string;purpose:string;mechanism:string;reactions:Record<string,string>;continuity:string;reviewQuestion:string};
type LeadPlan={title:string;lead:string;episode:string;status:string;authorDirection:string;sceneOrder:PlanScene[];marriageSetupLocks?:Record<string,unknown>;societyRoutine?:Record<string,string>;officeActiveWomen?:string[];officeOthers?:string;nextScenes?:string[];rules?:string[];karanAmanFirstAccidentalVisibilityProposal?:SlipProposal};
type Slot={window:string;use:string;participants:string[];status:string;notes?:string};
type Availability={title:string;status:string;pair:{names:string[];relationship:string;priorScene:string;academics:Record<string,string>};fiveLeadLinks:{lead:string;status:string;existing:string;dateStatus:string}[];dailyFramework:{date:string;label:string;slots:Slot[]}[];schedulingRules:string[]};
const routes=[{id:'ankita',label:'Ankita × Kabir'},{id:'shreya',label:'Shreya × Vikram'}];
const tidy=(s:string)=>s.replace(/_/g,' ');
export default function Episode06LeadPlanning({lead}:{lead:'ankita'|'shreya'}){
 const {data:plan,loading,error}=useData<LeadPlan>(lead==='ankita'?'episode-06-ankita-plan.json':'episode-06-shreya-plan.json');
 const {data:twins,loading:twinsLoading,error:twinsError}=useData<Availability>('episode-06-karan-aman-shared-availability.json');
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
   {lead==='ankita'&&<section className="episode-plan-card" id="ep06-office-cast"><h2>Ankita office group · active cast</h2><p>Female colleagues: <strong>{plan.officeActiveWomen?.join(' and ')}</strong>. Vivan–Reyansh are a workplace design duo, not biological twins. All other tentative female office names are archived historically, but excluded from new EP06 participation.</p><p>{plan.officeOthers}</p><p><strong>2 January missed walk:</strong> {plan.societyRoutine?.jan02MissedReason}</p></section>}
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
