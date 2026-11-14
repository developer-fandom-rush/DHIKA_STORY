import { useMemo, useState } from 'react';
import { openPage } from './lib';
import swJan from './data/sw-timeline-jan01.json';
import swLater from './data/sw-timeline-future.json';
import dhikaIndex from './data/dhika-universal-timeline.json';

type Beat={id?:string;title?:string;at?:string|null;body?:string;internal?:string};
type LinkTarget={type:string;character?:string;scene?:string;episode?:number;paragraph?:string};
type Event={id:string;date:string|null;storyDay?:number|null;sort:string|null;start?:string|null;end?:string|null;timeLabel:string;title:string;subtitle?:string|null;lead:string;characters?:string[];mentions?:string[];episode:string;scene:string;kind:string;state:string;status:string;source:string;reader:LinkTarget;flags?:string[];detail?:string|null;beats?:Beat[];originalWeekday?:string|null;sourceEvidence?:string};
const swEvents=([...swJan.events,...swLater.events]) as Event[];
const dhikaEvents=dhikaIndex.events as Event[];
const firstDate='2026-01-01';
const friendlyDate=(s:string)=>{if(s==='pending')return 'Date needs review';const d=new Date(s+'T12:00:00Z');return isNaN(d.valueOf())?s:new Intl.DateTimeFormat('en-IN',{timeZone:'UTC',day:'numeric',month:'long',year:'numeric'}).format(d)};
const storyDay=(s:string)=>s==='pending'?null:Math.round((Date.parse(s+'T00:00:00Z')-Date.parse(firstDate+'T00:00:00Z'))/86400000)+1;
const statusColor=(s:string)=>s==='rescheduled'?'timeline-rescheduled':s==='aligned'||s==='approved-prose'?'timeline-approved':s==='date-review'||s==='review'||s==='source-review'?'timeline-review':'timeline-planned';
const shortStatus=(e:Event)=>e.state==='rescheduled'?'Rescheduled, not removed':e.state==='aligned'?'Mapped story day':e.state==='approved-prose'?'Approved prose':e.state==='source-review'?'Published · review':e.state==='date-review'?'Date review':e.status;
const routeTo=(event:Event)=>{
 const r=event.reader;
 if(r.type==='dhika')return openPage('dhika-reader',{episode:String(r.episode||1),paragraph:r.paragraph});
 if(r.type==='sw-episode02')return openPage('reading',{character:r.character,scene:r.scene});
 if(r.type==='sw-prologue')return openPage('home',{scene:r.scene});
 return openPage('planning',{lead:r.character||'meenakshi',scene:r.scene});
};
function Summary({event}:{event:Event}){
 const flags=event.flags||[];
 return <details className={'timeline-event '+statusColor(event.state)} id={'timeline-'+event.id}>
  <summary><div className="timeline-event-time"><strong>{event.timeLabel}</strong><small>{event.episode==='Future plan'?'Future plan':'Episode '+event.episode}</small></div>
   <div className="timeline-event-title"><strong>{event.title}</strong><span>{event.lead}{event.scene?' · '+event.scene:''}</span><small>{shortStatus(event)}</small></div><span className="timeline-chevron" aria-hidden="true">⌄</span></summary>
  <div className="timeline-event-expanded">
   {event.subtitle&&<p className="timeline-event-note">{event.subtitle}</p>}
   <div className="timeline-detail-grid"><div><span>Event / source</span><strong>{event.episode} · {event.scene}</strong></div><div><span>Lead / context</span><strong>{event.lead}</strong></div><div><span>Record status</span><strong>{event.status}</strong></div></div>
   {(event.mentions?.length||0)>0&&<p className="timeline-mentions"><strong>Name mentions in source (not automatically encounters):</strong> {(event.mentions||[]).join(', ')}</p>}
   {event.detail&&<p className="timeline-event-note">{event.detail}</p>}
   {(event.beats?.length||0)>0&&<ol className="timeline-beats">{(event.beats||[]).map((b,i)=><li key={b.id||i}><strong>{b.at||b.id||'Beat'} · {b.title||'Untitled'}</strong><p>{b.body}</p>{b.internal&&<p className="muted">{b.internal}</p>}</li>)}</ol>}
   {event.sourceEvidence&&<p className="timeline-evidence"><strong>Source passage begins:</strong> {event.sourceEvidence}</p>}
   {event.originalWeekday&&<p className="timeline-weekday">Original Dhika weekday: <strong>{event.originalWeekday}</strong>. Calendar mapping follows your Jan 2026 anchor; original wording remains unchanged.</p>}
   {flags.length>0&&<div className="timeline-flags"><strong>Continuity review</strong><ul>{flags.map((flag,i)=><li key={i}>{flag}</li>)}</ul></div>}
   <div className="timeline-event-actions"><button type="button" className="button primary" onClick={()=>routeTo(event)}>{event.reader.type==='dhika'?'Read in original Dhika reader':event.kind==='source-scene'?'Read original scene':event.kind==='published-prose'?'Read approved scene':event.kind==='prologue'?'Read prologue':'Open related planning'}</button></div>
  </div>
 </details>;
}
export default function GlobalTimeline({universe,date,onDateChange}:{universe:'sw'|'dhika';date:string;onDateChange:(date:string)=>void}){
 const isDhika=universe==='dhika',all=isDhika?dhikaEvents:swEvents;
 const [filter,setFilter]=useState('all'),[query,setQuery]=useState('');
 const days=useMemo(()=>[...new Set(all.map(x=>x.date).filter((x):x is string=>!!x))].sort(),[all]);
 const available=[...days,'pending'];
 const target=available.includes(date)?date:firstDate;
 const daily=useMemo(()=>all.filter(x=>(x.date||'pending')===target).sort((a,b)=>(a.sort||'99:99').localeCompare(b.sort||'99:99')||a.id.localeCompare(b.id)),[all,target]);
 const filtered=daily.filter(e=>(filter==='all'||(filter==='rescheduled'?e.state==='rescheduled':filter==='review'?e.flags?.length||e.state.includes('review'):filter==='prose'?e.kind==='source-scene':e.kind!=='source-scene'))&&(!query||(e.title+' '+e.lead+' '+e.scene+' '+e.status).toLowerCase().includes(query.toLowerCase())));
 const rescheduled=all.filter(e=>e.state==='rescheduled').length;
 return <main className="page-width global-timeline">
  <header className="section-intro"><span className="eyebrow">{isDhika?'DHIKA · Source-based universal clock':'SOCIETY WIVES · Cross-character chronology'}</span>
   <h1>Universal Timeline</h1>
   <p>{isDhika?'Dhika Day 1 = 1 January 2026, Day 2 = 2 January, and so on. Original weekdays and later arc-relative day numbers remain separate.':'Time comes first, not lead or episode. All five lead perspectives share one clock. Click any event for its original source or existing plan.'}</p>
  </header>
  <div className="timeline-anchor"><div><span className="eyebrow">Common story-day anchor</span><strong>Day 1 = 1 January 2026</strong><p>Day N corresponds to 1 Jan + (N−1) days for both universes.</p></div><div className="timeline-origin"><span>START</span><strong>00:01</strong><small>No event invented at midnight</small></div></div>
  <div className="timeline-tools">
   <label>Date / story day<select aria-label="Timeline date" value={target} onChange={e=>onDateChange(e.target.value)}>{available.map(d=><option value={d} key={d}>{friendlyDate(d)}{d!=='pending'?' · Day '+storyDay(d):''}</option>)}</select></label>
   <label>Show<select aria-label="Timeline status filter" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All events</option><option value="prose">Published source scenes</option><option value="planned">Planning / future</option><option value="rescheduled">Rescheduled</option><option value="review">Needs review</option></select></label>
   <label>Find<input type="search" aria-label="Search timeline" value={query} placeholder="Character, scene, title…" onChange={e=>setQuery(e.target.value)}/></label>
  </div>
  <div className="timeline-summary"><div><strong>{friendlyDate(target)}</strong><span>{target!=='pending'?'Story Day '+storyDay(target):'Undated material — no fabricated placement'}</span></div><div><strong>{filtered.length}</strong><span>matching event records</span></div>{!isDhika&&<div><strong>{rescheduled}</strong><span>shifted and still planned</span></div>}</div>
  {target==='pending'&&<p className="timeline-review-note">{isDhika?'These source episodes are fully accessible in the original Dhika reader, but the source does not yet support exact calendar dates. Swiss Day 1 / Twins Day 1 are local arc labels, not a reset to 1 January.':'Undated prologue and provisional future drafts stay here until their dates are explicitly confirmed; they were not deleted.'}</p>}
  {isDhika&&target!=='pending'&&<p className="timeline-review-note">Mapping is based on your shared 1 Jan 2026 anchor. Dhika's original weekday words have not been rewritten. Early chapter segments are source-aligned; later dates requiring verification remain under “Date needs review”.</p>}
  {target==='2026-01-01'&&<div className="timeline-start"><span>00:01</span> · Start of 1 January 2026 · first recorded event appears below</div>}
  <div className="timeline-event-list">{filtered.map(e=><Summary key={e.id} event={e}/>)}</div>
  {!filtered.length&&<p className="source-note">No indexed events match this date/filter. Clear filters, or check another day.</p>}
  <footer className="timeline-footnote">{isDhika?'41 episodes indexed. Date-unverified content remains available; no week/day jumps have been invented.':'Single-source record per Taniya/Soniya shared scene prevents double counting. Overlaps and conflicting drafts remain visible for review.'}</footer>
 </main>;
}
