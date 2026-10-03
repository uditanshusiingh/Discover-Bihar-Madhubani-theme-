(function(){
  function rgb(v){const m=v&&v.match(/rgba?\(([^)]+)\)/i);if(!m)return null;const p=m[1].split(',').map(x=>x.trim());if(p.length<3)return null;const a=p[3]===undefined?1:Number(p[3]);return a?p.slice(0,3).map(Number):null;}
  function lum(c){const v=c.map(x=>{x/=255;return x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4)});return .2126*v[0]+.7152*v[1]+.0722*v[2];}
  function bg(el){let n=el;while(n&&n.nodeType===1){const c=rgb(getComputedStyle(n).backgroundColor);if(c)return c;n=n.parentElement;}return [18,24,32];}
  function apply(){document.querySelectorAll('.section-auto').forEach(el=>{el.classList.remove('section-light','section-dark');const n=String(el.className||'').toLowerCase();if(/(^|[\s_-])(hero|gallery|travel|explore)([\s_-]|$)/.test(n)||n.includes('history-hero')||n.includes('about-hero')){el.classList.add('section-dark');return;}el.classList.add(lum(bg(el))>.45?'section-light':'section-dark');});}
  function start(){apply();new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['class','data-theme','data-bs-theme']});window.addEventListener('resize',apply,{passive:true});}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start,{once:true}):start();
})();
