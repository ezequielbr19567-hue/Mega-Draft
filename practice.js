'use strict';
// New contexts come from legal shared-pool draft prefixes, not arbitrary deck combinations.
function simulatedPick(deck,opp,pool){
 const ranked=rank(deck,opp,pool),near=ranked.filter(x=>ranked[0].score-x.score<=12).slice(0,5);
 return shuffle(near)[0].c;
}
function generateSituation(){
 const me=[],opp=[];let pool=makePool();const target=2+Math.floor(Math.random()*6);
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
 return {source:'generated',reference:best.c.name,topic:me.length>=6?'Fechamento de deck':'Leitura do draft',prompt:`Escolha ${me.length+1} de 8. Qual carta melhora mais seu deck neste confronto?`,me:me.map(c=>c.name),opp:opp.map(c=>c.name),options:offered.map(x=>x.c.name),values:offered.map(x=>Math.round(Math.max(0,100-Math.max(0,best.score-x.score-5)*3))),why:`${best.reason} ${best.caution} Avaliação automática do contexto completo; alternativas próximas também são aceitas.`.trim()};
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
