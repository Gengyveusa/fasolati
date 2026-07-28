/**
 * Global behaviour: nav, dropdown panels, scroll reveals, particle field.
 *
 * WHAT CHANGED
 * ------------
 * This file used to also contain openProducts / openBlackBox / openShop /
 * openAbout / openPartner — the functions that faded a full-screen overlay
 * over the one and only page. Those overlays are now pages, and everything
 * that opened them is now an <a href>. Roughly 200 lines of show/hide state
 * went away with them; what's left is behaviour that has no HTML equivalent.
 *
 * Every lookup is null-guarded because this script loads on every page and
 * not every page has every element.
 */

const nav = document.getElementById('nav');
const ham = document.getElementById('hamburger');
const menu = document.getElementById('menu-overlay');

if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), {
    passive: true,
  });
}

// Full-screen hamburger menu. Its entries are links now, so there is no
// "close on click" handler — navigating away closes it.
if (ham && menu) {
  const toggle = () => {
    const open = !menu.classList.contains('open');
    ham.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  ham.addEventListener('click', toggle);
  ham.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) toggle();
  });
}

// Scroll reveals. Elements start at opacity 0 in CSS and get `.v` when they
// enter the viewport — so if JS never runs, they'd stay invisible. A crawler
// reading raw HTML doesn't care (the text is in the markup either way), but a
// reader with a blocked script would see a blank page, hence the fallback.
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add('v');
          io.unobserve(el.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.mo').forEach((el) => io.observe(el));
} else {
  document.querySelectorAll('.mo').forEach((el) => el.classList.add('v'));
}

// ── Dropdown nav — panels are moved to <body> to escape the stacking context
(function(){
  // Move all dropdown panels to body
  document.querySelectorAll('.topnav-item').forEach(item=>{
    const drop=item.querySelector('.topnav-drop');
    if(!drop)return;
    document.body.appendChild(drop);
    item._drop=drop;
    drop._trigger=item;
  });

  let activeDrop=null;
  let hoverTimer=null;

  function positionDrop(item){
    const drop=item._drop;
    if(!drop)return;
    const rect=item.getBoundingClientRect();
    const dropW=drop.offsetWidth||260;
    let left=rect.left+rect.width/2-dropW/2;
    // Keep on screen
    if(left<8)left=8;
    if(left+dropW>window.innerWidth-8)left=window.innerWidth-dropW-8;
    drop.style.top=(rect.bottom+4)+'px';
    drop.style.left=left+'px';
  }

  function showDrop(item){
    clearTimeout(hoverTimer);
    if(activeDrop&&activeDrop!==item){
      activeDrop._drop.classList.remove('show');
      activeDrop.classList.remove('active');
    }
    positionDrop(item);
    item._drop.classList.add('show');
    item.classList.add('active');
    activeDrop=item;
  }

  function scheduleHide(){
    hoverTimer=setTimeout(()=>{
      if(activeDrop){
        activeDrop._drop.classList.remove('show');
        activeDrop.classList.remove('active');
        activeDrop=null;
      }
    },300);
  }

  function cancelHide(){clearTimeout(hoverTimer)}

  // Hover on triggers
  document.querySelectorAll('.topnav-item').forEach(item=>{
    item.addEventListener('mouseenter',()=>showDrop(item));
    item.addEventListener('mouseleave',scheduleHide);
    // Click fallback
    item.querySelector('.topnav-trigger').addEventListener('click',e=>{
      e.preventDefault();e.stopPropagation();
      if(item.classList.contains('active')){
        item._drop.classList.remove('show');item.classList.remove('active');activeDrop=null;
      }else{showDrop(item)}
    });
  });

  // Hover on dropdown panels themselves
  document.querySelectorAll('.topnav-drop').forEach(drop=>{
    drop.addEventListener('mouseenter',cancelHide);
    drop.addEventListener('mouseleave',scheduleHide);
  });

  // Close on outside click
  document.addEventListener('click',e=>{
    if(activeDrop&&!e.target.closest('.topnav-item')&&!e.target.closest('.topnav-drop')){
      activeDrop._drop.classList.remove('show');activeDrop.classList.remove('active');activeDrop=null;
    }
  });

  // Reposition on scroll/resize
  window.addEventListener('scroll',()=>{if(activeDrop)positionDrop(activeDrop)},{passive:true});
  window.addEventListener('resize',()=>{if(activeDrop)positionDrop(activeDrop)});
})();

