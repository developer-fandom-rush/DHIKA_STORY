import {useData} from './lib';
type Solo={id:string;name:string;date:string;time:string;location:string;status:string;outfit:string;beats:string[]};
type Plan={title:string;status:string;faceLock:string;masterDocument:string;imageStatus:string;scenes:Solo[];continuityHolds:string[];grokHandover:string};
export default function Shreya07Planning(){
 const {data,loading,error}=useData<Plan>('episode-07-shreya-plan.json');
 return <main className="page-width" id="shreya-ep07-working-plan">
  <header className="section-intro"><span className="eyebrow">Episode 07 · Working Plot · January 6–7, 2026</span><h1>Shreya · Two Separate Solo Encounters</h1><p>Approved concept and revised visual references, not final Reader prose. Keshav and Chintu are different people and have deliberately different arcs.</p></header>
  {loading&&<p>Loading Shreya EP07 planning…</p>}
  {error&&<p role="alert">Source unavailable: {error}</p>}
  {data&&<>
    <section className="episode-plan-card"><h2>Latest visual and identity lock</h2><p>{data.faceLock}</p><p>{data.imageStatus}</p><p><a href={data.masterDocument} target="_blank" rel="noreferrer">Open four-tab master Doc — including new red and indigo front/mirror images</a></p><p><a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/episode-07-shreya-keshav-chintu-working-prose.md" target="_blank" rel="noreferrer">Read the complete working scenes and Grok handovers on GitHub</a></p></section>
    {data.scenes.map(s=><section key={s.id} className="episode-plan-card" id={s.id.toLowerCase()}><h2>{s.name}</h2><p><strong>{s.date} · {s.time}</strong> · {s.location}</p><p><strong>Outfit:</strong> {s.outfit}</p><p className="source-note">{s.status}</p><ol>{s.beats.map((b,i)=><li key={i}>{b}</li>)}</ol></section>)}
    <section className="episode-plan-card"><h2>Grok handover and continuity</h2><p>{data.grokHandover}</p><h3>Before freezing the Reader</h3><ul>{data.continuityHolds.map((q,i)=><li key={i}>{q}</li>)}</ul><p>The latest author correction is controlling: after Chintu leaves Shreya's empty home, she changes privately into ordinary home clothes. Wrong-face older images are withdrawn.</p></section>
  </>}
 </main>;
}