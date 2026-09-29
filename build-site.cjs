// No dependencies. Only these public app assets are copied to deployment output.
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname,output=path.join(root,'public');
fs.mkdirSync(output,{recursive:true});
const assets=['coach.css','mobile.css','cards.js','learning.js','coach.js','icon.svg','manifest.webmanifest'];
for(const file of assets)fs.copyFileSync(path.join(root,file),path.join(output,file));
fs.copyFileSync(path.join(root,'mega_draft_coach.html'),path.join(output,'index.html'));
console.log('Site pronto em public/index.html. '+assets.length+' assets locais, sem dependências.');
