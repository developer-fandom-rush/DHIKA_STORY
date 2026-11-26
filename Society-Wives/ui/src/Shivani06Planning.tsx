import { openPage, useData } from './lib';

type Beat={id:string;time:string;title:string;status:string;people:string[];actions:string[]};
type Day={date:string;label:string;blocks:Beat[]};
type Audit={lead:string;source:string;status:string;constraint:string};
type Group={group:string;status:string;placement:string;summary:string};
type GroupLedger={group:string;status:string;history:string;trigger:string;actions:string[];next:string};
type KavyaBridge={status:string;dateCandidate:string;history:string;setting:string;activeInitiator:string;firstPhysicalBridge:string;differentiatedResponse:string;nextConnection:string;continuity:string};
type ReaderCount={lead:string;readerEntries:number;status:string};
type Episode06={groupReactionLedger?:GroupLedger[];kavyaBridge?:KavyaBridge;title:string;status:string;policy:string;pre06Audit:Audit[];days:Day[];groups:Group[];weeklyTemplate:string[];open:string[];societyCrossHouseholdGate?:{status:string;scope:string;rule:string;nextLeads:string[];reference:string};auditCorrections?:{episode04B:string;episode05:string;uncle:string;episode04BReaderCounts?:ReaderCount[];episode05ReaderCounts?:{combinedAnkitaShreya:number;meenakshiShivaniExternalDoc:number;taniyaExternalDoc:number;separateDocsInReader:boolean}}};

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
   {plot.groupReactionLedger&&<section className="episode-plan-card" id="sh06-action-ledger"><h2>Groups A–D · approved action/reaction detail</h2><p className="muted">Preserve prior encounters, different sightlines, reaction types and future options. Final dialogue and prose can be revised without erasing approved plot foundations.</p>
    {plot.groupReactionLedger.map(g=><details className="episode-outline" key={g.group} open={g.group==='D'}><summary><strong>Group {g.group}</strong> · {g.status.replace(/_/g,' ')}</summary><p><strong>Established history:</strong> {g.history}</p><p><strong>Trigger:</strong> {g.trigger}</p><ol>{g.actions.map((a,i)=><li key={i}>{a}</li>)}</ol><p className="muted"><strong>Next:</strong> {g.next}</p></details>)}</section>}
   {plot.kavyaBridge&&<section className="episode-plan-card" id="sh06-kavya-bridge"><h2>Kavya × Karan–Aman · first physical bridge</h2><p><strong>Status:</strong> {plot.kavyaBridge.status.replace(/_/g,' ')}</p><p><strong>Candidate:</strong> {plot.kavyaBridge.dateCandidate}</p><p><strong>History:</strong> {plot.kavyaBridge.history}</p><p><strong>Natural entry:</strong> {plot.kavyaBridge.setting}</p><p><strong>Kavya initiates:</strong> {plot.kavyaBridge.firstPhysicalBridge}</p><p><strong>Two different twins:</strong> {plot.kavyaBridge.differentiatedResponse}</p><p><strong>Next link:</strong> {plot.kavyaBridge.nextConnection}</p><p className="muted">{plot.kavyaBridge.continuity}</p></section>}
      {plot.societyCrossHouseholdGate&&<section className="episode-plan-card" id="sh06-society-hold"><h2>Five-lead society timeline · HOLD</h2><p><strong>{plot.societyCrossHouseholdGate.status.replace(/_/g,' ')}</strong></p><p>{plot.societyCrossHouseholdGate.rule}</p><p><strong>Scope:</strong> {plot.societyCrossHouseholdGate.scope}</p><p><strong>Other lead plots to reconcile:</strong> {plot.societyCrossHouseholdGate.nextLeads.join(' · ')}.</p><p><a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/episode-06-cross-household-hold.json" target="_blank" rel="noreferrer">Full five-household scheduling gate</a></p><p><strong>Cross-lead Episode 06:</strong> <a href="#/planning?lead=ankita&part=06">Ankita–Kabir marriage-first plot</a> · <a href="#/planning?lead=shreya&part=06">Shreya–Vikram marriage-first plot</a> · <a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/episode-06-karan-aman-shared-availability.json" target="_blank" rel="noreferrer">Karan/Aman daily shared soft holds</a>. Proposed Sunday: Shivani 11:30–12:15, Kavya 16:30–17:05. The source action chains are approved; times remain subject to author/household review.</p></section>}
   {plot.auditCorrections&&<section className="episode-plan-card" id="sh06-reader-audit"><h2>Reader and Uncle source audit</h2><p><strong>EP04B:</strong> {plot.auditCorrections.episode04B}</p>{plot.auditCorrections.episode04BReaderCounts&&<div className="encounter-card"><h3>EP04B reader · each lead</h3>{plot.auditCorrections.episode04BReaderCounts.map(row=><p key={row.lead}><strong>{row.lead}:</strong> {row.readerEntries} entries · {row.status.replace(/_/g,' ')}</p>)}</div>}<p><strong>EP05:</strong> {plot.auditCorrections.episode05}</p><p><strong>Uncle material:</strong> {plot.auditCorrections.uncle}</p><p><a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/episode-catalog.json" target="_blank" rel="noreferrer">Publication statuses (catalog)</a></p></section>}
      <section className="episode-plan-card" id="sh06-unresolved"><h2>Remaining discussion · not removed</h2>
    <ul>{plot.open.map((issue,i)=><li key={i}>{issue}</li>)}</ul>
   </section>
  </>}
 </main>;
}
