'use strict';
// An explicit teaching schedule, not a validated cognitive assessment.
const MEMORY_KEY='mega-draft-learning-v1',DAY=86400000;
let memory={reviews:[],attempts:[]},learningStorageOK=true;
const namesOf=list=>list.map(c=>typeof c==='string'?c:c.name);
function snapshotId(q){const content=JSON.stringify([q.topic,namesOf(q.me),namesOf(q.opp),namesOf(q.options).sort()]);let h=2166136261;for(let i=0;i<content.length;i++){h^=content.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16);}
function cleanSnapshot(q){
 if(!q||typeof q.topic!=='string'||q.topic.length>100||typeof q.prompt!=='string'||q.prompt.length>650)return null;
 for(const [key,min,max] of [['me',0,8],['opp',0,8],['options',1,36]]){
  if(!Array.isArray(q[key])||q[key].length<min||q[key].length>max)return null;
  const ns=namesOf(q[key].filter(x=>typeof x==='string'||x&&typeof x.name==='string'));
  if(ns.length!==q[key].length||ns.some(n=>!CATALOG.some(c=>c.name===n))||new Set(ns).size!==ns.length)return null;
 }
 const out={topic:q.topic,prompt:q.prompt,me:namesOf(q.me),opp:namesOf(q.opp),options:namesOf(q.options)};
 if(new Set([...out.me,...out.opp,...out.options]).size!==out.me.length+out.opp.length+out.options.length)return null;
 if(q.values!==undefined){if(!Array.isArray(q.values)||q.values.length!==q.options.length||q.values.some(n=>!Number.isFinite(n)||n<0||n>100)||typeof q.why!=='string'||q.why.length>1500)return null;out.values=[...q.values];out.why=q.why;}
 if(q.source==='generated')out.source='generated';
 if(q.analyses!==undefined){if(!Array.isArray(q.analyses)||q.analyses.length!==out.options.length||q.analyses.some(a=>!a||typeof a.reason!=='string'||a.reason.length>1500||typeof a.caution!=='string'||a.caution.length>1500))return null;out.analyses=q.analyses.map(a=>({reason:a.reason,caution:a.caution}));}
 if(q.reference!==undefined){if(!out.options.includes(q.reference))return null;out.reference=q.reference;}
 return out;
}
function validateMemory(data){
 if(!data||!Array.isArray(data.reviews)||!Array.isArray(data.attempts)||data.reviews.length>60||data.attempts.length>400)throw Error('Formato de aprendizado inválido.');
 const ids=new Set();
 const reviews=data.reviews.map(r=>{const q=cleanSnapshot(r?.snapshot);if(!q||!Number.isInteger(r.step)||r.step<0||r.step>3||!Number.isFinite(r.due)||r.due<0||!Number.isFinite(r.last)||r.last<0)throw Error('Revisão inválida.');const id=snapshotId(q);if(ids.has(id))throw Error('Revisão duplicada.');ids.add(id);return {id,snapshot:q,step:r.step,due:r.due,last:r.last};});
 const attempts=data.attempts.map(a=>{if(!a||typeof a.id!=='string'||a.id.length>30||typeof a.topic!=='string'||a.topic.length>100||!Number.isFinite(a.quality)||a.quality<0||a.quality>100||!Number.isFinite(a.at)||a.at<0||typeof a.review!=='boolean'||typeof a.expired!=='boolean'||![null,'sure','unsure'].includes(a.confidence))throw Error('Registro de decisão inválido.');return {id:a.id,topic:a.topic,quality:a.quality,at:a.at,review:a.review,expired:a.expired,confidence:a.confidence};});
 return {reviews,attempts};
}
function initializeLearning(){try{const raw=localStorage.getItem(MEMORY_KEY);if(raw)memory=validateMemory(JSON.parse(raw));}catch{learningStorageOK=false;}}
function saveLearning(){try{localStorage.setItem(MEMORY_KEY,JSON.stringify(memory));}catch{learningStorageOK=false;}}
function dueReviews(now=Date.now()){return memory.reviews.filter(r=>r.due<=now).sort((a,b)=>a.due-b.due);}
function localDay(t){const d=new Date(t);return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;}
function scheduleDecision(e,now=Date.now()){
 const q=cleanSnapshot(e.snapshot);if(!q)return;
 const id=snapshotId(q),existing=memory.reviews.find(r=>r.id===id),bad=e.expired||e.quality<80;
 // Repeated successes in the same day do not count as long-term retention.
 if(existing&&localDay(existing.last)===localDay(now)){
  if(bad){existing.step=0;existing.due=Math.min(existing.due,now+DAY);}
 }else if(existing){
  const eligible=existing.due<=now;
  if(bad||e.confidence==='unsure'){existing.step=0;existing.due=now+DAY;existing.last=now;}
  else if(eligible){existing.step=Math.min(3,existing.step+1);existing.due=now+[1,3,7,14][existing.step]*DAY;existing.last=now;}
 }else if(e.curated||bad){memory.reviews.push({id,snapshot:q,step:0,due:now+DAY,last:now});}
 memory.reviews=memory.reviews.sort((a,b)=>a.due-b.due).slice(0,60);
 memory.attempts.push({id,topic:q.topic,quality:e.quality,at:now,review:!!e.isReview,expired:e.expired,confidence:e.confidence||null});memory.attempts=memory.attempts.slice(-400);
}
function dailyQueue(){
 const due=dueReviews().slice(0,4).map(r=>r.snapshot),used=new Set(due.map(snapshotId));
 const result=[...due];for(const q of variedPractice(8-due.length)){if(!used.has(snapshotId(q))){result.push(q);used.add(snapshotId(q));}}
 while(result.length<8){const q=generateSituation();if(!used.has(snapshotId(q))){result.push(q);used.add(snapshotId(q));}}
 return shuffle(result);
}
function renderLearning(){
 const due=dueReviews(),attempts=memory.attempts,novel=attempts.filter(x=>!x.review),review=attempts.filter(x=>x.review),percent=a=>a.length?Math.round(100*a.filter(x=>x.quality>=80&&!x.expired).length/a.length)+'%':'—';
 $('dailySummary').textContent=due.length?`${due.length} revisões prontas para praticar.`:'Situações variadas, com revisão das suas escolhas.';
 $('dueBtn').disabled=!due.length;$('dueBtn').textContent=due.length?`Revisar ${Math.min(due.length,8)} situações de hoje`:'Revisões em dia';
 const nextDue=memory.reviews.filter(r=>r.due>Date.now()).sort((a,b)=>a.due-b.due)[0];
 $('reviewSummary').textContent=due.length?'Faça até 8 por sessão. As demais continuam na fila.':nextDue?`Próxima revisão: ${new Date(nextDue.due).toLocaleDateString('pt-BR')}. Você pode praticar outros contextos hoje.`:'Depois do primeiro treino, suas revisões aparecerão aqui.';
 const topics=[...new Set(attempts.map(x=>x.topic))].map(topic=>{const a=attempts.filter(x=>x.topic===topic).slice(-12);return {topic,n:a.length,rate:a.filter(x=>x.quality>=80&&!x.expired).length/a.length};}).filter(x=>x.n>=3).sort((a,b)=>a.rate-b.rate).slice(0,3);
 $('learningStats').innerHTML=`<div class="learning-stats"><div class="learning-stat"><b>${percent(novel)}</b><span>boas decisões · primeira tentativa (${novel.length})</span></div><div class="learning-stat"><b>${percent(review)}</b><span>boas decisões · repetição (${review.length})</span></div></div>${topics.length?'<p class="muted">Prioridades de prática · últimas 12 decisões por tema</p>'+topics.map(t=>`<div class="topic-row"><span>${esc(t.topic)}</span><span>${Math.round(t.rate*100)}% · ${t.n} decisões</span></div>`).join(''): '<p class="muted">Os temas aparecem após 3 decisões. As porcentagens descrevem tarefas diferentes; não medem QI nem ganho causal.</p>'}`;
 if(!learningStorageOK)$('storageNote').textContent='O armazenamento de aprendizado está indisponível ou inválido. Exporte um backup antes de fechar.';
}
function exportProgress(){
 const payload={version:1,exportedAt:new Date().toISOString(),history,memory};
 const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='mega-draft-progresso.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('backupStatus').textContent='Backup solicitado. Guarde o arquivo para importar no outro aparelho.';
}
function parseBackup(text){
 if(text.length>1000000)throw Error('Backup maior que 1 MB.');const data=JSON.parse(text);
 if(!data||data.version!==1||!Array.isArray(data.history)||data.history.length>30)throw Error('Este arquivo não é um backup compatível.');
 const validMemory=validateMemory(data.memory);
 const validHistory=data.history.map(h=>{if(!h||!['learn','draft','flash','retry'].includes(h.mode)||!Number.isFinite(Date.parse(h.date))||![0,7,10,15].includes(h.limit)||!Number.isFinite(h.quality)||h.quality<0||h.quality>100||!Number.isFinite(h.onTime)||h.onTime<0||h.onTime>100||!Number.isFinite(h.seconds)||h.seconds<0||!Number.isInteger(h.count)||h.count<1||h.count>36)throw Error('Histórico inválido.');return {date:h.date,mode:h.mode,limit:h.limit,quality:h.quality,onTime:h.onTime,seconds:h.seconds,count:h.count,assisted:!!h.assisted};});
 return {history:validHistory,memory:validMemory};
}
async function importProgress(event){
 const file=event.target.files[0];if(!file)return;
 try{if(file.size>1000000)throw Error('Backup maior que 1 MB.');const incoming=parseBackup(await file.text());if(!confirm('Substituir o progresso deste navegador pelo backup? Exporte o atual primeiro se quiser guardá-lo.'))return;history=incoming.history;memory=incoming.memory;save();saveLearning();renderProgress();$('backupStatus').textContent=storageOK&&learningStorageOK?'Backup importado.':'Backup carregado nesta sessão; não foi possível persistir tudo. Exporte antes de fechar.';}catch(error){$('backupStatus').textContent=`Não foi possível importar: ${error instanceof SyntaxError?'arquivo JSON inválido.':error.message}`;}finally{event.target.value='';}
}
