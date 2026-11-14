import { useEffect } from 'react';
import { HOME, useRoute } from './lib';
import Home from './Home';
import Characters from './Characters';
import Gallery from './Gallery';
import Reading from './Reading';
import Planning from './Planning';
const navigation=[['home','Home'],['characters','Characters'],['gallery','Image Gallery'],['reading','Episode Reading'],['planning','Episode Planning']] as const;
export default function App(){
 const {page,params}=useRoute();
 useEffect(()=>{document.title='Society Wives — '+(navigation.find(x=>x[0]===page)?.[1]||'Home');window.scrollTo({top:0,behavior:'instant'});},[page,params.toString()]);
 return <div className="site">
  <header className="site-header"><div className="header-inner"><div className="brand-row"><a href={HOME} className="home-icon" title="Return to Home" aria-label="Return to Home">⌂</a><a href={HOME} className="wordmark"><span>SOCIETY WIVES</span><small>FIVE VEILS OF DESIRE</small></a></div>
  <nav aria-label="Primary navigation" className="main-nav">{navigation.map(([id,label])=><a key={id} href={'#/'+id} className={page===id?'current':''} aria-current={page===id?'page':undefined}>{label}</a>)}</nav></div></header>
  {page==='home'&&<Home />}
  {page==='characters'&&<Characters lead={params.get('lead')||'ankita'} personId={params.get('person')}/>}
  {page==='gallery'&&<Gallery initialCharacter={params.get('character')||'all'} />}
  {page==='reading'&&<Reading character={params.get('character')||'ankita'} scene={params.get('scene')}/>}
  {page==='planning'&&<Planning lead={params.get('lead')||'meenakshi'}/>}
  {!navigation.some(x=>x[0]===page)&&<main className="page-width"><h1>Page not found</h1><p>The requested view is not part of this reader.</p><a className="button primary" href={HOME}>Return Home</a></main>}
  <footer className="site-footer"><div><strong>Society Wives — Five Veils of Desire</strong><p>One story archive. Original source texts, characters and planning boundaries are preserved.</p></div><a href={HOME}>↑ Back to Home</a></footer>
 </div>;
}
