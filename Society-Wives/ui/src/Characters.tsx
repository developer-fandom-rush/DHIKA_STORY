import { useMemo, useState } from 'react';
import { Archive, Directory, episodePath, leadOrder, Person, openPage, titleCase, useData, assetUrl } from './lib';
import gallery from './data/gallery.json';
const categories=[{key:'family',label:'Family & household'},{key:'office',label:'Office / workplace'},{key:'society',label:'Society'}];
function category(p:Person){return p.group==='college-student'?'office':p.group||'society'}
export default function Characters({lead,personId}:{lead:string;personId:string|null}){
 const active=leadOrder.includes(lead)?lead:'ankita';
 const {data,error,loading}=useData<Directory>('character-directory.json');
 const [q,setQ]=useState('');
 const people=data?.people||[],leadRecord=data?.leads.find(x=>x.id===active);
 const scope=personId==='soniya'?'soniya':active;
 const {data:archive,loading:encLoading}=useData<Archive>(data?episodePath(scope):null);
 const selected=people.find(x=>x.id===personId)||data?.leads.find(x=>x.id===personId)||leadRecord;
 const related=useMemo(()=>{
  const ids=new Set((data?.relations||[]).filter(x=>x.w===active).map(x=>x.man));
  return people.filter(p=>p.house===active||(p.house==='shared'&&ids.has(p.id))||ids.has(p.id));
 },[people,data,active]);
 const searchResult=people.filter(p=>(p.name+' '+p.role).toLowerCase().includes(q.toLowerCase())).slice(0,30);
 const encounterMatch=archive?.character_name_index?.find(x=>x.character_id===selected?.id);
 const relation=data?.relations.find(x=>x.w===active&&x.man===selected?.id);
 const portrait=gallery.images.find(x=>x.characters.includes(selected?.id||'')&&!!x.path&&!x.restricted);
 const selectLead=(who:string)=>{setQ('');openPage('characters',{lead:who});};
 const selectPerson=(id:string,house=active)=>{setQ('');openPage('characters',{lead:house,person:id});};
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">Story Bible · canonical IDs</span><h1>Characters</h1><p>Five lead households, one shared society, five workplaces. Soniya has an independent profile.</p></header>
  <div className="filter-bar"><label className="search-field"><span>Find a character</span><input type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name or role…" /></label></div>
  {loading&&<p role="status">Loading canonical directory…</p>}{error&&<p role="alert" className="error">SOURCE MISSING: {error}</p>}
  <div className="perspective-tabs" role="group" aria-label="Choose character family">{leadOrder.map(w=><button type="button" key={w} className={w===active&&personId!=='soniya'?'selected':''} aria-pressed={w===active&&personId!=='soniya'} onClick={()=>selectLead(w)}>{titleCase(w)}</button>)}<button type="button" className={personId==='soniya'?'selected':''} aria-pressed={personId==='soniya'} onClick={()=>selectPerson('soniya','taniya')}>Soniya</button></div>
  {q&&<section className="search-results"><p className="aside-title">Search results · {searchResult.length}{searchResult.length===30?'+':''}</p><div className="tag-list">{searchResult.map(p=><button type="button" className="person-tag" key={p.id} onClick={()=>selectPerson(p.id,leadOrder.includes(p.house||'')?p.house!:active)}>{p.name} · {p.role||'Role not recorded'}</button>)}</div></section>}
  {data&&<div className="cast-layout">
   <aside className="cast-rail"><div className="rail-heading"><h2>{leadRecord?.name}</h2><p>{leadRecord?.role||'Lead'}</p></div>
    {categories.map(g=><section key={g.key} className="cast-group"><h3>{g.label}</h3>{related.filter(p=>category(p)===g.key).map(p=><button type="button" onClick={()=>selectPerson(p.id)} aria-pressed={p.id===selected?.id} className={p.id===selected?.id?'cast-name active':'cast-name'} key={p.id}><span>{p.name}</span><small>{p.role||'Role unverified'}</small></button>)}{!related.some(p=>category(p)===g.key)&&<p className="muted">No verified records</p>}</section>)}
   </aside>
   <div>
    {selected&&<article className="profile-panel">
     <div className="profile-top"><div><span className="eyebrow">Character profile</span><h2>{selected.name}</h2><button type="button" className="profile-visual-link" onClick={()=>openPage('gallery',{character:selected.id})}>View photos</button></div>{portrait?.path&&<button type="button" className="portrait-button" onClick={()=>openPage('gallery',{character:selected.id})} aria-label={'View photos of '+selected.name}><img className="profile-portrait" src={assetUrl(portrait.path)} alt={'Existing visual reference for '+selected.name} loading="lazy" /></button>}</div>
     <p className="profile-role">{selected.role||'Role not recorded'}{typeof selected.age==='number'?' · Age '+selected.age:' · Age not verified'}</p>
     <div className="profile-grid"><div><span className="field-label">Household</span><p>{selected.house||('home'in selected?String(selected.home):'Not recorded')}</p></div><div><span className="field-label">Source status</span><p>{String(selected.sourceStatus||'Review')}</p></div><div><span className="field-label">Classification</span><p>{category(selected)}</p></div><div><span className="field-label">Relationship context</span><p>{relation?.how||'No direct relationship entry in this lead’s atlas'}</p></div></div>
     {relation&&<div className="source-note"><strong>Recorded relationship direction:</strong> {relation.why||'Not stated'} · <strong>{relation.state||'Review'}</strong>. This is a source note, not evidence of an encounter or consent.</div>}
     {selected.notes&&<p>{String(selected.notes)}</p>}
     <details className="source-footnote"><summary>Additional character details</summary><pre>{JSON.stringify(selected,null,2)}</pre></details>
    </article>}
    <section className="encounter-panel"><div className="reading-heading"><div><span className="eyebrow">Source-linked continuity</span><h2>Encounter records</h2></div></div>
     {encLoading&&<p>Loading original scene index…</p>}
     {encounterMatch?.matches.length?encounterMatch.matches.map(m=>{
       const scene=archive?.scenes.find(s=>s.scene_id===m.scene_id);
       return <article className="encounter-card" key={m.scene_id}><div className="split"><div><h3>{m.scene_id}</h3><p>Exact-name/alias index · {m.evidence_line_ids?.length||0} source line references</p></div><button type="button" className="button subtle" onClick={()=>openPage('reading',{character:scope,scene:m.scene_id})}>Read scene</button></div>
        <p className="muted">A source mention does not by itself prove an encounter, mutual attraction, or physical contact.</p><details><summary>Full source encounter JSON</summary><pre>{JSON.stringify(scene||m,null,2)}</pre></details>
       </article>
     }):<p className="source-note">No directly indexed scene records for this character in the selected lead's Episode 02 source. Check other leads where relevant; no encounter has been invented.</p>}
     <p className="muted">All recorded encounters are shown here; original archive data remains preserved.</p>
    </section>
   </div>
  </div>}
 </main>
}
