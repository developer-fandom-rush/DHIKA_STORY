import type { ReactNode } from 'react';
import { openPage, titleCase, useData } from './lib';

type Beat={id:string;title:string;time?:string;[key:string]:unknown};
type Scene={id?:string;scene?:string;sceneNumber?:string;number?:string;title:string;start?:string;end?:string;location?:string;beats:Beat[];[key:string]:unknown};
type PlotDocument={title:string;scenes:Scene[];proseDraft?:{title?:string;url?:string};[key:string]:unknown};
type WorkshopTrack={chotu:string;lane?:string;setting?:string;a:Record<string,unknown>;b:Record<string,unknown>};
type Workshop={leads:{id:string;name:string;tracks:WorkshopTrack[]}[]};
type AnkitaArchive={tracks:WorkshopTrack[]};

const leads=['ankita','shivani','taniya','soniya','meenakshi','shreya'] as const;
const words:Record<string,string>={plot:'Plot',action:'Action',physical:'Staging',reaction:'Reaction',internal:'Inner thought',turn:'After-effect',continuity:'Continuity',dialogue:'Dialogue',dialogueSample:'Dialogue',mentalPOV:'Point of view',prosePreview:'Prose preview',reason:'Purpose',purpose:'Purpose',choice:'Choice',cause:'Cause',test:'Character test',result:'Result',after:'After-effect',hook:'Next beat',time:'Time',setting:'Setting'};
const human=(key:string)=>words[key]||key.replace(/([A-Z])/g,' $1').replace(/^./,v=>v.toUpperCase());
const omitted=new Set(['id','time','title','status','reviewStatus','provenance','source','approval','scene','beatId','fadeToBlack','image','visualAssets','visual','visualAssetFolder']);
function FieldValue({value}:{value:unknown}):ReactNode{
 if(value==null||typeof value==='boolean')return null;
 if(typeof value==='string'||typeof value==='number')return <>{String(value)}</>;
 if(Array.isArray(value))return <div>{value.map((entry,i)=><p key={i}><FieldValue value={entry}/></p>)}</div>;
 if(typeof value==='object'){
  const obj=value as Record<string,unknown>;
  if(typeof obj.speaker==='string'&&typeof obj.line==='string')return <><strong>{obj.speaker}:</strong> {obj.line}</>;
  return <div>{Object.entries(obj).filter(([k])=>!omitted.has(k)).map(([k,v])=><p key={k}><strong>{human(k)}:</strong> <FieldValue value={v}/></p>)}</div>;
 }
 return null;
}
function BeatDetails({beat}:{beat:Beat}){
 return <article className="encounter-card" id={'plot-beat-'+beat.id}>
  <h3>{beat.id} · {beat.title}</h3>{beat.time&&<p className="muted">{beat.time}</p>}
  {Object.entries(beat).filter(([k])=>!omitted.has(k)).map(([k,v])=><div key={k}><p><strong>{human(k)}:</strong> <FieldValue value={v}/></p></div>)}
 </article>;
}
function SceneDetails({scene,index}:{scene:Scene;index:number}){
 const number=scene.sceneNumber||scene.number||scene.scene||String(index+1).padStart(2,'0');
 return <details className="episode-outline" open={index===0} id={'episode04-scene-'+number}>
  <summary><strong>Scene {number} · {scene.title}</strong> {scene.start&&<span>· {scene.start}{scene.end?'–'+scene.end:''}</span>}</summary>
  {scene.location&&<p className="muted">{scene.location}</p>}
  <div className="continuity-cards">{(scene.beats||[]).map(b=><BeatDetails key={b.id} beat={b}/>)}</div>
 </details>;
}
function WorkshopDetails({tracks}:{tracks:WorkshopTrack[]}){
 return <div className="continuity-cards">{tracks.map((track,i)=><article className="episode-plan-card" key={track.chotu+'-'+i}>
  <h2>{track.chotu}{track.lane?' · '+track.lane:''}</h2>{track.setting&&<p>{track.setting}</p>}
  {(['a','b'] as const).map((phase,i)=><details key={phase} className="episode-outline" open={i===0}>
   <summary><strong>{phase==='a'?'First encounter':'Follow-up'} · {String(track[phase].title||'Plot')}</strong></summary>
   {Object.entries(track[phase]).filter(([key])=>!omitted.has(key)).map(([key,v])=><p key={key}><strong>{human(key)}:</strong> <FieldValue value={v}/></p>)}
  </details>)}
 </article>)}</div>;
}
export default function Planning({lead='ankita',part='A'}:{lead?:string;part?:string}){
 const active=leads.find(x=>x===lead)||'ankita';
 const selectedPart=active==='meenakshi'?'A':part==='B'?'B':'A';
 const {data:ankita,error:ankitaError}=useData<PlotDocument>('episode-04a-ankita-plan.json');
 const {data:shivani,error:shivaniError}=useData<PlotDocument>('episode-04a-shivani-plan.json');
 const {data:shreya,error:shreyaError}=useData<PlotDocument>('episode-04a-shreya-night-plan.json');
 const {data:taniya,error:taniyaError}=useData<PlotDocument>('episode-04a-taniya-soniya-night-review.json');
 const {data:workshop,error:workshopError}=useData<Workshop>('episode-04-chotu-six-leads-review.json');
 const {data:ankitaArchive,error:ankitaArchiveError}=useData<AnkitaArchive>('episode-04b-ankita-chotu-archive.json');
 const doc=active==='ankita'?ankita:active==='shivani'?shivani:active==='shreya'?shreya:active==='taniya'||active==='soniya'?taniya:null;
 const error=ankitaError||shivaniError||shreyaError||taniyaError||workshopError||ankitaArchiveError;
 const tracks=active==='meenakshi'?[]:active==='ankita'?(ankitaArchive?.tracks||[]):(workshop?.leads.find(x=>x.id===active)?.tracks||[]);
 const go=(who:string=active,p:'A'|'B'=selectedPart)=>openPage('planning',{lead:who,part:who==='meenakshi'?'A':p});
 return <main className="page-width">
  <header className="section-intro"><span className="eyebrow">Next planning · Episode 04</span><h1>Episode 04 · Plot Planning</h1><p>Character-wise story plots and new scenes only. Episodes 01–03 are in Reading, not repeated here.</p></header>
  <div className="episode-picker" role="group" aria-label="Choose planning episode">
   <button className={selectedPart==='A'?'episode-picker-current':''} aria-pressed={selectedPart==='A'} type="button" onClick={()=>go(active,'A')}>Episode 04A · Evening</button>
   {active!=='meenakshi'&&<button className={selectedPart==='B'?'episode-picker-current':''} aria-pressed={selectedPart==='B'} type="button" onClick={()=>go(active,'B')}>Episode 04B · Next Day</button>}
  </div>
  <div className="perspective-tabs" role="group" aria-label="Choose character">{leads.map(w=><button key={w} type="button" aria-pressed={active===w} className={active===w?'selected':''} onClick={()=>go(w)}>{titleCase(w)}</button>)}</div>
  {error&&<p role="alert" className="error">Some planning sources could not load: {error}</p>}
  {selectedPart==='A'?(active==='meenakshi'
   ?<section className="episode-plan-card" id="ep04-meenakshi-handoff"><h2>Meenakshi · Naveen · 14:15 handoff</h2><p>Episode 03 Scene 01 ended at the hospital after Naveen arrived with the handover copy. The next interaction remains open for Episode 04 discussion. No additional action or prose has been approved.</p><button type="button" className="button subtle" onClick={()=>openPage('reading',{episode:'03',character:'meenakshi',scene:'01'})}>Read the preceding scene</button></section>
   :doc?<section id="episode04-active-plan"><h2>{doc.title}</h2>{active==='soniya'&&<p className="muted">Shared Taniya and Soniya household scenes.</p>}
    {(doc.scenes||[]).map((s,i)=><SceneDetails key={s.id||s.scene||i} scene={s} index={i}/>)}
    {doc.proseDraft?.url&&<p className="source-note"><strong>Working prose draft:</strong> <a href={doc.proseDraft.url} target="_blank" rel="noreferrer">{doc.proseDraft.title||'Open draft prose'}</a></p>}
   </section>:<p role="status">Loading Episode 04A plot…</p>)
   :tracks.length?<section id="episode04-next-day"><h2>Episode 04B · {titleCase(active)}</h2><WorkshopDetails tracks={tracks}/></section>
   :<p role="status">Loading Episode 04B plot…</p>}
 </main>;
}
