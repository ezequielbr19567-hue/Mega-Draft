'use strict';
// Original card artwork distributed by RoyaleAPI/cr-api-assets, stored locally.
const CARD_IMAGES={
 'Tronco':'the-log','Flechas':'arrows','Zap':'zap','Bola de Fogo':'fireball','Veneno':'poison','Relâmpago':'lightning',
 'Valquíria':'valkyrie','Cavaleiro':'knight','Mini P.E.K.K.A':'mini-pekka','P.E.K.K.A':'pekka','Caçador':'hunter',
 'Mosqueteira':'musketeer','Arqueiras':'archers','Mago Elétrico':'electro-wizard','Bebê Dragão':'baby-dragon',
 'Executor':'executioner','Carrasco':'executioner','Bombardeiro':'bomber','Príncipe':'prince','Príncipe das Trevas':'dark-prince',
 'Fantasma Real':'royal-ghost','Mega Servo':'mega-minion','Servos':'minions','Horda de Servos':'minion-horde',
 'Gangue de Goblins':'goblin-gang','Guardas':'guards','Exército de Esqueletos':'skeleton-army','Espírito de Gelo':'ice-spirit',
 'Esqueletos':'skeletons','Torre Bomba':'bomb-tower','Tesla':'tesla','Torre Inferno':'inferno-tower','Canhão':'cannon',
 'Jaula de Goblin':'goblin-cage','Corredor':'hog-rider','Balão':'balloon','Cemitério':'graveyard','Gigante Real':'royal-giant',
 'Gigante':'giant','Golem':'golem','Mineiro':'miner','Barril de Goblins':'goblin-barrel','Ariete de Batalha':'battle-ram',
 'Porcos Reais':'royal-hogs','Lava Hound':'lava-hound','Morteiro':'mortar','X-Besta':'x-bow','Pescador':'fisherman',
 'Tornado':'tornado','Mago':'wizard','Bruxa':'witch','Dragão Infernal':'inferno-dragon','Morcegos':'bats',
 'Máquina Voadora':'flying-machine','Arqueiro Mágico':'magic-archer','Lançador':'bowler','Goblins':'goblins',
 'Espírito Elétrico':'electro-spirit','Barril de Bárbaro':'barbarian-barrel','Foguete':'rocket'
};
function cardImagePath(name){return `assets/cards/${CARD_IMAGES[name]}.png`;}
function cardArtwork(c,kind='pool-art'){return `<img class="${kind}" src="${cardImagePath(c.name)}" alt="" width="150" height="180" decoding="async" draggable="false">`;}
let artworkLoad=null;
function preloadArtwork(){
 if(typeof Image==='undefined')return Promise.resolve(0);
 if(artworkLoad)return artworkLoad;
 artworkLoad=new Promise(resolve=>{
  const slugs=[...new Set(Object.values(CARD_IMAGES))];let remaining=slugs.length,failed=0,done=false;
  const finish=()=>{if(done)return;done=true;clearTimeout(timeout);resolve(failed+remaining);};
  const timeout=setTimeout(finish,8000);
  for(const slug of slugs){const img=new Image();img.onload=()=>{remaining--;if(!remaining)finish();};img.onerror=()=>{failed++;remaining--;if(!remaining)finish();};img.src=`assets/cards/${slug}.png`;}
 });
 return artworkLoad;
}
