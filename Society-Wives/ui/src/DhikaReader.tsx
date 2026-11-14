import { useMemo } from 'react';
export default function DhikaReader({episode,paragraph}:{episode:string|null;paragraph:string|null}){
 const src=useMemo(()=>{
  const root=new URL('../',window.location.origin+import.meta.env.BASE_URL);
  const ep=Number(episode);
  if(Number.isInteger(ep)&&ep>=1&&ep<=41){
   root.hash='episode='+ep+(paragraph&&/^EP\d{2}-P\d{4}$/.test(paragraph)?'&paragraph='+paragraph:'');
  }
  return root.href;
 },[episode,paragraph]);
 return <main className="dhika-workspace">
  <header className="dhika-workspace-head"><span className="eyebrow">Original GitHub archive · independent story</span><h1>Dhika — Source Reader</h1><p>The existing Dhika search, episode reader and relationship atlas are shown below without copying or rewriting their text. Use Universal Timeline to navigate by the aligned story day.</p></header>
  <iframe className="dhika-reader-frame" title="Dhika original episode reader and relationship atlas" src={src} loading="eager" referrerPolicy="same-origin" />
 </main>;
}
