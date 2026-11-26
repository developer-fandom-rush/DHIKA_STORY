import { useEffect, useState } from 'react';
import { HOME, openPage, useRoute } from './lib';
import Reading from './Reading';
import Planning from './Planning';
import Shivani06Planning from './Shivani06Planning';
import StudyCircle from './StudyCircle';
import SourceVault from './SourceVault';
import FutureReference from './FutureReference';
import GlobalTimeline from './GlobalTimeline';
import DhikaReader from './DhikaReader';
const swNavigation=[['reading','Read Story'],['planning','Story Plot'],['sw-timeline','Global Timeline'],['study-circle','Shared Mentors'],['source-vault','Source Vault'],['future-reference','Future Reference']] as const;
const dhikaNavigation=[['dhika-timeline','Timeline'],['dhika-reader','Original Reader']] as const;
export default function App(){
 const {page,params}=useRoute();
 const [date,setDate]=useState('2026-01-01');
 const isDhika=page.startsWith('dhika-');
 const queryDate=params.get('date');
 useEffect(()=>{if(queryDate&&(/^2026-\d{2}-\d{2}$/.test(queryDate)||queryDate==='pending'))setDate(queryDate)},[queryDate]);
 useEffect(()=>{document.title=(isDhika?'Dhika':'Society Wives')+' — '+(page==='planning'?'Story Planning':'Story');window.scrollTo({top:0,behavior:'instant'});},[page,isDhika]);
 useEffect(()=>{if(['home','gallery','characters','timeline'].includes(page))openPage('reading',{episode:'01'})},[page]);
 const valid=page==='reading'||page==='planning'||page==='future-reference'||page==='study-circle'||page==='source-vault'||page==='sw-timeline'||page==='dhika-timeline'||page==='dhika-reader'||['home','gallery','characters','timeline'].includes(page);
 return <div className="universe-shell">
  <aside className="universe-sidebar" aria-label="Story universe switcher">
   <div className="universe-sidebar-heading"><span className="universe-monogram">S</span><span>STORY UNIVERSES</span></div>
   <div className="universe-sidebar-label">Choose your story</div>
   <button type="button" className={'universe-option'+(!isDhika?' current':'')} aria-pressed={!isDhika} onClick={()=>openPage('reading',{episode:'01'})}><span aria-hidden="true">✦</span><span>Society Wives</span></button>
   <button type="button" className={'universe-option'+(isDhika?' current':'')} aria-pressed={isDhika} onClick={()=>openPage('dhika-reader')}><span aria-hidden="true">◈</span><span>Dhika</span></button>
  </aside>
  <div className="universe-main site">
   <header className="site-header"><div className="header-inner">
    <div className="brand-row"><a href={isDhika?'#/dhika-reader':HOME} className="home-icon" title="Read story" aria-label="Read story">⌂</a>
     <a href={isDhika?'#/dhika-reader':HOME} className="wordmark"><span>{isDhika?'DHIKA':'SOCIETY WIVES'}</span><small>{isDhika?'ORIGINAL STORY ARCHIVE':'FIVE VEILS OF DESIRE'}</small></a></div>
    <nav aria-label="Primary navigation" className="main-nav">{(isDhika?dhikaNavigation:swNavigation).map(([id,label])=><a key={id} href={'#/'+id} className={page===id?'current':''} aria-current={page===id?'page':undefined}>{label}</a>)}</nav>
   </div></header>
   {page==='reading'&&<Reading character={params.get('character')||'ankita'} scene={params.get('scene')} episode={params.get('episode')}/>}
   {page==='planning'&&(params.get('lead')==='shivani'&&params.get('part')==='06'?<Shivani06Planning/>:<Planning lead={params.get('lead')||'ankita'} part={params.get('part')||'A'}/>)}
   {page==='study-circle'&&<StudyCircle/>}
   {page==='source-vault'&&<SourceVault itemId={params.get('item')||undefined}/>}
   {page==='future-reference'&&<FutureReference lead={params.get('lead')||'ankita'}/>}
   {page==='sw-timeline'&&<GlobalTimeline universe="sw" date={date} onDateChange={d=>{setDate(d);openPage('sw-timeline',{date:d})}}/>}
   {page==='dhika-timeline'&&<GlobalTimeline universe="dhika" date={date} onDateChange={d=>{setDate(d);openPage('dhika-timeline',{date:d})}}/>}
   {page==='dhika-reader'&&<DhikaReader episode={params.get('episode')} paragraph={params.get('paragraph')}/>}
   {!valid&&<main className="page-width"><h1>Page not found</h1><button type="button" className="button primary" onClick={()=>openPage('reading',{episode:'01'})}>Read Story</button></main>}
   <footer className="site-footer"><strong>{isDhika?'Dhika — Original Story':'Society Wives — Five Veils of Desire'}</strong></footer>
  </div>
 </div>;
}
