import { useEffect } from 'react';
import { EpisodeOne, useData } from './lib';
export default function Home({scene}:{scene?:string|null}){
 const {data,error,loading}=useData<EpisodeOne>('episode-01.json');
 useEffect(()=>{if(!data||!scene)return;document.getElementById('ep01-'+scene)?.scrollIntoView({block:'center'});},[data,scene]);
 return <main className="reader-column">
  <header className="section-intro"><span className="eyebrow">The Story · 1 January 2026</span><h1>Episode 01 · Prologue</h1><p>Five women. Five lives. One society.</p></header>
  {loading&&<p role="status">Loading Episode 01…</p>}
  {error&&<p role="alert" className="error">Unable to load Episode 01: {error}</p>}
  {data?.scenes.map(s=><article className="novel-scene" key={s.id} id={'ep01-'+s.id}>
   <div className="scene-label"><span>{s.id} · {s.time||''}</span><span>{s.lead||''}</span></div>
   <h2>{s.title}</h2><p className="location">{s.location||s.lane}</p>
   {(s.narration||[]).map((t,i)=><p key={'n'+i}>{t}</p>)}
   {(s.dialogue||[]).map((line,i)=><p className="dialogue" key={'d'+i}><strong>{line.speaker}:</strong> {line.line}</p>)}
   {(s.internal||[]).map((t,i)=><p className="inner" key={'i'+i}>{t}</p>)}
  </article>)}
 </main>;
}
