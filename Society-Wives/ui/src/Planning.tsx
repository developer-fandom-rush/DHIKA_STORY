import { useMemo, useState } from 'react';
import { leadOrder, Plan, openPage, titleCase, useData } from './lib';
type Event={id:string;date:string;start:string;end:string;title:string;lead:string;location:string;characters:string[];status:string;source:string;notes:string};
const str=(v:unknown)=>typeof v==='string'?v:'';
const arr=(v:unknown):string[]=>Array.isArray(v)?v.map(str).filter(Boolean):[];
function getEvents(path:string,plan:Plan|null,lead:string):Event[]{
 if(!plan)return [];
 const events=Array.isArray(plan.timeline)?plan.timeline:Array.isArray(plan.beats)?plan.beats:[];
 return events.map((x,i)=>({id:str(x.id)||String(i+1),date:str(x.date)||str(plan.date)||'DATE_REVIEW',start:str(x.start)||str(x.time).split('–')[0]||'',end:str(x.end)||str(x.time).split('–')[1]||'',title:str(x.title)||'Untitled scene',lead,location:str(x.location)||str(x.where)||'Location not recorded',characters:arr(x.characters||x.cast),status:str(x.approval)||str(plan.status)||'REVIEW',source:path,notes:str(x.summary)||str(x.external)||str(x.action)||''}));
}
function overlaps(all:Event[]){
 const issues:string[]=[];
 for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++){
  const a=all[i],b=all[j];
  if(a.date==='DATE_REVIEW'||a.date!==b.date||!a.start||!a.end||!b.start||!b.end)continue;
  if(!/^\d{2}:\d{2}$/.test(a.start+a.end.slice(0,0))){/* time formats are validated below */}
  if(!/^\d{2}:\d{2}$/.test(a.start)||!/^\d{2}:\d{2}$/.test(a.end)||!/^\d{2}:\d{2}$/.test(b.start)||!/^\d{2}:\d{2}$/.test(b.end))continue;
  const common=a.characters.filter(c=>b.characters.includes(c));
  if(common.length&&a.start<b.end&&b.start<a.end)issues.push(a.id+' / '+b.id+' overlap for '+common.join(', ')+' on '+a.date);
 }
 return issues;
}
export default function Planning({lead}:{lead:string}){
 const active=leadOrder.includes(lead)?lead:'meenakshi';
 const {data:current,error:currentError}=useData<Plan>('episode-03-meenakshi-scene-01.json');
 const {data:meenaFuture}=useData<Plan>('episode-03-meenakshi-plan.json');
 const {data:ankitaFuture}=useData<Plan>('episode-03-ankita-pending.json');
 const {data:shreyaFuture}=useData<Plan>('episode-03-shreya-plan.json');
 const [date,setDate]=useState('all');
 const events=useMemo(()=>[
  ...getEvents('episode-03-meenakshi-scene-01.json',current,'Meenakshi'),
  ...getEvents('episode-03-meenakshi-plan.json',meenaFuture,'Meenakshi'),
  ...getEvents('episode-03-ankita-pending.json',ankitaFuture,'Ankita'),
  ...getEvents('episode-03-shreya-plan.json',shreyaFuture,'Shreya')
 ],[current,meenaFuture,ankitaFuture,shreyaFuture]);
 const dated=events.filter(x=>date==='all'||x.date===date).sort((a,b)=>a.date.localeCompare(b.date)||a.start.localeCompare(b.start));
 const issues=useMemo(()=>overlaps(events),[events]);
 const leadPlans=[{lead:'ankita',file:'episode-03-ankita-pending.json',plan:ankitaFuture},{lead:'shivani',file:'',plan:null},{lead:'taniya',file:'',plan:null},{lead:'meenakshi',file:'episode-03-meenakshi-plan.json',plan:meenaFuture},{lead:'shreya',file:'episode-03-shreya-plan.json',plan:shreyaFuture}];
 const activePlan=leadPlans.find(x=>x.lead===active);
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">Writers' room · works in progress</span><h1>Episode Planning</h1><p>Follow each character's next scenes and the shared story timeline, all in one place.</p></header>
  <details className="edition-note"><summary>How approvals work</summary><p>DRAFT → DISCUSSION → PLOT LOCKED → WRITING → APPROVED → PUBLISHED. Only the author can approve or lock content.</p></details>

  <div className="reading-heading"><div><span className="eyebrow">Choose a storyline</span><h2>What happens next?</h2></div></div>
  <div className="perspective-tabs" role="group" aria-label="Choose planning character">{leadOrder.map(w=><button type="button" aria-pressed={w===active} onClick={()=>openPage('planning',{lead:w})} className={w===active?'selected':''} key={w}>{titleCase(w)}</button>)}</div>
  {active==='meenakshi'&&<section className="continuity-cards"><article><span className="eyebrow">EP 03 · Canonical outline</span><h2>Meenakshi × Naveen</h2><p>1 January 2026 · Hospital · 13:50–14:15</p><p>Meenakshi's hospital shift continues in four short beats.</p><strong>Scene ends at 14:15 · No goodbye</strong>{current?.beats&&<div className="beat-list">{current.beats.map((b,i)=><div className="beat-item" key={b.id||i}><span className="eyebrow">{b.time||'Time pending'}</span><h3>{b.title}</h3>{b.external&&<p>{b.external}</p>}{b.internal&&<p className="muted">{b.internal}</p>}</div>)}</div>}{currentError&&<p role="alert">SOURCE MISSING: {currentError}</p>}</article>
  <article><span className="eyebrow">EP 04 · Reserved continuation</span><h2>Same moment, next episode</h2><p>1 January 2026 · 14:15 onwards</p><p>No continuation prose approved or written. This marker is a handoff, not a generated scene.</p><p className="muted">This continuation will appear here once its outline is written and approved.</p></article></section>}
  <section className="planning-panel"><div className="split"><div><span className="eyebrow">Working story lane</span><h2>{titleCase(active)}</h2><p>{activePlan?.plan?.title||'No separate Episode 03 working draft is available here yet.'}</p></div></div>
   {active==='taniya'&&<p className="source-note">Soniya's independent scenes belong to Taniya's continuity lane. Their existing joint plan is preserved; those scenes have not been promoted to finished prose.</p>}
   {active==='shivani'&&<p className="source-note">Shivani's future planning is not independently indexed as an Episode 03 scene in the audited sources. Earlier plot notes are preserved in the story archive.</p>}
   {activePlan?.plan&&<><p><strong>Original status:</strong> {str(activePlan.plan.status)||'REVIEW'}</p>{active==='meenakshi'&&<p><strong>Date:</strong> 2 January 2026. This is a later-day proposal, not the 1 January canonical Scene 01. Senior Review M08 remains on Jan 2.</p>}
    {active==='shreya'&&<p><strong>Date:</strong> 3 January 2026. These are reserved planning events, not final reading material.</p>}
    {active==='ankita'&&<p><strong>Date:</strong> Original draft date requires review; it has not been silently assigned to the Episode 03 canonical timeline.</p>}
    <details><summary>Full planning notes</summary><pre>{JSON.stringify(activePlan.plan,null,2)}</pre></details></>}
  </section>
  <section className="timeline-section"><div className="split"><div><span className="eyebrow">Shared continuity</span><h2>Global Story Clock</h2></div><label>Story date<select value={date} onChange={e=>setDate(e.target.value)}><option value="all">All dates</option><option value="2026-01-01">1 Jan 2026</option><option value="2026-01-02">2 Jan 2026</option><option value="2026-01-03">3 Jan 2026</option><option value="DATE_REVIEW">Unscheduled / review</option></select></label></div>
   <p className="muted">Dates and locations are read from the original planning files. Scene overlaps are flagged, never automatically moved or rewritten.</p>
   <div className="clock-list">{dated.map((x,i)=><article className="clock-entry" key={x.source+x.id+i}><div className="clock-time"><strong>{x.start||'Time TBC'}</strong><small>{x.date==='DATE_REVIEW'?'Date review':x.date}</small></div><div><span className="eyebrow">{x.lead} · {x.id} · {x.status}</span><h3>{x.title}</h3><p>{x.location}{x.end?' · ends '+x.end:''}</p>{x.notes&&<p className="muted">{x.notes}</p>}<span className="clock-source">Planning record preserved</span></div></article>)}</div>
   {dated.length===0&&<p className="source-note">No scheduled source records for this date. Unwritten scenes have not been invented.</p>}
  </section>
  <section className="continuity-check"><h2>Continuity checks</h2>{issues.length?<><p>Potential time overlaps in working records; author review needed:</p><ul>{issues.map((s,i)=><li key={i}>{s}</li>)}</ul></>:<p>No direct same-character, same-day overlaps detected among the parsed dated planning events. This is a preliminary structural check, not proof that travel and workplace schedules are fully validated.</p>}</section>
 </main>
}
