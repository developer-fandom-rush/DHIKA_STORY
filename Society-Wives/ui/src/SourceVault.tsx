import { openPage, useData } from './lib';

type VaultItem={
 id:string;title:string;lead:string;episode:string;date:string;kind:'google-doc-paragraphs'|'original-json-plot';
 sourceTitle:string;sourceDocumentId:string|null;dataPath:string;textPath:string|null;
 paragraphs:number|null;extractedCharacters:number;sourceStatus:string;readerStatus:string;
};
type VaultIndex={
 title:string;status:string;policy:string;items:VaultItem[];
 verification:{method:string;formatLimit:string};
};
type SourceParagraph={index:number;text:string;style:string};
type ParagraphSnapshot={
 sourceTitle:string;sourceRevisionId:string;sourceParagraphCount:number;
 extractedCharacters:number;paragraphs:SourceParagraph[];
};
const urlFor=(path:string)=>'https://github.com/developer-fandom-rush/DHIKA_STORY/blob/main/Society-Wives/'+path;
export default function SourceVault({itemId}:{itemId?:string}){
 const {data:index,loading:indexLoading,error:indexError}=useData<VaultIndex>('source-vault/index.json');
 const current=index?.items.find(x=>x.id===itemId)||index?.items[0]||null;
 const isParagraphs=current?.kind==='google-doc-paragraphs';
 const {data:paragraphDoc,loading:paragraphLoading,error:paragraphError}=useData<ParagraphSnapshot>(isParagraphs?current?.dataPath||null:null);
 const {data:plotDoc,loading:plotLoading,error:plotError}=useData<Record<string,unknown>>(current&&!isParagraphs?current.dataPath:null);
 return <main className="page-width" id="author-source-vault">
  <header className="section-intro"><span className="eyebrow">Society Wives · Author source archive</span>
   <h1>Source Vault · Episodes 04B and 05</h1>
   <p>Verbatim, locked reference copies from Google Docs and the existing Taniya 04B plot. No rewrite, new dialogue or editorial substitutions.</p>
  </header>
  {indexLoading&&<p role="status">Loading archive index…</p>}
  {indexError&&<p role="alert" className="error">Source Vault index unavailable: {indexError}</p>}
  {index&&<>
   <section className="episode-plan-card"><h2>Preservation rule</h2><p><strong>{index.status.replace(/_/g,' ')}</strong></p>
    <p>{index.policy}</p><p className="muted">{index.verification.method}</p>
   </section>
   <section className="episode-plan-card"><h2>Choose original source</h2>
    <div className="chapter-controls" role="group" aria-label="Saved source documents">
     {index.items.map(x=><button type="button" key={x.id} className={x.id===current?.id?'button primary':'button subtle'} aria-pressed={x.id===current?.id} onClick={()=>openPage('source-vault',{item:x.id})}>EP{x.episode} · {x.lead}</button>)}
    </div>
   </section>
   {current&&<section className="episode-plan-card" id={'vault-'+current.id}>
    <h2>{current.title}</h2><p><strong>Original source:</strong> {current.sourceTitle}</p>
    <p><strong>Archive status:</strong> {current.readerStatus.replace(/_/g,' ')}</p>
    <p>{current.sourceStatus}</p>
    <p className="muted">Stored source length: {current.extractedCharacters.toLocaleString()} characters{current.paragraphs!==null?', '+current.paragraphs+' text paragraphs':''}.</p>
    <div className="chapter-controls">
     <a className="button subtle" href={urlFor(current.dataPath)} target="_blank" rel="noreferrer">Archived structured source →</a>
     {current.textPath&&<a className="button subtle" href={urlFor(current.textPath)} target="_blank" rel="noreferrer">Exact text file →</a>}
    </div>
    {(paragraphLoading||plotLoading)&&<p role="status">Loading full original content…</p>}
    {(paragraphError||plotError)&&<p role="alert" className="error">Could not load archived source: {paragraphError||plotError}</p>}
    {isParagraphs&&paragraphDoc&&<article className="reading-surface source-scene prose-exact" aria-label="Unchanged source paragraphs">
     {paragraphDoc.paragraphs.map((p,i)=>{
      if(p.style==='TITLE')return <h2 key={i} style={{whiteSpace:'pre-wrap'}}>{p.text}</h2>;
      if(p.style.startsWith('HEADING'))return <h3 key={i} style={{whiteSpace:'pre-wrap'}}>{p.text}</h3>;
      return <p key={i} style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{p.text||'\u00a0'}</p>;
     })}
    </article>}
    {!isParagraphs&&plotDoc&&<article className="reading-surface source-scene prose-exact"><h3>Unchanged structured plot snapshot</h3>
     <p className="muted">Presented as formatted JSON for readability; the GitHub source link above holds the exact copied file text.</p>
     <pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',fontFamily:'inherit',fontSize:'0.9rem'}}>{JSON.stringify(plotDoc,null,2)}</pre>
    </article>}
   </section>}
  </>}
 </main>;
}