// ── Particle field ─────────────────────────────────────────────────────────
(function(){const cv=document.getElementById('particle-canvas'),c=cv.getContext('2d');let W,H,mx=-9999,my=-9999,particles=[];
const T=[0,232,204],G=[224,180,74],COUNT=280,CD=110,MR=250,MP=.04;
function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight}
window.addEventListener('resize',resize);resize();
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
window.addEventListener('mouseleave',()=>{mx=-9999;my=-9999});
class P{constructor(){this.reset()}reset(){this.x=Math.random()*W;this.y=Math.random()*H*3-H;this.vx=(Math.random()-.5)*.25;this.vy=(Math.random()-.5)*.15;this.r=Math.random()*2.5+.8;this.col=Math.random()>.7?G:T;this.alpha=Math.random()*.4+.15;this.baseAlpha=this.alpha;this.phase=Math.random()*Math.PI*2;this.speed=Math.random()*.003+.001}
update(t,sY){this.phase+=this.speed;this.x+=this.vx+Math.sin(this.phase)*.15;this.y+=this.vy+Math.cos(this.phase*.7)*.1;let sy=this.y-sY,dx=this.x-mx,dy=sy-my,d=Math.sqrt(dx*dx+dy*dy);if(d<MR){let f=(1-d/MR)*MP;this.x+=dx*f;this.y+=dy*f;this.alpha=this.baseAlpha+(.55*(1-d/MR))}else{this.alpha+=(this.baseAlpha-this.alpha)*.03}if(this.x<-20)this.x=W+20;if(this.x>W+20)this.x=-20}
draw(sY){let sy=this.y-sY;if(sy<-40||sy>H+40)return;c.beginPath();c.arc(this.x,sy,this.r,0,Math.PI*2);c.fillStyle=`rgba(${this.col[0]},${this.col[1]},${this.col[2]},${this.alpha})`;c.fill()}}
for(let i=0;i<COUNT;i++)particles.push(new P());
function cons(sY){for(let i=0;i<particles.length;i++){let a=particles[i],ay=a.y-sY;if(ay<-CD||ay>H+CD)continue;for(let j=i+1;j<particles.length;j++){let b=particles[j],by=b.y-sY;if(by<-CD||by>H+CD)continue;let dx=a.x-b.x,dy=ay-by,d=Math.sqrt(dx*dx+dy*dy);if(d<CD){let al=(1-d/CD)*.1,mx2=(a.x+b.x)/2,my2=(ay+by)/2,md=Math.sqrt((mx2-mx)**2+(my2-my)**2);if(md<MR)al+=(1-md/MR)*.2;c.beginPath();c.moveTo(a.x,ay);c.lineTo(b.x,by);c.strokeStyle=`rgba(${T[0]},${T[1]},${T[2]},${al})`;c.lineWidth=.5;c.stroke()}}}}
function glow(){if(mx<0)return;let g=c.createRadialGradient(mx,my,0,mx,my,MR);g.addColorStop(0,`rgba(${T[0]},${T[1]},${T[2]},.07)`);g.addColorStop(.5,`rgba(${T[0]},${T[1]},${T[2]},.025)`);g.addColorStop(1,'transparent');c.fillStyle=g;c.fillRect(mx-MR,my-MR,MR*2,MR*2)}
let t=0;function loop(){t++;let sY=window.scrollY||0;c.clearRect(0,0,W,H);glow();for(let p of particles)p.update(t,sY);cons(sY);for(let p of particles)p.draw(sY);requestAnimationFrame(loop)}loop()})();