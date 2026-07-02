import { useState, useRef } from "react";

// ─── DMC Color Database (~200 colors) ────────────────────────
const DMC = [
  // Whites & Creams
  { dmc:"B5200", name:"Bright White",                    hex:"#FFFFFF" },
  { dmc:"3865",  name:"Winter White",                    hex:"#F4F2EE" },
  { dmc:"3866",  name:"Ultra Very Light Mocha Brown",    hex:"#F0EAE0" },
  { dmc:"746",   name:"Off White",                       hex:"#FBF6E4" },
  { dmc:"Ecru",  name:"Ecru",                            hex:"#F0E0C0" },
  // Yellows & Golds
  { dmc:"3823",  name:"Ultra Pale Yellow",               hex:"#FFFCE4" },
  { dmc:"745",   name:"Light Pale Yellow",               hex:"#FDF0B4" },
  { dmc:"744",   name:"Pale Yellow",                     hex:"#FDE898" },
  { dmc:"743",   name:"Medium Yellow",                   hex:"#FDD070" },
  { dmc:"742",   name:"Light Tangerine",                 hex:"#FCC060" },
  { dmc:"741",   name:"Medium Tangerine",                hex:"#F89840" },
  { dmc:"740",   name:"Tangerine",                       hex:"#F87830" },
  { dmc:"3822",  name:"Light Straw",                     hex:"#F8DBA8" },
  { dmc:"3821",  name:"Straw",                           hex:"#F7CD84" },
  { dmc:"3820",  name:"Dark Straw",                      hex:"#E8A839" },
  { dmc:"3855",  name:"Light Autumn Gold",               hex:"#F5CC7E" },
  { dmc:"3854",  name:"Medium Autumn Gold",              hex:"#EFA748" },
  { dmc:"3853",  name:"Dark Autumn Gold",                hex:"#E07A18" },
  { dmc:"977",   name:"Light Golden Brown",              hex:"#D89840" },
  { dmc:"976",   name:"Medium Golden Brown",             hex:"#C07828" },
  { dmc:"3826",  name:"Golden Brown",                    hex:"#A06228" },
  { dmc:"725",   name:"Topaz",                           hex:"#F4A830" },
  { dmc:"726",   name:"Light Topaz",                     hex:"#F8C048" },
  { dmc:"727",   name:"Very Light Topaz",                hex:"#FDE090" },
  // Oranges
  { dmc:"972",   name:"Deep Canary",                     hex:"#F8A800" },
  { dmc:"970",   name:"Light Pumpkin",                   hex:"#F48A00" },
  { dmc:"947",   name:"Burnt Orange",                    hex:"#E06820" },
  { dmc:"946",   name:"Medium Burnt Orange",             hex:"#D85A10" },
  { dmc:"900",   name:"Dark Burnt Orange",               hex:"#C24A0A" },
  // Reds
  { dmc:"666",   name:"Bright Christmas Red",            hex:"#D82030" },
  { dmc:"321",   name:"Red",                             hex:"#B52828" },
  { dmc:"304",   name:"Medium Christmas Red",            hex:"#B01830" },
  { dmc:"498",   name:"Dark Red",                        hex:"#901830" },
  { dmc:"816",   name:"Garnet",                          hex:"#A01828" },
  { dmc:"815",   name:"Medium Garnet",                   hex:"#8A1020" },
  { dmc:"814",   name:"Dark Garnet",                     hex:"#780C18" },
  { dmc:"349",   name:"Dark Coral",                      hex:"#C83028" },
  { dmc:"350",   name:"Medium Coral",                    hex:"#D04840" },
  { dmc:"351",   name:"Coral",                           hex:"#E06050" },
  { dmc:"352",   name:"Light Coral",                     hex:"#F08070" },
  { dmc:"353",   name:"Peach",                           hex:"#F4A58E" },
  { dmc:"3801",  name:"Very Dark Melon",                 hex:"#D82040" },
  { dmc:"3705",  name:"Dark Melon",                      hex:"#F04060" },
  { dmc:"3706",  name:"Medium Melon",                    hex:"#F87080" },
  { dmc:"3708",  name:"Light Melon",                     hex:"#FCA0A8" },
  { dmc:"760",   name:"Salmon",                          hex:"#F4948C" },
  { dmc:"761",   name:"Light Salmon",                    hex:"#F8B8B0" },
  { dmc:"3712",  name:"Medium Salmon",                   hex:"#F07870" },
  { dmc:"3713",  name:"Very Light Salmon",               hex:"#FCCDC2" },
  { dmc:"758",   name:"Very Light Terra Cotta",          hex:"#E8C0B0" },
  { dmc:"3778",  name:"Light Terra Cotta",               hex:"#CA8E7C" },
  { dmc:"356",   name:"Medium Terra Cotta",              hex:"#BC7260" },
  { dmc:"355",   name:"Dark Terra Cotta",                hex:"#884238" },
  // Pinks & Mauve
  { dmc:"963",   name:"Ultra Very Light Dusty Rose",     hex:"#FEE0E4" },
  { dmc:"3716",  name:"Very Light Dusty Rose",           hex:"#FBCCD4" },
  { dmc:"3326",  name:"Light Rose",                      hex:"#F8A8B8" },
  { dmc:"899",   name:"Medium Rose",                     hex:"#F08098" },
  { dmc:"309",   name:"Dark Rose",                       hex:"#C04868" },
  { dmc:"3733",  name:"Dusty Rose",                      hex:"#E898A8" },
  { dmc:"3731",  name:"Very Dark Dusty Rose",            hex:"#C85878" },
  { dmc:"778",   name:"Very Light Antique Mauve",        hex:"#D6B3BB" },
  { dmc:"3727",  name:"Light Antique Mauve",             hex:"#CFA8B4" },
  { dmc:"316",   name:"Medium Antique Mauve",            hex:"#B87890" },
  { dmc:"315",   name:"Dark Antique Mauve",              hex:"#8C5068" },
  { dmc:"3608",  name:"Very Light Plum",                 hex:"#E8A8C0" },
  { dmc:"3607",  name:"Light Plum",                      hex:"#CC70A0" },
  { dmc:"718",   name:"Plum",                            hex:"#A04080" },
  // Lavenders & Purples
  { dmc:"3743",  name:"Very Light Antique Violet",       hex:"#D3C9D9" },
  { dmc:"3042",  name:"Light Antique Violet",            hex:"#B5A5BE" },
  { dmc:"3041",  name:"Medium Antique Violet",           hex:"#9B88AA" },
  { dmc:"211",   name:"Light Lavender",                  hex:"#D8C0E0" },
  { dmc:"210",   name:"Medium Lavender",                 hex:"#C8A0D8" },
  { dmc:"209",   name:"Dark Lavender",                   hex:"#A878C0" },
  { dmc:"208",   name:"Very Dark Lavender",              hex:"#906AB0" },
  { dmc:"3747",  name:"Very Light Blue Violet",          hex:"#CDD0E8" },
  { dmc:"341",   name:"Light Blue Violet",               hex:"#A0A8D0" },
  { dmc:"340",   name:"Medium Blue Violet",              hex:"#8890C0" },
  { dmc:"333",   name:"Very Dark Blue Violet",           hex:"#5058A0" },
  { dmc:"3834",  name:"Dark Grape",                      hex:"#7C3868" },
  { dmc:"3835",  name:"Medium Grape",                    hex:"#9C5888" },
  { dmc:"3836",  name:"Light Grape",                     hex:"#C090B0" },
  // Blues
  { dmc:"823",   name:"Dark Navy Blue",                  hex:"#2B3852" },
  { dmc:"336",   name:"Navy Blue",                       hex:"#2C4068" },
  { dmc:"312",   name:"Very Dark Baby Blue",             hex:"#4870A0" },
  { dmc:"322",   name:"Dark Baby Blue",                  hex:"#6090B8" },
  { dmc:"334",   name:"Medium Baby Blue",                hex:"#7AAAC8" },
  { dmc:"3325",  name:"Light Baby Blue",                 hex:"#A8C8DC" },
  { dmc:"828",   name:"Ultra Very Light Blue",           hex:"#C8E4F0" },
  { dmc:"827",   name:"Very Light Blue",                 hex:"#B0D0E8" },
  { dmc:"826",   name:"Medium Blue",                     hex:"#5890B8" },
  { dmc:"825",   name:"Dark Blue",                       hex:"#3870A0" },
  { dmc:"519",   name:"Sky Blue",                        hex:"#70B0CC" },
  { dmc:"518",   name:"Light Wedgwood",                  hex:"#5B97B5" },
  { dmc:"517",   name:"Dark Wedgwood",                   hex:"#4878A0" },
  { dmc:"3761",  name:"Light Sky Blue",                  hex:"#98CCD8" },
  { dmc:"747",   name:"Very Light Sky Blue",             hex:"#D4EEF4" },
  { dmc:"3750",  name:"Very Dark Antique Blue",          hex:"#3E4E5A" },
  { dmc:"930",   name:"Dark Antique Blue",               hex:"#4D5F6E" },
  { dmc:"931",   name:"Medium Antique Blue",             hex:"#6B7E8C" },
  { dmc:"932",   name:"Light Antique Blue",              hex:"#9BABB8" },
  { dmc:"3752",  name:"Very Light Antique Blue",         hex:"#C7D5E1" },
  // Blue-Greens & Teals
  { dmc:"3808",  name:"Ultra Very Dark Turquoise",       hex:"#2E6268" },
  { dmc:"3809",  name:"Very Dark Turquoise",             hex:"#3E7E85" },
  { dmc:"3810",  name:"Dark Turquoise",                  hex:"#5A9898" },
  { dmc:"3811",  name:"Very Light Turquoise",            hex:"#B0D8DC" },
  { dmc:"3768",  name:"Dark Slate Gray",                 hex:"#5B7275" },
  { dmc:"926",   name:"Medium Gray Green",               hex:"#6D9190" },
  { dmc:"927",   name:"Light Gray Green",                hex:"#92AEAA" },
  { dmc:"928",   name:"Very Light Gray Green",           hex:"#BACCC6" },
  { dmc:"924",   name:"Very Dark Gray Green",            hex:"#496762" },
  { dmc:"503",   name:"Medium Blue Green",               hex:"#87B2A4" },
  { dmc:"502",   name:"Blue Green",                      hex:"#6A9A8E" },
  { dmc:"501",   name:"Dark Blue Green",                 hex:"#3D6E5C" },
  { dmc:"500",   name:"Very Dark Blue Green",            hex:"#2C5545" },
  { dmc:"504",   name:"Very Light Blue Green",           hex:"#C3D8D0" },
  { dmc:"3812",  name:"Very Dark Sea Green",             hex:"#3A8880" },
  { dmc:"3849",  name:"Light Teal Green",                hex:"#60B8A8" },
  { dmc:"3848",  name:"Medium Teal Green",               hex:"#50A090" },
  // Greens
  { dmc:"3348",  name:"Light Yellow Green",              hex:"#C9D9A0" },
  { dmc:"3347",  name:"Medium Yellow Green",             hex:"#729E62" },
  { dmc:"3346",  name:"Hunter Green",                    hex:"#4A7558" },
  { dmc:"3345",  name:"Dark Hunter Green",               hex:"#2A5840" },
  { dmc:"471",   name:"Very Light Avocado Green",        hex:"#A2B97A" },
  { dmc:"470",   name:"Light Avocado Green",             hex:"#8AAA60" },
  { dmc:"469",   name:"Avocado Green",                   hex:"#6A8848" },
  { dmc:"937",   name:"Medium Avocado Green",            hex:"#4E7038" },
  { dmc:"936",   name:"Very Dark Avocado Green",         hex:"#3A5828" },
  { dmc:"989",   name:"Forest Green",                    hex:"#70A858" },
  { dmc:"988",   name:"Medium Forest Green",             hex:"#5A9048" },
  { dmc:"987",   name:"Dark Forest Green",               hex:"#4A7838" },
  { dmc:"986",   name:"Very Dark Forest Green",          hex:"#386028" },
  { dmc:"523",   name:"Light Fern Green",                hex:"#879A7C" },
  { dmc:"522",   name:"Fern Green",                      hex:"#708060" },
  { dmc:"520",   name:"Dark Fern Green",                 hex:"#506040" },
  { dmc:"3053",  name:"Green Gray",                      hex:"#8A9E84" },
  { dmc:"3052",  name:"Medium Green Gray",               hex:"#6E8462" },
  { dmc:"3051",  name:"Dark Green Gray",                 hex:"#536451" },
  { dmc:"3013",  name:"Light Khaki Green",               hex:"#B0AE80" },
  { dmc:"3012",  name:"Medium Khaki Green",              hex:"#909068" },
  { dmc:"3011",  name:"Dark Khaki Green",                hex:"#708050" },
  { dmc:"907",   name:"Light Parrot Green",              hex:"#A0CC60" },
  { dmc:"906",   name:"Medium Parrot Green",             hex:"#80C040" },
  { dmc:"905",   name:"Dark Parrot Green",               hex:"#50A020" },
  { dmc:"904",   name:"Very Dark Parrot Green",          hex:"#388018" },
  { dmc:"166",   name:"Medium Light Moss Green",         hex:"#9DB74A" },
  { dmc:"581",   name:"Moss Green",                      hex:"#788838" },
  { dmc:"580",   name:"Dark Moss Green",                 hex:"#587028" },
  // Browns & Tans
  { dmc:"3033",  name:"Very Light Mocha Brown",          hex:"#D8C7AE" },
  { dmc:"3782",  name:"Light Mocha Brown",               hex:"#C9A889" },
  { dmc:"3032",  name:"Medium Mocha Brown",              hex:"#A88E72" },
  { dmc:"3031",  name:"Very Dark Mocha Brown",           hex:"#5A4435" },
  { dmc:"842",   name:"Very Light Beige Brown",          hex:"#C8B39A" },
  { dmc:"841",   name:"Light Beige Brown",               hex:"#B09878" },
  { dmc:"840",   name:"Medium Beige Brown",              hex:"#9A7958" },
  { dmc:"839",   name:"Dark Beige Brown",                hex:"#7A5A40" },
  { dmc:"838",   name:"Very Dark Beige Brown",           hex:"#5A3C28" },
  { dmc:"422",   name:"Light Hazelnut Brown",            hex:"#BF9669" },
  { dmc:"420",   name:"Dark Hazelnut Brown",             hex:"#8A6030" },
  { dmc:"869",   name:"Very Dark Hazelnut Brown",        hex:"#6A4820" },
  { dmc:"407",   name:"Dark Desert Sand",                hex:"#9E6B58" },
  { dmc:"3064",  name:"Desert Sand",                     hex:"#C88870" },
  { dmc:"950",   name:"Light Desert Sand",               hex:"#DDB898" },
  { dmc:"3772",  name:"Very Dark Desert Sand",           hex:"#7A4838" },
  { dmc:"738",   name:"Very Light Tan",                  hex:"#E8CA9A" },
  { dmc:"739",   name:"Ultra Very Light Tan",            hex:"#F4E0C0" },
  { dmc:"437",   name:"Light Tan",                       hex:"#D0A870" },
  { dmc:"436",   name:"Tan",                             hex:"#B88850" },
  { dmc:"435",   name:"Very Light Brown",                hex:"#A07040" },
  { dmc:"434",   name:"Light Brown",                     hex:"#8A5830" },
  { dmc:"433",   name:"Medium Brown",                    hex:"#704820" },
  { dmc:"801",   name:"Dark Coffee Brown",               hex:"#503010" },
  { dmc:"898",   name:"Very Dark Coffee Brown",          hex:"#3C2008" },
  { dmc:"3021",  name:"Very Dark Brown Gray",            hex:"#5A4E42" },
  { dmc:"3371",  name:"Black Brown",                     hex:"#201008" },
  { dmc:"951",   name:"Light Tawny",                     hex:"#ECC29C" },
  { dmc:"3829",  name:"Very Dark Old Gold",              hex:"#9C7420" },
  // Grays
  { dmc:"3799",  name:"Very Dark Pewter Gray",           hex:"#3A3A3C" },
  { dmc:"413",   name:"Dark Pewter Gray",                hex:"#545658" },
  { dmc:"317",   name:"Pewter Gray",                     hex:"#666768" },
  { dmc:"318",   name:"Light Steel Gray",                hex:"#9EAAB2" },
  { dmc:"414",   name:"Dark Steel Gray",                 hex:"#7A8088" },
  { dmc:"415",   name:"Pearl Gray",                      hex:"#D0D2D0" },
  { dmc:"762",   name:"Very Light Pearl Gray",           hex:"#E5E6E4" },
  { dmc:"451",   name:"Dark Shell Gray",                 hex:"#9A9090" },
  { dmc:"452",   name:"Medium Shell Gray",               hex:"#B8AEAA" },
  { dmc:"453",   name:"Light Shell Gray",                hex:"#D0C8C4" },
  { dmc:"640",   name:"Very Dark Beige Gray",            hex:"#787264" },
  { dmc:"642",   name:"Dark Beige Gray",                 hex:"#978E7E" },
  { dmc:"644",   name:"Medium Beige Gray",               hex:"#B5AFA0" },
  { dmc:"822",   name:"Light Beige Gray",                hex:"#D8D0C0" },
  { dmc:"3024",  name:"Very Light Brown Gray",           hex:"#D8D4C8" },
  { dmc:"3023",  name:"Light Brown Gray",                hex:"#B4AEA0" },
  { dmc:"3022",  name:"Medium Brown Gray",               hex:"#909080" },
  // Black
  { dmc:"310",   name:"Black",                           hex:"#1A1A1A" },
];

