'use strict';
// New contexts come from legal shared-pool draft prefixes, not arbitrary deck combinations.
function simulatedPick(deck,opp,pool){
 const ranked=rank(deck,opp,pool),near=ranked.filter(x=>ranked[0].score-x.score<=12).slice(0,5);
 return shuffle(near)[0].c;
}
function generateSituation(stage='mixed'){
 const me=[],opp=[];let pool=makePool();const target=stage==='opening'?1+Math.floor(Math.random()*2):stage==='closing'?6+Math.floor(Math.random()*2):2+Math.floor(Math.random()*6);
 const sequence=['me','opp','opp','me','me','opp','opp','me','me','opp','opp','me','me','opp','opp','me'];
 for(const turn of sequence){
  if(turn==='me'&&me.length===target)break;
  const own=turn==='me'?me:opp,other=turn==='me'?opp:me,c=simulatedPick(own,other,pool);
  own.push(c);pool=pool.filter(x=>x!==c);
 }
 const ranked=rank(me,opp,pool),best=ranked[0];
 // Include a credible alternative, not just one obvious correct card and three absurd ones.
 const near=ranked.slice(1).filter(x=>best.score-x.score<=12);
 const second=shuffle(near.length?near:ranked.slice(1,5))[0];
 const others=shuffle(ranked.filter(x=>x!==best&&x!==second)).slice(0,2);
 const offered=shuffle([best,second,...others]);
 return {source:'generated',reference:best.c.name,topic:me.length>=6?'Fechamento de deck':me.length<=2?'Abertura do draft':'Leitura do draft',prompt:`Escolha ${me.length+1} de 8. Qual carta melhora mais seu deck neste confronto?`,me:me.map(c=>c.name),opp:opp.map(c=>c.name),options:offered.map(x=>x.c.name),analyses:offered.map(x=>({reason:x.reason,caution:x.caution})),values:offered.map(x=>Math.round(Math.max(0,100-Math.max(0,best.score-x.score-5)*3))),why:`${best.reason} ${best.caution} Avaliação automática do contexto completo; alternativas próximas também são aceitas.`.trim()};
}
function variedPractice(count=8){
 const recent=new Set(memory.attempts.slice(-24).map(a=>a.id));
 const seen=new Set(memory.attempts.map(a=>a.id));
 const priority=q=>{const id=snapshotId(q),topic=memory.attempts.filter(a=>a.topic===q.topic).slice(-12),weak=topic.length>=3?topic.filter(a=>a.quality<80||a.expired).length/topic.length:0;return weak*2+(seen.has(id)?0:1)-(recent.has(id)?3:0);};
 const guided=shuffle(DRILLS).map(q=>({q,score:priority(q)})).sort((a,b)=>b.score-a.score).map(x=>x.q);
 const result=[],topics=new Set();for(const q of guided){if(result.length>=Math.ceil(count/2))break;if(!topics.has(q.topic)){result.push(q);topics.add(q.topic);}}
 const used=new Set(result.map(snapshotId));let attempts=0;
 while(result.length<count&&attempts++<30){const q=generateSituation(),id=snapshotId(q);if(!used.has(id)&&!recent.has(id)){result.push(q);used.add(id);}}
 return shuffle(result);
}

