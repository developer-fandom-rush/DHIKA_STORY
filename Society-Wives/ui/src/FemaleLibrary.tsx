import { useEffect, useId, useState } from 'react';
import archive from './data/female-library.json';
import { assetUrl } from './lib';

type Photo={title:string;url:string;previewPath?:string};
type Person=(typeof archive.characters)[number];
function DriveImage({photo}:{photo:Photo}){
 const [failed,setFailed]=useState(false);
 const id=photo.url.split('/file/d/')[1]?.split('/')[0];
 const preview=photo.previewPath?assetUrl(photo.previewPath):id?'https://drive.google.com/thumbnail?id='+encodeURIComponent(id)+'&sz=w900':null;
 return <article className="female-photo">
  <div className="female-photo-frame">
   {preview&&!failed?<img loading="lazy" src={preview} alt={photo.title} onError={()=>setFailed(true)}/>:<div className="female-photo-placeholder" aria-label="Private Drive image"><span aria-hidden="true">◈</span><span>{failed?'Preview blocked by Google Drive':'Private portrait'}</span></div>}
  </div>
  <p className="female-photo-title">{photo.title}</p>
  {photo.previewPath&&<p className="female-photo-preview-note">Published cast preview · Drive contains original</p>}
  <div className="female-photo-actions">
   <a className="button primary" href={photo.url} target="_blank" rel="noreferrer">Open in Drive</a>
  </div>
 </article>;
}
function RevealSection({title,photos,person}:{title:string;photos:Photo[];person:string}){
 const [open,setOpen]=useState(false);
 const id=useId();
 useEffect(()=>setOpen(false),[person]);
 return <div className="female-reveal">
  <button type="button" className="female-reveal-toggle" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls={id}>
   <span><strong>{title}</strong><small>{photos.length} {photos.length===1?'image':'images'} · {open?'Click to hide':'Click to reveal'}</small></span>
   <span aria-hidden="true">{open?'−':'+'}</span>
  </button>
  {open&&<div id={id} className="female-photo-grid">
   {photos.length?photos.map(p=><DriveImage key={p.url} photo={p}/>):<p className="muted">{title==='Reference Face'?'Reference portrait pending — no verified image assigned.':'No verified generated look for this character yet.'}</p>}
  </div>}
 </div>;
}
export default function FemaleLibrary({initialCharacter='ankita'}:{initialCharacter?:string}){
 const entries=archive.characters;
 const first=entries.some(x=>x.id===initialCharacter)?initialCharacter:'ankita';
 const [person,setPerson]=useState(first);
 useEffect(()=>{if(entries.some(x=>x.id===initialCharacter))setPerson(initialCharacter)},[initialCharacter]);
 const selected:Person=entries.find(x=>x.id===person)||entries[0];
 const groups=['Five leads','Ankita circle','Meenakshi circle','Shreya circle','Additional references'];
 return <section id="female-library" className="female-library" aria-label="Female reference faces and generated image library">
  <div className="female-library-head"><span className="eyebrow">Private image collection</span><h2>Female Image Library</h2>
   <p>Reference faces and generated looks, organised by character. Photos remain hidden until you reveal a section.</p></div>
  <label className="female-library-picker">Choose a female character
   <select aria-label="Choose female character" value={selected.id} onChange={e=>setPerson(e.target.value)}>
    {groups.map(g=><optgroup label={g} key={g}>{entries.filter(x=>x.group===g).map(x=><option value={x.id} key={x.id}>{x.name}</option>)}</optgroup>)}
   </select>
  </label>
  <div className="female-library-person"><strong>{selected.name}</strong><small>{selected.group} · {selected.reference.length?'Owner-only Google Drive images':'Reference face pending'}</small></div>
  <div className="female-library-sections">
   <RevealSection key={selected.id+'-reference'} person={selected.id} title="Reference Face" photos={selected.reference}/>
   <RevealSection key={selected.id+'-generated'} person={selected.id} title="Generated Looks" photos={selected.generated}/>
  </div>
  <p className="female-library-private-note">Hidden means collapsed in the UI, not additional access security. Drive originals stay private, and preview only works with a signed-in account that has access. Library-only originals which could not be exported are not silently substituted.</p>
  <a className="female-library-folder" href={archive.rootFolder} target="_blank" rel="noreferrer">Open organised Drive folder</a>
 </section>;
}
