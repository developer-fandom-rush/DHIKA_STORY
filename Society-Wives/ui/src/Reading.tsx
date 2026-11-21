import DOMPurify from 'dompurify';
import { Archive, assetUrl, episodePath, peopleOrder, openPage, titleCase, useData } from './lib';
import Home from './Home';
import EpisodeSelector from './EpisodeSelector';
type Props={character:string;scene:string|null;episode?:string|null};

function Episode02Reading({character,scene}:Props){
 const active=peopleOrder.includes(character)?character:'ankita';
 const canonicalSource=active==='soniya'?'taniya':active; // Taniya and Soniya archives contain identical scene HTML; one source, two entry points.
 const {data:archive,loading,error}=useData<Archive>(episodePath(canonicalSource));
 const scenes=archive?.scenes||[];
 const selected=scenes.find(s=>s.scene_id===scene)||scenes[0];
 const index=scenes.findIndex(s=>s.scene_id===selected?.scene_id);
 const goScene=(id:string,who=active)=>openPage('reading',{character:who,scene:id});
 const html=selected?.source_html_lines_exact?.join('\n')||'';
 const safeHtml=DOMPurify.sanitize(html,{USE_PROFILES:{html:true},FORBID_ATTR:['href','target','rel'],FORBID_TAGS:['img','picture','svg','canvas']});
 // Episode 02 is author-approved in full. Keep historical archive metadata intact, but do not display obsolete per-scene review statuses.
 return <main className="page-width ep02-final-reader">
  <header className="section-intro"><span className="eyebrow">The Story · 1 January 2026</span><h1>Episode 02</h1><p>The New Year's Unspoken Secrets · Choose a perspective.</p></header>
  <p className="reader-intro">Pick a character below, then continue scene by scene. Your place in this reading session is shown underneath.</p>
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
     <div className="chapter-controls"><button type="button" className="button subtle" disabled={index<=0} onClick={()=>goScene(scenes[index-1].scene_id)}>← Previous scene</button><span>Scene {index+1} of {scenes.length}</span><button type="button" className="button primary" disabled={index>=scenes.length-1} onClick={()=>goScene(scenes[index+1].scene_id)}>Next scene →</button></div>
     </>}
   </div>
  </div>
 </main>
}

type Ep03Block={order:number;time:string;type:string;text:string};
type Ep03Line={time?:string|null;kind?:string;speaker?:string;text:string};
type Ep03Beat={id:string;title:string;status:string;parts:{raw:string;origin:string}[]};
type Ep03Scene={id:string;title:string;date:string;time:string;place:string;status:string;source:string;reviewNotes?:string[];format:'blocks'|'raw'|'lines'|'beats'|'revision'|'scene08-draft'|'shivani-merged';segments?:{id:string;origin:'base'|'grok';raw:string;source?:string}[];blocks?:Ep03Block[];raw?:string;lines?:Ep03Line[];beats?:Ep03Beat[];addenda?:{id:string;raw:string;status:string}[]};
type Ep03Data={episode:string;title:string;date:string;chapters:Record<string,Ep03Scene[]>};
const storyInline=(text:string)=>text.split(/(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*)/g).map((part,i)=>
 part.startsWith('**')&&part.endsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:
 part.startsWith('__')&&part.endsWith('__')?<u className="ep03-story-emphasis" key={i}>{part.slice(2,-2)}</u>:
 part.startsWith('*')&&part.endsWith('*')?<em key={i}>{part.slice(1,-1)}</em>:<span key={i}>{part}</span>);
