import { assetUrl, openPage, useData } from './lib';

type Idea={
 id:string;lead:string;workingTitle:string;priority:string;approval:string;
 premise?:string;briefScene?:string;purpose?:string;actionLabel?:string;authorDirection?:string;
 userDirection?:string;currentStoryLock?:string;nextAction?:string;dateStatus?:string;
 prohibitedForCurrentScene?:string[];noLock?:string[];
};
type IdeasData={title:string;status:string;ideas:Idea[]};
type DecisionItem={label:string;note:string;decisionStatus:string;futureIdeaId?:string};
type DecisionSection={id:string;title:string;status:string;items:DecisionItem[]};
type DecisionReference={title:string;status:string;lead:string;episode:string;scene:string;sections:DecisionSection[]};

const humanStatus=(value:string)=>value.replaceAll('_',' ').replaceAll('  ',' ').toLowerCase();

export default function FutureReference(){
 const {data:ideas,loading:ideasLoading,error:ideasError}=useData<IdeasData>('future-ideas.json');
 const {data:decision,loading:decisionLoading,error:decisionError}=useData<DecisionReference>('episode-04a-shivani-decision-reference.json');
 return <main className="page-width" id="future-reference">
  <header className="section-intro">
   <span className="eyebrow">Society Wives · Editorial archive</span>
   <h1>Future Reference &amp; Locked Decisions</h1>
   <p>Reference material and continuity decisions, not prose. Current published scenes remain in Read Story. An idea in this archive is not automatically a future canon scene.</p>
  </header>
  <p className="source-note"><strong>Where to read:</strong> <a href="#/reading?episode=04A&character=shivani&scene=04">Shivani EP04A Scene 04</a> · <a href="#/reading?episode=04A&character=ankita">Ankita EP04A</a> · <a href="#/planning?lead=shivani&part=A">Unfinished Shivani scenes</a></p>
  {decisionLoading&&<p role="status">Loading Shivani decision reference…</p>}
  {decisionError&&<p role="alert" className="error">Unable to load decision reference: {decisionError}</p>}
  {decision&&<section className="episode-plan-card" id="shivani-scene04-decision-reference">
   <h2>{decision.title}</h2>
   <p className="muted">Current scene published · older action plan preserved separately · author approval required for revisions</p>
   {decision.sections.map(section=><details className="episode-outline" key={section.id} id={'reference-'+section.id} open={section.id==='current'||section.id==='deferred'||section.id==='unresolved'}>
    <summary><strong>{section.title}</strong></summary>
    <p className="muted">{humanStatus(section.status)}</p>
    <div className="continuity-cards">
     {section.items.map(item=><article className="encounter-card" key={item.label}>
      <h3>{item.label}</h3><p>{item.note}</p>
      <p className="muted"><strong>Decision:</strong> {humanStatus(item.decisionStatus)}</p>
      {item.futureIdeaId&&<p className="muted">Linked future idea: <button type="button" className="button subtle" onClick={()=>document.getElementById(item.futureIdeaId!)?.scrollIntoView({behavior:'smooth',block:'start'})}>Jump to saved idea</button></p>}
     </article>)}
    </div>
   </details>)}
  </section>}
  <section className="episode-plan-card" id="saved-future-ideas">
   <h2>Saved future ideas</h2>
   <p className="muted">Future-only ideas for different characters. Not published story, and not permission to import physical actions into a current scene.</p>
   {ideasLoading&&<p role="status">Loading saved future ideas…</p>}
   {ideasError&&<p role="alert" className="error">Unable to load saved ideas: {ideasError}</p>}
   {(ideas?.ideas||[]).map(idea=><details className="episode-outline" id={idea.id} key={idea.id} open={idea.id==='FI-SHIVANI-KARAN-AMAN-DEFERRED-SQUEEZE-01'}>
    <summary><strong>{idea.workingTitle}</strong> · {idea.lead}</summary>
    <p className="muted"><strong>Status:</strong> {humanStatus(idea.approval)}</p>
    {idea.purpose&&<p><strong>Purpose:</strong> {idea.purpose}</p>}
    {idea.briefScene&&<p><strong>Proposal:</strong> {idea.briefScene}</p>}
    {idea.premise&&<p><strong>Proposal:</strong> {idea.premise}</p>}
    {idea.actionLabel&&<p><strong>Deferred action label:</strong> {idea.actionLabel}</p>}
    {(idea.authorDirection||idea.userDirection)&&<p><strong>Author direction:</strong> {idea.authorDirection||idea.userDirection}</p>}
    {idea.currentStoryLock&&<p><strong>Current scene lock:</strong> {idea.currentStoryLock}</p>}
    {idea.nextAction&&<p><strong>Before future use:</strong> {idea.nextAction}</p>}
    {idea.prohibitedForCurrentScene&&<p><strong>Current-scene exclusions:</strong> {idea.prohibitedForCurrentScene.join('; ')}</p>}
    {idea.noLock&&<p><strong>Still undecided:</strong> {idea.noLock.join('; ')}</p>}
   </details>)}
  </section>
  <div className="chapter-controls">
   <button type="button" className="button subtle" onClick={()=>openPage('reading',{episode:'04A',character:'shivani',scene:'04'})}>← Read current Shivani scene</button>
   <a className="button subtle" href={assetUrl('future-ideas.json')}>Structured idea ledger</a>
  </div>
 </main>;
}
