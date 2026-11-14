import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Archive, approvedScene, episodePath, peopleOrder, openPage, titleCase, useData } from './lib';
type Props={character:string;scene:string|null};
export default function Reading({character,scene}:Props){
 const active=peopleOrder.includes(character)?character:'ankita';
 const canonicalSource=active==='soniya'?'taniya':active; // Taniya and Soniya archives contain identical scene HTML; one source, two entry points.
 const {data:archive,loading,error}=useData<Archive>(episodePath(canonicalSource));
 const [visited,setVisited]=useState<Record<string,string[]>>({});
 const scenes=archive?.scenes||[];
 const selected=scenes.find(s=>s.scene_id===scene)||scenes[0];
 const index=scenes.findIndex(s=>s.scene_id===selected?.scene_id);
 useEffect(()=>{if(!selected)return;setVisited(prev=>({...prev,[active]:Array.from(new Set([...(prev[active]||[]),selected.scene_id]))}));},[active,selected?.scene_id]);
 const goScene=(id:string,who=active)=>openPage('reading',{character:who,scene:id});
 const html=selected?.source_html_lines_exact?.join('\n')||'';
 const safeHtml=DOMPurify.sanitize(html,{USE_PROFILES:{html:true}});
 const displayStatus=selected&&archive?(approvedScene(archive,selected)?'Approved source':'Published source — approval review'):null;
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">The Story · 1 January 2026</span><h1>Episode 02</h1><p>The New Year's Unspoken Secrets · Choose whose story to read.</p></header>
  <div className="episode-picker" role="group" aria-label="Choose episode"><button type="button" onClick={()=>openPage('home')}>Episode 01 · Prologue</button><span className="episode-picker-current" aria-current="page">Episode 02 · Six perspectives</span></div>
  <p className="reader-intro">Pick a character below, then continue scene by scene. Your place in this reading session is shown underneath.</p>
  <div role="group" aria-label="Choose character perspective" className="perspective-tabs">{peopleOrder.map(w=><button type="button" key={w} onClick={()=>openPage('reading',{character:w})} aria-pressed={w===active} className={w===active?'selected':''}>{titleCase(w)}</button>)}</div>
  <div className="reader-layout">
   <aside className="scene-sidebar"><p className="aside-title">{titleCase(active)} · scenes</p>
    {scenes.map((s,i)=><button type="button" key={s.scene_id} onClick={()=>goScene(s.scene_id)} aria-pressed={s.scene_id===selected?.scene_id} className={s.scene_id===selected?.scene_id?'scene-link active':'scene-link'}><span>Scene {i+1}</span><span className={archive&&approvedScene(archive,s)?'mini-dot approved':'mini-dot'} title={archive&&approvedScene(archive,s)?'Approved':'Review'} /></button>)}
    {loading&&<p>Loading source…</p>}{error&&<p role="alert" className="error">SOURCE MISSING: {error}</p>}
   </aside>
   <div className="reading-surface">
    {archive&&!scenes.length&&<div className="source-note">SOURCE MISSING — No published scenes in this archive.</div>}
    {selected&&<><div className="story-toolbar"><span>{selected.scene_id}</span><span className="meta-pill">{displayStatus}</span></div>
     <div className="source-scene prose-exact" dangerouslySetInnerHTML={{__html:safeHtml}} />
     <div className="chapter-controls"><button type="button" className="button subtle" disabled={index<=0} onClick={()=>goScene(scenes[index-1].scene_id)}>← Previous scene</button><span>Scene {index+1} of {scenes.length} · {visited[active]?.length||1} visited</span><button type="button" className="button primary" disabled={index>=scenes.length-1} onClick={()=>goScene(scenes[index+1].scene_id)}>Next scene →</button></div>
     <details className="source-footnote"><summary>About this story edition</summary><p>The original scene text and order are preserved. Editorial approval states remain as recorded; unfinished scene outlines are kept in Episode Planning.</p></details>
     </>}
   </div>
  </div>
 </main>
}
