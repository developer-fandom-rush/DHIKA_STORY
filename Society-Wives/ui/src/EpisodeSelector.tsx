import { openPage } from './lib';
const episodes=[{id:'01',label:'Episode 01 · Prologue'},{id:'02',label:'Episode 02 · Story'},{id:'03',label:'Episode 03 · Prose'},{id:'04A',label:'Episode 04A · Story'},{id:'04B',label:'Episode 04B · Story'},{id:'05',label:'Episode 05 · Ankita × Shreya'}] as const;
export default function EpisodeSelector({episode}:{episode:string}){
 return <div className="page-width" style={{paddingTop:24}}>
  <div className="episode-picker" role="group" aria-label="Choose episode">
   {episodes.map(e=><button type="button" key={e.id} aria-pressed={episode===e.id} className={episode===e.id?'episode-picker-current':''} onClick={()=>openPage('reading',{episode:e.id})}>{e.label}</button>)}
   <button type="button" aria-label="Open Shivani Episode 06 plot (not reader prose)" onClick={()=>openPage('planning',{lead:'shivani',part:'06'})}>Episode 06 · Plot only →</button>
  </div>
 </div>;
}
