import { Fragment } from 'react';
import { openPage, useData } from './lib';

type StoryScene={
 id:string;date:string;time:string;place:string;title:string;raw:string;visuals:string[];notes?:string[];
};
type StoryReader={
 episode:string;lead:string;title:string;subtitle:string;dateRange:string[];status:string;publicationNote:string;
 scenes:StoryScene[];sourceRefs?:string[];imagePolicy?:string;
};
type Props={episode:'06'|'07';character:string;scene:string|null};
const sourcePath:Record<'06'|'07',string>={
 '06':'episode-06-ankita-reader-working.json',
 '07':'episode-07-ankita-reader-working.json'
};
const go=(ep:string,id?:string)=>openPage('reading',{episode:ep,character:'ankita',scene:id});

export default function Episode0607Ankita({episode,character,scene}:Props){
 const isAnkita=character==='ankita';
 const {data,loading,error}=useData<StoryReader>(isAnkita?sourcePath[episode]:null);
 const scenes=data?.scenes||[];
 const selected=scenes.find(s=>s.id===scene)||scenes[0];
 const index=scenes.findIndex(s=>s.id===selected?.id);
 const paras=selected?.raw.split(/\n\s*\n/).filter(Boolean)||[];
 const hasInlineGrokMarkers=paras.some(p=>/^\[\[GROK:\d+\]\]$/.test(p.trim()));
 if(!isAnkita)return <main className="page-width" id="ep0607-lead-not-published">
  <header className="section-intro"><span className="eyebrow">Society Wives · Episode {episode}</span><h1>{character.charAt(0).toUpperCase()+character.slice(1)} · Reader not yet written</h1>
   <p>Only Ankita’s Episode {episode} working prose is available for review. This reader will never substitute Ankita’s manuscript for another lead.</p></header>
  <div className="chapter-controls"><button className="button primary" type="button" onClick={()=>go(episode)}>Read Ankita Episode {episode} →</button>
   <button className="button subtle" type="button" onClick={()=>openPage('planning',{lead:character,part:'06'})}>Open this lead’s Episode 06 planning →</button>
  </div>
 </main>;
 return <main className="page-width ep0607-reader" id={'episode-'+episode+'-ankita-working-reader'}>
  <header className="section-intro">
   <span className="eyebrow">The Story · Ankita · Episode {episode} · {data?.dateRange.join(' to ')||'January 2026'}</span>
   <h1>Episode {episode} · {data?.title||'Ankita'}</h1>
   <p>{data?.subtitle||'Scene-by-scene working story for author review'}</p>
  </header>
  <p className="source-note"><strong>Working manuscript for review — not frozen canon.</strong> {data?.publicationNote||'This episode is being loaded.'} Visual insert cards are text-only cinematic storyboard directions; they are not photos or explicit imagery.</p>
  <div className="perspective-tabs" role="group" aria-label="Move between Ankita episodes">
   <button type="button" className={episode==='06'?'selected':''} aria-pressed={episode==='06'} onClick={()=>go('06')}>Episode 06 · Jan 3–5</button>
   <button type="button" className={episode==='07'?'selected':''} aria-pressed={episode==='07'} onClick={()=>go('07')}>Episode 07 · Jan 6–7</button>
   <button type="button" onClick={()=>go('05')}>Episode 05 original →</button>
   <button type="button" onClick={()=>openPage('planning',{lead:'ankita',part:'06'})}>EP06 source planning →</button>
  </div>
  {loading&&<p role="status">Loading Ankita Episode {episode} story…</p>}
  {error&&<p role="alert" className="error">Episode {episode} Reader unavailable: {error}</p>}
  {data&&<div className="reader-layout">
   <aside className="scene-sidebar">
    <p className="aside-title">Ankita · {scenes.length} scenes</p>
    {scenes.map((s,i)=><button type="button" key={s.id} className={'scene-link'+(s.id===selected?.id?' active':'')} aria-pressed={s.id===selected?.id} onClick={()=>go(episode,s.id)}>
     <span>Scene {i+1}<small className="ep03-scene-name">{s.title}</small></span>
    </button>)}
   </aside>
   <article className="reading-surface prose-exact">
    {selected&&<>
     <div className="story-toolbar"><span>Episode {episode} · Scene {index+1} of {scenes.length}</span><span>{selected.date}</span></div>
     <div className="source-scene ep0607-story-prose">
      <h2>{selected.title}</h2>
      <p className="ep0607-when">{selected.date} · {selected.time} · {selected.place}</p>
      {paras.map((p,i)=>{
       const inlineMarker=p.trim().match(/^\[\[GROK:(\d+)\]\]$/);
       if(inlineMarker){
        const visualIndex=Number(inlineMarker[1]);
        const frame=(selected.visuals||[])[visualIndex];
        return frame?<aside key={'grok-'+i} className="ep0607-grok-frame" aria-label={'Storyboard direction '+(visualIndex+1)}>
         <span>GROK VISUAL INSERT · {visualIndex+1} / {(selected.visuals||[]).length}</span><p>{frame}</p>
        </aside>:null;
       }
       return <Fragment key={i}>
        <p className="ep03-paragraph" style={{whiteSpace:'pre-wrap'}}>{p}</p>
        {!hasInlineGrokMarkers&&(selected.visuals||[]).map((frame,j)=>{
         const insertAfter=Math.floor((j+1)*(paras.length+1)/((selected.visuals||[]).length+1));
         return insertAfter===i+1?<aside key={j} className="ep0607-grok-frame" aria-label={'Storyboard direction '+(j+1)}>
          <span>GROK VISUAL INSERT · {j+1} / {(selected.visuals||[]).length}</span><p>{frame}</p>
         </aside>:null;
        })}
       </Fragment>;
      })}
      {(selected.notes||[]).length>0&&<details className="source-footnote"><summary>Continuity notes for this scene</summary>
       {(selected.notes||[]).map((n,i)=><p key={i}>{n}</p>)}
      </details>}
     </div>
     <div className="chapter-controls">
      <button type="button" className="button subtle" onClick={()=>index>0?go(episode,scenes[index-1].id):go(episode==='07'?'06':'05',episode==='07'?'09':undefined)}>
       ← {index>0?'Previous scene':episode==='07'?'Episode 06 end':'Episode 05'}
      </button>
      <span>Scene {index+1} / {scenes.length}</span>
      <button type="button" className="button primary" onClick={()=>index<scenes.length-1?go(episode,scenes[index+1].id):episode==='06'?go('07','01'):openPage('sw-timeline',{date:'2026-01-07'})}>
       {index<scenes.length-1?'Next scene →':episode==='06'?'Continue to Episode 07 →':'See Jan 7 timeline →'}
      </button>
     </div>
    </>}
   </article>
  </div>}
 </main>;
}
