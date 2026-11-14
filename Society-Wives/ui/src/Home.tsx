import { EpisodeOne, openPage, useData } from './lib';
export default function Home(){
 const {data,error,loading}=useData<EpisodeOne>('episode-01.json');
 return <main className="reader-column">
  <section className="hero">
   <span className="eyebrow">Gulmohar Heights · Gurgaon · Prologue / Episode 01</span>
   <h1>Society Wives <em>— Five Veils of Desire</em></h1>
   <p className="hero-copy">Five women. Five lives. One society.</p>
   <div className="hero-actions"><button type="button" className="button primary" onClick={()=>openPage('reading',{character:'ankita'})}>Continue to Episode 02 <span aria-hidden="true">→</span></button></div>
  </section>
  <div className="reading-heading">
   <div><span className="eyebrow">The original opening</span><h2>{data?.episode.title||'Episode 01 — Prologue'}</h2><p>{data?.episode.subtitle}</p></div>
   {data&&<span className="meta-pill">{data.scenes.length} source scenes</span>}
  </div>
  {data&&<details className="edition-note"><summary>Edition note</summary><p>This is the original Episode 01 story text. The archive still records an older editorial approval state awaiting reconciliation.</p></details>}
  {loading&&<p role="status">Loading the original Episode 01 source…</p>}
  {error&&<p role="alert" className="error">SOURCE MISSING — {error}</p>}
  {data?.scenes.map(s=><article className="novel-scene" key={s.id} id={'ep01-'+s.id}>
   <div className="scene-label"><span>{s.id} · {s.time||'Time not set'}</span><span>{s.lead||''}</span></div>
   <h3>{s.title}</h3><p className="location">{s.location||s.lane}</p>
   {(s.narration||[]).map((t,i)=><p key={'n'+i}>{t}</p>)}
   {(s.dialogue||[]).map((line,i)=><p className="dialogue" key={'d'+i}><strong>{line.speaker}:</strong> {line.line}</p>)}
   {(s.internal||[]).map((t,i)=><p className="inner" key={'i'+i}>{t}</p>)}
  </article>)}
  {data&&<div className="reader-end"><span>End of Episode 01</span><button type="button" className="button primary" onClick={()=>openPage('reading',{character:'ankita'})}>Read Episode 02 →</button></div>}
 </main>
}
