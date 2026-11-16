import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Archive, approvedScene, episodePath, peopleOrder, openPage, titleCase, useData } from './lib';
type Props={character:string;scene:string|null;episode?:string|null};

function Episode02Reading({character,scene}:Props){
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
 const safeHtml=DOMPurify.sanitize(html,{USE_PROFILES:{html:true},FORBID_ATTR:['href','target','rel']});
 const displayStatus=selected&&archive?(approvedScene(archive,selected)?'Approved source':'Published source — approval review'):null;
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">The Story · 1 January 2026</span><h1>Episode 02</h1><p>The New Year's Unspoken Secrets · Choose whose story to read.</p></header>
  <div className="episode-picker" role="group" aria-label="Choose episode"><button type="button" onClick={()=>openPage('home')}>Episode 01 · Prologue</button><span className="episode-picker-current" aria-current="page">Episode 02 · Six perspectives</span><button type="button" onClick={()=>openPage('reading',{episode:'03',character:active,scene:'01'})}>Episode 03 · Prose</button></div>
  <p className="reader-intro">Pick a character below, then continue scene by scene. Your place in this reading session is shown underneath.</p>
  <section className="source-note"><strong>Episode 03 has its own prose chapters in this same reader.</strong><p>Read Ankita's Scenes 01–05 (including the five-beat office-to-car ride), Scene 06 dance draft, or Meenakshi's four existing story-text scenes.</p><button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'03',character:'ankita',scene:'01'})}>Read Episode 03 prose →</button></section>
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

type Ep03Block={order:number;time:string;type:string;text:string};
type Ep03Line={time?:string|null;kind?:string;speaker?:string;text:string};
type Ep03Beat={id:string;title:string;status:string;parts:{raw:string;origin:string}[]};
type Ep03Scene={id:string;title:string;date:string;time:string;place:string;status:string;source:string;format:'blocks'|'raw'|'lines'|'beats';blocks?:Ep03Block[];raw?:string;lines?:Ep03Line[];beats?:Ep03Beat[];addenda?:{id:string;raw:string;status:string}[]};
type Ep03Data={episode:string;title:string;date:string;chapters:Record<string,Ep03Scene[]>};
const storyTag=(status:string)=>{
 if(status==='USER_SUBMITTED_SCENE05_PROSE_UPLOADED_UNEDITED_EXCEPT_ARRIVAL')return 'Author version · five beats with venue arrival';
 if(status==='USER_SELECTED_SCENE04_INTRO_PROSE_DRAFT_FOR_READER')return 'Rohit Babu intro · selected draft';
 if(status==='BEATS_01_02_03_SAVED_SCENE_UNDER_REVIEW')return 'Beats 1–3 saved · Scene 03 under review';
 if(status==='BEATS_01_02_SAVED_REMAINING_BEATS_PENDING')return 'Beats 1–2 saved · Scene 03 in progress';
 if(status==='BEAT_01_USER_LOCKED_REMAINING_BEATS_PENDING')return 'Beat 1 approved · Scene 03 in progress';
 if(status==='USER_APPROVED_PUBLISHED_PROSE')return 'Author-approved prose';
 if(status==='AUTHOR_COMPLETED_SOURCE_WITH_ASSISTANT_DIALOGUE')return 'Author-completed prose';
 if(status==='AUTHOR_VERBATIM_PRESERVED_ADD_ONLY_DRAFT_PENDING_APPROVAL')return 'Full prose · additive draft review';
 if(status==='MIXED_APPROVAL_COMPLETE_SOURCE_TEXT')return 'Full prose · mixed approval';
 if(status==='AUTHOR_SOURCE_BEATS_UNDER_REVIEW')return 'Author story text · review';
 return 'Full prose draft · author review';
};
const storyInline=(text:string)=>text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part,i)=>
 part.startsWith('**')&&part.endsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:
 part.startsWith('*')&&part.endsWith('*')?<em key={i}>{part.slice(1,-1)}</em>:<span key={i}>{part}</span>);
