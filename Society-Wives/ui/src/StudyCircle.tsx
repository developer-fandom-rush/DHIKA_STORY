import { openPage, useData } from './lib';

type Mentor={lead:string;profession:string;focus:string;role:string;status:string;ability:string;availability:string};
type Learner={name:string;age:number;established:string;proposed:string};
type TimeAnchor={date:string;status:string;event:string};
type Contract={
 title:string;status:string;intent:string;fiveMainLeads:string[];notIncluded:string;pairLock:string;
 learners:Learner[];exam:{name:string;date:string;subjects:string[];mode:string;contestDistinction:string};
 mentors:Mentor[];timeAnchors:TimeAnchor[];academicRule:string;openDecisions:string[];
 handoff:{rule:string;noAutoSync:string;updatePolicy:string}
};
const readable=(v:string)=>v.replace(/_/g,' ').replace(/\s+/g,' ').trim();
export default function StudyCircle(){
 const {data,loading,error}=useData<Contract>('cross-lead-ayaan-armaan-jam-2026.json');
 return <main className="page-width" id="shared-jam-study-circle">
  <header className="section-intro"><span className="eyebrow">Society Wives · Cross-character source of truth</span>
   <h1>Ayaan &amp; Armaan · IIT JAM study circle</h1>
   <p>One shared mentoring plot across Ankita, Shivani, Taniya, Meenakshi and Shreya. Planned meetings and approved decisions are distinguished from unconfirmed qualifications and timetables.</p>
  </header>
  <div className="chapter-controls"><a className="button subtle" target="_blank" rel="noreferrer" href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/cross-lead-ayaan-armaan-jam-2026.json">Canonical JSON →</a>
   <a className="button subtle" target="_blank" rel="noreferrer" href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/CROSS-LEAD-AYAAN-ARMAAN-JAM-2026-HANDOFF.md">Handoff for new chats →</a>
   <button className="button subtle" type="button" onClick={()=>openPage('planning',{lead:'shivani',part:'06'})}>Shivani EP06 →</button>
  </div>
  {loading&&<p role="status">Loading shared mentoring plan…</p>}
  {error&&<p role="alert" className="error">Cannot load mentoring contract: {error}</p>}
  {data&&<>
   <section className="episode-plan-card"><h2>Editorial status</h2><p><strong>{readable(data.status)}</strong></p><p>{data.intent}</p>
    <p><strong>Main leads:</strong> {data.fiveMainLeads.join(' · ')}.</p><p className="muted">{data.notIncluded}</p>
    <p><strong>{data.exam.name} · {data.exam.date}:</strong> {data.exam.subjects.join(' / ')}</p><p>{data.academicRule}</p>
   </section>
   <section className="episode-plan-card"><h2>Who the students are</h2>
    {data.learners.map(s=><article className="encounter-card" key={s.name}><h3>{s.name} · {s.age}</h3><p><strong>Established:</strong> {s.established}</p><p><strong>Proposed:</strong> {s.proposed}</p></article>)}
    <p className="muted">{data.pairLock}</p>
   </section>
   <section className="episode-plan-card"><h2>Five mentors · role and approval status</h2>
    {data.mentors.map(m=><details className="episode-outline" key={m.lead} open={m.lead==='Shivani'||m.lead==='Meenakshi'}>
     <summary><strong>{m.lead} · {m.focus}</strong> — {readable(m.status)}</summary>
     <p><strong>Existing profession:</strong> {m.profession}</p><p><strong>Responsibility:</strong> {m.role}</p>
     <p><strong>Subject coverage:</strong> {m.ability}</p><p><strong>Schedule:</strong> {m.availability}</p>
     <button className="button subtle" type="button" onClick={()=>openPage('planning',{lead:m.lead.toLowerCase()})}>Open {m.lead} Story Plot →</button>
    </details>)}
   </section>
   <section className="episode-plan-card"><h2>Chronology and shared meetings</h2>{data.timeAnchors.map(x=><article className="encounter-card" key={x.date}><h3>{x.date} · {readable(x.status)}</h3><p>{x.event}</p></article>)}</section>
   <section className="episode-plan-card"><h2>Decisions still open</h2><ul>{data.openDecisions.map((v,i)=><li key={i}>{v}</li>)}</ul>
    <p className="source-note"><strong>New-chat handoff:</strong> {data.handoff.rule}</p>
    <p className="muted">{data.handoff.noAutoSync}</p>
    <p className="muted">{data.handoff.updatePolicy}</p>
   </section>
  </>}
 </main>;
}