// Precompute RGB values
const DMC_RGB = DMC.map(c => {
  const h = c.hex.replace('#','');
  return { ...c, r:parseInt(h.slice(0,2),16), g:parseInt(h.slice(2,4),16), b:parseInt(h.slice(4,6),16) };
});

function colorDist(r1,g1,b1,r2,g2,b2) {
  const rm = (r1+r2)/2;
  const dr=r1-r2, dg=g1-g2, db=b1-b2;
  return (2+rm/256)*dr*dr + 4*dg*dg + (2+(255-rm)/256)*db*db;
}

function nearestDMC(r,g,b) {
  let best=null, bestD=Infinity;
  for(const c of DMC_RGB) {
    const d = colorDist(r,g,b,c.r,c.g,c.b);
    if(d<bestD){ bestD=d; best=c; }
  }
  return best;
}

function toHex(r,g,b){ return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join(''); }

function extractPalette(imgEl, count=5) {
  const canvas = document.createElement('canvas');
  const SZ = 120;
  canvas.width = canvas.height = SZ;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgEl, 0, 0, SZ, SZ);
  const {data} = ctx.getImageData(0,0,SZ,SZ);
  const pixels = [];
  for(let i=0; i<data.length; i+=16){
    if(data[i+3]>128) pixels.push([data[i],data[i+1],data[i+2]]);
  }
  if(!pixels.length) return [];
  const step = Math.max(1, Math.floor(pixels.length/count));
  let centroids = Array.from({length:count},(_,i)=>[...pixels[Math.min(i*step,pixels.length-1)]]);
  for(let iter=0; iter<10; iter++){
    const sums = Array.from({length:count},()=>[0,0,0,0]);
    for(const [r,g,b] of pixels){
      let best=0,bestD=Infinity;
      centroids.forEach(([cr,cg,cb],i)=>{const d=(r-cr)**2+(g-cg)**2+(b-cb)**2;if(d<bestD){bestD=d;best=i;}});
      sums[best][0]+=r;sums[best][1]+=g;sums[best][2]+=b;sums[best][3]++;
    }
    centroids=sums.map(([sr,sg,sb,n],i)=>n>0?[Math.round(sr/n),Math.round(sg/n),Math.round(sb/n)]:centroids[i]);
  }
  const used=new Set(), results=[];
  const scored=centroids.map(([r,g,b])=>{
    const mx=Math.max(r,g,b),mn=Math.min(r,g,b);
    return {r,g,b,score:(mx>0?(mx-mn)/mx:0)*0.6+(mx/255)*0.4};
  }).sort((a,b)=>b.score-a.score);
  for(const {r,g,b} of scored){
    if(results.length>=count) break;
    const dmc=nearestDMC(r,g,b);
    if(!used.has(dmc.dmc)){
      used.add(dmc.dmc);
      results.push({extracted:toHex(r,g,b), dmc});
    }
  }
  return results;
}