function focusedPractice(stage){
 if(!['opening','closing'].includes(stage))return variedPractice();
 const result=[],used=new Set();
 for(let n=0;n<40&&result.length<8;n++){
  const q=generateSituation(stage),id=snapshotId(q);
  if(!used.has(id)){result.push(q);used.add(id);}
 }
 return result;
}
function comparisonRows(e){
 const q=e.snapshot,me=cards(namesOf(q.me)),opp=cards(namesOf(q.opp)),pool=cards(namesOf(q.options)).filter(c=>canPick(c,me));
 const ranked=rank(me,opp,pool),top=ranked[0]?.score||0;
 const rows=pool.map(c=>{const r=ranked.find(x=>x.c===c);return {c,quality:q.values?q.values[q.options.indexOf(c.name)]:Math.round(Math.max(0,100-Math.max(0,top-r.score-5)*3)),reason:q.analyses?.[q.options.indexOf(c.name)]?.reason||(q.source==='generated'?'Compare a função desta carta com as necessidades do deck. A análise individual não foi salva neste contexto antigo.':r.reason),caution:q.analyses?.[q.options.indexOf(c.name)]?.caution||(q.source==='generated'?'':r.caution)};});
 rows.sort((a,b)=>b.quality-a.quality);
 // Include the user's choice even when it is outside the leading alternatives.
 const chosen=rows.find(r=>r.c.name===e.card),visible=rows.slice(0,3);
 if(chosen&&!visible.includes(chosen))visible[2]=chosen;
 return visible;
}
function comparisonHTML(e){
 return '<div class="choice-comparison">'+comparisonRows(e).map(r=>`<article class="comparison-card">${cardArtwork(r.c)}<div><b>${esc(r.c.name)}</b><small>${r.c.name===e.card?'Sua escolha · ':''}${r.c.name===e.best?'Referência · ':''}${r.quality}/100</small><p>${esc(r.reason)}</p>${r.caution?`<p class="warn">${esc(r.caution)}</p>`:''}</div></article>`).join('')+'</div><p class="muted">Notas didáticas, não chances de vitória. Nos exercícios guiados, as notas vêm do caso; os comentários por carta são heurísticos.</p>';
}
function deckAudit(me,opp){
 const gaps=core.filter(([, ,test])=>!me.some(test)).map(([,label])=>label);
 const threats=opp.map(c=>({c,coverage:Math.max(0,...me.map(x=>answers(x,c)))})).filter(x=>x.coverage<7&&x.c.roles.some(r=>['wincon','air','tank','swarm'].includes(r))).slice(0,3);
 return {gaps,threats,average:average(me)};
}
function renderDebrief(){
 const full=['draft','learn'].includes(state.mode);$('deckAudit').hidden=!full;
 if(full){const a=deckAudit(state.player,state.bot);$('deckAudit').innerHTML=`<h3>O deck que você construiu</h3><p>${a.average.toFixed(1)} elixir médio · ${a.gaps.length?'Funções ausentes: '+a.gaps.map(esc).join(', '):'As três funções básicas estão presentes.'}</p>${a.threats.length?`<p>Respostas a conferir na arena: <b>${a.threats.map(t=>esc(t.c.name)).join(', ')}</b>.</p>`:'<p>O avaliador encontrou respostas básicas às ameaças analisadas.</p>'}<p class="muted">Esta leitura não simula batalhas. Posicionamento, rotação e níveis ainda importam.</p>`;}
 const recent=state.log.filter(e=>!e.expired),slow=recent.filter(e=>e.elapsed>e.limit*.8&&e.limit>0),late=state.log.filter(e=>e.expired);
 $('paceNote').textContent=late.length?`${late.length} decisões fora do prazo. Pratique em 15s e tente chegar à sua opção principal antes dos 7s.`:slow.length?`${slow.length} decisões usaram mais de 80% do prazo. Observe qual ameaça atrasa sua comparação.`:'Mantenha o ritmo e teste outros contextos antes de acelerar.';
 $('sessionPath').innerHTML=state.log.map((e,i)=>`<span class="decision-dot ${e.expired||e.quality<80?'needs-work':'solid'}" title="${i+1}: ${esc(verdict(e))}" aria-label="Decisão ${i+1}: ${esc(verdict(e))}">${e.expired?'×':e.quality>=80?'✓':'○'}</span>`).join('');
}
function renderFocusSummary(){
 const list=memory.attempts.filter(a=>!a.review).slice(-80),topics=[...new Set(list.map(a=>a.topic))].map(topic=>{const a=list.filter(x=>x.topic===topic);return {topic,n:a.length,rate:a.filter(x=>x.quality>=80&&!x.expired).length/a.length};}).filter(t=>t.n>=3).sort((a,b)=>a.rate-b.rate);
 $('focusSummary').textContent=topics.length?`Foco sugerido: ${topics[0].topic.toLowerCase()} — ${Math.round(topics[0].rate*100)}% de boas decisões em ${topics[0].n} primeiras tentativas recentes.`:'Pratique o começo e o fim do draft separadamente. O foco sugerido aparece após três primeiras tentativas em um tema.';
}
function renderLibrary(){
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),query=normalize($('cardSearch').value.trim());
 const found=CATALOG.filter(c=>normalize(c.name+' '+c.roles.map(r=>roleNames[r]||r).join(' ')).includes(query));
 $('libraryCount').textContent=`${found.length} de ${CATALOG.length} cartas · funções simplificadas`;
 $('cardLibrary').innerHTML=found.length?found.map(c=>`<article class="library-card">${cardArtwork(c)}<b>${esc(c.name)}</b><small>${c.e} elixir</small><p>${esc([...new Set(c.roles.map(r=>roleNames[r]).filter(Boolean))].slice(0,3).join(' · '))}</p></article>`).join(''):'<p class="muted">Nenhuma carta encontrada. Tente o nome ou uma função, como defesa aérea.</p>';
}