const StoryParagraphs=({raw}:{raw:string})=><>{raw.split(/\n\s*\n/).filter(Boolean).map((part,i)=><p className="ep03-paragraph" key={i}>{storyInline(part)}</p>)}</>;
function Ep03Body({scene}:{scene:Ep03Scene}){
 if(scene.format==='raw')return <div className="source-scene prose-exact ep03-original"><StoryParagraphs raw={scene.raw||''}/></div>;
 if(scene.format==='blocks')return <div className="source-scene prose-exact ep03-original">{(scene.blocks||[]).map((block,i)=><div key={block.order}>{(i===0||scene.blocks?.[i-1]?.time!==block.time)&&<p className="ep03-time">{block.time} PM</p>}<p className={block.type==='dialogue'?'dialogue':block.type.includes('thought')?'inner':'ep03-paragraph'}>{storyInline(block.text)}</p></div>)}</div>;
 if(scene.format==='lines')return <div className="source-scene prose-exact ep03-original">{(scene.lines||[]).map((line,i)=><div key={i}>{line.time&&<p className="ep03-time">{line.time} PM</p>}{line.kind==='dialogue'?<p className="dialogue"><strong>{line.speaker}:</strong> “{line.text}”</p>:<p className="ep03-paragraph">{line.text}</p>}</div>)}</div>;
 return <div className="source-scene prose-exact ep03-original">{(scene.beats||[]).map(beat=><section className="ep03-beat" key={beat.id} id={'ep03-beat-'+beat.id}><div className="ep03-beat-heading"><strong>{beat.id} · {beat.title}</strong><small>{beat.status.toLowerCase().includes('approved')?'Approved source':'Source preserved · review'}</small></div>{beat.parts.map((part,i)=><div key={i}>{beat.parts.length>1&&<p className="ep03-part">Part {i+1}</p>}<StoryParagraphs raw={part.raw}/></div>)}{beat.id==='F08'&&scene.addenda?.map(a=><details key={a.id} className="source-footnote"><summary>{a.id} · original author addendum</summary><StoryParagraphs raw={a.raw}/></details>)}</section>)}</div>;
}
type Scene06CleanRevision={title:string;status:string;beats:{id:string;title:string;raw:string;provenance:string}[]};
function Scene06CleanVersion(){
 const {data,error,loading}=useData<Scene06CleanRevision>('episode-03-ankita-scene-06-clean-revision.json');
 return <section className="source-scene prose-exact ep03-original" id="scene06-clean-revision">
  <h3>Scene 06 · Clean seven-beat review draft</h3>
  <p className="muted">B2-B selected. All continuity corrections applied. B6 was reconstructed from the requested boundary setup because the original author text was unavailable; it requires review.</p>
  {loading&&<p role="status">Loading corrected seven-beat draft…</p>}
  {error&&<p role="alert">Scene 06 clean revision unavailable: {error}</p>}
  {(data?.beats||[]).map(beat=><section className="ep03-beat" id={'scene06-clean-'+beat.id} key={beat.id}>
    <div className="ep03-beat-heading"><strong>{beat.title}</strong><small>{beat.id==='B06'?'Assistant reconstruction · review pending':'Author text · continuity fixes applied'}</small></div>
    <pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',fontFamily:'inherit',lineHeight:1.7}}>{beat.raw}</pre>
  </section>)}
 </section>;
}
type Scene06AuthorRevision={status:string;beats:{id:string;label:string;raw:string;reviewStatus:string}[]};
function Scene06SubmittedRevisions(){
 const {data:partA,error:errorA}=useData<Scene06AuthorRevision>('episode-03-ankita-scene-06-author-revision-part-a.json');
 const {data:partB,error:errorB}=useData<Scene06AuthorRevision>('episode-03-ankita-scene-06-author-revision-part-b.json');
 const beats=[...(partA?.beats||[]),...(partB?.beats||[])];
 return <section className="episode-plan-card" id="scene06-author-revision-stage">
   <h3>Scene 06 · Author-submitted revised beats (not merged)</h3>
   <p>Original submitted versions, prior to cleanup. At this historical stage Beat 2 had alternatives A and B; B2-B is selected in the current clean version. Beat 6 was not supplied in the original submission. Earlier prose remains separately preserved.</p>
   {errorA&&<p role="alert">Revision Part A unavailable: {errorA}</p>}
   {errorB&&<p role="alert">Revision Part B unavailable: {errorB}</p>}
   {beats.map(beat=><details className="episode-outline" key={beat.id} id={'scene06-author-'+beat.id}>
      <summary>{beat.id} · {beat.label} — original submission</summary>
      <pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',fontFamily:'inherit',lineHeight:1.7}}>{beat.raw}</pre>
   </details>)}
   <p className="muted">Historical submission archive only · these original beats are not the current clean version.</p>
 </section>;
}
function Episode03Reading({character,scene}:Props){
 const active=character==='meenakshi'?'meenakshi':'ankita';
 const {data,loading,error}=useData<Ep03Data>('episode-03-reader.json');
 const scenes=data?.chapters?.[active]||[];
 const selected=scenes.find(x=>x.id===scene)||scenes[0];
 const selectedIndex=scenes.findIndex(x=>x.id===selected?.id);
 const go=(id:string,who=active)=>openPage('reading',{episode:'03',character:who,scene:id});
 return <main className="page-width" id="episode03-final-prose">
  <header className="section-intro"><span className="eyebrow">The Story · 1 January 2026</span><h1>Episode 03 · Prose</h1><p>Read completed story text from the same Society Wives library. Source approvals remain visible; unfinished plots stay in Episode Planning.</p></header>
  <div className="episode-picker" role="group" aria-label="Choose episode">
   <button type="button" onClick={()=>openPage('home')}>Episode 01 · Prologue</button>
   <button type="button" onClick={()=>openPage('reading',{character:active})}>Episode 02 · Six perspectives</button>
   <span className="episode-picker-current" aria-current="page">Episode 03 · Prose</span>
  </div>
  <div className="perspective-tabs" role="group" aria-label="Choose prose character">
   {['ankita','meenakshi'].map(w=><button key={w} type="button" className={active===w?'selected':''} aria-pressed={active===w} onClick={()=>go('01',w)}>{titleCase(w)}</button>)}
  </div>
  {loading&&<p role="status">Loading Episode 03 prose…</p>}
  {error&&<p role="alert" className="error">SOURCE MISSING: {error}</p>}
  {data&&<div className="reader-layout">
   <aside className="scene-sidebar"><p className="aside-title">{titleCase(active)} · Episode 03</p>
    {scenes.map(s=><button type="button" key={s.id} className={'scene-link'+(selected?.id===s.id?' active':'')} aria-pressed={selected?.id===s.id} onClick={()=>go(s.id)}><span>Scene {s.id}<small className="ep03-scene-name">{s.title}</small></span><span className={'mini-dot'+(s.status.includes('APPROVED')||s.status.includes('COMPLETED')?' approved':'')} title={storyTag(s.status)}/></button>)}
    <button type="button" className="button subtle ep03-planning-link" onClick={()=>openPage('planning',{lead:active})}>Unwritten plots →</button>
   </aside>
   <div className="reading-surface">{selected&&<>
    <div className="story-toolbar"><span>{titleCase(active)} · Scene {selected.id}</span><span className="meta-pill">{storyTag(selected.status)}</span></div>
    <div className="ep03-scene-intro"><h2>{selected.title}</h2><p>{selected.date} · {selected.time} · {selected.place}</p></div>
    {active==='ankita'&&selected.id==='06'?<><Scene06CleanVersion/><details className="source-footnote" id="scene06-submitted-archive"><summary>Original submitted beat versions · preserved archive</summary><Scene06SubmittedRevisions/></details><details className="source-footnote" id="scene06-earlier-draft"><summary>Earlier Scene 06 prose draft — preserved unchanged</summary><Ep03Body scene={selected}/></details></>:<Ep03Body scene={selected}/>}
    <div className="chapter-controls"><button type="button" className="button subtle" disabled={selectedIndex<=0} onClick={()=>go(scenes[selectedIndex-1].id)}>← Previous scene</button><span>Scene {selectedIndex+1} of {scenes.length}</span><button type="button" className="button primary" disabled={selectedIndex>=scenes.length-1} onClick={()=>go(scenes[selectedIndex+1].id)}>Next scene →</button></div>
    <details className="source-footnote"><summary>About this prose edition</summary><p>This reading uses the original saved story text. Mixed review or draft status is shown without granting extra approval. Planning plots have not been substituted for prose.</p></details>
   </>}</div>
  </div>}
 </main>;
}
export default function Reading(props:Props){
 return props.episode==='03'?<Episode03Reading {...props}/>:<Episode02Reading {...props}/>;
}
