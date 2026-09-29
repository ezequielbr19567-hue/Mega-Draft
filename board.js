'use strict';
let boardView='fit';
function boardFits(width,height){return width>=300&&height>=520||width>=600&&height>=340;}
function compactBoard(){
 const width=window.visualViewport?.width||window.innerWidth||1200,height=window.visualViewport?.height||window.innerHeight||800;
 return !!(state&&!state.finished&&!state.pending&&$('feedback').hidden&&state.all.length>4&&boardView==='fit'&&width<=900&&boardFits(width,height));
}
function applyBoardLayout(){
 if(!state)return;
 const compact=compactBoard();document.body.classList.toggle('board-fit',compact);
 if(compact)state.filter='all';
 const width=window.visualViewport?.width||window.innerWidth||1200,height=window.visualViewport?.height||window.innerHeight||800;
 $('viewBtn').hidden=state.all.length<=4||state.finished||width>900||!boardFits(width,height);
 $('viewBtn').textContent=compact?'Ampliar cartas':'Visão geral';
 $('viewBtn').setAttribute('aria-pressed',String(compact));
 $('selectionBar').hidden=!compact;
 const selected=state.pool.find(c=>c.name===state.selection);
 $('selectionName').textContent=selected?`${selected.name} · ${selected.e} elixir`:state.active?'Toque na carta para ver o nome':'Observe as escolhas do rival';
 $('confirmPick').disabled=!state.active||!selected;
}
function chooseCard(name){
 if(!state?.active)return;
 if(compactBoard()){state.selection=name;render();}else pick(name);
}
function switchBoard(){boardView=boardView==='fit'?'detail':'fit';if(state){state.filter='all';render();window.scrollTo({top:0,behavior:'instant'});}}
