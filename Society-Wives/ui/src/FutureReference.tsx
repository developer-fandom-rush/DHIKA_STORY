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

const humanStatus=(value:string)=>value.replace(/_/g,' ').replace(/\s+/g,' ').toLowerCase();

export default function FutureReference({lead='ankita'}:{lead?:string}){
 const {data:ideas,loading:ideasLoading,error:ideasError}=useData<IdeasData>('future-ideas.json');
 const {data:decision,loading:decisionLoading,error:decisionError}=useData<DecisionReference>('episode-04a-shivani-decision-reference.json');
 const leads=['ankita','shivani','taniya','soniya','meenakshi','shreya'] as const;
 const active=leads.find(x=>x===lead)||'ankita';
 const ownIdeas=(ideas?.ideas||[]).filter(idea=>idea.lead.toLowerCase()===active);
 const countFor=(who:string)=>(ideas?.ideas||[]).filter(idea=>idea.lead.toLowerCase()===who).length;
 const changeLead=(who:string)=>openPage('future-reference',{lead:who});
 return <main className="page-width" id="future-reference">
  <header className="section-intro">
   <span className="eyebrow">Society Wives · Editorial archive</span>
   <h1>Future Reference &amp; Locked Decisions</h1>
   <p>Character-wise archive of saved ideas and editorial decisions. Future references are not automatically approved story scenes.</p>
  </header>
  <div className="perspective-tabs" role="group" aria-label="Choose a woman for future references">
   {leads.map(w=><button type="button" key={w} onClick={()=>changeLead(w)} aria-pressed={w===active} className={w===active?'selected':''}>{w.charAt(0).toUpperCase()+w.slice(1)} <span className="muted">({ideasLoading?'…':countFor(w)})</span></button>)}
  </div>
  <p className="source-note"><strong>{active.charAt(0).toUpperCase()+active.slice(1)} — future references.</strong> {ideasLoading?'Loading saved references…':ownIdeas.length+' saved idea'+(ownIdeas.length===1?'':'s')}. {active==='shivani'?'One additional Scene 04 decision record is available below.':'Only ideas explicitly saved in the reference ledger are counted here; existing plot drafts are not treated as future-approved ideas.'}</p>
  {active==='shivani'&&decisionLoading&&<p role="status">Loading Shivani decision reference…</p>}
  {active==='shivani'&&decisionError&&<p role="alert" className="error">Unable to load decision reference: {decisionError}</p>}
  {active==='shivani'&&decision&&<section className="episode-plan-card" id="shivani-scene04-decision-reference">
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
  {active==='shreya'&&<section className="episode-plan-card" id="shreya-ep04a-current-closure">
   <h2>Shreya · Episode 04A — Current continuity lock</h2>
   <p><strong>Scenes 01–03:</strong> Shreya's author-provided manuscript, including the Chintu door-latch event, shower, accidental interruption, separate towel consolation, full-coverage white floral night-suit, dinner and SC09 Night Closure, has been transferred into Read Story. Images are included there.</p>
   <p><strong>Closing beat:</strong> SC09 Night Closure follows the dinner. Shreya's and Arvind's separate nighttime viewpoints close this episode. No additional 04A prose is established beyond SC09. Final author freeze remains pending.</p>
   <p><strong>Vikram:</strong> His call sets a return of approximately 6:00 AM on 2 January 2026. The older plot's 8:40–8:50 PM arrival and married-night continuation conflict and are archived as superseded, not approved events.</p>
   <p><strong>Deferred:</strong> Arvind's pre-existing private attraction remains his own knowledge. No automatic romantic reciprocity or future event is confirmed for Shreya.</p>
   <button type="button" className="button subtle" onClick={()=>openPage('reading',{episode:'04A',character:'shreya'})}>Read Shreya Episode 04A</button>
  </section>}
  <section className="episode-plan-card" id="saved-future-ideas">
   <h2>{active.charAt(0).toUpperCase()+active.slice(1)} · Saved Future Ideas</h2>
   <p className="muted">Only ideas explicitly saved for this character appear below. They are not automatically canon.</p>
   {ideasLoading&&<p role="status">Loading saved future ideas…</p>}
   {ideasError&&<p role="alert" className="error">Unable to load saved ideas: {ideasError}</p>}
   {!ideasLoading&&!ideasError&&ownIdeas.length===0&&<p className="source-note">No specific Future Reference entries saved for this character yet. Do not infer missing ideas from unfinished plot scenes.</p>}
   {ownIdeas.map(idea=><details className="episode-outline" id={idea.id} key={idea.id} open={idea.id==='FI-SHIVANI-KARAN-AMAN-DEFERRED-SQUEEZE-01'}>
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
   <button type="button" className="button subtle" onClick={()=>openPage('planning',{lead:active,part:'A'})}>← {active.charAt(0).toUpperCase()+active.slice(1)} Episode 04 Planning</button>
   <a className="button subtle" href={assetUrl('future-ideas.json')}>Structured idea ledger</a>
  </div>
 </main>;
}
