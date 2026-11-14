import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Archive, approvedScene, episodePath, peopleOrder, sourceUrl, titleCase, useData } from './lib';
type Props={character:string;scene:string|null};
export default function Reading({character,scene}:Props){
 const active=peopleOrder.includes(character)?character:'ankita';
 const {data:archive,loading,error}=useData<Archive>(episodePath(active));
 const [visited,setVisited]=useState<Record<string,string[]>>({});
 const scenes=archive?.scenes||[];
 const selected=scenes.find(s=>s.scene_id===scene)||scenes[0];
 const index=scenes.findIndex(s=>s.scene_id===selected?.scene_id);
 useEffect(()=>{if(!selected)return;setVisited(prev=>({...prev,[active]:Array.from(new Set([...(prev[active]||[]),selected.scene_id]))}));},[active,selected?.scene_id]);
 const link=(id:string,who=active)=>'#/reading?character='+encodeURIComponent(who)+'&scene='+encodeURIComponent(id);
 const html=selected?.source_html_lines_exact?.join('\n')||'';
 const safeHtml=DOMPurify.sanitize(html,{USE_PROFILES:{html:true}});
 const displayStatus=selected&&archive?(approvedScene(archive,selected)?'Approved source':'Published source — approval review'):null;
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">Episode Reading · 01 January 2026</span><h1>Episode 02</h1><p>The New Year's Unspoken Secrets · One Day, Six Perspectives</p></header>
  <div className="source-note">Episode 02 story window is closed by the author. The complete published-source archive is shown without rewriting; individual scenes still retain their recorded approval states. Planning-only scenes remain outside this reader.</div>
  <nav aria-label="Choose character perspective" className="perspective-tabs">{peopleOrder.map(w=><a key={w} href={'#/reading?character='+w} aria-current={w===active?'page':undefined} className={w===active?'selected':''}>{titleCase(w)}</a>)}</nav>
  <div className="reader-layout">
   <aside className="scene-sidebar"><p className="aside-title">{titleCase(active)} · scenes</p>
    {scenes.map((s,i)=><a key={s.scene_id} href={link(s.scene_id)} className={s.scene_id===selected?.scene_id?'scene-link active':'scene-link'}><span>{String(i+1).padStart(2,'0')} · {s.scene_id}</span><span className={archive&&approvedScene(archive,s)?'mini-dot approved':'mini-dot'} title={archive&&approvedScene(archive,s)?'Approved':'Review'} /></a>)}
    {loading&&<p>Loading source…</p>}{error&&<p role="alert" className="error">SOURCE MISSING: {error}</p>}
   </aside>
   <div className="reading-surface">
    {archive&&!scenes.length&&<div className="source-note">SOURCE MISSING — No published scenes in this archive.</div>}
    {selected&&<><div className="story-toolbar"><span>{selected.scene_id}</span><span className="meta-pill">{displayStatus}</span></div>
     <div className="source-scene prose-exact" dangerouslySetInnerHTML={{__html:safeHtml}} />
     <div className="chapter-controls"><a className="button subtle" aria-disabled={index<=0} href={index>0?link(scenes[index-1].scene_id):'#'} onClick={index<=0?e=>e.preventDefault():undefined}>← Previous</a><span>{index+1} / {scenes.length} scenes · {visited[active]?.length||1} read this session</span><a className="button primary" aria-disabled={index>=scenes.length-1} href={index<scenes.length-1?link(scenes[index+1].scene_id):'#'} onClick={index>=scenes.length-1?e=>e.preventDefault():undefined}>Next scene →</a></div>
     <details className="source-footnote"><summary>Source fidelity and provenance</summary><p>Scene HTML is taken from the verbatim JSON archive, preserving narration, dialogue, scene order and source formatting. Rendering sanitizes executable markup without rewriting the text. Approval records are not changed.</p><a href={sourceUrl(episodePath(active))} target="_blank" rel="noreferrer">Open source JSON ↗</a></details>
     </>}
   </div>
  </div>
 </main>
}
