const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const output=path.join(__dirname,'public'),html=fs.readFileSync(path.join(output,'index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'No duplicate DOM ids');
for(const match of html.matchAll(/<(?:script|link)\b[^>]*\b(?:src|href)="([^"]+)"/g)){
 const url=match[1];assert.ok(!url.includes('://'),'Runtime assets must be local');assert.ok(fs.existsSync(path.join(output,url)),`Missing deployed asset ${url}`);
}
for(const file of ['coach.js','learning.js','cards.js','coach.css','mobile.css'])assert.equal(fs.readFileSync(path.join(output,file),'utf8'),fs.readFileSync(path.join(__dirname,file),'utf8'),`${file} must be up to date`);
assert.equal(html,fs.readFileSync(path.join(__dirname,'mega_draft_coach.html'),'utf8'));
const config=JSON.parse(fs.readFileSync(path.join(__dirname,'vercel.json'),'utf8'));assert.equal(config.outputDirectory,'public');assert.equal(config.buildCommand,'node build-site.cjs');
const manifest=JSON.parse(fs.readFileSync(path.join(output,'manifest.webmanifest'),'utf8'));assert.equal(manifest.start_url,'./');for(const icon of manifest.icons)assert.ok(fs.existsSync(path.join(output,icon.src)));
assert.ok(!fs.existsSync(path.join(output,'mega_draft_coach.original.html')),'Original backup is not a deployed asset');
console.log('PASS: deployment index, unique ids, all local assets, current build, manifest and Vercel configuration.');
