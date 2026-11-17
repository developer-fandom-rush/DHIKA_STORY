import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Archive, assetUrl, episodePath, peopleOrder, openPage, titleCase, useData } from './lib';
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
 // Episode 02 is author-approved in full. Keep historical archive metadata intact, but do not display obsolete per-scene review statuses.
 return <main className="page-width ep02-final-reader">
  <header className="section-intro"><span className="eyebrow">The Story · 1 January 2026 · Author-approved final</span><h1>Episode 02</h1><p>The New Year's Unspoken Secrets · Entire existing episode approved and frozen; select a perspective.</p></header>
  <div className="episode-picker" role="group" aria-label="Choose episode"><button type="button" onClick={()=>openPage('home')}>Episode 01 · Prologue</button><span className="episode-picker-current" aria-current="page">Episode 02 · Six perspectives</span><button type="button" onClick={()=>openPage('reading',{episode:'03',character:active,scene:'01'})}>Episode 03 · Prose</button></div>
  <p className="reader-intro">Pick a character below, then continue scene by scene. Your place in this reading session is shown underneath.</p>
  <section className="source-note"><strong>Episode 03 has its own prose chapters in this same reader.</strong><p>Read Ankita's Scenes 01–08, Meenakshi's scenes, or Shreya's approved SR10 and Strong-Chai scenes.</p><button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'03',character:'ankita',scene:'01'})}>Read Episode 03 prose →</button></section>
  <div role="group" aria-label="Choose character perspective" className="perspective-tabs">{peopleOrder.map(w=><button type="button" key={w} onClick={()=>openPage('reading',{character:w})} aria-pressed={w===active} className={w===active?'selected':''}>{titleCase(w)}</button>)}</div>
  <div className="reader-layout">
   <aside className="scene-sidebar"><p className="aside-title">{titleCase(active)} · scenes</p>
    {scenes.map((s,i)=><button type="button" key={s.scene_id} onClick={()=>goScene(s.scene_id)} aria-pressed={s.scene_id===selected?.scene_id} className={s.scene_id===selected?.scene_id?'scene-link active':'scene-link'}><span>Scene {i+1}</span></button>)}
    {loading&&<p>Loading source…</p>}{error&&<p role="alert" className="error">SOURCE MISSING: {error}</p>}
   </aside>
   <div className="reading-surface">
    {archive&&!scenes.length&&<div className="source-note">SOURCE MISSING — No published scenes in this archive.</div>}
    {selected&&<><div className="story-toolbar"><span>{selected.scene_id}</span></div>
     <div className="source-scene prose-exact ep02-approved-text" dangerouslySetInnerHTML={{__html:safeHtml}} />
     <div className="chapter-controls"><button type="button" className="button subtle" disabled={index<=0} onClick={()=>goScene(scenes[index-1].scene_id)}>← Previous scene</button><span>Scene {index+1} of {scenes.length} · {visited[active]?.length||1} visited</span><button type="button" className="button primary" disabled={index>=scenes.length-1} onClick={()=>goScene(scenes[index+1].scene_id)}>Next scene →</button></div>
     <details className="source-footnote"><summary>About this story edition</summary><p>Episode 02 source text and order are frozen and author-approved. Earlier draft badges remain preserved only in raw archival files; unwritten material has not been invented.</p></details>
     </>}
   </div>
  </div>
 </main>
}