// ─── Mood picker data (v6) ───────────────────────────────────
const Q1=[
  {id:"anger",      label:"I'm angry",                   sub:"Frustrated, furious, done"},
  {id:"vibrancy",   label:"Everything is clicking",      sub:"Energized, firing on all cylinders"},
  {id:"wound",      label:"My mind won't slow down",     sub:"Restless, anxious, overstimulated"},
  {id:"pensive",    label:"I'm deep in thought",         sub:"Reflective, processing, wondering"},
  {id:"ruminating", label:"I keep going over something", sub:"A thought that won't leave"},
  {id:"heavy",      label:"I feel heavy and depleted",   sub:"Tired, low, in need of comfort"},
  {id:"hands",      label:"Just need something to do",   sub:"Neutral, looking for quiet focus"},
];
const Q2_BY_MOOD={
  anger:     {head:["How do you want","to work with it?"],    sub:"the colors will meet you where you are",
               opts:[{id:"cool",label:"Cool it down"},{id:"warm",label:"Lean into it"},{id:"deep",label:"Let it go dark"}]},
  vibrancy:  {head:["What kind of palette","feels like today?"], sub:"choose the one that matches your energy",
               opts:[{id:"cool",label:"Crisp and alive"},{id:"warm",label:"Warm and golden"},{id:"deep",label:"Deep and rooted"}]},
  wound:     {head:["What draws you","right now?"],           sub:"choose by feeling, not by thinking",
               opts:[{id:"cool",label:"Quiet and still"},{id:"warm",label:"Soft and gentle"},{id:"deep",label:"Deeply calm"}]},
  pensive:   {head:["What's the tone","of your thinking?"],  sub:"let the colors match the mood",
               opts:[{id:"cool",label:"Cool and clear"},{id:"warm",label:"Warm and amber"},{id:"deep",label:"Dark and still"}]},
  ruminating:{head:["What do you want","to do with it?"],    sub:"there's no wrong answer",
               opts:[{id:"cool",label:"Step back a little"},{id:"warm",label:"Sit with it"},{id:"deep",label:"Go quiet with it"}]},
  heavy:     {head:["What do you","need right now?"],        sub:"choose what calls to you",
               opts:[{id:"cool",label:"Something light"},{id:"warm",label:"Something cozy"},{id:"deep",label:"Something grounding"}]},
  hands:     {head:["What draws you","right now?"],          sub:"choose by feeling, not by thinking",
               opts:[{id:"cool",label:"Cool and clear"},{id:"warm",label:"Warm and easy"},{id:"deep",label:"Dark and slow"}]},
};
function makeKey(a,b){return a+"|"+b;}
const P={};
P[makeKey("anger","cool")]={name:"Iron Shore",tagline:"Channel it through something cold and solid",colors:[{hex:"#3A4A58",dmc:"3750",name:"Very Dark Antique Blue"},{hex:"#446068",dmc:"924",name:"Very Dark Gray Green"},{hex:"#587080",dmc:"3768",name:"Dark Slate Gray"},{hex:"#28606A",dmc:"3808",name:"Ultra Very Dark Turquoise"},{hex:"#8AACA8",dmc:"927",name:"Light Gray Green"}]};
P[makeKey("anger","warm")]={name:"Ember",tagline:"Honor the heat — let it burn slowly",colors:[{hex:"#B52828",dmc:"321",name:"Red"},{hex:"#C83028",dmc:"349",name:"Dark Coral"},{hex:"#C24A0A",dmc:"900",name:"Dark Burnt Orange"},{hex:"#A06228",dmc:"3826",name:"Golden Brown"},{hex:"#5A4435",dmc:"3031",name:"Very Dark Mocha Brown"}]};
P[makeKey("anger","deep")]={name:"Obsidian",tagline:"Let the darkness absorb it",colors:[{hex:"#3A3A3C",dmc:"3799",name:"Very Dark Pewter Gray"},{hex:"#3A4A58",dmc:"3750",name:"Very Dark Antique Blue"},{hex:"#504540",dmc:"3021",name:"Very Dark Brown Gray"},{hex:"#606062",dmc:"317",name:"Pewter Gray"},{hex:"#547070",dmc:"3768",name:"Dark Slate Gray"}]};
P[makeKey("vibrancy","cool")]={name:"First Wind",tagline:"Crisp, clear, and fully alive",colors:[{hex:"#70B0CC",dmc:"519",name:"Sky Blue"},{hex:"#98CCD8",dmc:"3761",name:"Light Sky Blue"},{hex:"#D4EEF4",dmc:"747",name:"Very Light Sky Blue"},{hex:"#C4D2E0",dmc:"3752",name:"Very Light Antique Blue"},{hex:"#688E8E",dmc:"926",name:"Medium Gray Green"}]};
P[makeKey("vibrancy","warm")]={name:"Golden Light",tagline:"Stitch something worthy of today",colors:[{hex:"#F5CA80",dmc:"3821",name:"Straw"},{hex:"#F6D8A4",dmc:"3822",name:"Light Straw"},{hex:"#EDA444",dmc:"3854",name:"Medium Autumn Gold"},{hex:"#9EB578",dmc:"471",name:"Very Light Avocado Green"},{hex:"#BA9264",dmc:"422",name:"Light Hazelnut Brown"}]};
P[makeKey("vibrancy","deep")]={name:"Living Wood",tagline:"Rooted and fully energized",colors:[{hex:"#285040",dmc:"500",name:"Very Dark Blue Green"},{hex:"#386858",dmc:"501",name:"Dark Blue Green"},{hex:"#467050",dmc:"3346",name:"Hunter Green"},{hex:"#6E9A5E",dmc:"3347",name:"Medium Yellow Green"},{hex:"#C6D698",dmc:"3348",name:"Light Yellow Green"}]};
P[makeKey("wound","cool")]={name:"Still Waters",tagline:"Quiet the noise",colors:[{hex:"#8EAAA6",dmc:"927",name:"Light Gray Green"},{hex:"#B8CAC4",dmc:"928",name:"Very Light Gray Green"},{hex:"#C4D2DE",dmc:"3752",name:"Very Light Antique Blue"},{hex:"#84AEA0",dmc:"503",name:"Medium Blue Green"},{hex:"#D6C4AC",dmc:"3033",name:"Very Light Mocha Brown"}]};
P[makeKey("wound","warm")]={name:"First Light",tagline:"Soften, not silence",colors:[{hex:"#CCC2D2",dmc:"3743",name:"Very Light Antique Violet"},{hex:"#D4B0B8",dmc:"778",name:"Very Light Antique Mauve"},{hex:"#CACCE6",dmc:"3747",name:"Very Light Blue Violet"},{hex:"#F2F0EC",dmc:"3865",name:"Winter White"},{hex:"#B2A2BC",dmc:"3042",name:"Light Antique Violet"}]};
P[makeKey("wound","deep")]={name:"Deep Rest",tagline:"Let the dark hold you",colors:[{hex:"#3A4A58",dmc:"3750",name:"Very Dark Antique Blue"},{hex:"#4A5C6C",dmc:"930",name:"Dark Antique Blue"},{hex:"#687A8A",dmc:"931",name:"Medium Antique Blue"},{hex:"#587070",dmc:"3768",name:"Dark Slate Gray"},{hex:"#98A8B6",dmc:"932",name:"Light Antique Blue"}]};
P[makeKey("pensive","cool")]={name:"Scholar's Hour",tagline:"The quiet of a good, long thought",colors:[{hex:"#3A4A58",dmc:"3750",name:"Very Dark Antique Blue"},{hex:"#4A5C6C",dmc:"930",name:"Dark Antique Blue"},{hex:"#3A7A82",dmc:"3809",name:"Very Dark Turquoise"},{hex:"#687A8A",dmc:"931",name:"Medium Antique Blue"},{hex:"#98A8B6",dmc:"932",name:"Light Antique Blue"}]};
P[makeKey("pensive","warm")]={name:"Amber Study",tagline:"Warm light and open questions",colors:[{hex:"#9C7420",dmc:"3829",name:"Very Dark Old Gold"},{hex:"#E6A636",dmc:"3820",name:"Dark Straw"},{hex:"#BC9264",dmc:"422",name:"Light Hazelnut Brown"},{hex:"#D6C4AC",dmc:"3033",name:"Very Light Mocha Brown"},{hex:"#584232",dmc:"3031",name:"Very Dark Mocha Brown"}]};
P[makeKey("pensive","deep")]={name:"Deep Thought",tagline:"Still surface, moving underneath",colors:[{hex:"#446460",dmc:"924",name:"Very Dark Gray Green"},{hex:"#50624E",dmc:"3051",name:"Dark Green Gray"},{hex:"#3A3A3C",dmc:"3799",name:"Very Dark Pewter Gray"},{hex:"#3A4A58",dmc:"3750",name:"Very Dark Antique Blue"},{hex:"#869A80",dmc:"3053",name:"Green Gray"}]};
P[makeKey("ruminating","cool")]={name:"Worn Path",tagline:"A little distance between you and the thought",colors:[{hex:"#948A7A",dmc:"642",name:"Dark Beige Gray"},{hex:"#B2AC9C",dmc:"644",name:"Medium Beige Gray"},{hex:"#B2A2BC",dmc:"3042",name:"Light Antique Violet"},{hex:"#C4D2DE",dmc:"3752",name:"Very Light Antique Blue"},{hex:"#D6C4AC",dmc:"3033",name:"Very Light Mocha Brown"}]};
P[makeKey("ruminating","warm")]={name:"Old Amber",tagline:"Something you keep turning over",colors:[{hex:"#C6A486",dmc:"3782",name:"Light Mocha Brown"},{hex:"#A68A6E",dmc:"3032",name:"Medium Mocha Brown"},{hex:"#766E62",dmc:"640",name:"Very Dark Beige Gray"},{hex:"#D6C4AC",dmc:"3033",name:"Very Light Mocha Brown"},{hex:"#BC9264",dmc:"422",name:"Light Hazelnut Brown"}]};
P[makeKey("ruminating","deep")]={name:"Night Loop",tagline:"Sit with it in the dark for a while",colors:[{hex:"#584A40",dmc:"3021",name:"Very Dark Brown Gray"},{hex:"#766E62",dmc:"640",name:"Very Dark Beige Gray"},{hex:"#3A4A58",dmc:"3750",name:"Very Dark Antique Blue"},{hex:"#3A3A3C",dmc:"3799",name:"Very Dark Pewter Gray"},{hex:"#584232",dmc:"3031",name:"Very Dark Mocha Brown"}]};
P[makeKey("heavy","cool")]={name:"Open Shore",tagline:"A breath of open air",colors:[{hex:"#B8CAC4",dmc:"928",name:"Very Light Gray Green"},{hex:"#C4D2DE",dmc:"3752",name:"Very Light Antique Blue"},{hex:"#E8EEF6",dmc:"3756",name:"Ultra Very Light Baby Blue"},{hex:"#C0D6CE",dmc:"504",name:"Very Light Blue Green"},{hex:"#E2E4E2",dmc:"762",name:"Very Light Pearl Gray"}]};
P[makeKey("heavy","warm")]={name:"Hearthside",tagline:"Warm and fully held",colors:[{hex:"#ECC29C",dmc:"951",name:"Light Tawny"},{hex:"#D6C4AC",dmc:"3033",name:"Very Light Mocha Brown"},{hex:"#E6C696",dmc:"738",name:"Very Light Tan"},{hex:"#F2F0EC",dmc:"3865",name:"Winter White"},{hex:"#BC9264",dmc:"422",name:"Light Hazelnut Brown"}]};
P[makeKey("heavy","deep")]={name:"Forest Floor",tagline:"Rooted, grounded, held",colors:[{hex:"#849878",dmc:"523",name:"Light Fern Green"},{hex:"#987654",dmc:"840",name:"Medium Beige Brown"},{hex:"#C6B096",dmc:"842",name:"Very Light Beige Brown"},{hex:"#50624E",dmc:"3051",name:"Dark Green Gray"},{hex:"#EEE8DE",dmc:"3866",name:"Ultra Very Light Mocha Brown"}]};
P[makeKey("hands","cool")]={name:"Sea Glass",tagline:"Clear and unhurried",colors:[{hex:"#84AEA0",dmc:"503",name:"Medium Blue Green"},{hex:"#669690",dmc:"502",name:"Blue Green"},{hex:"#C0D6CE",dmc:"504",name:"Very Light Blue Green"},{hex:"#587070",dmc:"3768",name:"Dark Slate Gray"},{hex:"#8EAAA6",dmc:"927",name:"Light Gray Green"}]};
P[makeKey("hands","warm")]={name:"Golden Hour",tagline:"Warm light on your hands",colors:[{hex:"#C88C78",dmc:"3778",name:"Light Terra Cotta"},{hex:"#ECC29C",dmc:"951",name:"Light Tawny"},{hex:"#BA7060",dmc:"356",name:"Medium Terra Cotta"},{hex:"#D6C4AC",dmc:"3033",name:"Very Light Mocha Brown"},{hex:"#9C6854",dmc:"407",name:"Dark Desert Sand"}]};
P[makeKey("hands","deep")]={name:"Quiet Dusk",tagline:"Evening hours, slow work",colors:[{hex:"#3A3A3C",dmc:"3799",name:"Very Dark Pewter Gray"},{hex:"#3A4A58",dmc:"3750",name:"Very Dark Antique Blue"},{hex:"#446460",dmc:"924",name:"Very Dark Gray Green"},{hex:"#869A80",dmc:"3053",name:"Green Gray"},{hex:"#50624E",dmc:"3051",name:"Dark Green Gray"}]};

