import { openPage, useData } from './lib';

type Wife='ankita'|'shivani'|'taniya'|'meenakshi'|'shreya';
type Scene={id:string;lead:string;title:string;time:string;place:string;raw:string};
type Reader={title:string;publicationNote:string;sourceDoc:string;scenes:Scene[]};
type Paragraph={index:number;text:string;style:string};
type Snapshot={sourceTitle:string;paragraphs:Paragraph[];copyPolicy?:string;sourceParagraphCount:number};
type Section={title:string;paragraphs:Paragraph[]};

const wives:Wife[]=['ankita','shivani','taniya','meenakshi','shreya'];
const names:Record<Wife,string>={ankita:'Ankita',shivani:'Shivani',taniya:'Taniya',meenakshi:'Meenakshi',shreya:'Shreya'};
const where:Record<Wife,{label:string;detail:string;kind:'reader'|'vault';path?:string;vault?:string}>={
 ankita:{label:'Reader · shared preparation + original marital ending',detail:'Ankita’s joint outfit-preparation scene and the original Ankita–Kabir Episode 05 final marital passage, imported verbatim.',kind:'reader'},
 shivani:{label:'Source Vault · 9 scenes',detail:'Same 2 January evening document as Meenakshi; archive source, not yet promoted to the main reader.',kind:'vault',path:'source-vault/ep05-meenakshi-shivani-jan02.json',vault:'ep05-meenakshi-shivani'},
 taniya:{label:'Source Vault · 9 scenes',detail:'Taniya’s separate 2 January evening document. Soniya is part of her continuity, not a separate EP05 standalone manuscript.',kind:'vault',path:'source-vault/ep05-taniya-jan02.json',vault:'ep05-taniya'},
 meenakshi:{label:'Source Vault · 9 scenes',detail:'Shared with Shivani in the same 2 January document; full original wording preserved.',kind:'vault',path:'source-vault/ep05-meenakshi-shivani-jan02.json',vault:'ep05-meenakshi-shivani'},
 shreya:{label:'Reader · 5 scenes',detail:'Three original early Shreya scenes, joint outfit preparation and the original Shreya–Vikram marriage ending.',kind:'reader'}
};
const isWife=(s:string):s is Wife=>wives.includes(s as Wife);
function displayRaw(scene:Scene,wife:Wife){
 if(scene.lead!=='Ankita × Shreya')return scene.raw;
 if(scene.id==='04'){
  const start=wife==='ankita'?'ANKITA × KABIR':'SHREYA × VIKRAM';
  const stop=wife==='shreya'?'ANKITA × KABIR':'Both women have refused';
  const begin=scene.raw.indexOf(start);
  if(begin<0)return scene.raw;
  const rest=scene.raw.slice(begin);
  const end=rest.indexOf(stop,start.length);
  return (end<0?rest:rest.slice(0,end)).trim();
 }
 if(scene.id==='05'){
  const marker=wife==='ankita'?'Ankita:':'Shreya:';
  const begin=scene.raw.indexOf(marker);
  if(begin<0)return scene.raw;
  const rest=scene.raw.slice(begin);
  return (wife==='shreya'?rest.split('\n\nAnkita:')[0]:rest).trim();
 }
 return scene.raw;
}
function ArchiveParagraph({paragraph}:{paragraph:Paragraph}){
 if(paragraph.style==='TITLE')return <h2>{paragraph.text}</h2>;
 if(paragraph.style.startsWith('HEADING'))return <h3>{paragraph.text}</h3>;
 return <p style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{paragraph.text||'\u00a0'}</p>;
}
function sectionsOf(paragraphs:Paragraph[]):Section[]{
 const sections:Section[]=[{title:'Source introduction and continuity notes',paragraphs:[]}];
 for(const p of paragraphs){
  if(p.style.startsWith('HEADING')&&/^Scene\s*\d+\b/i.test(p.text.trim())){
   sections.push({title:p.text,paragraphs:[p]});
  }else sections[sections.length-1].paragraphs.push(p);
 }
 return sections.filter(s=>s.paragraphs.length>0);
}
export default function Episode05Wives({character,scene}:{character:string;scene:string|null}){
 const active:Wife=isWife(character)?character:'ankita';
 const current=where[active];
 const {data:reader,loading:readerLoading,error:readerError}=useData<Reader>(current.kind==='reader'?'episode-05-reader.json':null);
 const {data:snapshot,loading:vaultLoading,error:vaultError}=useData<Snapshot>(current.kind==='vault'?current.path||null:null);
 const scenes=(reader?.scenes||[]).filter(x=>x.lead===names[active]||x.lead==='Ankita × Shreya');
 const selected=scenes.find(x=>x.id===scene)||scenes[0];
 const index=scenes.findIndex(x=>x.id===selected?.id);
 const go=(id:string)=>openPage('reading',{episode:'05',character:active,scene:id});
 const goWife=(wife:Wife)=>openPage('reading',{episode:'05',character:wife});
 const sections=sectionsOf(snapshot?.paragraphs||[]);
 return <main className="page-width ep04-final-reader" id="episode05-wife-wise-reader">
  <header className="section-intro">
   <span className="eyebrow">The Story · Episode 05 · 2 January evening and 3 January reactions</span>
   <h1>Episode 05 · Wife-wise reading</h1>
   <p>Choose each woman’s perspective below. Published reader extracts and unchanged source documents are kept distinct, so no unapproved prose is presented as final.</p>
  </header>
  <div className="perspective-tabs" role="group" aria-label="Episode 05 wife-wise perspectives">
   {wives.map(w=><button key={w} type="button" className={w===active?'selected':''} aria-pressed={w===active} onClick={()=>goWife(w)}>{names[w]}</button>)}
  </div>
  <div className="continuity-cards" id="episode05-wife-statuses" aria-label="Episode 05 source availability for each wife">
   {wives.map(w=><button type="button" key={w} onClick={()=>goWife(w)} className="encounter-card" aria-pressed={w===active} style={{cursor:'pointer',textAlign:'left',border:w===active?'2px solid #805067':'1px solid #e5d9de',background:w===active?'#faf3f6':'#fff'}}>
    <strong>{names[w]}</strong>
    <p style={{margin:'6px 0',fontSize:'0.8rem'}}>{where[w].label}</p>
    <small>{w===active?'Selected perspective':'Open perspective'}</small>
   </button>)}
  </div>
  <section className="episode-plan-card">
   <h2>{names[active]} · {current.label}</h2>
   <p>{current.detail}</p>
   {active==='ankita'||active==='shreya'?<p className="muted">The shared preparation scene is split by wife. The Friday marital endings are reproduced verbatim from the existing 2 January source, not rewritten. The preserved Saturday morning reaction belongs to Episode 06 context.</p>:<p className="muted">This is the unchanged author-source archive. Its presence here does not mean it has been separately approved as final reader prose.</p>}
   <div className="chapter-controls">
    {active==='ankita'||active==='shreya'
     ?<><a href="#/reading?episode=05&character=ankita">Ankita reading</a><a href="#/reading?episode=05&character=shreya">Shreya reading</a>
       <button type="button" className="button subtle" onClick={()=>openPage('planning',{lead:active,part:'05'})}>Open {names[active]} EP05 plot →</button></>
     :<button type="button" className="button subtle" onClick={()=>openPage('source-vault',{item:current.vault})}>Open full source in Source Vault →</button>}
   </div>
  </section>
  {(readerLoading||vaultLoading)&&<p role="status">Loading {names[active]} Episode 05…</p>}
  {(readerError||vaultError)&&<p role="alert" className="error">Episode 05 source unavailable: {readerError||vaultError}</p>}
  {current.kind==='reader'&&reader&&<>
   <p className="source-note"><strong>Publication scope:</strong> {reader.publicationNote}</p>
   <div className="reader-layout">
    <aside className="scene-sidebar"><p className="aside-title">{names[active]} · {scenes.length} scenes</p>
     {scenes.map((s,i)=><button type="button" key={s.id} className={'scene-link'+(selected?.id===s.id?' active':'')} aria-pressed={selected?.id===s.id} onClick={()=>go(s.id)}><span>Scene {i+1}<small className="ep03-scene-name">{s.title}</small></span></button>)}
    </aside>
    <article className="reading-surface prose-exact">
     {selected&&<>
      <div className="story-toolbar">{names[active]} · scene {index+1} of {scenes.length}{selected.lead==='Ankita × Shreya'?' · shared source':''}</div>
      <div className="source-scene"><h2>{selected.title}</h2><p className="muted">{selected.time} · {selected.place}</p>
       {displayRaw(selected,active).split(/\n\s*\n/).map((p,i)=><p key={i} style={{whiteSpace:'pre-wrap'}}>{p}</p>)}
      </div>
      <div className="chapter-controls">
       <button type="button" className="button subtle" disabled={index<=0} onClick={()=>go(scenes[index-1]?.id)}>← Previous scene</button>
       <span>Scene {index+1} of {scenes.length}</span>
       <button type="button" className="button primary" disabled={index>=scenes.length-1} onClick={()=>go(scenes[index+1]?.id)}>Next scene →</button>
      </div>
     </>}
    </article>
   </div>
   <p className="source-note">Full Ankita–Shreya original manuscript: <a href={reader.sourceDoc} target="_blank" rel="noreferrer">Google Docs source</a>. Unpublished meeting/discovery sections are not fabricated here.</p>
  </>}
  {current.kind==='vault'&&snapshot&&<>
   <section className="episode-plan-card"><h2>Verbatim source · {sections.length} sections</h2>
    <p><strong>Original:</strong> {snapshot.sourceTitle} · {snapshot.sourceParagraphCount} paragraphs. Text is reproduced from the preserved archive, including editor notes and shared scenes.</p>
   </section>
   {sections.map((section,i)=><details key={i} className="episode-outline" open={i===0} style={{marginBottom:'12px'}}>
    <summary>{section.title} · {section.paragraphs.length} paragraphs</summary>
    <article className="reading-surface source-scene prose-exact" style={{marginTop:'12px'}}>{section.paragraphs.map(p=><ArchiveParagraph key={p.index} paragraph={p}/>)}</article>
   </details>)}
   <p className="source-note">No independent Soniya EP05 chapter is currently published; related material remains part of the Taniya source context.</p>
  </>}
 </main>;
}