type Ep03Block={order:number;time:string;type:string;text:string};
type Ep03Line={time?:string|null;kind?:string;speaker?:string;text:string};
type Ep03Beat={id:string;title:string;status:string;parts:{raw:string;origin:string}[]};
type Ep03Scene={id:string;title:string;date:string;time:string;place:string;status:string;source:string;reviewNotes?:string[];format:'blocks'|'raw'|'lines'|'beats'|'revision'|'scene08-draft';blocks?:Ep03Block[];raw?:string;lines?:Ep03Line[];beats?:Ep03Beat[];addenda?:{id:string;raw:string;status:string}[]};
type Ep03Data={episode:string;title:string;date:string;chapters:Record<string,Ep03Scene[]>};
const storyTag=(status:string)=>{
 if(status.startsWith('GROK_INSERTED_DOCUMENT_DRAFT'))return 'Grok insertions included · author review pending';
 if(status==='AUTHOR_APPROVED_FINAL_PROSE_PUBLISHED_2026_11_17')return 'Final · Author approved · Published';
 if(status==='GROK_SYNCED_FULL_PROSE_PUBLISHED_TO_UI_PENDING_AUTHOR_FINAL_APPROVAL_2026_11_17')return 'Grok-synced full prose · author review pending';
 if(status==='AUTHOR_REVISED_PROSE_IN_UI_PENDING_OVERALL_APPROVAL')return 'Author revisions highlighted · review pending';
 if(status==='ASSISTANT_AUTHORED_FULL_SCENE08_DRAFT_PENDING_USER_REVIEW')return 'Scene 08 prose draft · user review pending';
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
const storyInline=(text:string)=>text.split(/(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*)/g).map((part,i)=>
 part.startsWith('**')&&part.endsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:
 part.startsWith('__')&&part.endsWith('__')?<u className="ep03-story-emphasis" key={i}>{part.slice(2,-2)}</u>:
 part.startsWith('*')&&part.endsWith('*')?<em key={i}>{part.slice(1,-1)}</em>:<span key={i}>{part}</span>);
const StoryParagraphs=({raw}:{raw:string})=><>{raw.split(/\n\s*\n/).filter(Boolean).map((part,i)=><p className={'ep03-paragraph'+(part.includes('GRAPHICAL DESCRIPTION — START')?' grok-marker-start':part.includes('GRAPHICAL DESCRIPTION WILL END HERE')?' grok-marker-end':'')} style={part.includes('GRAPHICAL DESCRIPTION — START')||part.includes('GRAPHICAL DESCRIPTION WILL END HERE')?{borderLeft:'4px solid #c08a23',backgroundColor:'rgba(221,162,43,0.14)',padding:'10px 14px',borderRadius:'8px',fontWeight:650}:undefined} key={i}>{storyInline(part)}</p>)}</>;
type Scene07Revision={status:string;legend:{author:string;baseline:string};beats:{id:string;title:string;time:string;segments:{origin:'author'|'baseline';text:string}[]}[]};
function Scene07RevisedProse(){
 const {data,loading,error}=useData<Scene07Revision>('episode-03-ankita-scene-07-revised-prose.json');
 return <section className="source-scene prose-exact ep03-original" id="scene07-author-revised">
  <div className="source-note"><strong>Author changes are highlighted below.</strong> The highlighted passages are supplied by the author in Beats 4, 5, 6 and 7. The rest of the working prose and Scene 07 timing are preserved. Whole-scene approval is still pending.</div>
  {loading&&<p role="status">Loading Scene 07 author revisions…</p>}
  {error&&<p role="alert">Scene 07 revised prose unavailable: {error}</p>}
  {(data?.beats||[]).map(beat=><section className="ep03-beat" key={beat.id} id={'scene07-beat-'+beat.id}>
    <div className="ep03-beat-heading"><strong>{beat.id} · {beat.title}</strong><small>{beat.time}</small></div>
    {beat.segments.map((seg,i)=>seg.origin==='author'
      ?<div key={i} className="scene07-author-highlight" id={'scene07-change-'+beat.id+'-'+i} style={{borderLeft:'4px solid #d99f2f',backgroundColor:'rgba(218,158,48,0.16)',padding:'10px 14px',borderRadius:'8px',margin:'12px 0'}}>
         <strong style={{fontSize:'0.78rem',letterSpacing:'0.04em'}}>AUTHOR'S CHANGE · HIGHLIGHTED</strong>
         <StoryParagraphs raw={seg.text}/>
       </div>
      :<div key={i} className="scene07-original-text"><StoryParagraphs raw={seg.text}/></div>)}
  </section>)}
  <p className="muted">17:50 home arrival · Gopal's silent observation · 18:10 Scene 08 handoff unchanged.</p>
 </section>;
}
type Scene08DraftData={status:string;beats:{id:string;time:string;title:string;raw:string}[]};
function Scene08DraftProse(){
 const {data,error,loading}=useData<Scene08DraftData>('episode-03-ankita-scene-08-prose-draft.json');
 return <section className="source-scene prose-exact ep03-original" id="scene08-draft-prose">
   <p className="muted">Five-beat working prose · written from the existing author-directed Scene 08 outline, not yet author-approved. The door remains closed at the 18:25 cut.</p>
   {loading&&<p role="status">Loading Scene 08 prose…</p>}
   {error&&<p role="alert">Scene 08 prose unavailable: {error}</p>}
   {(data?.beats||[]).map(b=><section className="ep03-beat" id={'scene08-beat-'+b.id} key={b.id}>
      <div className="ep03-beat-heading"><strong>{b.id} · {b.title}</strong><small>{b.time}</small></div>
      <StoryParagraphs raw={b.raw}/>
   </section>)}
 </section>;
}
function Ep03Body({scene}:{scene:Ep03Scene}){
 if(scene.format==='scene08-draft')return <Scene08DraftProse/>;
 if(scene.format==='revision')return <Scene07RevisedProse/>;
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
 const active=['ankita','meenakshi','shreya','taniya'].includes(character)?character:'ankita';
 const {data,loading,error}=useData<Ep03Data>('episode-03-reader.json');
 const scenes=data?.chapters?.[active]||[];
 const selected=scenes.find(x=>x.id===scene)||scenes[0];
 const selectedIndex=scenes.findIndex(x=>x.id===selected?.id);
 const go=(id:string,who=active)=>openPage('reading',{episode:'03',character:who,scene:id});
 return <main className="page-width" id="episode03-final-prose">
  <header className="section-intro"><span className="eyebrow">The Story · 1 January 2026</span><h1>Episode 03 · Written Scenes</h1><p>All eight Ankita scenes and all four Meenakshi scenes have written text in this Reader. Individual author approvals are preserved; unwritten scenes remain in Planning. Shreya has four written scenes, including the Grok-synced Training Ground review draft; Taniya Scene 01 is a published working draft, while Shivani prose remains in the reader.</p></header>
  <div className="episode-picker" role="group" aria-label="Choose episode">
   <button type="button" onClick={()=>openPage('home')}>Episode 01 · Prologue</button>
   <button type="button" onClick={()=>openPage('reading',{character:active})}>Episode 02 · Six perspectives</button>
   <span className="episode-picker-current" aria-current="page">Episode 03 · Prose</span>
  </div>
  <div className="perspective-tabs" role="group" aria-label="Choose prose character">
   {['ankita','meenakshi','shreya','taniya'].map(w=><button key={w} type="button" className={active===w?'selected':''} aria-pressed={active===w} onClick={()=>go(w==='shreya'?'10':'01',w)}>{titleCase(w)}</button>)}
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
    {selected.reviewNotes?.length>0&&<section className="source-note" id="taniya-scene-continuity-flag"><strong>Source-preserved continuity review:</strong> {selected.reviewNotes.join(' ')} <em>Not final approved prose.</em></section>}
    {active==='ankita'&&selected.id==='03'&&<figure className="ankita-scene03-image" style={{margin:'1rem 0'}}><img src={assetUrl('assets/ankita-ep03-scene03-private-briefing.webp')} alt="Ankita at the office private-briefing presentation, illustrated reference" loading="lazy" style={{width:'min(100%, 440px)',height:'auto',borderRadius:'12px',display:'block'}}/><figcaption>Scene 03 illustration · now beside the written scene in Reading</figcaption></figure>}
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
