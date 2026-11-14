import { useEffect, useMemo, useState } from 'react';
import gallery from './data/gallery.json';
import { assetUrl, titleCase } from './lib';
type ImageRecord=(typeof gallery.images)[number];
const labelFor=(id:string)=>({shreya_woman_02:'Meera',shreya_woman_03:'Poonam',shreya_woman_04:'Anjali'} as Record<string,string>)[id]||titleCase(id);
export default function Gallery({initialCharacter='all'}:{initialCharacter?:string}){
 const [character,setCharacter]=useState(initialCharacter),[source,setSource]=useState('all'),[episode,setEpisode]=useState('all'),[scene,setScene]=useState('all'),[q,setQ]=useState(''),[open,setOpen]=useState<ImageRecord|null>(null),[failed,setFailed]=useState<string[]>([]);
 useEffect(()=>setCharacter(initialCharacter),[initialCharacter]);
 const scenes=Array.from(new Set(gallery.images.map(x=>x.scene).filter((x):x is string=>!!x))).sort();
 const images=useMemo(()=>gallery.images.filter(x=>(character==='all'||x.characters.includes(character)||('storyline' in x&&x.storyline===character))&&(source==='all'||x.source===source)&&(episode==='all'||x.episode===episode)&&(scene==='all'||x.scene===scene)&&(!q||(x.title+' '+x.scene+' '+x.characters.join(' ')).toLowerCase().includes(q.toLowerCase()))),[character,source,episode,scene,q]);
 useEffect(()=>{if(!open)return;const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(null)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[open]);
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">One visual archive · original quality</span><h1>Image Gallery</h1><p>{gallery.images.length} indexed images · {gallery.images.filter(x=>x.source==='GitHub').length} GitHub assets · {gallery.images.filter(x=>x.restricted).length} private Drive links</p></header>
  <div className="source-note">Drive scene images remain private; they are recorded as restricted links, not falsely displayed as public thumbnails. No sharing permissions have been changed. Existing artwork is preserved in its original location.</div>
  <div className="filter-bar gallery-filters"><label>Character<select value={character} onChange={e=>setCharacter(e.target.value)}><option value="all">All characters</option>{['ankita','shivani','taniya','soniya','meenakshi','shreya','shruti','shreya_woman_02','shreya_woman_03','shreya_woman_04','rohan','nikhil','vivek','karan','aman','chauhan','lokesh'].map(x=><option key={x} value={x}>{labelFor(x)}</option>)}</select></label>
   <label>Source<select value={source} onChange={e=>setSource(e.target.value)}><option value="all">All sources</option><option value="GitHub">GitHub</option><option value="Google Drive">Google Drive</option></select></label>
   <label>Episode<select value={episode} onChange={e=>setEpisode(e.target.value)}><option value="all">All episodes</option><option value="02">02</option></select></label>
   <label>Scene<select value={scene} onChange={e=>setScene(e.target.value)}><option value="all">All scenes</option>{scenes.map(s=><option value={s} key={s}>{s}</option>)}</select></label>
   <label className="search-field">Search scenes<input type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="M12, workout, portrait…" /></label>
  </div>
  <p className="result-count" role="status">{images.length} matching images</p>
  <div className="gallery-grid">{images.map(x=><article className="image-card" key={x.id}>
   <button type="button" className="image-tile" onClick={()=>setOpen(x)} aria-label={'Inspect '+x.title}>{x.path&&!x.restricted&&!failed.includes(x.id)?<img src={assetUrl(x.path)} alt={x.title} loading="lazy" onError={()=>setFailed(a=>[...a,x.id])}/>:<div className="private-image"><span aria-hidden="true">◈</span><span>{x.restricted?'Private Drive reference':'Image unavailable'}</span></div>}</button>
   <div className="image-meta"><h2>{x.title}</h2><p>{x.characters.map(labelFor).join(' · ')}{x.scene?' · '+x.scene:''} · {x.visualCategory}</p><div className="image-foot"><span>{x.source} · {x.status}</span><button type="button" onClick={()=>setOpen(x)}>Details</button></div></div>
   </article>)}</div>
  {images.length===0&&<p className="source-note">No images match those filters. Clear search or choose another character.</p>}
  <section className="album-links"><h2>Linked review collections</h2>{gallery.albums.map(a=><p key={a.url}><a href={a.url} rel="noreferrer" target="_blank">{a.title} ↗</a> · Restricted review material</p>)}</section>
  {open&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={()=>setOpen(null)}><div className="lightbox-inner" onClick={e=>e.stopPropagation()}><div className="split"><h2>{open.title}</h2><button className="close-button" type="button" onClick={()=>setOpen(null)} aria-label="Close image viewer">✕</button></div>
   {open.path&&!open.restricted&&!failed.includes(open.id)?<img className="full-image" src={assetUrl(open.path)} alt={open.title}/>:<div className="lightbox-private">The original Drive image is not publicly embeddable. Open it with an authorized Drive account.</div>}
   <dl className="metadata-grid"><div><dt>Characters</dt><dd>{open.characters.map(labelFor).join(', ')}</dd></div><div><dt>Episode / scene</dt><dd>{open.episode||'Unassigned'} / {open.scene||'Unassigned'}</dd></div><div><dt>Story date</dt><dd>{open.storyDate||'Not verified'}</dd></div><div><dt>Status</dt><dd>{open.status}</dd></div><div><dt>Source</dt><dd>{open.source}</dd></div><div><dt>Location</dt><dd>{open.location||'Not recorded'}</dd></div><div><dt>Visual category</dt><dd>{open.visualCategory}</dd></div></dl>
   <a className="button primary" href={open.original} rel="noreferrer" target="_blank">Open original source ↗</a></div></div>}
 </main>
}
