"use strict";
const DOC="https://docs.google.com/document/d/1CSST1VjhIivB1X2pPM93JEHhTJAjyiV0nLCOnMXKbIA/edit";
const CAST={dhika:["Dhika"],uncle:["Uncle","Uncleji"],bantu:["Bantu"],bobby:["Bobby"],twins:["Twin","Twins","Bantu","Bobby"],john:["John","Ron"],chotu:["Chotu","Babu"],sharmi:["Sharmi"],raj:["Raj"],aunty:["Aunty","Auntie"],pappu:["Pappu"],maami:["Maami","Bindu"],leo:["Leo"],iroh:["Iroh"],zuko:["Zuko"],stacy:["Stacy"],jared:["Jared"],kate:["Kate"],scott:["Scott"],stranger:["Stranger"]};
const FLAGS={
 dialogue:/^\s*(?:Dhika|John|Ron|Uncle|Aunty|Bantu|Bobby|Chotu|Babu|Sharmi|Raj|Maami|Leo|Pappu|Scott|Stacy|Kate)\s*:/i,
 memory:/remember|recalled|flashback|used to|earlier|back then/i,
 thought:/\bthought\b|\bwondered\b|\bsecretly\b|in (?:his|her) mind|thinking/i,
 imagined:/imagin|fantas|dream(?:ing|t)?\b/i,
 physical:/arriv|entered|stood|sitting|sat beside|walked|approached|came over|followed|held|touched|pulled|kissed|embraced|hugged/i,
 gaze:/look|saw|watch|gaze|glanc|stare|peek|eyes? met/i,
 touch:/touch|held|holding|hand on|caress|rubb|rub|pinch|grab|hug|kiss|tap|stroke/i,
 flirting:/teas|flirt|compliment|wink|blush/i,
 romance:/romanc|kiss|love|date|affection|caring/i,
 psychological:/felt|feel|thought|curious|nervous|excited|afraid|guilt|shy|wonder|fear|jealous|desire|embarrass|trust|attract/i,
 anatomical:/body|saree|kurti|dress|blouse|skirt|shirt|bra|panty|breast|chest|hands?|stomach|hip|lips|thigh|legs?|face|shoulder|eyes?|navel/i,
 sexual:/\bsex\b|sexual|arous|orgasm|masturbat|naked|nude|breast|cock|erect|penetrat|cum|pussy|foreplay/i
};
const el=id=>document.getElementById(id);
const caps=s=>s?s.charAt(0).toUpperCase()+s.slice(1):"";
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const rex=s=>s.replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&");
const RE=Object.fromEntries(Object.entries(CAST).map(pair=>[pair[0],new RegExp("\\b(?:"+pair[1].map(rex).join("|")+")\\b","i")]));
const QUICK=[["Uncle","uncle"],["Twins","twins"],["Bantu","bantu"],["Bobby","bobby"],["Chotu","chotu"],["John / Ron","john"],["Sharmi","sharmi"],["Raj","raj"]];
let library=[],index=new Map(),results=[],limit=50,episodeNumber=1;
function kind(ep,i,s){
 const t=s.trim();if(!i)return "heading";
 if(ep.n===1&&i>=1&&i<=4)return "note";
 if(/^Part\s*\d+:/i.test(t))return "part";
 if(/^Source:\s*https?:\/\//i.test(t))return "source";
 if(!t)return "blank";
 if(/^[-=+*_]{9,}$/.test(t))return "separator";
 return "story";
}
function parseArchive(data){
 return data.episodes.map(ep=>{
  const passages=ep.lines.map((line,i)=>{
   const raw=line[0]||"",txt=raw.replace(/\n$/,"");
   const p={id:ep.id+"-P"+String(i+1).padStart(4,"0"),i,raw,txt,offset:line[1],url:line[2],kind:kind(ep,i,txt),chars:Object.keys(RE).filter(c=>RE[c].test(txt)),tags:Object.keys(FLAGS).filter(x=>FLAGS[x].test(txt))};
   return p;
  });
  const record={...ep,passages};
  passages.forEach(p=>index.set(p.id,{ep:record,p}));
  return record;
 });
}
function optionList(id,items,selected){
 el(id).innerHTML=items.map(x=>'<option value="'+esc(x.value)+'">'+esc(x.label)+'</option>').join("");
 if(selected!==undefined)el(id).value=selected;
}
function show(view){
 document.querySelectorAll(".view").forEach(x=>x.classList.toggle("hidden",x.id!==view+"-view"));
 document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.view===view));
 el("page-crumb").textContent=view==="search"?"Evidence Search":view==="reader"?"Episode Reader":"Relationship Atlas";
 if(view==="reader")reader();
 if(view==="network")network();
 window.scrollTo({top:0,behavior:"smooth"});
}
function navEpisodes(){
 const q=el("episode-filter").value.toLowerCase().trim();
 el("episode-nav").innerHTML=library.filter(e=>(e.id+" "+e.title).toLowerCase().includes(q)).map(e=>'<button class="episode-item'+(e.n===episodeNumber?" active":"")+'" data-episode="'+e.n+'"><strong>'+e.id+'</strong><span title="'+esc(e.title)+'">'+esc(e.title)+'</span></button>').join("")||'<p class="small muted">No matching episodes</p>';
}
function setup(){
 const people=Object.keys(CAST).map(k=>({value:k,label:caps(k)+(k==="john"?" / Ron":k==="chotu"?" / Babu":"")}));
 optionList("person-a",[{value:"",label:"Any character"},...people],"dhika");
 optionList("person-b",[{value:"",label:"None / only Character A"},...people],"uncle");
 optionList("network-person",people,"dhika");
 optionList("episode-select",[{value:"all",label:"All episodes"},...library.map(e=>({value:String(e.n),label:e.id+" — "+e.title}))],"all");
 optionList("reader-episode",library.map(e=>({value:String(e.n),label:e.id+" — "+e.title})),"1");
 el("episode-count").textContent=String(library.length);
 el("data-size").textContent=library.reduce((v,e)=>v+e.passages.length,0).toLocaleString()+" lines";
 const stats=[[library.length,"Episodes"],[library.reduce((s,e)=>s+e.passages.length,0).toLocaleString(),"Source paragraphs"],[library.reduce((s,e)=>s+e.parts,0),"Original parts"],[Object.keys(CAST).length,"Character labels"]];
 el("stats").innerHTML=stats.map(x=>'<div class="stat"><div class="value">'+x[0]+'</div><div class="caption">'+x[1]+'</div></div>').join("");
 el("quick-pairs").innerHTML=QUICK.map(x=>'<button type="button" data-pair="'+x[1]+'">Dhika · '+esc(x[0])+'</button>').join("");
 document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>show(b.dataset.view)));
 el("quick-pairs").addEventListener("click",e=>{const b=e.target.closest("[data-pair]");if(!b)return;el("person-a").value="dhika";el("person-b").value=b.dataset.pair;show("search");search();});
 el("search-btn").addEventListener("click",search);
 el("query").addEventListener("keydown",e=>{if(e.key==="Enter")search();});
 ["person-a","person-b","episode-select","evidence-mode","reference-mode","topic-mode"].forEach(id=>el(id).addEventListener("change",search));
 el("clear-btn").addEventListener("click",()=>{el("query").value="";el("person-a").value="dhika";el("person-b").value="uncle";el("episode-select").value="all";el("evidence-mode").value="nearby";el("reference-mode").value="all";el("topic-mode").value="all";search();});
 el("export-btn").addEventListener("click",exportSearch);
 el("loadmore-wrap").addEventListener("click",e=>{if(e.target.closest("[data-more]")){limit+=50;renderResults();}});
 el("results").addEventListener("click",e=>{
  const c=e.target.closest("[data-context]");if(c)context(c);
  const r=e.target.closest("[data-reader-link]");if(r){episodeNumber=Number(r.dataset.readerLink);el("reader-episode").value=String(episodeNumber);show("reader");}
 });
 el("episode-nav").addEventListener("click",e=>{const b=e.target.closest("[data-episode]");if(b){episodeNumber=Number(b.dataset.episode);el("reader-episode").value=String(episodeNumber);navEpisodes();show("reader");}});
 el("episode-filter").addEventListener("input",navEpisodes);
 el("reader-episode").addEventListener("change",()=>{episodeNumber=Number(el("reader-episode").value);reader();navEpisodes();});
 el("reader-find").addEventListener("input",reader);
 el("reader-copy").addEventListener("click",exportEpisode);
 el("network-person").addEventListener("change",network);
 el("network-grid").addEventListener("click",e=>{const b=e.target.closest("[data-other]");if(b){el("person-a").value=el("network-person").value;el("person-b").value=b.dataset.other;show("search");search();}});
 navEpisodes();search();
}
function nearby(ep,p,who,span=4){
 for(let k=Math.max(0,p.i-span);k<=Math.min(ep.passages.length-1,p.i+span);k++)
  if(ep.passages[k].kind==="story"&&ep.passages[k].chars.includes(who))return true;
 return false;
}
function pairEvidence(ep,p,a,b,mode){
 if(!a&&!b)return "text";
 if(!a||!b)return p.chars.includes(a||b)?"named character":null;
 const aHere=p.chars.includes(a),bHere=p.chars.includes(b);
 if(aHere&&bHere)return "same paragraph";
 if(mode==="same")return null;
 if(mode==="broad")return aHere||bHere?"one named character":null;
 if(aHere&&nearby(ep,p,b)||bHere&&nearby(ep,p,a))return "nearby named references";
 return null;
}
function settings(){return {phrase:el("query").value.trim(),a:el("person-a").value,b:el("person-b").value,episode:el("episode-select").value,mode:el("evidence-mode").value,reference:el("reference-mode").value,topic:el("topic-mode").value};}
function search(){
 const f=settings();results=[];
 for(const ep of library){
  if(f.episode!=="all"&&String(ep.n)!==f.episode)continue;
  for(const p of ep.passages){
   if(p.kind!=="story"&&!f.phrase)continue;
   if(f.phrase&&!p.txt.toLocaleLowerCase().includes(f.phrase.toLocaleLowerCase()))continue;
   const evidence=pairEvidence(ep,p,f.a,f.b,f.mode);
   if(!evidence)continue;
   if(f.reference!=="all"&&!(f.reference==="mentioned"?p.chars.length>0:p.tags.includes(f.reference)))continue;
   if(f.topic!=="all"&&!p.tags.includes(f.topic))continue;
   results.push({ep,p,evidence});
  }
 }
 const name=f.a&&f.b?caps(f.a)+" × "+caps(f.b):caps(f.a||f.b)||"Entire archive";
 el("result-title").textContent=name+" — "+results.length.toLocaleString()+" matches";
 el("result-subtitle").textContent="Showing verbatim Google Docs passages. Named-reference proximity is not proof that two characters physically interacted.";
 limit=50;renderResults();
}
function hilite(text,q){
 let h=esc(text);if(!q)return h;
 return h.replace(new RegExp("("+rex(esc(q))+")","gi"),"<mark>$1</mark>");
}
function card(x){
 const ep=x.ep,p=x.p,f=settings();
 const tags=p.tags.slice(0,6).map(t=>'<span class="pill'+(t==="psychological"?" mental":"")+'">'+esc(t)+"</span>").join("");
 const url=DOC+"?tab="+encodeURIComponent(ep.tabId);
 return '<article class="result-card"><div class="result-head"><div><span class="episode-chip">'+ep.id+'</span> <span class="episode-text">'+esc(ep.title)+'</span></div><span class="evidence">'+esc(x.evidence)+'</span></div><div class="result-body"><div class="quote-line"><span class="line-id">'+p.id.split("-").pop()+'</span><p class="raw-line">'+hilite(p.raw,f.phrase)+'</p></div><div class="pills">'+tags+'</div><div id="ctx-'+p.id+'" class="quote-context hidden"></div><div class="result-foot"><div><button class="text-button" data-context="'+p.id+'">+ Source context</button> · <button class="text-button" data-reader-link="'+ep.n+'">Read full episode</button></div><div><a href="'+url+'" target="_blank" rel="noopener">Google Doc ↗</a> '+(p.url?'<a href="'+esc(p.url)+'" target="_blank" rel="noopener">Forum post ↗</a>':"")+'</div></div></div></article>';
}
function renderResults(){
 el("results").innerHTML=results.length?results.slice(0,limit).map(card).join(""):'<div class="no-results"><h3>No matching source lines</h3><p>Try broader pair evidence or remove topic and reference filters. No encounter is invented when a match is absent.</p></div>';
 el("loadmore-wrap").innerHTML=results.length>limit?'<button class="load-more" data-more="1">Show 50 more · '+(results.length-limit).toLocaleString()+' remaining</button>':"";
}
function context(button){
 const rec=index.get(button.dataset.context);
 if(!rec)return;
 const area=el("ctx-"+rec.p.id);
 if(!area)return;
 if(!area.classList.contains("hidden")){area.classList.add("hidden");button.textContent="+ Source context";return;}
 const first=Math.max(0,rec.p.i-3),last=Math.min(rec.ep.passages.length,rec.p.i+4);
 area.innerHTML='<div class="section-label">CONTEXT — THREE PARAGRAPHS BEFORE AND AFTER</div>'+rec.ep.passages.slice(first,last).map(p=>'<div class="context-row'+(p.id===rec.p.id?" current":"")+'"><span class="line-id">'+p.id.split("-").pop()+'</span><div class="raw-line">'+hilite(p.raw,settings().phrase)+'</div></div>').join("");
 area.classList.remove("hidden");button.textContent="− Hide context";
}
function download(name,obj){
 const url=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:"application/json"}));
 const a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);
}
function exportSearch(){
 const f=settings();
 download("DHIKA_evidence_"+(f.a||"all")+"_"+(f.b||"all")+".json",{
  source:DOC,filters:f,matchCount:results.length,warning:"Proximity and automatic tags are candidate references; semantic classifications are not human verified.",
  matches:results.map(({ep,p,evidence})=>({episode:ep.id,title:ep.title,passageId:p.id,googleDocOffset:p.offset,sourceUrl:p.url,evidence,charactersMentioned:p.chars,tags:p.tags,rawText:p.raw,context:ep.passages.slice(Math.max(0,p.i-3),p.i+4).map(x=>({passageId:x.id,rawText:x.raw}))}))
 });
}
function reader(){
 const ep=library.find(e=>e.n===episodeNumber)||library[0];
 const q=el("reader-find").value.trim();
 el("reader-number").textContent=ep.id;el("reader-title").textContent=ep.title;
 el("reader-detail").textContent=ep.passages.length+" original paragraphs · "+ep.parts+" parts · exact Google Docs text";
 el("reader-body").innerHTML=ep.passages.map(p=>{
  const mark=q&&p.txt.toLocaleLowerCase().includes(q.toLocaleLowerCase());
  return '<div class="reader-line'+(p.kind==="note"?" note":p.kind==="part"?" part":mark?" matched":"")+'" id="'+p.id+'"><span class="num">'+p.id.split("-").pop()+'</span><div class="source-text">'+hilite(p.raw,q)+'</div>'+(p.url?'<a href="'+esc(p.url)+'" target="_blank" rel="noopener" title="Original source">↗</a>':'<span></span>')+'</div>';
 }).join("");
}
function exportEpisode(){
 const ep=library.find(e=>e.n===episodeNumber);
 if(!ep)return;
 download(ep.id+"_source.json",{id:ep.id,title:ep.title,docTabId:ep.tabId,sourceDoc:DOC,passages:ep.passages.map(p=>({id:p.id,rawText:p.raw,docOffset:p.offset,sourceUrl:p.url,kind:p.kind}))});
}
function network(){
 const a=el("network-person").value,items=[];
 for(const b of Object.keys(CAST)){
  if(b===a)continue;let count=0;const eps=[];
  for(const ep of library){
   let n=0;
   for(const p of ep.passages){
    if(p.kind!=="story")continue;
    if(p.chars.includes(a)&&p.chars.includes(b)||p.chars.includes(a)&&nearby(ep,p,b)||p.chars.includes(b)&&nearby(ep,p,a))n++;
   }
   if(n){count+=n;eps.push(ep.id);}
  }
  items.push({b,count,eps});
 }
 items.sort((a,b)=>b.count-a.count);
 el("network-summary").innerHTML='<div class="network-info">Relationship Atlas counts <strong>named-reference proximity (±4 paragraphs)</strong>. These are candidates to review—not verified interactions, consent assessments, or physical encounters. Click any pair to inspect exact lines.</div>';
 el("network-grid").innerHTML=items.map(x=>'<button class="network-card" data-other="'+x.b+'"><div class="pair">'+caps(a)+' <strong>×</strong> '+caps(x.b)+'</div><div class="count">'+x.count.toLocaleString()+' reference candidates · '+x.eps.length+' episodes</div><div class="episodes">'+esc(x.eps.slice(0,14).join(" · "))+(x.eps.length>14?" · …":"")+'</div></button>').join("");
}
async function start(){
 try{
  const response=await fetch("./data/corpus.json",{cache:"no-cache"});
  if(!response.ok)throw Error("HTTP "+response.status);
  const data=await response.json();
  library=parseArchive(data);
  if(library.length!==41)throw Error("Incomplete archive: "+library.length+" episodes");
  el("loading").classList.add("hidden");el("search-view").classList.remove("hidden");
  setup();
  const ep=(location.hash.match(/episode=(\d+)/)||[])[1];
  if(ep&&library.some(x=>x.n===Number(ep))){episodeNumber=Number(ep);el("reader-episode").value=ep;show("reader");}
 }catch(e){
  el("loading").innerHTML='<h2>Could not load source archive</h2><p>'+esc(e.message)+'</p><p>Ensure GitHub Pages is enabled for main / (root).</p>';
  console.error(e);
 }
}
start();