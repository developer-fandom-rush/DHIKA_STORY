import { useEffect, useState } from 'react';
import { HOME, openPage, useRoute } from './lib';
import Home from './Home';
import Characters from './Characters';
import Gallery from './Gallery';
import Reading from './Reading';
import Planning from './Planning';
import GlobalTimeline from './GlobalTimeline';
import DhikaReader from './DhikaReader';

const swNavigation=[['home','Home'],['characters','Characters'],['gallery','Image Gallery'],['reading','Episode Reading'],['planning','Episode Planning']] as const;
const dhikaNavigation=[['dhika-timeline','Universal Timeline'],['dhika-reader','Original Dhika Reader']] as const;

export default function App(){
 const {page,params}=useRoute();
 const [date,setDate]=useState('2026-01-01');
 const isDhika=page.startsWith('dhika-');
 const queryDate=params.get('date');
 useEffect(()=>{if(queryDate&&(/^2026-\d{2}-\d{2}$/.test(queryDate)||queryDate==='pending'))setDate(queryDate)},[queryDate]);
 useEffect(()=>{document.title=(isDhika?'Dhika':'Society Wives')+' — '+(page.includes('timeline')?'Universal Timeline':page==='dhika-reader'?'Original Reader':swNavigation.find(x=>x[0]===page)?.[1]||'Story');window.scrollTo({top:0,behavior:'instant'});},[page,params.toString(),isDhika]);
 const switchTo=(target:'sw'|'dhika')=>target==='sw'?openPage('timeline',{date}):openPage('dhika-timeline',{date});
 const valid=page==='timeline'||page==='dhika-timeline'||page==='dhika-reader'||swNavigation.some(x=>x[0]===page);
 return <div className="universe-shell">
  <aside className="universe-sidebar" aria-label="Story universe switcher">
   <div className="universe-sidebar-heading"><span className="universe-monogram">S</span><span>STORY<br/>UNIVERSES</span></div>
   <div className="universe-sidebar-label">Choose your story</div>
   <button type="button" className={'universe-option'+(!isDhika?' current':'')} aria-pressed={!isDhika} onClick={()=>switchTo('sw')}><span aria-hidden="true">✦</span><span>Society Wives</span></button>
   <button type="button" className={'universe-option'+(isDhika?' current':'')} aria-pressed={isDhika} onClick={()=>switchTo('dhika')}><span aria-hidden="true">◈</span><span>Dhika</span></button>
   <div className="universe-sidebar-foot"><small>Shared date anchor</small><strong>Day 1 = 1 Jan 2026</strong><small>Stories stay separate.</small></div>
  </aside>
  <div className="universe-main site">
   <header className="site-header">
    <div className="header-inner">
     <div className="brand-row"><a href={isDhika?'#/dhika-reader':HOME} className="home-icon" title="Return to Home" aria-label="Return to Home">⌂</a>
      <a href={isDhika?'#/dhika-timeline':HOME} className="wordmark"><span>{isDhika?'DHIKA':'SOCIETY WIVES'}</span><small>{isDhika?'ORIGINAL STORY ARCHIVE':'FIVE VEILS OF DESIRE'}</small></a></div>
     {!isDhika?<><nav aria-label="Primary navigation" className="main-nav">{swNavigation.map(([id,label])=><a key={id} href={'#/'+id} className={page===id?'current':''} aria-current={page===id?'page':undefined}>{label}</a>)}</nav>
       <a className={'universal-top-link'+(page==='timeline'?' current':'')} href={'#/timeline?date='+encodeURIComponent(date)}> <span aria-hidden="true">◷</span> Universal Timeline</a></>:
      <nav aria-label="Dhika navigation" className="main-nav dhika-nav">{dhikaNavigation.map(([id,label])=><a key={id} href={'#/'+id+(id==='dhika-timeline'?'?date='+date:'')} className={page===id?'current':''} aria-current={page===id?'page':undefined}>{label}</a>)}</nav>}
    </div>
   </header>
   {page==='home'&&<Home scene={params.get('scene')}/>}
   {page==='characters'&&<Characters lead={params.get('lead')||'ankita'} personId={params.get('person')}/>}
   {page==='gallery'&&<Gallery initialCharacter={params.get('character')||'all'}/>}
   {page==='reading'&&<Reading character={params.get('character')||'ankita'} scene={params.get('scene')}/>}
   {page==='planning'&&<Planning lead={params.get('lead')||'meenakshi'} initialScene={params.get('scene')}/>}
   {page==='timeline'&&<GlobalTimeline universe="sw" date={date} onDateChange={setDate}/>}
   {page==='dhika-timeline'&&<GlobalTimeline universe="dhika" date={date} onDateChange={setDate}/>}
   {page==='dhika-reader'&&<DhikaReader episode={params.get('episode')} paragraph={params.get('paragraph')}/>}
   {!valid&&<main className="page-width"><h1>Page not found</h1><p>This route is not available in the selected universe.</p><button type="button" className="button primary" onClick={()=>openPage('home')}>Return Home</button></main>}
   <footer className="site-footer"><div><strong>{isDhika?'Dhika — Original Source Archive':'Society Wives — Five Veils of Desire'}</strong><p>Independent story universes · Shared aligned story-day reference · Original source remains unchanged.</p></div></footer>
  </div>
 </div>;
}
