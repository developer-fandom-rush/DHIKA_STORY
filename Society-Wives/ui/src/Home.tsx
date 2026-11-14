import { EpisodeOne, useData } from './lib';
export default function Home(){
 const {data,error,loading}=useData<EpisodeOne>('episode-01.json');
 return <main className="reader-column">
  <section className="hero">
   <span className="eyebrow">Gulmohar Heights · Gurgaon · Prologue / Episode 01</span>
   <h1>Society Wives <em>— Five Veils of Desire</em></h1>
   <p className="hero-copy">Five women. Five lives. One society.</p>
   <div className="hero-actions"><a className="button primary" href="#/reading?character=ankita">Continue to Episode 02 <span aria-hidden="true">→</span></a><a className="button subtle" href="#/characters">Explore the cast</a></div>
  </section>
  <div className="reading-heading">
   <div><span className="eyebrow">The original opening</span><h2>{data?.episode.title||'Episode 01 — Prologue'}</h2><p>{data?.episode.subtitle}</p></div>
   {data&&<span className="meta-pill">{data.scenes.length} source scenes</span>}
  </div>
  {data&&<div className="source-note">Displayed from the original <code>episode-01.json</code> without rewriting. Repository approval metadata still says <strong>draft / not approved</strong>; this is flagged for editorial reconciliation.</div>}
  {loading&&<p role="status">Loading the original Episode 01 source…</p>}
  {error&&<p role="alert" className="error">SOURCE MISSING — {error}</p>}
  {data?.scenes.map(s=><article className="novel-scene" key={s.id} id={'ep01-'+s.id}>
   <div className="scene-label"><span>{s.id} · {s.time||'Time not set'}</span><span>{s.lead||''}</span></div>
   <h3>{s.title}</h3><p className="location">{s.location||s.lane}</p>
   {(s.narration||[]).map((t,i)=><p key={'n'+i}>{t}</p>)}
   {(s.dialogue||[]).map((line,i)=><p className="dialogue" key={'d'+i}><strong>{line.speaker}:</strong> {line.line}</p>)}
   {(s.internal||[]).map((t,i)=><p className="inner" key={'i'+i}>{t}</p>)}
  </article>)}
  {data&&<div className="reader-end"><span>End of Episode 01</span><a className="button primary" href="#/reading?character=ankita">Read Episode 02 →</a></div>}
 </main>
}
