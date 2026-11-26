import { openPage, useData } from './lib';

type Beat={id:string;time:string;title:string;status:string;people:string[];actions:string[]};
type Day={date:string;label:string;blocks:Beat[]};
type Audit={lead:string;source:string;status:string;constraint:string};
type Group={group:string;status:string;placement:string;summary:string};
type Episode06={title:string;status:string;policy:string;pre06Audit:Audit[];days:Day[];groups:Group[];weeklyTemplate:string[];open:string[]};

export default function Shivani06Planning(){
 const {data:plot,loading,error}=useData<Episode06>('shivani-episode-06-three-day-plot.json');
 return <main className="page-width" id="shivani-ep06-three-days">
  <header className="section-intro"><span className="eyebrow">Society Wives · Episode 06 · Plot only</span>
   <h1>Shivani · 3–5 January 2026</h1>
   <p>Three-day global plot: approved A/B/C foundations, open Group D, Kavya and society continuity. No old reader prose rewritten.</p>
  </header>
  <div className="chapter-controls">
   <button className="button primary" type="button" onClick={()=>openPage('sw-timeline',{date:'2026-01-03'})}>Universal Timeline · 3 Jan →</button>
   <button className="button subtle" type="button" onClick={()=>openPage('study-circle')}>Shared five-lead JAM mentoring →</button>
   <button className="button subtle" type="button" onClick={()=>openPage('future-reference',{lead:'shivani'})}>Shivani Future Reference →</button>
   <button className="button subtle" type="button" onClick={()=>openPage('planning',{lead:'shivani',part:'A'})}>Earlier plot →</button>
  </div>
  {loading&&<p role="status">Loading Shivani EP06 plot…</p>}
  {error&&<p role="alert" className="error">Could not load the saved EP06 plot: {error}</p>}
  {plot&&<>
   <section className="episode-plan-card" id="sh06-status"><h2>Editorial status</h2><p><strong>{plot.status.replace(/_/g,' ')}</strong></p><p>{plot.policy}</p></section>
   <section className="episode-plan-card" id="sh06-history"><h2>Episodes 01–05 · five-lead continuity audit</h2>
    <p className="muted">Reader-published, working drafts and source-only records remain separate. This does not mark unfinished manuscripts final.</p>
    {plot.pre06Audit.map(a=><details className="episode-outline" key={a.lead}><summary><strong>{a.lead}</strong> · {a.status.replace(/_/g,' ')}</summary>
     <p><strong>Current history:</strong> {a.source}</p><p><strong>Continuity protection:</strong> {a.constraint}</p>
    </details>)}
   </section>
   <section className="episode-plan-card" id="sh06-days"><h2>Three-day plot timeline</h2>
    {plot.days.map((day,i)=><details className="episode-outline" id={'sh06-'+day.date} key={day.date} open={i===0}><summary><strong>{day.label}</strong> · {day.date}</summary>
     {day.blocks.map(b=><article className="encounter-card" id={b.id} key={b.id}>
      <h3>{b.time} · {b.title}</h3><p className="muted"><strong>Status:</strong> {b.status.replace(/_/g,' ')}</p><p><strong>Who:</strong> {b.people.join(' · ')}</p>
      <ol>{b.actions.map((a,j)=><li key={j}>{a}</li>)}</ol>
     </article>)}
    </details>)}
   </section>
   <section className="episode-plan-card" id="sh06-groups"><h2>Approved plot versus open Group D</h2>
    {plot.groups.map(g=><article className="encounter-card" key={g.group}><h3>Group {g.group}</h3><p><strong>{g.status}</strong></p><p><strong>Placement:</strong> {g.placement}</p><p>{g.summary}</p></article>)}
   </section>
   <section className="episode-plan-card" id="sh06-calendar"><h2>Monday onward · proposed weekly calendar</h2>
    {plot.weeklyTemplate.map((line,i)=><p key={i}>{line}</p>)}
   </section>
   <section className="episode-plan-card" id="sh06-unresolved"><h2>Remaining discussion · not removed</h2>
    <ul>{plot.open.map((issue,i)=><li key={i}>{issue}</li>)}</ul>
   </section>
  </>}
 </main>;
}
