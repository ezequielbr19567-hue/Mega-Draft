'use strict';
// Base reduced catalog. Correct duplicate translation and distinguish sustained air defense.
const CATALOG = CARDS.filter(c => c.name !== 'Carrasco').map(c => ({...c,roles:[...c.roles],targets:[...c.targets]}));
CATALOG.find(c=>c.name==='Torre Inferno').roles.push('antiAir');
// Tornado is a control spell, not a substitute for a reliable light damage spell.
CATALOG.find(c=>c.name==='Tornado').roles=['control'];
const $ = id => document.getElementById(id);
const roleNames={wincon:'dano à torre',antiAir:'defesa aérea',tankKiller:'antitanque',smallSpell:'feitiço leve',bigSpell:'feitiço forte',splash:'dano em área',building:'construção',miniTank:'defensor',support:'suporte',swarm:'enxame',cycle:'ciclo',control:'controle',pressure:'pressão',tank:'tanque',reset:'reinício',bait:'isca',ground:'terrestre',air:'aéreo'};
const cardByName=n=>CATALOG.find(c=>c.name===n);
const cards=names=>names.map(cardByName);
const has=(deck,r)=>deck.some(c=>c.roles.includes(r));
const count=(deck,r)=>deck.filter(c=>c.roles.includes(r)).length;
const air=c=>c.roles.includes('antiAir')&&!c.roles.includes('smallSpell');
const average=deck=>deck.length?deck.reduce((s,c)=>s+c.e,0)/deck.length:0;
const mean=a=>a.length?a.reduce((s,n)=>s+n,0)/a.length:0;
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const esc=escapeHTML;
const core=[['wincon','Dano à torre',c=>c.roles.includes('wincon')],['antiAir','Defesa aérea',air],['smallSpell','Feitiço leve',c=>c.roles.includes('smallSpell')]];
function answers(c,threat){
 const n=threat.name,r=c.roles;
 if(threat.roles.includes('air'))return air(c)?(r.includes('swarm')?6:11):0;
 if(n==='Cemitério')return n!==c.name&&(c.name==='Veneno'||r.includes('splash'))?11:0;
 if(threat.roles.includes('bait'))return r.includes('smallSpell')&&c.name!=='Tornado'?10:r.includes('splash')?5:0;
 if(threat.roles.includes('tank')||threat.roles.includes('rg'))return r.includes('tankKiller')?11:r.includes('swarm')?5:0;
 if(threat.roles.includes('hog')||threat.roles.includes('bridge'))return r.includes('building')?11:r.includes('tankKiller')?7:0;
 if(threat.roles.includes('swarm'))return r.includes('splash')||r.includes('smallSpell')?7:0;
 return 0;
}
function evaluate(c,me,opp,available){
 const parts=[{v:c.vers*.65,why:'Opção flexível para compor o deck.'}];
 const add=(v,why)=>parts.push({v,why});const r=c.roles,slot=me.length+1;
 for(const [role,label,test] of core){if(test(c)&&!me.some(test)){
   const left=available.filter(test).length;
   let value=role==='wincon'?(slot>=6?23:slot>=3?13:6):12;
   if(left<=2)value+=10;
   add(value,`${label}: fecha uma lacuna${left<=2?' com poucas opções restantes':''}.`);
 }}
 if(!has(me,'wincon')&&!r.includes('wincon')&&slot===8)add(-65,'A última vaga precisa de uma forma de pressionar a torre.');
 if(has(me,'wincon')&&r.includes('wincon'))add(-12,'Já existe um plano de dano à torre; priorize completar o suporte.');
 if(!me.some(air)&&!air(c)&&slot===8)add(-27,'O deck termina sem defesa aérea sustentada.');
 if(air(c)&&me.filter(air).length===1&&opp.some(t=>t.roles.includes('air')))add(8,'Uma segunda defesa aérea dá segurança contra a pressão pelo ar.');
 for(const role of ['tankKiller','splash','bigSpell','miniTank'])if(r.includes(role)&&!has(me,role))add(role==='bigSpell'?6:5,`Acrescenta ${roleNames[role]} ao deck.`);
 const uncovered=opp.map(t=>({t,value:answers(c,t),covered:Math.max(0,...me.map(x=>answers(x,t)))}));
 uncovered.sort((a,b)=>b.value-b.covered-(a.value-a.covered));
 for(const {t,value,covered} of uncovered.slice(0,2))if(value>covered)add((value-covered)*1.35,`Melhora sua resposta a ${t.name}; exige posicionamento e elixir.`);
 if(c.name==='Tornado'&&me.some(x=>['Executor','Bebê Dragão','Lançador'].includes(x.name))||me.some(x=>x.name==='Tornado')&&['Executor','Bebê Dragão','Lançador'].includes(c.name))add(9,'Tornado e dano em área permitem concentrar e atingir o ataque rival.');
 if((c.name==='Gigante Real'&&me.some(x=>x.name==='Pescador'))||(c.name==='Pescador'&&me.some(x=>x.name==='Gigante Real')))add(9,'Pescador ajuda a afastar defensores do Gigante Real.');
 if(has(me,'graveyard')&&(r.includes('miniTank')||c.name==='Veneno')||r.includes('graveyard')&&has(me,'miniTank'))add(8,'Um defensor que tanque a torre ajuda o plano de Cemitério.');
 if(has(me,'tank')&&r.includes('support'))add(6,'Oferece suporte ao tanque já escolhido.');
 if(r.includes('swarm')&&opp.some(x=>x.roles.includes('splash')||['Flechas','Veneno'].includes(x.name)))add(-10,'O rival já tem dano em área para suas tropas frágeis.');
 if(['Torre Inferno','Dragão Infernal'].includes(c.name)&&has(opp,'reset'))add(-8,'O rival tem reset: proteja a carga de dano e evite depender só desta resposta.');
 if(r.includes('wincon')){const danger=Math.max(0,...opp.map(x=>answers(x,c)));if(danger>=10)add(-9,'O rival já mostrou uma resposta a este plano de ataque.');}
 if(me.length>=3&&average([...me,c])>4.3)add(-Math.round((average([...me,c])-4.3)*15),'Aumenta o peso do deck e dificulta responder com pouco elixir.');
 for(const role of ['building','smallSpell','bigSpell'])if(r.includes(role)&&count(me,role)>=(role==='building'?1:2))add(-12,`Repete ${roleNames[role]} enquanto outras vagas podem ser mais úteis.`);
 // Denial is a small bonus, only for cards that fill our own needs.
 if(parts.some(p=>p.v>=10)&&opp.length<8&&core.some(([, ,test])=>test(c)&&!opp.some(test)&&available.filter(test).length<=2))add(4,'Também retira uma opção escassa de que o rival pode precisar.');
 const positive=parts.filter(p=>p.v>0).sort((a,b)=>b.v-a.v),negative=parts.filter(p=>p.v<0).sort((a,b)=>a.v-b.v);
 return {score:parts.reduce((s,p)=>s+p.v,0),reason:positive.slice(0,2).map(p=>p.why).join(' '),caution:negative[0]?.why||''};
}
function rank(me,opp,pool){return pool.map(c=>({c,...evaluate(c,me,opp,pool)})).sort((a,b)=>b.score-a.score);}
function makePool(){const result=[];for(const [r,n] of [['wincon',6],['smallSpell',3],['bigSpell',3],['building',3],['antiAir',5]]){result.push(...shuffle(CATALOG.filter(c=>c.roles.includes(r)&&!result.includes(c))).slice(0,n));}result.push(...shuffle(CATALOG.filter(c=>!result.includes(c))).slice(0,36-result.length));return result.sort((a,b)=>a.e-b.e||a.name.localeCompare(b.name,'pt-BR'));}
const DRILLS=[
 {topic:'Defesa aérea',prompt:'O rival mostrou Balão. Você terá mais escolhas depois desta. Qual carta melhora mais sua defesa agora?',me:['Cavaleiro','Tronco','Corredor'],opp:['Balão','Bola de Fogo','Guardas'],options:['Mosqueteira','Mini P.E.K.K.A','Bombardeiro','Golem'],values:[100,25,10,5],why:'Mosqueteira oferece dano aéreo contínuo. Proteja-a e não dependa de uma tropa terrestre para parar o Balão.'},
 {topic:'Dano à torre',prompt:'Esta é sua última vaga. Qual escolha dá ao deck um plano claro de dano à torre?',me:['Cavaleiro','Mosqueteira','Tesla','Tronco','Bola de Fogo','Esqueletos','Espírito de Gelo'],opp:['Gigante','Mini P.E.K.K.A','Zap','Mago','Servos','Veneno','Guardas'],options:['Corredor','Valquíria','Canhão','Mago Elétrico'],values:[100,30,10,30],why:'Corredor completa a condição de vitória com apoio do ciclo e dos feitiços. Mais uma defesa deixa o deck sem pressão confiável.'},
 {topic:'Resposta a tanques',prompt:'O rival prepara um ataque pesado. Você já tem feitiços e defesa aérea. Qual opção melhora mais sua resposta ao tanque?',me:['Mosqueteira','Tronco','Bola de Fogo','Corredor'],opp:['Golem','Bebê Dragão','Relâmpago','Bombardeiro'],options:['Mini P.E.K.K.A','Torre Inferno','Esqueletos','Mago'],values:[100,80,30,25],why:'Mini P.E.K.K.A acrescenta dano concentrado sem depender de carga. Torre Inferno também ajuda, mas o Relâmpago rival pode reiniciá-la; posicionamento continua essencial.'},
 {topic:'Elixir',prompt:'Última vaga: seu deck já tem ataque, feitiços e respostas, mas está pesado. Qual opção ajuda mais a voltar às cartas de defesa?',me:['Gigante','Príncipe','Bebê Dragão','Mosqueteira','Bola de Fogo','Zap','Mini P.E.K.K.A'],opp:['Corredor','Canhão','Cavaleiro','Tronco','Arqueiras','Bola de Fogo','Espírito de Gelo'],options:['Esqueletos','Golem','P.E.K.K.A','Relâmpago'],values:[100,5,20,25],why:'Esqueletos barateiam a rotação e ajudam a distrair tropas. Somar outra carta cara reduz sua capacidade de responder entre ataques.'},
 {topic:'Sinergia',prompt:'Seu deck já tem Executor e condição de vitória. Qual opção acrescenta uma combinação de controle ao dano em área?',me:['Executor','Cavaleiro','Mineiro','Bola de Fogo'],opp:['Gigante','Bruxa','Servos','Zap'],options:['Tornado','Mago','Bruxa','Golem'],values:[100,45,35,10],why:'Tornado pode reunir tropas na linha do Executor. A sinergia depende de posicionamento; não é garantia de eliminar qualquer ataque.'},
 {topic:'Feitiços',prompt:'O rival escolheu Barril de Goblins e Gangue. Seu deck ainda não tem feitiço leve. Qual é a resposta mais direta?',me:['Gigante Real','Mosqueteira','Mini P.E.K.K.A','Bola de Fogo'],opp:['Barril de Goblins','Gangue de Goblins','Cavaleiro','Torre Inferno'],options:['Tronco','Flechas','Relâmpago','Espírito de Gelo'],values:[100,90,15,35],why:'Tronco responde às duas ameaças terrestres com baixo custo. Flechas são outra boa resposta, custando um elixir a mais. Evite gastar seu único feitiço sem pensar na próxima ameaça.'},
 {topic:'Escassez',prompt:'Você ainda não tem condição de vitória. Estas são as únicas cartas restantes do exercício e o rival também precisa de ataque. Qual você garante agora?',me:['Valquíria','Mosqueteira','Bola de Fogo','Tesla','Zap'],opp:['Cavaleiro','Caçador','Veneno','Guardas','Esqueletos'],options:['Gigante','Arqueiras','Bombardeiro','Espírito Elétrico'],values:[100,25,20,25],why:'Gigante é a única condição de vitória disponível. Aqui, esperar para esconder seu plano arrisca perder a única opção; regras de draft não são absolutas.'},
 {topic:'Leitura dos feitiços',prompt:'Você precisa reforçar a defesa aérea. O rival já tem Flechas e Mago. Qual opção fica menos exposta às respostas mostradas?',me:['Mineiro','Cavaleiro','Veneno','Tesla'],opp:['Balão','Flechas','Mago','Guardas'],options:['Mosqueteira','Mega Servo','Horda de Servos','Morcegos'],values:[100,90,20,35],why:'Mosqueteira e Mega Servo oferecem respostas menos frágeis a Flechas. Horda de Servos concentra cinco de elixir em uma troca muito favorável ao feitiço rival.'}
];
// Contrasting cases keep the same concept from collapsing into a single memorized card.
DRILLS.push(
 {topic:'Defesa aérea',prompt:'O rival tem Lava Hound e Balão. Você só tem tropas terrestres. Qual resposta cobre melhor o ar?',me:['Cavaleiro','Mini P.E.K.K.A','Corredor'],opp:['Lava Hound','Balão','Zap'],options:['Caçador','Mosqueteira','Canhão','Bombardeiro'],values:[100,90,25,10],why:'Caçador e Mosqueteira atingem o ar continuamente. Caçador depende de distância curta para concentrar dano; proteja a resposta em vez de somar outra defesa só terrestre.'},
 {topic:'Dano à torre',prompt:'Sua última vaga está livre. Você já tem Gigante e suporte, mas não tem feitiço leve contra os enxames mostrados. Qual completa o plano?',me:['Gigante','Mosqueteira','Mini P.E.K.K.A','Bola de Fogo','Cavaleiro','Tesla','Espírito de Gelo'],opp:['Barril de Goblins','Gangue de Goblins','Torre Inferno','Arqueiras'],options:['Tronco','Flechas','Corredor','Golem'],values:[100,90,25,10],why:'O ataque já está definido. Tronco ou Flechas resolvem uma lacuna real; uma segunda condição de vitória não substitui essa resposta.'},
 {topic:'Resposta a tanques',prompt:'O rival tem Gigante e Príncipe, sem reset mostrado. Seu deck tem dano em área, mas falta dano concentrado. Qual carta ajuda mais?',me:['Valquíria','Bebê Dragão','Mineiro','Tronco'],opp:['Gigante','Príncipe','Flechas','Mago'],options:['Torre Inferno','Mini P.E.K.K.A','Bombardeiro','Morcegos'],values:[100,90,25,35],why:'Torre Inferno acrescenta atração e dano crescente; Mini P.E.K.K.A também é útil. Morcegos ficam muito expostos a Flechas e Mago.'},
 {topic:'Elixir',prompt:'Última vaga. O deck está barato, mas precisa responder ao Gigante Real. Qual escolha acrescenta a função que falta?',me:['Mineiro','Esqueletos','Espírito de Gelo','Tronco','Goblins','Bola de Fogo','Arqueiras'],opp:['Gigante Real','Bebê Dragão','Zap','Valquíria'],options:['Mini P.E.K.K.A','Espírito Elétrico','Bombardeiro','Mago'],values:[100,20,25,35],why:'Mini P.E.K.K.A oferece dano concentrado. Baratear por baratear não é o objetivo: uma curva eficiente também precisa de respostas suficientes.'},
 {topic:'Sinergia',prompt:'Você escolheu Gigante Real. O rival tem P.E.K.K.A e Cavaleiro. Qual opção ajuda a tirar esses defensores do caminho?',me:['Gigante Real','Caçador','Tronco','Bola de Fogo'],opp:['P.E.K.K.A','Cavaleiro','Zap','Mosqueteira'],options:['Pescador','Gigante','Golem','Príncipe'],values:[100,25,10,45],why:'Pescador pode deslocar defensores terrestres, abrindo espaço para o Gigante Real. A combinação precisa de posicionamento e não remove todo o risco do confronto.'},
 {topic:'Feitiços',prompt:'Seu deck já tem Tronco, mas o rival mostrou Horda de Servos e Máquina Voadora. Qual feitiço responde melhor a esse novo problema?',me:['Corredor','Tronco','Cavaleiro','Canhão'],opp:['Horda de Servos','Máquina Voadora','Gigante','Guardas'],options:['Bola de Fogo','Flechas','Barril de Bárbaro','Tornado'],values:[100,85,10,30],why:'Bola de Fogo ameaça as duas tropas aéreas; Flechas ajudam contra a Horda. Outro feitiço só terrestre repete uma função e deixa a nova ameaça sem resposta.'},
 {topic:'Escassez',prompt:'Seu deck já tem Corredor, mas nenhuma defesa aérea. O rival tem Balão. Entre estas opções, qual função você precisa garantir?',me:['Corredor','Cavaleiro','Tronco','Bola de Fogo'],opp:['Balão','Veneno','Guardas'],options:['Mosqueteira','Gigante','Bombardeiro','Canhão'],values:[100,10,15,30],why:'Mosqueteira é a única resposta aérea sustentada entre as opções. A prioridade muda com a lacuna: não vale negar um ataque ao rival enquanto você ignora o próprio risco.'},
 {topic:'Leitura dos feitiços',prompt:'O rival tem Veneno e Zap. Seu deck já tem defesa aérea, mas precisa segurar pressão terrestre. Qual opção dá uma resposta menos dependente de enxame?',me:['Mineiro','Arqueiras','Tesla','Bola de Fogo'],opp:['Ariete de Batalha','Príncipe','Veneno','Zap'],options:['Mini P.E.K.K.A','Cavaleiro','Exército de Esqueletos','Morcegos'],values:[100,85,30,25],why:'Mini P.E.K.K.A e Cavaleiro resistem melhor aos feitiços mostrados do que tropas muito frágeis. O dano concentrado do Mini P.E.K.K.A complementa a Tesla.'}
);
// Avoid an impossible duplicated shared-pool card in the original exercise.
DRILLS[3].opp=DRILLS[3].opp.map(n=>n==='Bola de Fogo'?'Veneno':n);
DRILLS[4].options=DRILLS[4].options.map(n=>n==='Bruxa'?'Arqueiro Mágico':n);
let selectedMode='draft',state=null,timer=null,botTimer=null,generation=0,storageOK=true;
let history=[];try{const v=JSON.parse(localStorage.getItem('mega-draft-coach-v2')||'[]');if(Array.isArray(v))history=v.filter(x=>x&&['learn','draft','flash','retry'].includes(x.mode)&&Number.isFinite(x.quality)&&Number.isFinite(x.onTime)&&Number.isFinite(x.seconds)&&typeof x.date==='string').slice(-30);}catch{storageOK=false;}
function save(){try{localStorage.setItem('mega-draft-coach-v2',JSON.stringify(history));}catch{storageOK=false;}}
function clearTimers(){clearInterval(timer);clearTimeout(botTimer);timer=null;botTimer=null;generation++;}
function selectMode(mode){selectedMode=mode;document.querySelectorAll('[data-mode]').forEach(el=>{const yes=el.dataset.mode===mode;el.classList.toggle('selected',yes);el.setAttribute('aria-pressed',String(yes));});$('timeSetting').hidden=mode==='learn';}
let preparing=false;
async function launch(mode=selectedMode,retries=null){
 if(preparing)return;preparing=true;
 const buttons=['startBtn','dailyBtn','dueBtn','openingBtn','closingBtn'].map(id=>({el:$(id),disabled:$(id).disabled}));buttons.forEach(b=>b.el.disabled=true);
 $('assetStatus').textContent='Preparando imagens das cartas. O relógio só começa depois.';
 try{const failures=await preloadArtwork();$('assetStatus').textContent='';start(mode,retries);$('imageWarning').hidden=!failures;$('imageWarning').textContent=failures?'Algumas imagens não carregaram a tempo. Os nomes continuam disponíveis. Se persistir, confira se a pasta assets/cards foi enviada ao GitHub.':'';}finally{preparing=false;buttons.forEach(b=>b.el.disabled=b.disabled);}
}
function start(mode=selectedMode,retries=null){
 clearTimers();state={mode,limit:mode==='learn'?0:Number($('duration').value),player:[],bot:[],pool:[],all:[],turn:0,sequence:[],log:[],active:false,finished:false,hints:false,assisted:false,queue:[],index:0,lastBot:'',retrySource:retries,filter:'all',pending:null};
 document.body.classList.add('training-active');
 $('imageWarning').hidden=true;
 $('reflection').hidden=true;$('deckArea').hidden=false;$('deckToggle').setAttribute('aria-expanded','true');$('deckToggle').textContent='Recolher meu deck';
 $('home').hidden=true;$('training').hidden=false;$('report').hidden=true;$('feedback').hidden=true;$('nextBtn').hidden=true;$('hintBtn').hidden=mode!=='learn';$('training').classList.toggle('flash',mode==='flash'||mode==='retry');
 $('modeLabel').textContent={learn:'APRENDIZADO · SEM PRESSA',draft:`DRAFT · ${state.limit}s POR CARTA`,flash:`DECISÃO RÁPIDA · ${state.limit}s`,retry:`REPETIÇÃO · ${state.limit}s`}[mode];
 if(mode==='flash'||mode==='retry'){state.queue=retries?shuffle(retries):variedPractice();loadDrill();}else{state.all=makePool();state.pool=[...state.all];const first=Math.random()<.5?'player':'bot',other=first==='player'?'bot':'player';state.sequence=[first,other,other,first,first,other,other,first,first,other,other,first,first,other,other,first];nextTurn();}
 window.scrollTo({top:0,behavior:'instant'});
}
function loadDrill(){
 state.selection=null;
 $('modeLabel').textContent=`${state.queue[state.index].source==='generated'?'SITUAÇÃO GERADA':'EXERCÍCIO GUIADO'} · ${state.limit}s`;
 const q=state.queue[state.index];state.current=q;state.player=q.me.map(x=>typeof x==='string'?cardByName(x):x);state.bot=q.opp.map(x=>typeof x==='string'?cardByName(x):x);state.pool=shuffle(q.options.map(x=>typeof x==='string'?cardByName(x):x));state.all=[...state.pool];state.active=true;state.hints=false;state.assisted=false;state.pending=null;$('reflection').hidden=true;$('feedback').hidden=true;$('nextBtn').hidden=true;render();window.scrollTo({top:0,behavior:'instant'});startClock();
}
function nextTurn(){
 state.selection=null;
 if(state.turn>=16){finish();return;}
 state.active=state.sequence[state.turn]==='player';state.assisted=false;render();
 if(state.active)startClock();else{stopClock('…');const token=generation;botTimer=setTimeout(()=>{if(token!==generation||!state||state.finished)return;const ranked=rank(state.bot,state.player,state.pool);const options=ranked.filter(x=>ranked[0].score-x.score<=5).slice(0,3);const c=shuffle(options)[0].c;state.bot.push(c);state.lastBot=c.name;state.pool=state.pool.filter(x=>x!==c);state.turn++;nextTurn();},1200);}
}
function stopClock(text='—'){clearInterval(timer);timer=null;$('clock').textContent=text;$('clock').classList.remove('urgent');$('timerBar').style.width='0%';}
function startClock(){
 clearInterval(timer);state.started=performance.now();state.deadline=state.started+state.limit*1000;
 if(!state.limit){$('clock').textContent='∞';$('timerBar').style.width='100%';return;}
 tick();timer=setInterval(tick,50);
}
function tick(){if(!state?.active||state.finished)return;const left=Math.max(0,(state.deadline-performance.now())/1000);$('clock').innerHTML=`${left.toFixed(1)}<span>s</span>`;$('clock').classList.toggle('urgent',left<=3);$('timerBar').style.width=`${left/state.limit*100}%`;$('timerBar').style.background=left<=3?'var(--bad)':'var(--accent)';if(left<=0)pick(null,true);}
function pick(name,expired=false){
 if(!state?.active||state.finished)return;
 if(state.limit&&performance.now()>=state.deadline)expired=true;
 let chosen=state.pool.find(c=>c.name===name);if(!chosen&&!expired)return;
 const elapsed=state.limit?Math.min(state.limit,(performance.now()-state.started)/1000):(performance.now()-state.started)/1000;
 const me=[...state.player],opp=[...state.bot],available=[...state.pool],quick=state.mode==='flash'||state.mode==='retry';
 if(expired)chosen=quick?null:shuffle(available)[0];
 state.active=false;stopClock();
 let entry;
 if(quick&&state.current.values){
  const q=state.current,i=q.options.indexOf(chosen?.name),bestIndex=q.values.indexOf(Math.max(...q.values));const quality=i<0?0:q.values[i];
  entry={card:chosen?.name||'Sem escolha',best:q.reference||q.options[bestIndex],quality,reason:q.why,caution:'',topic:q.topic,snapshot:q};
 }else{
  const ranked=rank(me,opp,available),best=ranked[0],chosenResult=chosen?ranked.find(x=>x.c===chosen):null;
  const delta=chosenResult?best.score-chosenResult.score:100;const quality=expired?0:Math.round(Math.max(0,100-Math.max(0,delta-5)*3));
  entry={card:chosen?.name||'Sem escolha',best:best.c.name,quality,reason:best.reason,caution:chosenResult?.caution||'',topic:'Leitura do deck',snapshot:{topic:'Revisão do draft',prompt:`Reveja a escolha ${me.length+1}: qual carta acrescenta mais a este deck?`,me,opp,options:available},chosenReason:chosenResult?.reason||''};
 }
 const entryId=snapshotId(entry.snapshot);
 entry={...entry,elapsed,expired,assisted:state.assisted,limit:state.limit,curated:!!(quick&&state.current.values),isReview:memory.attempts.some(a=>a.id===entryId),confidence:null};state.log.push(entry);
 if(quick){render();reflect(entry);}
 else{state.player.push(chosen);state.pool=state.pool.filter(c=>c!==chosen);state.turn++;if(state.mode==='learn'){render();reflect(entry);}else nextTurn();}
}
function reflect(entry){state.pending=entry;applyBoardLayout();$('feedback').hidden=true;$('nextBtn').hidden=true;$('reflection').hidden=false;$('turn').textContent='Escolha registrada';$('turnHelp').textContent='Agora, pense no motivo. O relógio está parado.';$('reflection').scrollIntoView({behavior:'instant',block:'start'});$('sureBtn').focus({preventScroll:true});}
function reveal(confidence=null){if(!state?.pending)return;const entry=state.pending;entry.confidence=confidence;state.pending=null;$('reflection').hidden=true;showFeedback(entry);$('nextBtn').hidden=false;$('nextBtn').textContent=state.mode==='learn'?'Continuar draft →':state.index+1>=state.queue.length?'Ver resultado →':'Próxima decisão →';$('feedback').scrollIntoView({behavior:'instant',block:'start'});$('nextBtn').focus({preventScroll:true});}
function verdict(e){return e.expired?'Tempo esgotado':e.quality>=80?'Boa decisão':e.quality>=55?'Há uma opção mais útil':'Prioridade a revisar';}
function showFeedback(e){$('turn').textContent='Confira sua escolha';$('turnHelp').textContent='Relógio parado.';$('feedback').hidden=false;$('feedback').innerHTML=`<h3 class="${e.quality>=80?'good':'warn'}">${esc(verdict(e))} · ${e.elapsed.toFixed(1)}s</h3><p class="muted">${e.expired?'Sem escolha no prazo.':'Você escolheu '+esc(e.card)+'.'}</p><p><b>${e.card===e.best?'Sua escolha é a referência.':'Referência: '+esc(e.best)+'.'}</b> ${esc(e.reason)}</p>${e.caution?`<p class="warn">${esc(e.caution)}</p>`:''}<details><summary>Comparar as opções</summary>${comparisonHTML(e)}</details><details><summary>Entender a avaliação</summary>${e.chosenReason&&e.card!==e.best?`<p>Sua opção: ${esc(e.chosenReason)}</p>`:''}<p class="muted">${e.assisted?'Sugestão utilizada. ':''}A avaliação é didática. Outras opções também podem funcionar.</p></details>`;}
function next(){if(!state||state.finished||state.pending||state.active)return;$('nextBtn').hidden=true;$('feedback').hidden=true;if(state.mode==='learn'){window.scrollTo({top:0,behavior:'instant'});nextTurn();}else{state.index++;if(state.index>=state.queue.length)finish();else loadDrill();}}
function cardKind(c){return c.roles.includes('wincon')?'attack':c.roles.some(r=>['smallSpell','bigSpell'].includes(r))||c.name==='Tornado'?'spell':'defense';}
function renderDeck(id,deck){$(id).innerHTML=Array.from({length:8},(_,i)=>deck[i]?`<div class="slot" title="${esc(deck[i].name)} · ${deck[i].e} elixir" aria-label="${esc(deck[i].name)}, ${deck[i].e} elixir">${cardArtwork(deck[i],'deck-art')}<span class="deck-cost">${deck[i].e}</span><b class="slot-label">${esc(deck[i].name)}</b></div>`:`<div class="slot empty" aria-label="Posição ${i+1}, ainda não escolhida">${i+1}</div>`).join('');}
function render(){
 applyBoardLayout();
 const quick=state.mode==='flash'||state.mode==='retry';
 $('poolFilters').hidden=quick;
 $('deckSummary').textContent=`${state.player.length}/8 escolhidas`;
 document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.filter===state.filter)));
 renderDeck('playerDeck',state.player);renderDeck('botDeck',state.bot);$('playerCount').textContent=`${state.player.length}/8`;$('botCount').textContent=`${state.bot.length}/8`;$('elixir').textContent=state.player.length?`${average(state.player).toFixed(1)} elixir médio`:'';$('lastBot').textContent=state.lastBot?`Última: ${state.lastBot}`:'';
 $('coverage').innerHTML=core.map(([,label,test])=>`<span class="chip ${state.player.some(test)?'ok':''}">${state.player.some(test)?'✓':'○'} ${label}</span>`).join('');
 $('scenario').hidden=!quick;if(quick)$('scenario').textContent=state.current.prompt;
 $('sessionTitle').textContent=state.finished?'Treino concluído':quick?`Decisão ${state.index+1} de ${state.queue.length}`:state.mode==='learn'?'Aprendizado':'Draft estratégico';
 $('turn').textContent=state.finished?'Revisão':state.active?'Sua vez de escolher':quick||state.mode==='learn'&& !$('nextBtn').hidden?'Leia o feedback':'Turno do adversário';
 const double=state.sequence[state.turn+1]==='player';
 $('turnHelp').textContent=state.finished?'Use a revisão para orientar o próximo treino.':state.active?(quick?'Escolha uma carta. Atalhos 1–4 quando houver quatro opções.':`Escolha ${state.player.length+1}/8 · ${double?'Você também faz a próxima escolha.':'Depois, o rival escolhe.'}`):'Prepare uma primeira opção e uma alternativa.';
 $('poolTitle').textContent=quick?'Qual carta você escolhe?':`Pool compartilhado · ${state.pool.length} disponíveis`;
 $('poolHelp').textContent=quick?'Leia os decks. Escolha por toque ou pelas teclas 1–4 quando houver 4 opções.':state.mode==='learn'?'Dicas opcionais. Escolha, explique seu motivo e confira.':`${state.filter==='all'?'Todas as funções.':'Filtro ativo: '+({attack:'ataque',defense:'defesa',spell:'feitiços'}[state.filter])+'.'} Tempo esgotado = carta aleatória. Posições fixas dentro do filtro.`;
 $('hintBtn').textContent=state.hints?'Ocultar sugestões':'Mostrar sugestões';$('hintBtn').disabled=!state.active;
 const suggested=state.hints&&state.active?rank(state.player,state.bot,state.pool).slice(0,3).map(x=>x.c.name):[];
 if(suggested.length)state.assisted=true;
 $('pool').innerHTML=state.all.map((c,i)=>{const own=state.player.includes(c),rival=state.bot.includes(c),taken=!state.pool.includes(c),disabled=!state.active||taken||state.finished;const primary=['wincon','smallSpell','bigSpell','building','tankKiller','antiAir','splash','miniTank'].find(r=>c.roles.includes(r))||c.roles[0];return `<button class="card ${taken?'claimed':''} ${suggested.includes(c.name)?'suggested':''}" data-kind="${cardKind(c)}" ${!quick&&state.filter!=='all'&&state.filter!==cardKind(c)?'hidden':''} aria-pressed="${state.selection===c.name}" data-card="${esc(c.name)}" ${disabled?'disabled':''} aria-label="${esc(c.name)}, ${c.e} elixir${taken?own?', escolhida por você':', escolhida pelo adversário':''}">${cardArtwork(c)}<span class="cost">◆ ${c.e}</span>${quick&&state.all.length===4?`<span class="key-hint">${i+1}</span>`:''}<strong>${esc(c.name)}</strong><span class="role">${taken?own?'Sua carta':rival?'Carta rival':'Indisponível':roleNames[primary]||'suporte'}</span>${suggested.includes(c.name)?'<span class="hint">Sugestão</span>':''}</button>`;}).join('');
}
function finish(){
 if(state.finished)return;state.finished=true;state.active=false;clearTimers();stopClock();$('nextBtn').hidden=true;$('feedback').hidden=true;render();
 const log=state.log,manual=log.filter(e=>!e.expired),timed=log.filter(e=>e.limit>0),quality=Math.round(mean(log.map(e=>e.quality))),onTime=timed.length?Math.round(100*timed.filter(e=>!e.expired).length/timed.length):100;
 const seconds=mean(manual.map(e=>e.elapsed)),weak=log.filter(e=>e.expired||e.quality<80||e.confidence==='unsure');state.mistakes=weak.map(e=>e.snapshot);
 $('report').hidden=false;$('metrics').innerHTML=`<div class="metric"><b>${quality}/100</b><span>qualidade estimada${log.some(e=>e.assisted)?' · com ajuda':''}</span></div><div class="metric"><b>${timed.length?onTime+'%':'Sem limite'}</b><span>${timed.length?'escolhas dentro do prazo':'modo aprendizado'}</span></div><div class="metric"><b>${manual.length?seconds.toFixed(1)+'s':'—'}</b><span>tempo médio das escolhas manuais</span></div>`;
 const gaps=core.filter(([, ,test])=>!state.player.some(test)).map(([,label])=>label.toLowerCase());
 let takeaway=log.some(e=>e.expired)?'Seu próximo foco: chegar aos 7 segundos com duas opções e confirmar antes do limite.':weak.length?`Seu próximo foco: ${weak[0].topic.toLowerCase()}. ${weak[0].reason}`:'Boas decisões nesta sessão. Repita em novos contextos antes de reduzir o tempo.';
 if(['learn','draft'].includes(state.mode)&&gaps.length)takeaway+=` No deck final, faltou: ${gaps.join(', ')}.`;
 $('takeaway').textContent=takeaway;$('retryBtn').disabled=!weak.length;$('retryBtn').textContent=weak.length?`Repetir ${weak.length} decisões a revisar`:'Nenhuma decisão pendente';
 const overconfident=log.filter(e=>e.confidence==='sure'&&e.quality<80).length;
 const newCount=log.filter(e=>!e.isReview).length;
 $('retentionNote').textContent=`${newCount} situações novas · ${log.length-newCount} repetidas. ${overconfident?`${overconfident} escolhas pareciam certas, mas merecem revisão: compare o motivo, não só a carta. `:''}Repetir agora não comprova retenção. Volte às revisões em outro dia. Se perdeu atenção, encerre aqui e retome depois.`;
 $('reviews').innerHTML=log.map((e,i)=>`<article class="review"><b>${i+1}. ${esc(e.card)} — ${esc(verdict(e))}</b><p>${e.elapsed.toFixed(1)}s · ${e.expired?'Sem decisão no prazo':e.quality+'/100'}${e.assisted?' · com sugestão':''}</p><p>Referência: <b>${esc(e.best)}</b>. ${esc(e.reason)}</p>${e.caution?`<p>${esc(e.caution)}</p>`:''}<details><summary>Comparar cartas desta decisão</summary>${comparisonHTML(e)}</details></article>`).join('');
 renderDebrief();
 history.push({date:new Date().toISOString(),mode:state.mode,limit:state.limit,quality,onTime,seconds,assisted:log.some(e=>e.assisted),count:log.length});history=history.slice(-30);save();log.forEach(e=>scheduleDecision(e));saveLearning();$('report').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderProgress(){
 const labels={learn:'Aprendizado',draft:'Draft',flash:'Decisão rápida',retry:'Repetição'};
 $('progress').innerHTML=history.length?history.slice(-5).reverse().map(h=>`<div class="history-row"><span>${esc(new Date(h.date).toLocaleDateString('pt-BR'))} · ${labels[h.mode]} ${h.limit?esc(h.limit)+'s':''}${h.assisted?' · com ajuda':''}</span><span>${h.quality}/100 · ${h.limit?h.onTime+'% no prazo':'sem limite'}</span></div>`).join(''):'<p class="muted">Sua primeira sessão começa aqui. Qualidade e tempo serão acompanhados separadamente.</p>';
 const last=history.filter(h=>h.mode==='draft'&&h.limit===10&&!h.assisted).slice(-3);
 $('plan').textContent=last.length===3&&last.every(h=>h.quality>=80&&h.onTime>=90)?'Você manteve qualidade e prazo em 3 drafts de 10s. Experimente 7s; volte a 10s se a qualidade cair.':'Plano: entenda sem tempo, pratique decisões rápidas e aplique no draft de 10s. Busque 80/100 de qualidade e 90% no prazo em 3 drafts antes de acelerar.';
 $('storageNote').textContent=storageOK?'O progresso fica apenas neste navegador.':'O navegador não permitiu salvar o progresso. Você ainda pode treinar nesta sessão.';
 renderLearning();renderFocusSummary();
}
function goHome(){clearTimers();state=null;document.body.classList.remove('training-active','board-fit','quick-fit');$('training').hidden=true;$('home').hidden=false;renderProgress();window.scrollTo({top:0,behavior:'instant'});}
document.querySelectorAll('[data-mode]').forEach(el=>el.addEventListener('click',()=>selectMode(el.dataset.mode)));
document.querySelectorAll('[data-filter]').forEach(el=>el.addEventListener('click',()=>{if(state){state.filter=el.dataset.filter;render();}}));
 $('deckToggle').addEventListener('click',()=>{const hidden=!$('deckArea').hidden;$('deckArea').hidden=hidden;$('deckToggle').setAttribute('aria-expanded',String(!hidden));$('deckToggle').textContent=hidden?'Ver meu deck':'Recolher meu deck';});
$('sureBtn').addEventListener('click',()=>reveal('sure'));$('unsureBtn').addEventListener('click',()=>reveal('unsure'));$('skipReflectionBtn').addEventListener('click',()=>reveal());
$('dailyBtn').addEventListener('click',()=>{$('duration').value='10';launch('flash',dailyQueue());});
$('dueBtn').addEventListener('click',()=>{const due=dueReviews().slice(0,8);if(due.length)launch('retry',due.map(r=>r.snapshot));});
$('libraryPanel').addEventListener('toggle',()=>{if($('libraryPanel').open)renderLibrary();});
$('cardSearch').addEventListener('input',renderLibrary);
$('openingBtn').addEventListener('click',()=>launch('flash',focusedPractice('opening')));
$('closingBtn').addEventListener('click',()=>launch('flash',focusedPractice('closing')));
$('exportBtn').addEventListener('click',exportProgress);$('importFile').addEventListener('change',importProgress);
$('startBtn').addEventListener('click',()=>launch());$('exitBtn').addEventListener('click',()=>{if(state?.finished||confirm('Encerrar esta sessão? O treino incompleto não entra no histórico.'))goHome();});$('homeBtn').addEventListener('click',goHome);$('nextBtn').addEventListener('click',next);
$('retryBtn').addEventListener('click',()=>start('retry',state.mistakes));$('hintBtn').addEventListener('click',()=>{if(state?.active){state.hints=!state.hints;render();}});
$('pool').addEventListener('click',e=>{const button=e.target.closest('[data-card]');if(button&&!button.disabled)chooseCard(button.dataset.card);});
$('confirmPick').addEventListener('click',()=>{if(state?.selection)pick(state.selection);});$('viewBtn').addEventListener('click',switchBoard);
function resizeBoard(){if(state&&!state.pending&&$('feedback').hidden)render();}
window.addEventListener?.('resize',resizeBoard);window.visualViewport?.addEventListener('resize',resizeBoard);
document.addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.altKey||e.metaKey||['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName))return;if(state?.active&&['flash','retry'].includes(state.mode)&&state.all.length===4&&/^[1-4]$/.test(e.key)){e.preventDefault();pick(state.all[Number(e.key)-1].name);}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&state?.active&&state.limit)tick();});
document.addEventListener('error',event=>{if(event.target?.tagName==='IMG')event.target.parentElement.classList.add('image-missing');},true);
initializeLearning();selectMode('draft');renderProgress();
