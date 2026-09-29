const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
let now=0,nextId=0;const intervals=new Map(),timeouts=new Map(),elements=new Map(),storage=new Map();
function element(id){if(!elements.has(id))elements.set(id,{id,value:'10',hidden:false,textContent:'',innerHTML:'',style:{},dataset:{},classList:{names:new Set(),toggle(n,v){if(v===undefined)v=!this.names.has(n);if(v)this.names.add(n);else this.names.delete(n);},add(...ns){ns.forEach(n=>this.names.add(n));},remove(...ns){ns.forEach(n=>this.names.delete(n));}},setAttribute(){},addEventListener(){},focus(){},scrollIntoView(){}});return elements.get(id);}
const html=fs.readFileSync('mega_draft_coach.html','utf8');
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
const context=vm.createContext({console,performance:{now:()=>now},document:{getElementById:id=>{assert.ok(ids.has(id),'DOM id '+id);return element(id);},querySelectorAll:()=>[],addEventListener(){},activeElement:null},window:{scrollTo(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},confirm:()=>true,setTimeout:f=>{const id=++nextId;timeouts.set(id,f);return id;},clearTimeout:id=>timeouts.delete(id),setInterval:f=>{const id=++nextId;intervals.set(id,f);return id;},clearInterval:id=>intervals.delete(id)});
context.document.body=element('body');
vm.runInContext(['cards.js','card-images.js','learning.js','practice.js','board.js','coach.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n'),context);
const run=s=>vm.runInContext(s,context);
function flushBot(){const item=timeouts.entries().next().value;if(item){timeouts.delete(item[0]);item[1]();}}
assert.equal(run('new Set(CATALOG.map(c=>c.name)).size'),run('CATALOG.length'));
assert.equal(run('CATALOG.some(c=>c.name==="Carrasco")'),false);
assert.equal(run('air(cardByName("Flechas"))'),false);
assert.equal(run('air(cardByName("Torre Inferno"))'),true);
for(let i=0;i<100;i++){assert.equal(run('makePool().length'),36);assert.equal(run('new Set(makePool().map(c=>c.name)).size'),36);}
for(let n=0;n<50;n++){
 run('start("draft")');assert.equal(run('state.sequence.filter(x=>x==="player").length'),8);
 let safety=0;
 while(!run('state.finished')){assert.ok(++safety<30);if(run('state.active')){now+=800;run('pick(rank(state.player,state.bot,state.pool)[0].c.name)');}else flushBot();}
 assert.equal(run('state.player.length'),8);assert.equal(run('state.bot.length'),8);assert.equal(run('state.pool.length'),20);assert.equal(run('new Set([...state.player,...state.bot].map(c=>c.name)).size'),16);assert.equal(run('state.log.length'),8);
 assert.equal(intervals.size,0);assert.equal(timeouts.size,0);
 assert.ok(run('state.player.filter(c=>c.roles.includes("champion")).length')<=1);
 assert.ok(run('state.bot.filter(c=>c.roles.includes("champion")).length')<=1);
}
console.log('PASS: 50 full drafts, snake order, pool/deck uniqueness, timer cleanup.');
run('start("draft")');while(!run('state.active'))flushBot();now+=10001;run('tick()');assert.equal(run('state.log[0].expired'),true);assert.equal(run('state.log[0].quality'),0);assert.equal(run('state.player.length'),1);
// A click after the deadline must not evade the timer.
run('start("draft")');while(!run('state.active'))flushBot();now+=11000;run('pick(state.pool[0].name)');assert.equal(run('state.log[0].expired'),true);
run('goHome()');assert.equal(intervals.size,0);assert.equal(timeouts.size,0);
console.log('PASS: expiration, late clicks, automatic pick, cancel cleanup.');
run('start("flash")');for(let i=0;i<8;i++){now+=2300;run('pick(state.current.options[state.current.values.indexOf(Math.max(...state.current.values))])');assert.equal(run('state.active'),false);assert.equal(intervals.size,0);assert.equal(element('feedback').hidden,true);run('next()');assert.equal(run('state.index'),i,'Cannot skip reflection by calling next');run('reveal("sure");next()');}assert.equal(run('state.finished'),true);assert.equal(run('state.log.every(e=>e.quality===100)'),true);
// Wrong or expired answers are replayable, retaining the original context.
run('start("flash")');now+=11000;run('tick()');assert.equal(run('state.log[0].card'),'Sem escolha');run('reveal();next()');for(let i=1;i<8;i++){now+=500;run('pick(state.current.options[state.current.values.indexOf(Math.min(...state.current.values))])');run('reveal("unsure");next()');}
assert.equal(run('state.mistakes.length'),8);run('start("retry",state.mistakes)');assert.equal(run('state.queue.length'),8);assert.equal(run('state.player.some(c=>!c)'),false);run('pick(state.pool[0].name)');assert.equal(run('state.log.length'),1);
console.log('PASS: all 8 scenarios, feedback pause, timeout and targeted replay.');
run('start("learn")');while(!run('state.active'))flushBot();assert.equal(intervals.size,0);now+=60000;run('state.hints=true;render();pick(state.pool[0].name)');assert.equal(run('state.log[0].expired'),false);assert.equal(run('state.log[0].assisted'),true);assert.equal(run('state.active'),false);run('reveal();next()');
// Non-curated draft snapshots can also be replayed through the generic evaluator.
run('start("retry",[state.log[0].snapshot])');now+=1000;run('pick(state.pool[0].name);reveal();next()');assert.equal(run('state.finished'),true);
assert.equal(run('rank(cards(["Cavaleiro","Mosqueteira","Tesla","Tronco","Bola de Fogo","Esqueletos","Espírito de Gelo"]),[],cards(["Corredor","Valquíria","Canhão","Mago Elétrico"]))[0].c.name'),'Corredor');
assert.equal(run('rank(cards(["Cavaleiro","Tronco","Corredor"]),cards(["Balão"]),cards(["Mosqueteira","Mini P.E.K.K.A","Bombardeiro","Golem"]))[0].c.name'),'Mosqueteira');
assert.equal(run('history.length'),30);assert.equal(JSON.parse(storage.get('mega-draft-coach-v2')).length,30);
console.log('PASS: untimed learning, assisted flags, draft replay, critical deck gaps, persisted history cap.');
run('goHome()');context.localStorage.setItem=()=>{throw Error('denied');};run('save();renderProgress()');assert.equal(run('storageOK'),false);
console.log('PASS: blocked storage degrades gracefully.');
assert.equal(run('DRILLS.length'),16);
assert.equal(run('DRILLS.every(q=>cleanSnapshot(q)!==null)'),true,'All scenarios must have valid, disjoint shared-pool cards');
for(let i=0;i<16;i++){run(`start('flash',[DRILLS[${i}]]);pick(state.current.options[state.current.values.indexOf(100)]);reveal('sure');next()`);assert.equal(run('state.finished'),true);assert.equal(run('state.log[0].quality'),100);}
run('memory={reviews:[],attempts:[]}');
const base=Date.now();context.testNow=base;
run('scheduleDecision({snapshot:DRILLS[0],quality:100,expired:false,curated:true,confidence:"sure",isReview:false},testNow)');
assert.equal(run('memory.reviews[0].due'),base+86400000);assert.equal(run('dueReviews(testNow).length'),0);
run('scheduleDecision({snapshot:DRILLS[0],quality:100,expired:false,curated:true,confidence:"sure",isReview:true},testNow+1000)');
assert.equal(run('memory.reviews[0].step'),0,'Same-day success cannot advance schedule');
assert.equal(run('dueReviews(testNow+DAY).length'),1);
run('scheduleDecision({snapshot:DRILLS[0],quality:100,expired:false,curated:true,confidence:"sure",isReview:true},testNow+DAY)');
assert.equal(run('memory.reviews[0].step'),1);assert.equal(run('memory.reviews[0].due'),base+4*86400000);
run('scheduleDecision({snapshot:DRILLS[0],quality:20,expired:false,curated:true,confidence:"sure",isReview:true},testNow+4*DAY)');
assert.equal(run('memory.reviews[0].step'),0);assert.equal(run('memory.reviews[0].due'),base+5*86400000);
assert.equal(run('dailyQueue().length'),8);assert.equal(run('new Set(dailyQueue().map(snapshotId)).size'),8);
console.log('PASS: 16 valid scenarios, daily selection, review eligibility, spaced promotion and error reset.');
context.localStorage.setItem=(k,v)=>storage.set(k,v);
run('saveLearning();memory={reviews:[],attempts:[]};initializeLearning()');assert.equal(run('memory.reviews.length'),1);
run('globalThis.backup=JSON.stringify({version:1,history,memory})');assert.equal(run('parseBackup(backup).memory.reviews.length'),1);
assert.throws(()=>run('parseBackup("{}")'));
assert.throws(()=>run('parseBackup(JSON.stringify({version:1,history:[],memory:{reviews:[{snapshot:{}}],attempts:[]}}))'));
assert.equal(run('cleanSnapshot({...DRILLS[0],options:["unknown"]})'),null);
console.log('PASS: persisted reviews, backup round trip, invalid backups rejected. All checks passed.');
async function testImagePreparation(){
 run('goHome()');const pending=[];context.Image=class{set src(value){this.url=value;pending.push(this);}};
 const launching=run('launch("draft")');assert.equal(run('state'),null,'Draft cannot start while images load');assert.equal(pending.length,107);
 pending.forEach(img=>img.onload());await launching;
 assert.equal(run('state.mode'),'draft');assert.equal(run('preparing'),false);assert.equal(element('imageWarning').hidden,true);
 assert.ok(element('pool').innerHTML.includes('class="pool-art"'));run('renderDeck("botDeck",cards(["Mosqueteira","Balão"]))');assert.equal((element('botDeck').innerHTML.match(/class="deck-art"/g)||[]).length,2);
 run('goHome();artworkLoad=null');pending.length=0;
 const failing=run('launch("flash")');pending.forEach(img=>img.onerror());await failing;
 assert.equal(element('imageWarning').hidden,false);assert.equal(run('state.active'),true,'Names remain usable when assets fail');run('goHome()');
 console.log('PASS: preloading blocks the clock, all 107 assets requested, artwork rendered, image failure keeps text fallback.');
 const generatedIds=new Set();for(let i=0;i<100;i++){const q=run('generateSituation()');context.sampleSituation=q;assert.ok(run('cleanSnapshot(sampleSituation)'));assert.ok(q.me.length>=2&&q.me.length<=7);assert.equal(q.options.length,4);assert.equal(q.values[q.options.indexOf(q.reference)],100);generatedIds.add(run('snapshotId(sampleSituation)'));}
 assert.ok(generatedIds.size>=95,'New contexts should not be repetitions of the static bank');
 assert.equal(run('variedPractice().filter(q=>q.source==="generated").length'),4);
 assert.equal(run('new Set(variedPractice().filter(q=>!q.source).map(q=>q.topic)).size'),4);
 assert.equal(run('cleanSnapshot({...DRILLS[0],reference:"unknown"})'),null);
 context.window.innerWidth=390;context.window.innerHeight=740;run('start("draft")');while(!run('state.active'))flushBot();
 assert.equal(run('compactBoard()'),true);const deadline=run('state.deadline');run('chooseCard(state.pool[0].name)');assert.equal(run('state.player.length'),0);assert.equal(run('state.deadline'),deadline,'Preview must not restart clock');assert.equal(element('confirmPick').disabled,false);
 run('pick(state.selection)');assert.equal(run('state.player.length'),1);assert.equal(run('state.selection'),null);
 run('switchBoard()');assert.equal(run('compactBoard()'),false);run('switchBoard()');assert.equal(run('compactBoard()'),true);
 context.window.innerHeight=400;run('applyBoardLayout()');assert.equal(run('compactBoard()'),false,'Tiny viewport must fall back to readable detail layout');
 context.window.innerHeight=740;run('start("flash")');assert.equal(element('body').classList.names.has('quick-fit'),true);assert.equal(element('selectionBar').hidden,true);run('pick(state.pool[0].name)');assert.equal(element('body').classList.names.has('board-fit'),false,'Reflection must leave fixed board');run('goHome()');assert.equal(element('body').classList.names.has('quick-fit'),false);console.log('PASS: 100 generated contexts, four distinct guided topics, 6x6 preview/confirm without resetting timer, responsive fallback.');
}
for(const stage of ['opening','closing']){
 context.testStage=stage;
 for(let n=0;n<5;n++){
  const batch=run('focusedPractice(testStage)');assert.equal(batch.length,8);
  assert.equal(new Set(batch.map(q=>JSON.stringify(q))).size,8);
  for(const q of batch){assert.ok(stage==='opening'?q.me.length<=2&&q.me.length>=1:q.me.length>=6&&q.me.length<=7);context.focusSample=q;assert.ok(run('cleanSnapshot(focusSample)'));assert.equal(run('cleanSnapshot(focusSample).analyses.length'),4);}
 }
}
run('start("flash",focusedPractice("closing"));pick(state.pool[0].name);reveal("sure")');
assert.ok(element('feedback').innerHTML.includes('Comparar as opções'));
assert.equal(run('comparisonRows(state.log[0]).some(r=>r.c.name===state.log[0].card)'),true);
assert.equal(run('comparisonRows(state.log[0]).find(r=>r.c.name===state.log[0].card).reason'),run('state.current.analyses[state.current.options.indexOf(state.log[0].card)].reason'));
assert.equal(run('deckAudit(cards(["Cavaleiro"]),cards(["Balão"])).threats[0].c.name'),'Balão');
assert.equal(run('deckAudit(cards(["Cavaleiro"]),[]).gaps.length'),3);
assert.equal(run('cleanSnapshot({...DRILLS[0],analyses:[{}]})'),null);
element('cardSearch').value='defesa aerea';run('renderLibrary()');assert.ok(element('cardLibrary').innerHTML.includes('Mosqueteira'));
element('cardSearch').value='<script>';run('renderLibrary()');assert.ok(element('cardLibrary').innerHTML.includes('Nenhuma carta'));
run('goHome()');
console.log('PASS: 80 focused contexts, original-pool explanations, comparison includes selection, deck audit, safe accent-insensitive library search.');
const seenPoolCards=new Set();let preceding=null,overlap=0;
const groupRules=run('DRAFT_GROUPS');
for(let n=0;n<2000;n++){
 const pool=run('makePool()');assert.equal(pool.length,36);assert.equal(new Set(pool.map(c=>c.key)).size,36);
 let offset=0;for(const group of groupRules){const section=pool.slice(offset,offset+group.count);assert.ok(section.every(c=>group.cards.includes(c.key)),group.key+' membership/order');offset+=group.count;}
 const names=new Set(pool.map(c=>c.name));if(preceding)overlap+=[...names].filter(name=>preceding.has(name)).length;preceding=names;
 pool.forEach(c=>seenPoolCards.add(c.key));
 assert.equal(pool.filter(c=>c.roles.includes('champion')).length,3);
 assert.ok(pool.every(c=>!['mirror','clone'].includes(c.key)));
}
assert.equal(seenPoolCards.size,107,'Every supported card must be reachable');
run('start("draft")');while(!run('state.active'))flushBot();
run('pick(state.pool.find(c=>c.roles.includes("champion")).name)');while(!run('state.active'))flushBot();
const beforeIllegal=run('state.log.length');run('pick(state.pool.find(c=>c.roles.includes("champion")).name)');assert.equal(run('state.log.length'),beforeIllegal,'Second champion blocked');
now+=11000;run('tick()');assert.equal(run('state.player.filter(c=>c.roles.includes("champion")).length'),1,'Timeout must not bypass champion restriction');run('goHome()');
console.log(`PASS: 2000 category pools, all 107 reachable, no duplicates/excluded cards, champion restrictions incl. timeout. Mean overlap: ${(overlap/1999).toFixed(1)}/36.`);
testImagePreparation().catch(e=>{console.error(e);process.exitCode=1;});
