import { useEffect, useState } from 'react';
export const HOME = '#/home';
/** Navigate inside the single-page story app; source files never become destinations. */
export const openPage = (page:string,params:Record<string,string|undefined>={})=>{
 const query=new URLSearchParams();
 for(const [key,value] of Object.entries(params))if(value)query.set(key,value);
 window.location.hash='#/'+page+(query.size?'?'+query:'');
};
export const peopleOrder = ['ankita','shivani','taniya','soniya','meenakshi','shreya'];
export const leadOrder = ['ankita','shivani','taniya','meenakshi','shreya'];
export const titleCase = (v: string) => v.charAt(0).toUpperCase()+v.slice(1);
export const assetUrl = (path: string) => import.meta.env.BASE_URL + path.replace(/^\.\//,'');
export const sourceUrl = (path: string) => 'https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/'+path;
export function readRoute(): {page:string; params:URLSearchParams} {
  const raw = window.location.hash.replace(/^#/,'') || '/home';
  const [path,search=''] = raw.split('?');
  return { page: path.replace(/^\//,'').split('/')[0] || 'home', params:new URLSearchParams(search) };
}
export function useRoute() {
  const [route,setRoute]=useState(readRoute);
  useEffect(()=>{const update=()=>setRoute(readRoute());window.addEventListener('hashchange',update);return ()=>window.removeEventListener('hashchange',update)},[]);
  return route;
}
const cache = new Map<string,unknown>();
export function useData<T>(path: string | null) {
  const [state,setState] = useState<{data:T|null;error:string;loading:boolean}>({data:null,error:'',loading:!!path});
  useEffect(()=>{
    if(!path){setState({data:null,error:'',loading:false});return}
    if(cache.has(path)){setState({data:cache.get(path) as T,error:'',loading:false});return}
    let cancelled=false;
    setState({data:null,error:'',loading:true});
    fetch(assetUrl(path)).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status+' — '+path);return r.json() as Promise<T>}).then(data=>{cache.set(path,data);if(!cancelled)setState({data,error:'',loading:false})}).catch(e=>{if(!cancelled)setState({data:null,error:String(e),loading:false})});
    return ()=>{cancelled=true};
  },[path]);
  return state;
}
export type StoryScene = {id:string;time?:string;lead?:string;lane?:string;location?:string;title:string;narration?:string[];dialogue?:{speaker:string;line:string}[];internal?:string[]};
export type EpisodeOne = {status:string;episode:{title:string;subtitle:string;setting:string};scenes:StoryScene[]};
export type Person = {id:string;name:string;age?:number;role?:string;group?:string;house?:string;sourceStatus?:string;notes?:string;[k:string]:unknown};
export type Lead = Person & {husband?:string;home?:string};
export type Relation = {w:string;man:string;how?:string;why?:string;kind?:string;state?:string};
export type Directory = {leads:Lead[];people:Person[];relations:Relation[];families:Record<string,unknown>[];pairs:Record<string,unknown>[]};
export type ArchiveScene={scene_id:string;source_anchor?:string;ui_badge_text_exact?:string|null;source_html_lines_exact?:string[];source_position?:{start:number};prose_line_records?:Record<string,unknown>[];[k:string]:unknown};
export type Archive={lead:string;scenes:ArchiveScene[];approved_scene_ids?:string[];nonapproved_scene_ids?:string[];excluded_nonapproved_scene_ids?:string[];character_name_index?:{character_id:string;name:string;matches:{scene_id:string;evidence_line_ids?:string[]}[]}[]};
export type PlanBeat={id?:string;time?:string;title?:string;external?:string;internal?:string;[k:string]:unknown};
export type Plan={title?:string;date?:string;start?:string;end?:string;status?:string;timeline?:Record<string,unknown>[];beats?:PlanBeat[];[k:string]:unknown};
export const episodePath = (who:string) => 'continuity-verbatim/episode-02/'+who+'.json';
export const approvedScene = (a:Archive,s:ArchiveScene)=>!!a.approved_scene_ids?.includes(s.scene_id);
export function safeBadge(a:Archive,s:ArchiveScene){return approvedScene(a,s)?'Approved':'Review / published source'}
