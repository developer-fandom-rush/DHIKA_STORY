import {openPage,useData} from './lib';

type Beat={id:string;label:string;action:string};
type Scene={id:string;order:number;date:string;start:string|null;end:string|null;title:string;location:string;characters:string[];mentions?:string[];status:string;beats:Beat[]};
type TaniyaPlan={title:string;status:string;mode:string;scenes:Scene[];canonLocks:string[];groups:Record<string,{members:string[];role:string;cadence:string}>;excludedFromActiveEpisode06FemaleCoworkers:string[];historicalOfficeWomenPreserved:Record<string,string>;schedulePolicies:string[];futureAuthorDirection:Record<string,string>};
const displayDate=(d:string)=>d==='2026-01-03'?'Saturday · 3 January':d==='2026-01-04'?'Sunday · 4 January':'Monday · 5 January';
const time=(s:Scene)=>s.start&&s.end?s.start+'–'+s.end:'Unscheduled / future hold';
const label=(s:string)=>s.replace(/_/g,' ').toLowerCase();
export default function Taniya06Planning(){
 const {data:plan,loading,error}=useData<TaniyaPlan>('episode-06-taniya-plan.json');
 return <main className="page-width" id="taniya-episode06-plot">
  <header className="section-intro"><span className="eyebrow">Society Wives · Story Plot · Episode 06</span>
   <h1>Taniya · 3–5 January · Trainer, study groups &amp; CA office</h1>
   <p>Plot-only working handoff: Friday Episode 05 is preserved exactly. Saturday 5:00 AM Vivek Rao visit, Soniya's call, separate real twin and CA colleagues' tutoring tracks; Monday returns to CA work. Timing is editorial and not frozen prose.</p>
  </header>
  <div className="chapter-controls">
   <button className="button primary" type="button" onClick={()=>openPage('sw-timeline',{date:'2026-01-03'})}>Global Timeline · 3 Jan →</button>
   <button className="button subtle" type="button" onClick={()=>openPage('planning',{lead:'taniya',part:'05'})}>Earlier Episode 05 plot →</button>
   <a className="button subtle" href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/source-vault/ep05-taniya-jan02.json" target="_blank" rel="noreferrer">Original Taniya EP05 source →</a>
  </div>
  {loading&&<p role="status">Loading Taniya Episode 06 plot…</p>}
  {error&&<p role="alert" className="error">Could not load Taniya Episode 06 plot: {error}</p>}
  {plan&&<>
   <section className="episode-plan-card" id="tan06-status">
    <h2>Planning status and source boundary</h2>
    <p><strong>{label(plan.status)}</strong></p>
    <p>Uncle and Gopal discoveries in Episode 05 were real. The later Gopal/Mahendra continuation was a dream. No separate Uncle fantasy is written into Saturday's first scene. Taniya remains Aditya's fiancée, not his wife.</p>
    <p>Vivek Rao (30, trainer) and Vivek Suri (55, CA senior partner) are distinct adults. Their appointments remain separate.</p>
   </section>
   <section className="episode-plan-card" id="tan06-three-days">
    <h2>Three-day scene/beat sheet</h2>
    {['2026-01-03','2026-01-04','2026-01-05'].map((d,i)=><details className="episode-outline" key={d} open={i===0}>
     <summary><strong>{displayDate(d)}</strong> · {plan.scenes.filter(x=>x.date===d).length} scene markers</summary>
     {plan.scenes.filter(x=>x.date===d).map(s=><article className="encounter-card" key={s.id} id={s.id}>
      <h3>{time(s)} · {s.title}</h3>
      <p className="muted"><strong>{s.location}</strong> · {label(s.status)}</p>
      <p><strong>Participants:</strong> {s.characters.length?s.characters.join(' · '):'None booked; future academic contact only'}</p>
      <ol>{s.beats.map(b=><li key={b.id}><strong>{b.label}:</strong> {b.action}</li>)}</ol>
     </article>)}
    </details>)}
   </section>
   <section className="episode-plan-card" id="tan06-groups">
    <h2>Study groups and recurring sessions</h2>
    {Object.entries(plan.groups).map(([k,g])=><article className="encounter-card" key={k}>
     <h3>{g.members.join(' · ')}</h3>
     <p>{g.role}</p><p className="muted"><strong>Cadence:</strong> {g.cadence}</p>
    </article>)}
   </section>
   <section className="episode-plan-card" id="tan06-office-women">
    <h2>Office women · preserved history, not newly activated</h2>
    <p>Per author direction, there are no new female CA colleague scenes in Taniya Episode 06. Existing names in earlier manuscripts are preserved and are <strong>not</strong> replaced by invented colleagues or new portraits.</p>
    {Object.entries(plan.historicalOfficeWomenPreserved).map(([n,h])=><p key={n}><strong>{n}:</strong> {h}</p>)}
   </section>
   <section className="episode-plan-card" id="tan06-boundaries"><h2>Timing and continuity rules</h2>
    <ul>{plan.schedulePolicies.map((s,i)=><li key={i}>{s}</li>)}</ul>
    <p className="muted">No final prose or image assets are added by this episode plan. The Sunday Karan–Aman crossover remains conditional on the five-lead availability gate.</p>
   </section>
  </>}
 </main>;
}