const StoryParagraphs=({raw}:{raw:string})=><>{raw.split(/\n\s*\n/).filter(Boolean).map((part,i)=><p className={'ep03-paragraph'+(part.includes('GRAPHICAL DESCRIPTION — START')?' grok-marker-start':part.includes('GRAPHICAL DESCRIPTION WILL END HERE')?' grok-marker-end':'')} style={part.includes('GRAPHICAL DESCRIPTION — START')||part.includes('GRAPHICAL DESCRIPTION WILL END HERE')?{borderLeft:'4px solid #c08a23',backgroundColor:'rgba(221,162,43,0.14)',padding:'10px 14px',borderRadius:'8px',fontWeight:650}:undefined} key={i}>{storyInline(part)}</p>)}</>;
type Scene07Revision={status:string;legend:{author:string;baseline:string};beats:{id:string;title:string;time:string;segments:{origin:'author'|'baseline';text:string}[]}[]};
function Scene07RevisedProse(){
 const {data,loading,error}=useData<Scene07Revision>('episode-03-ankita-scene-07-revised-prose.json');
 return <section className="source-scene prose-exact ep03-original" id="scene07-author-revised">
  {loading&&<p role="status">Loading Scene 07 author revisions…</p>}
  {error&&<p role="alert">Scene 07 revised prose unavailable: {error}</p>}
  {(data?.beats||[]).map(beat=><section className="ep03-beat" key={beat.id} id={'scene07-beat-'+beat.id}>
    <div className="ep03-beat-heading"><strong>{beat.id} · {beat.title}</strong><small>{beat.time}</small></div>
    {beat.segments.map((seg,i)=>seg.origin==='author'
      ?<div key={i} className="scene07-author-highlight" id={'scene07-change-'+beat.id+'-'+i} style={{borderLeft:'4px solid #d99f2f',backgroundColor:'rgba(218,158,48,0.16)',padding:'10px 14px',borderRadius:'8px',margin:'12px 0'}}>
         
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
   {loading&&<p role="status">Loading Scene 08 prose…</p>}
   {error&&<p role="alert">Scene 08 prose unavailable: {error}</p>}
   {(data?.beats||[]).map(b=><section className="ep03-beat" id={'scene08-beat-'+b.id} key={b.id}>
      <div className="ep03-beat-heading"><strong>{b.id} · {b.title}</strong><small>{b.time}</small></div>
      <StoryParagraphs raw={b.raw}/>
   </section>)}
 </section>;
}
const ShivaniParagraphs=({raw}:{raw:string})=><>{raw.replace(/^(#{1,3} [^\n]+)$/gm,'\n\n$1\n\n').split(/\n\s*\n/).filter(Boolean).filter(part=>!/^\*{0,2}FINAL PUBLISHED EDITION\b/i.test(part.trim())).map((part,i)=>{
 const value=part.trim(),heading=value.match(/^(#{1,3})\s+([^\n]+)$/);
 if(heading)return heading[1].length===3?<h4 key={i}>{storyInline(heading[2])}</h4>:<h3 key={i}>{storyInline(heading[2])}</h3>;
 if(/^---+$/.test(value))return <hr key={i}/>;
 return <p className="ep03-paragraph" style={{whiteSpace:'pre-line'}} key={i}>{storyInline(value)}</p>;
})}</>;
function ShivaniMergedProse({scene}:{scene:Ep03Scene}){
 return <div className="source-scene prose-exact ep03-original ep03-shivani-source">
  {(scene.segments||[]).map((part,i)=><section key={part.id||i} className={part.origin==='grok'?'ep03-shivani-grok':'ep03-shivani-base'} id={part.origin==='grok'?'ep03-shivani-insert-'+part.id:undefined} style={part.origin==='grok'?{borderLeft:'4px solid #c08a23',backgroundColor:'rgba(221,162,43,0.14)',padding:'12px 16px',borderRadius:'8px',margin:'14px 0'}:undefined}>
   
   <ShivaniParagraphs raw={part.raw}/>
  </section>)}
 </div>;
}
function Ep03Body({scene}:{scene:Ep03Scene}){
 if(scene.format==='shivani-merged')return <ShivaniMergedProse scene={scene}/>;
 if(scene.format==='scene08-draft')return <Scene08DraftProse/>;
 if(scene.format==='revision')return <Scene07RevisedProse/>;
 if(scene.format==='raw')return <div className="source-scene prose-exact ep03-original"><StoryParagraphs raw={scene.raw||''}/></div>;
 if(scene.format==='blocks')return <div className="source-scene prose-exact ep03-original">{(scene.blocks||[]).map((block,i)=><div key={block.order}>{(i===0||scene.blocks?.[i-1]?.time!==block.time)&&<p className="ep03-time">{block.time} PM</p>}<p className={block.type==='dialogue'?'dialogue':block.type.includes('thought')?'inner':'ep03-paragraph'}>{storyInline(block.text)}</p></div>)}</div>;
 if(scene.format==='lines')return <div className="source-scene prose-exact ep03-original">{(scene.lines||[]).map((line,i)=><div key={i}>{line.time&&<p className="ep03-time">{line.time} PM</p>}{line.kind==='dialogue'?<p className="dialogue"><strong>{line.speaker}:</strong> “{line.text}”</p>:<p className="ep03-paragraph">{line.text}</p>}</div>)}</div>;
 return <div className="source-scene prose-exact ep03-original">{(scene.beats||[]).map(beat=><section className="ep03-beat" key={beat.id} id={'ep03-beat-'+beat.id}><div className="ep03-beat-heading"><strong>{beat.id} · {beat.title}</strong></div>{beat.parts.map((part,i)=><div key={i}>{beat.parts.length>1&&<p className="ep03-part">Part {i+1}</p>}<StoryParagraphs raw={part.raw}/></div>)}{beat.id==='F08'&&scene.addenda?.map(a=><details key={a.id} className="source-footnote"><summary>{a.id} · original author addendum</summary><StoryParagraphs raw={a.raw}/></details>)}</section>)}</div>;
}
type Scene06CleanRevision={title:string;status:string;beats:{id:string;title:string;raw:string;provenance:string}[]};
function Scene06CleanVersion(){
 const {data,error,loading}=useData<Scene06CleanRevision>('episode-03-ankita-scene-06-clean-revision.json');
 return <section className="source-scene prose-exact ep03-original" id="scene06-clean-revision">
  <h3>Scene 06</h3>
  {loading&&<p role="status">Loading corrected seven-beat draft…</p>}
  {error&&<p role="alert">Scene 06 clean revision unavailable: {error}</p>}
  {(data?.beats||[]).map(beat=><section className="ep03-beat" id={'scene06-clean-'+beat.id} key={beat.id}>
    <div className="ep03-beat-heading"><strong>{beat.title}</strong></div>
    <pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',fontFamily:'inherit',lineHeight:1.7}}>{beat.raw}</pre>
  </section>)}
 </section>;
}
function Episode03Reading({character,scene}:Props){
 const active=['ankita','shivani','meenakshi','shreya','taniya'].includes(character)?character:'ankita';
 const {data,loading,error}=useData<Ep03Data>('episode-03-reader.json');
 const scenes=data?.chapters?.[active]||[];
 const selected=scenes.find(x=>x.id===scene)||scenes[0];
 const selectedIndex=scenes.findIndex(x=>x.id===selected?.id);
 const go=(id:string,who=active)=>openPage('reading',{episode:'03',character:who,scene:id});
 return <main className="page-width" id="episode03-final-prose">
  <header className="section-intro"><span className="eyebrow">The Story · 1 January 2026</span><h1>Episode 03</h1></header>
  <div className="perspective-tabs" role="group" aria-label="Choose prose character">
   {['ankita','shivani','meenakshi','shreya','taniya'].map(w=><button key={w} type="button" className={active===w?'selected':''} aria-pressed={active===w} onClick={()=>go(w==='shreya'?'10':'01',w)}>{titleCase(w)}</button>)}
  </div>
  {loading&&<p role="status">Loading Episode 03 prose…</p>}
  {error&&<p role="alert" className="error">SOURCE MISSING: {error}</p>}
  {data&&<div className="reader-layout">
   <aside className="scene-sidebar"><p className="aside-title">{titleCase(active)} · Episode 03</p>
    {scenes.map(s=><button type="button" key={s.id} className={'scene-link'+(selected?.id===s.id?' active':'')} aria-pressed={selected?.id===s.id} onClick={()=>go(s.id)}><span>Scene {s.id}<small className="ep03-scene-name">{s.title}</small></span></button>)}
    <button type="button" className="button subtle ep03-planning-link" onClick={()=>openPage('planning',{lead:active})}>Episode 04 planning →</button>
   </aside>
   <div className="reading-surface">{selected&&<>
    <div className="story-toolbar"><span>{titleCase(active)} · Scene {selected.id}</span></div>
    <div className="ep03-scene-intro"><h2>{selected.title}</h2><p>{selected.date} · {selected.time} · {selected.place}</p></div>
     {active==='ankita'&&selected.id==='06'?<Scene06CleanVersion/>:<Ep03Body scene={selected}/>}
    <div className="chapter-controls"><button type="button" className="button subtle" disabled={selectedIndex<=0} onClick={()=>go(scenes[selectedIndex-1].id)}>← Previous scene</button><span>Scene {selectedIndex+1} of {scenes.length}</span><button type="button" className="button primary" disabled={selectedIndex>=scenes.length-1} onClick={()=>go(scenes[selectedIndex+1].id)}>Next scene →</button></div>
   </>}</div>
  </div>}
 </main>;
}

type Ep04LeadPublication={
 name:string;source:string;sourceType:string;publicationStatus:string;
 publishedSceneIds:string[];visibleDraftSceneIds?:string[];completedPlanSceneIds:string[];pendingPlanSceneIds:string[];publicationScope:string;
};
type Ep04PublicationIndex={episode:string;leads:Record<string,Ep04LeadPublication>};
type Ep04ManuscriptIllustration={id:string;afterSourceElementIndex:number;file:string;alt:string;caption:string;display:'inline'|'concept'};
type Ep04ManuscriptScene={id:string;title:string;startSourceElementIndex:number;endSourceElementIndex:number;plotId?:string;status?:string};
type Ep04AnkitaSource={
 source:{url:string;tabTitle:string;title:string};
 content:{sourceElementIndex:number;text:string;imageObjectIds:string[]}[];
 illustrations?:Ep04ManuscriptIllustration[];
 sceneIndex?:Ep04ManuscriptScene[];
 assetRoot?:string;
};
type Ep04ShivaniBlock={type:'text'|'heading'|'sourceImageReference'|'image';text?:string;style?:string;sourceParagraph?:number;inlineObjectId?:string;chatBeatId?:string;src?:string;alt?:string;caption?:string;sourceDriveFileId?:string};
type Ep04ShivaniScene={id:string;title:string;blocks:Ep04ShivaniBlock[]};
type Ep04ReaderReference={id:string;src:string;alt:string;caption:string};
type Ep04ShivaniSource={source?:{url:string;tabTitle:string;title:string};scenes:Ep04ShivaniScene[];savedSceneCount:number;referenceImages?:Ep04ReaderReference[]};
const ep04AnkitaImages:Record<number,{file:string;alt:string}>={
 12:{file:'a01-doorway-storyboard.jpg',alt:'A01 — Doorway encounter'},
 29:{file:'a02-filter-inspection.jpg',alt:'A02 — Water-filter inspection'},
 42:{file:'a03-water-burst.jpg',alt:'A03 — Water burst'},
 66:{file:'a04-silent-exit.jpg',alt:'A04 — Rinku leaves'}
};
function Episode04Reading({character,scene}:Props){
 const {data:publication,loading:publicationLoading,error:publicationError}=useData<Ep04PublicationIndex>('episode-04a-publication-index.json');
 const availableLeads=publication?Object.keys(publication.leads):['ankita','shivani'];
 const active=availableLeads.includes(character)?character:(availableLeads[0]||'ankita');
 const lead=publication?.leads[active];
 const isManuscript=lead?.sourceType==='google-doc-verbatim-manuscript';
 const isScenes=lead?.sourceType?.startsWith('scene-wise-')===true;
 const {data:ankita,loading:ankitaLoading,error:ankitaError}=useData<Ep04AnkitaSource>(isManuscript?lead?.source||null:null);
 const {data:shivani,loading:shivaniLoading,error:shivaniError}=useData<Ep04ShivaniSource>(isScenes?lead?.source||null:null);
 const publishedScenes=(shivani?.scenes||[]).filter(s=>lead?.publishedSceneIds.includes(s.id)||lead?.visibleDraftSceneIds?.includes(s.id));
 const selected=publishedScenes.find(s=>s.id===scene)||publishedScenes[0];
 const selectedIndex=publishedScenes.findIndex(s=>s.id===selected?.id);
 const go=(who:string,id?:string)=>openPage('reading',{episode:'04A',character:who,scene:id});
 return <main className="page-width ep04-final-reader" id="episode04a-reader">
  <header className="section-intro"><span className="eyebrow">The Story · 1 January 2026</span><h1>Episode 04A · Read Story</h1>
   <p>Read published manuscripts or partial drafts by character. In-progress scenes remain in Plot Planning until complete.</p>
  </header>
  <div role="group" aria-label="Choose Episode 04A character" className="perspective-tabs">
   {availableLeads.map(w=><button key={w} type="button" onClick={()=>go(w)} aria-pressed={active===w} className={w===active?'selected':''}>{titleCase(w)}</button>)}
  </div>
  {publicationLoading&&<p role="status">Loading publication index…</p>}
  {publicationError&&<p role="alert" className="error">Publication index unavailable: {publicationError}</p>}
  {lead&&<p className="source-note"><strong>{lead.name} · {lead.publicationStatus.includes('REVIEW')?'Working manuscript available for review':'Published in Read Story'}.</strong> {lead.publicationScope}</p>}
  {isManuscript&&<>
   {ankitaLoading&&<p role="status">Loading Episode 04A manuscript…</p>}
   {ankitaError&&<p role="alert" className="error">Episode 04A manuscript unavailable: {ankitaError}</p>}
   {ankita&&<>{active==='shreya'&&<p className="source-note"><a href="https://docs.google.com/document/d/1zcFlF9rWeIzaenBEmatt4K8bw3L-LcH3c_45JwoNM3o/edit?tab=t.90gza05r7hjd" target="_blank" rel="noopener noreferrer">Original Shreya 04A Google Doc</a> · Complete source prose is reproduced below, with scene navigation and image illustrations. Working manuscript, pending final author freeze.</p>}
    {active==='shreya'&&<div role="group" aria-label="Choose Shreya Episode 04A reading section" className="perspective-tabs">
      <button type="button" aria-pressed={!scene||!ankita.sceneIndex?.some(s=>s.id===scene)} className={!scene||!ankita.sceneIndex?.some(s=>s.id===scene)?'selected':''} onClick={()=>go(active)}>Complete Episode 04A</button>
      {(ankita.sceneIndex||[]).map(s=><button type="button" key={s.id} aria-pressed={scene===s.id} className={scene===s.id?'selected':''} onClick={()=>go(active,s.id)}>Scene {s.id} · {s.title}</button>)}
     </div>}
    <article className="reading-surface source-scene prose-exact" id={active==='shreya'?'ep04a-shreya-manuscript':'ep04a-ankita-manuscript'} style={{maxWidth:'850px',margin:'0 auto'}}>
    <h2>{titleCase(active)} · Episode 04A</h2>
    {(active==='shreya'&&ankita.sceneIndex?.some(s=>s.id===scene)
      ?ankita.content.filter(entry=>{const section=ankita.sceneIndex!.find(s=>s.id===scene)!;return entry.sourceElementIndex>=section.startSourceElementIndex&&entry.sourceElementIndex<=section.endSourceElementIndex})
      :ankita.content).map(entry=>{
     const text=entry.text.replace(/\u000b/g,'\n'),image=active==='ankita'?ep04AnkitaImages[entry.sourceElementIndex]:undefined;
     const illustrations=active==='shreya'?(ankita.illustrations||[]).filter(img=>img.afterSourceElementIndex===entry.sourceElementIndex&&img.display==='inline'):[];
     return <div key={entry.sourceElementIndex}>
      {text.trim()&&<p className="ep03-paragraph" style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{text}</p>}
      {image&&<figure style={{margin:'24px auto 30px',maxWidth:'640px'}}>
       <img loading="lazy" style={{width:'100%',height:'auto',borderRadius:'10px'}} src={assetUrl('assets/episode-04a-ankita/'+image.file)} alt={image.alt}/>
       <figcaption className="muted">{image.alt}</figcaption>
      </figure>}
      {illustrations.map(img=><figure key={img.id} style={{margin:'24px auto 30px',maxWidth:'640px'}}>
       <img loading="lazy" style={{width:'100%',height:'auto',borderRadius:'10px'}} src={assetUrl((ankita.assetRoot||'assets/episode-04a-shreya')+'/'+img.file)} alt={img.alt}/>
       <figcaption className="muted">{img.caption}</figcaption>
      </figure>)}
     </div>;
    })}
   </article>
   {active==='shreya'&&(!scene||scene==='02')&&(ankita.illustrations||[]).some(img=>img.display==='concept')&&<details className="episode-outline" style={{maxWidth:'850px',margin:'20px auto'}}><summary><strong>Additional generated images · Alternate concepts (not manuscript canon)</strong></summary>
    <p className="muted">These were generated earlier in this chat. They are kept as references, not literal evidence that the extra actions or outfits occurred in Scene 02.</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px',marginTop:'16px'}}>
     {(ankita.illustrations||[]).filter(img=>img.display==='concept').map(img=><figure key={img.id} style={{margin:0}}>
      <img loading="lazy" style={{width:'100%',height:'auto',borderRadius:'10px'}} src={assetUrl((ankita.assetRoot||'assets/episode-04a-shreya')+'/'+img.file)} alt={img.alt}/>
      <figcaption className="muted">{img.caption}</figcaption>
     </figure>)}
    </div>
   </details>}</>}
  </>}
  {isScenes&&<>
   {shivaniLoading&&<p role="status">Loading {titleCase(active)} Episode 04A…</p>}
   {shivaniError&&<p role="alert" className="error">{titleCase(active)} manuscript unavailable: {shivaniError}</p>}
   {shivani&&<div className="reader-layout">
    <aside className="scene-sidebar"><p className="aside-title">{titleCase(active)} · reader scenes</p>
     {publishedScenes.map(s=><button type="button" key={s.id} aria-pressed={selected?.id===s.id} className={'scene-link'+(selected?.id===s.id?' active':'')} onClick={()=>go(active,s.id)}><span>Scene {s.id}{lead?.visibleDraftSceneIds?.includes(s.id)?' · DRAFT':''}<small className="ep03-scene-name">{s.title}</small></span></button>)}
     <button type="button" className="button subtle" onClick={()=>openPage('planning',{lead:active,part:'A'})}>Remaining scenes · Planning →</button>
    </aside>
    <article className="reading-surface source-scene prose-exact">
     {selected&&<>
      <div className="story-toolbar"><span>{titleCase(active)} · Scene {selected.id} of {publishedScenes.length}{lead?.visibleDraftSceneIds?.includes(selected.id)?' · PARTIAL WORKING DRAFT — NOT COMPLETE':''}</span></div>
      <h2>{selected.title}</h2>
      {active==='meenakshi'&&selected.id==='04'&&(shivani.referenceImages||[]).length>0&&<section className="episode-plan-card" aria-label="Meenakshi author-supplied face reference images" style={{margin:'18px 0 28px'}}>
       <h3 style={{marginTop:0}}>Meenakshi · Author-supplied face references</h3>
       <p className="muted">These are the three images supplied by the author for character likeness only. They do not depict the Scene 04 surprise outfit or any intimate action. Reference 1 and 3 are identical uploads.</p>
       <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'14px'}}>
        {(shivani.referenceImages||[]).map(ref=><figure key={ref.id} style={{margin:0}}>
         <a href={assetUrl(ref.src)} target="_blank" rel="noreferrer" aria-label={'Open '+ref.alt}>
          <img loading="lazy" src={assetUrl(ref.src)} alt={ref.alt} style={{width:'100%',height:'auto',display:'block',borderRadius:'10px'}}/>
         </a>
         <figcaption className="muted" style={{marginTop:'6px',fontSize:'12px'}}>{ref.caption}</figcaption>
        </figure>)}
       </div>
      </section>}
      {selected.blocks.map((block,i)=>block.type==='heading'
       ?<h3 key={i} className="ep03-beat-heading" style={{marginTop:'24px'}}>{block.text}</h3>
       :block.type==='text'
        ?<p key={i} className={block.style?.startsWith('HEADING')?'ep03-beat-heading':'ep03-paragraph'} style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{storyInline(block.text||'')}</p>
        :block.type==='image'&&block.src
         ?<figure key={i} className="ep04-scene-illustration" style={{margin:'18px auto 26px',maxWidth:'850px'}}>
           <a href={assetUrl(block.src)} target="_blank" rel="noreferrer" aria-label="Open scene illustration in full size">
            <img loading="lazy" src={assetUrl(block.src)} alt={block.alt||'Scene illustration'} style={{width:'100%',height:'auto',borderRadius:'12px',display:'block'}}/>
           </a>
           {block.caption&&<figcaption className="muted" style={{marginTop:'8px',fontSize:'13px'}}>{block.caption}</figcaption>}
          </figure>
         :null)}
      <div className="chapter-controls">
       <button type="button" className="button subtle" disabled={selectedIndex<=0} onClick={()=>go(active,publishedScenes[selectedIndex-1]?.id)}>← Previous scene</button>
       <span>Scene {selectedIndex+1} of {publishedScenes.length}</span>
       <button type="button" className="button primary" disabled={selectedIndex>=publishedScenes.length-1} onClick={()=>go(active,publishedScenes[selectedIndex+1]?.id)}>Next scene →</button>
      </div>
     </>}
    </article>
   </div>}
  </>}
 </main>;
}

export default function Reading(props:Props){
 const episode=(props.episode==='04A'||props.episode==='04')?'04A':['01','02','03'].includes(props.episode||'') ? props.episode! : '01';
 return <><EpisodeSelector episode={episode}/>{episode==='01'?<Home scene={props.scene}/>:episode==='03'?<Episode03Reading {...props}/>:episode==='04A'?<Episode04Reading {...props}/>:<Episode02Reading {...props}/>}</>;
}
