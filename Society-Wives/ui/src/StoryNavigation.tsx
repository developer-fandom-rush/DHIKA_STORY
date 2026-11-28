/**
 * A single, persistent episode/lead navigator for both the published Reader
 * and the working Story Plot. Never hide historical episodes when a new plan
 * is added. All URLs are deep-linkable and preserve the selected perspective.
 */
type Mode='reading'|'planning';
type Lead='ankita'|'shivani'|'taniya'|'meenakshi'|'shreya';
const leads:Lead[]=['ankita','shivani','taniya','meenakshi','shreya'];
const episodes=['01','02','03','04A','04B','05','06','07'] as const;
const titleCase=(x:string)=>x[0].toUpperCase()+x.slice(1);
const normalizeEpisode=(ep:string)=>{
 if(ep==='A'||ep==='04')return '04A';
 if(ep==='B')return '04B';
 return episodes.some(x=>x===ep)?ep:'04A';
};
const normalizedLead=(lead:string):Lead=>leads.includes(lead as Lead)?lead as Lead:'ankita';
export default function StoryNavigation({mode,episode,lead}:{mode:Mode;episode:string;lead:string}){
 const ep=normalizeEpisode(episode);
 const who=normalizedLead(lead);
 const isPlot=mode==='planning';
 const route=(requestedEpisode:string,requestedLead:Lead,requestedMode:Mode)=>{
  if(requestedMode==='planning'&&(requestedEpisode==='06'||requestedEpisode==='07'))return '#/planning?lead='+requestedLead+'&part=06';
  if(requestedMode==='planning'){
   const p=['04A','04B','05'].includes(requestedEpisode)?requestedEpisode:'04A';
   return '#/planning?lead='+requestedLead+'&part='+p;
  }
  return '#/reading?episode='+requestedEpisode+'&character='+requestedLead;
 };
 const inMode=(nextMode:Mode)=>route(ep,who,nextMode);
 const episodesForPlot=episodes.filter(x=>!['01','02','03','07'].includes(x));
 return <nav className="story-episode-nav page-width" aria-label="Society Wives persistent episode navigation">
  <div className="story-episode-nav-head">
   <strong>Episodes &amp; perspectives</strong>
   <span>Read and Plot are separate; previously saved episodes stay accessible.</span>
  </div>
  <div className="story-episode-nav-modes" aria-label="Select reading or planning mode">
   <a href={inMode('reading')} aria-current={!isPlot?'page':undefined} className={!isPlot?'selected':''}>Read Story</a>
   <a href={inMode('planning')} aria-current={isPlot?'page':undefined} className={isPlot?'selected':''}>Story Plot</a>
  </div>
  <div className="story-episode-nav-episodes" aria-label="Select episode">
   {(isPlot?episodesForPlot:episodes).map(item=><a key={item} href={route(item,who,isPlot?'planning':'reading')} aria-current={item===ep?'page':undefined} className={item===ep?'selected':''}>
    Episode {item}{(item==='06'||item==='07')?<small>{who==='ankita'?'Working reader':item==='06'?'Plot only':'Not written'}</small>:null}
   </a>)}
  </div>
  <div className="story-episode-nav-leads" aria-label="Choose wife perspective">
   <span>Perspective</span>
   {leads.map(w=><a key={w} href={route(ep,w,mode)} aria-current={w===who?'page':undefined} className={w===who?'selected':''}>{titleCase(w)}</a>)}
  </div>
  {(ep==='06'||ep==='07')&&<p className="story-episode-nav-note">Ankita Episode {ep} working manuscript is now in Read Story for review, not final/frozen. Other perspectives remain in their own existing plots or sources; their pages will not display Ankita prose.</p>}
  <p className="story-episode-nav-note"><strong>Document archive:</strong> <a href="https://docs.google.com/document/d/1oitHtN4K_O7OTP_aciNcN7bB9LMMpH-OspHLX4v9MAk/edit?usp=drivesdk" target="_blank" rel="noreferrer">Master Word-ready document ↗</a> · <a href="https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/ANKITA-SHREYA-MASTER-ARCHIVE-AUDIT-20261128.md" target="_blank" rel="noreferrer">All reference images and completeness audit ↗</a>. Wrong-face or wrong-outfit images remain labelled as rejected references.</p>
 </nav>;
}