// ─── Styles ──────────────────────────────────────────────────
const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@300;400&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .app{min-height:100vh;background:#FAF8F5;font-family:'Jost',sans-serif;font-weight:300;color:#2D2A26;padding:2rem 1.25rem 4rem}
  .wordmark{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12px;letter-spacing:.12em;color:#9A9490;text-align:center;margin-bottom:2.5rem}
  .dots{display:flex;gap:6px;justify-content:center;margin-bottom:2rem}
  .dot{width:5px;height:5px;border-radius:50%;background:#E0DDD9;transition:background .2s}
  .dot.on{background:#2D2A26}
  .head{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(1.7rem,4.5vw,2.4rem);line-height:1.2;text-align:center;color:#2D2A26;margin-bottom:.5rem}
  .sub{font-size:12px;color:#9A9490;text-align:center;letter-spacing:.06em;margin-bottom:2rem}
  .wrap{max-width:480px;margin:0 auto}
  .path-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:400px;margin:0 auto 2rem}
  .path-card{border:1px solid #E8E4E0;border-radius:14px;padding:1.5rem 1rem;cursor:pointer;background:#fff;transition:all .18s;text-align:center}
  .path-card:hover{border-color:#C4BFBA;transform:translateY(-2px)}
  .path-icon{font-size:24px;display:block;margin-bottom:.6rem}
  .path-label{font-family:'Cormorant Garamond',serif;font-size:1.05rem;display:block;margin-bottom:3px}
  .path-sub{font-size:10px;color:#9A9490;letter-spacing:.03em}
  .q1-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;max-width:480px;margin:0 auto 2rem}
  .q1-grid>.card:last-child:nth-child(odd){grid-column:span 2}
  .card{border:1px solid #E8E4E0;border-radius:11px;padding:.9rem 1rem;cursor:pointer;background:#fff;transition:all .18s;text-align:left}
  .card:hover{border-color:#C4BFBA;transform:translateY(-1px)}
  .card.sel{border-color:#2D2A26;background:#2D2A26;color:#FAF8F5}
  .card-main{font-family:'Cormorant Garamond',serif;font-size:1rem;display:block;margin-bottom:3px;line-height:1.3}
  .card-sub{font-size:10px;color:#9A9490;letter-spacing:.03em;line-height:1.4}
  .card.sel .card-sub{color:#9A8E85}
  .strip-opts{display:grid;gap:9px;max-width:480px;margin:0 auto 2rem}
  .strip-card{border:1px solid #E8E4E0;border-radius:11px;overflow:hidden;cursor:pointer;transition:all .18s;background:#fff}
  .strip-card:hover{border-color:#C4BFBA;transform:translateY(-1px)}
  .strip-card.sel{border:2px solid #2D2A26}
  .strip-row{display:flex;height:52px}
  .strip-seg{flex:1}
  .strip-lbl{padding:.7rem 1rem;font-size:12px;color:#6B6560;letter-spacing:.05em}
  .strip-card.sel .strip-lbl{color:#2D2A26;font-weight:400}
  .btn{display:block;width:100%;padding:.85rem;background:#2D2A26;color:#FAF8F5;border:none;border-radius:8px;font-family:'Jost',sans-serif;font-size:12px;font-weight:300;letter-spacing:.1em;cursor:pointer;transition:opacity .15s;margin-bottom:.65rem}
  .btn:hover{opacity:.85}
  .btn:disabled{opacity:.32;cursor:default}
  .btn-g{display:block;width:100%;padding:.85rem;background:transparent;color:#9A9490;border:1px solid #E8E4E0;border-radius:8px;font-family:'Jost',sans-serif;font-size:12px;font-weight:300;letter-spacing:.08em;cursor:pointer;transition:all .15s}
  .btn-g:hover{border-color:#C4BFBA;color:#6B6560}
  .back{display:flex;align-items:center;gap:5px;font-size:12px;color:#9A9490;cursor:pointer;border:none;background:none;padding:0;margin:0 auto 1.5rem;max-width:480px;letter-spacing:.05em;font-family:'Jost',sans-serif}
  .back:hover{color:#6B6560}
  .palette-bar{display:flex;height:52px;border-radius:9px;overflow:hidden;margin-bottom:1.5rem}
  .palette-seg{flex:1}
  .dmc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(86px,1fr));gap:9px;margin-bottom:1rem}
  .dmc-card{border:1px solid #E8E4E0;border-radius:10px;overflow:hidden;background:#fff}
  .dmc-swatch{height:66px;width:100%}
  .dmc-info{padding:.55rem .65rem}
  .dmc-num{font-size:13px;font-weight:400;color:#2D2A26;display:block;margin-bottom:1px}
  .dmc-name{font-size:10px;color:#9A9490;letter-spacing:.02em;display:block;margin-bottom:.4rem;line-height:1.35;overflow-wrap:break-word}
  .copy-btn{font-size:10px;letter-spacing:.04em;border:none;background:none;padding:0;cursor:pointer;font-family:'Jost',sans-serif;transition:color .15s;color:#C8C4C0}
  .copy-btn:hover{color:#9A9490}
  .copy-btn.done{color:#6A9E7A}
  .copy-all-btn{display:flex;align-items:center;justify-content:center;gap:5px;font-size:11px;letter-spacing:.07em;border:1px solid #E8E4E0;border-radius:7px;padding:.55rem 1rem;cursor:pointer;background:transparent;font-family:'Jost',sans-serif;margin-bottom:1.1rem;transition:all .15s;width:100%;color:#6B6560}
  .copy-all-btn:hover{border-color:#C4BFBA;color:#2D2A26}
  .copy-all-btn.done{color:#6A9E7A;border-color:#6A9E7A}
  .shop-note{font-size:11px;color:#C0BCBA;text-align:center;margin-bottom:1.5rem;letter-spacing:.03em}
  .upload-zone{border:1.5px dashed #C4BFBA;border-radius:14px;padding:3rem 2rem;text-align:center;cursor:pointer;transition:all .18s;background:#fff;max-width:480px;margin:0 auto 1.5rem}
  .upload-zone:hover,.upload-zone.drag{border-color:#2D2A26;background:#FAF8F5}
  .upload-icon{font-size:32px;display:block;margin-bottom:.75rem;opacity:.4}
  .upload-text{font-size:13px;color:#9A9490;letter-spacing:.04em;display:block;margin-bottom:.4rem}
  .upload-sub{font-size:11px;color:#C4BFBA;letter-spacing:.03em}
  .img-thumb{width:80px;height:80px;object-fit:cover;border-radius:8px;display:block;margin:0 auto 1rem}
  .extracted-row{display:flex;gap:6px;margin-bottom:.5rem}
  .ex-seg{flex:1;height:28px;border-radius:4px}
  .processing{text-align:center;padding:2rem 0}
  .email-box{background:#fff;border:1px solid #E8E4E0;border-radius:13px;padding:1.85rem 1.35rem;max-width:400px;margin:0 auto;text-align:center}
  .mini-dots{display:flex;gap:6px;justify-content:center;margin-bottom:1.1rem}
  .mini-dot{width:22px;height:22px;border-radius:50%}
  .email-in{width:100%;padding:.72rem .95rem;border:1px solid #E8E4E0;border-radius:7px;font-family:'Jost',sans-serif;font-size:13px;font-weight:300;color:#2D2A26;background:#FAF8F5;outline:none;transition:border .15s;margin-bottom:.65rem}
  .email-in:focus{border-color:#9A9490}
  .priv{font-size:10px;color:#C4BFBA;margin-top:.6rem;letter-spacing:.02em}
  .done-box{background:#fff;border:1px solid #E8E4E0;border-radius:13px;padding:2.25rem 1.35rem;max-width:400px;margin:0 auto;text-align:center}
  .hr{border:none;border-top:1px solid #E8E4E0;margin:1.25rem 0}
  .tag-pills{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:.85rem}
  .tag-pill{font-size:10px;letter-spacing:.05em;color:#9A9490;border:1px solid #E8E4E0;border-radius:20px;padding:3px 10px}
`;

export default function PaletteFinder() {
  const [mode,       setMode]       = useState(null);
  // Mood state
  const [step,       setStep]       = useState("q1");
  const [q1,         setQ1]         = useState(null);
  const [q2,         setQ2]         = useState(null);
  // Image state
  const [imgStep,    setImgStep]    = useState("upload");
  const [imgPreview, setImgPreview] = useState(null);
  const [imgColors,  setImgColors]  = useState([]);
  // Shared
  const [email,      setEmail]      = useState("");
  const [saved,      setSaved]      = useState(false);
  const [copied,     setCopied]     = useState(null);
  const [drag,       setDrag]       = useState(false);
  const fileRef = useRef();
  const imgRef  = useRef();

  const moodPalette = (q1&&q2) ? P[makeKey(q1,q2)] : null;
  const q2Def       = q1 ? Q2_BY_MOOD[q1] : null;
  const q2Opts      = q2Def ? q2Def.opts.map(o=>({...o,strip:(P[makeKey(q1,o.id)]?.colors||[]).map(c=>c.hex)})) : [];
  const stepNum     = {q1:1,q2:2,result:3,email:4}[step]??1;
  const q1Label     = Q1.find(o=>o.id===q1)?.sub??"";
  const q2Label     = q2Def?.opts.find(o=>o.id===q2)?.label??"";

  // Active palette for shared email/done screens
  const activePalette = mode==="mood" ? moodPalette
    : imgColors.length ? {name:"Your Image Palette", tagline:"Colors drawn from your photo", colors:imgColors.map(c=>({hex:c.dmc.hex,dmc:c.dmc.dmc,name:c.dmc.name}))}
    : null;

  async function subscribeToKlaviyo(emailAddr) {
    const LIST_ID = "SqGzAJ";

    const customProps = {
      palette_name: activePalette?.name ?? "",
      palette_path: mode === "mood" ? "mood" : "image",
      dmc_colors:   (activePalette?.colors ?? []).map(c => `DMC ${c.dmc}`).join(", "),
    };
    if (mode === "mood") {
      customProps.mood_state = q1Label;
      customProps.color_temp = q2Label;
      customProps.mood_id    = q1 ?? "";
      customProps.color_id   = q2 ?? "";
    }

    try {
      const params = new URLSearchParams();
      params.append("g",     LIST_ID);
      params.append("email", emailAddr);

      // Add custom properties with Klaviyo's $ prefix convention
      const keys = Object.keys(customProps);
      if (keys.length > 0) {
        params.append("$fields", keys.map(k => `$${k}`).join(","));
        keys.forEach(k => params.append(`$${k}`, String(customProps[k])));
      }

      const res = await fetch(
        "https://manage.kmail-lists.com/ajax/subscriptions/subscribe",
        {
          method:  "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body:    params.toString(),
        }
      );
      const result = await res.text();
      console.log("Klaviyo result:", result);
    } catch(e) {
      console.error("Klaviyo error:", e);
    }
  }

  function copy(text,id){
    try{navigator.clipboard?.writeText(text);}catch(_){}
    setCopied(id);setTimeout(()=>setCopied(null),1800);
  }
  function copyAll(){
    if(!activePalette)return;
    copy(activePalette.colors.map(c=>`DMC ${c.dmc}  ${c.name}`).join("\n"),"__all__");
  }

  function handleFile(file){
    if(!file||!file.type.startsWith("image/"))return;
    const url = URL.createObjectURL(file);
    setImgPreview(url);
    setImgStep("processing");
    const img = new Image();
    img.onload = ()=>{
      const colors = extractPalette(img,5);
      setImgColors(colors);
      setImgStep("result");
      URL.revokeObjectURL(url);
    };
    img.onerror = ()=>{ setImgStep("upload"); URL.revokeObjectURL(url); };
    img.src = url;
  }

  function resetAll(){
    setMode(null);setStep("q1");setQ1(null);setQ2(null);
    setImgStep("upload");setImgPreview(null);setImgColors([]);
    setEmail("");setSaved(false);
  }

  const showEmail = (mode==="mood" && step==="email") || (mode==="image" && imgStep==="email");

  return(
    <>
      <style>{CSS}</style>
      <div className="app">
        <p className="wordmark">gold pollen co — palette finder</p>

        {/* ── Landing ── */}
        {!mode && (
          <>
            <h1 className="head">Find Your<br/><em>Palette</em></h1>
            <p className="sub">choose how you'd like to start</p>
            <div className="path-grid">
              <div className="path-card" onClick={()=>{setMode("mood");setStep("q1");}}>
                <span className="path-icon">◌</span>
                <span className="path-label">By how I'm feeling</span>
                <span className="path-sub">answer two questions</span>
              </div>
              <div className="path-card" onClick={()=>{setMode("image");setImgStep("upload");}}>
                <span className="path-icon">◎</span>
                <span className="path-label">By an image I love</span>
                <span className="path-sub">upload a photo</span>
              </div>
            </div>
          </>
        )}

        {/* ═══════════════ MOOD PATH ═══════════════ */}
        {mode==="mood" && !saved && (
          <>
            {step!=="email" && (
              <div className="dots">
                {[1,2,3,4].map(n=><div key={n} className={`dot${stepNum>=n?" on":""}`}/>)}
              </div>
            )}

            {step==="q1" && (
              <>
                <h1 className="head">Where are you<br/><em>right now?</em></h1>
                <p className="sub">be honest — this shapes your palette</p>
                <div className="q1-grid">
                  {Q1.map(o=>(
                    <div key={o.id} className={`card${q1===o.id?" sel":""}`} onClick={()=>setQ1(o.id)}>
                      <span className="card-main">{o.label}</span>
                      <span className="card-sub">{o.sub}</span>
                    </div>
                  ))}
                </div>
                <div className="wrap">
                  <button className="btn" disabled={!q1} onClick={()=>setStep("q2")}>continue →</button>
                  <button className="btn-g" onClick={resetAll}>← back to start</button>
                </div>
              </>
            )}

            {step==="q2" && q2Def && (
              <>
                <button className="back" onClick={()=>setStep("q1")}>← back</button>
                <h1 className="head">{q2Def.head[0]}<br/><em>{q2Def.head[1]}</em></h1>
                <p className="sub">{q2Def.sub}</p>
                <div className="strip-opts">
                  {q2Opts.map(o=>(
                    <div key={o.id} className={`strip-card${q2===o.id?" sel":""}`} onClick={()=>setQ2(o.id)}>
                      <div className="strip-row">{o.strip.map((c,i)=><div key={i} className="strip-seg" style={{background:c}}/>)}</div>
                      <p className="strip-lbl">{o.label}</p>
                    </div>
                  ))}
                </div>
                <div className="wrap">
                  <button className="btn" disabled={!q2} onClick={()=>setStep("result")}>see my palette →</button>
                </div>
              </>
            )}

            {step==="result" && moodPalette && (
              <>
                <button className="back" onClick={()=>setStep("q2")}>← back</button>
                <h1 className="head">{moodPalette.name}</h1>
                <p className="sub">{moodPalette.tagline}</p>
                <div className="wrap">
                  <div className="palette-bar">
                    {moodPalette.colors.map((c,i)=><div key={i} className="palette-seg" style={{background:c.hex}}/>)}
                  </div>
                  <div className="dmc-grid">
                    {moodPalette.colors.map(c=>(
                      <div key={c.dmc} className="dmc-card">
                        <div className="dmc-swatch" style={{background:c.hex}}/>
                        <div className="dmc-info">
                          <span className="dmc-num">DMC {c.dmc}</span>
                          <span className="dmc-name">{c.name}</span>
                          <button className={`copy-btn${copied===c.dmc?" done":""}`} onClick={()=>copy(c.dmc,c.dmc)}>
                            {copied===c.dmc?"✓ copied":"copy #"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className={`copy-all-btn${copied==="__all__"?" done":""}`} onClick={copyAll}>
                    {copied==="__all__"?"✓ all numbers copied":"copy all 5 DMC numbers"}
                  </button>
                  <p className="shop-note">find these at your local craft store or dmc.com — search by number</p>
                  <button className="btn" onClick={()=>setStep("email")}>save my palette</button>
                  <button className="btn-g" onClick={()=>setStep("email")}>just browsing</button>
                </div>
              </>
            )}
          </>
        )}

        {/* ═══════════════ IMAGE PATH ═══════════════ */}
        {mode==="image" && !saved && (
          <>
            {imgStep==="upload" && (
              <>
                <button className="back" onClick={resetAll}>← back to start</button>
                <h1 className="head">Upload an image<br/><em>you love</em></h1>
                <p className="sub">a photo, artwork, landscape — anything with color</p>
                <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}}
                  onChange={e=>handleFile(e.target.files[0])}/>
                <div
                  className={`upload-zone${drag?" drag":""}`}
                  onClick={()=>fileRef.current.click()}
                  onDragOver={e=>{e.preventDefault();setDrag(true);}}
                  onDragLeave={()=>setDrag(false)}
                  onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}
                >
                  <span className="upload-icon">◎</span>
                  <span className="upload-text">drop your image here</span>
                  <span className="upload-sub">or tap to browse · jpg, png, webp</span>
                </div>
              </>
            )}

            {imgStep==="processing" && (
              <div className="processing">
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:300,fontStyle:"italic",marginBottom:".75rem"}}>
                  Reading your colors…
                </p>
                <p style={{fontSize:"12px",color:"#9A9490",letterSpacing:".06em"}}>finding the closest DMC threads</p>
              </div>
            )}

            {imgStep==="result" && imgColors.length>0 && (
              <>
                <button className="back" onClick={()=>{setImgStep("upload");setImgColors([]);}}>← try another image</button>
                <h1 className="head">Your image<br/><em>palette</em></h1>
                <p className="sub">5 colors drawn from your photo, matched to DMC thread</p>
                <div className="wrap">
                  <div className="palette-bar">
                    {imgColors.map((c,i)=><div key={i} className="palette-seg" style={{background:c.dmc.hex}}/>)}
                  </div>
                  <div className="dmc-grid">
                    {imgColors.map((c,i)=>(
                      <div key={i} className="dmc-card">
                        <div style={{position:"relative"}}>
                          <div className="dmc-swatch" style={{background:c.dmc.hex}}/>
                          <div style={{position:"absolute",top:4,left:4,width:16,height:16,borderRadius:"50%",background:c.extracted,border:"1.5px solid rgba(255,255,255,0.7)"}} title="your image color"/>
                        </div>
                        <div className="dmc-info">
                          <span className="dmc-num">DMC {c.dmc.dmc}</span>
                          <span className="dmc-name">{c.dmc.name}</span>
                          <button className={`copy-btn${copied===c.dmc.dmc?" done":""}`} onClick={()=>copy(c.dmc.dmc,c.dmc.dmc)}>
                            {copied===c.dmc.dmc?"✓ copied":"copy #"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="shop-note" style={{fontSize:"10px",marginBottom:".75rem",color:"#C8C4C0"}}>
                    ● small dot shows your original image color · larger swatch is the nearest DMC thread
                  </p>
                  <button className={`copy-all-btn${copied==="__all__"?" done":""}`} onClick={copyAll}>
                    {copied==="__all__"?"✓ all numbers copied":"copy all 5 DMC numbers"}
                  </button>
                  <p className="shop-note">find these at your local craft store or dmc.com — search by number</p>
                  <button className="btn" onClick={()=>setImgStep("email")}>save my palette</button>
                  <button className="btn-g" onClick={()=>setImgStep("email")}>just browsing</button>
                </div>
              </>
            )}
          </>
        )}

        {/* ═══════════════ SHARED: EMAIL ═══════════════ */}
        {showEmail && !saved && activePalette && (
          <>
            <button className="back" onClick={()=>mode==="mood"?setStep("result"):setImgStep("result")}>← back</button>
            <div className="email-box">
              <div className="mini-dots">
                {activePalette.colors.map((c,i)=><div key={i} className="mini-dot" style={{background:c.hex}}/>)}
              </div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"1.45rem",marginBottom:".45rem",lineHeight:1.3}}>
                Your <em>{activePalette.name}</em>
              </h2>
              <p style={{fontSize:"11px",color:"#9A9490",marginBottom:"1.35rem",lineHeight:1.7,letterSpacing:".02em"}}>
                We'll send your DMC thread list, where to shop, and patterns that use this palette.
              </p>
              <input type="email" className="email-in" placeholder="your@email.com"
                value={email} onChange={e=>setEmail(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&email){subscribeToKlaviyo(email);setSaved(true);}}}/>
              <button className="btn" disabled={!email} onClick={()=>{subscribeToKlaviyo(email);setSaved(true);}}>send my palette</button>
              <p className="priv">no spam · unsubscribe anytime</p>
            </div>
          </>
        )}

        {/* ═══════════════ SHARED: DONE ═══════════════ */}
        {saved && activePalette && (
          <div className="done-box">
            <div className="mini-dots">
              {activePalette.colors.map((c,i)=><div key={i} className="mini-dot" style={{background:c.hex}}/>)}
            </div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"1.45rem",marginBottom:".45rem"}}>
              On its way ✦
            </h2>
            <p style={{fontSize:"11px",color:"#9A9490",lineHeight:1.7,marginBottom:".75rem",letterSpacing:".02em"}}>
              Your <strong style={{color:"#6B6560",fontWeight:400}}>{activePalette.name}</strong> palette and DMC thread list are heading to your inbox.
            </p>
            {mode==="mood" && (
              <div className="tag-pills">
                <span className="tag-pill">{q1Label.toLowerCase()}</span>
                <span className="tag-pill">{q2Label.toLowerCase()}</span>
              </div>
            )}
            {mode==="image" && (
              <div className="tag-pills">
                <span className="tag-pill">image palette</span>
              </div>
            )}
            <div className="hr"/>
            <button className="btn" onClick={resetAll}>find another palette</button>
          </div>
        )}
      </div>
    </>
  );
}
