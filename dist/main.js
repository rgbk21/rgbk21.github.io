(()=>{"use strict";function t(t){return Math.abs(Math.floor(t))}function i(t,i){return Math.random()*(i-t)+t}function s(t,s){return Math.floor(i(t,s+1))}function e(t,i,s,e){const n=Math.pow;return Math.sqrt(n(t-s,2)+n(i-e,2))}function n(t,i,s=1){if(t>360||t<0)throw new Error(`Expected hue 0-360 range, got \`${t}\``);if(i>100||i<0)throw new Error(`Expected lightness 0-100 range, got \`${i}\``);if(s>1||s<0)throw new Error(`Expected alpha 0-1 range, got \`${s}\``);return`hsla(${t}, 100%, ${i}%, ${s})`}const h=t=>{if("object"==typeof t&&null!==t){if("function"==typeof Object.getPrototypeOf){const i=Object.getPrototypeOf(t);return i===Object.prototype||null===i}return"[object Object]"===Object.prototype.toString.call(t)}return!1},o=["__proto__","constructor","prototype"],a=(...t)=>t.reduce(((t,i)=>(Object.keys(i).forEach((s=>{o.includes(s)||(Array.isArray(t[s])&&Array.isArray(i[s])?t[s]=i[s]:h(t[s])&&h(i[s])?t[s]=a(t[s],i[s]):t[s]=i[s])})),t)),{});class r{x;y;ctx;hue;friction;gravity;flickering;lineWidth;explosionLength;angle;speed;brightness;coordinates=[];decay;alpha=1;constructor({x:t,y:e,ctx:n,hue:h,decay:o,gravity:a,friction:r,brightness:c,flickering:u,lineWidth:d,explosionLength:p}){for(this.x=t,this.y=e,this.ctx=n,this.hue=h,this.gravity=a,this.friction=r,this.flickering=u,this.lineWidth=d,this.explosionLength=p,this.angle=i(0,2*Math.PI),this.speed=s(1,10),this.brightness=s(c.min,c.max),this.decay=i(o.min,o.max);this.explosionLength--;)this.coordinates.push([t,e])}update(t){this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.speed*=this.friction,this.x+=Math.cos(this.angle)*this.speed,this.y+=Math.sin(this.angle)*this.speed+this.gravity,this.alpha-=this.decay,this.alpha<=this.decay&&t()}draw(){const t=this.coordinates.length-1;this.ctx.beginPath(),this.ctx.lineWidth=this.lineWidth,this.ctx.fillStyle=n(this.hue,this.brightness,this.alpha),this.ctx.moveTo(this.coordinates[t][0],this.coordinates[t][1]),this.ctx.lineTo(this.x,this.y),this.ctx.strokeStyle=n(this.hue,this.flickering?i(0,this.brightness):this.brightness,this.alpha),this.ctx.stroke()}}class c{constructor(t,i){this.options=t,this.canvas=i,this.pointerDown=this.pointerDown.bind(this),this.pointerUp=this.pointerUp.bind(this),this.pointerMove=this.pointerMove.bind(this)}active=!1;x;y;get mouseOptions(){return this.options.mouse}mount(){this.canvas.addEventListener("pointerdown",this.pointerDown),this.canvas.addEventListener("pointerup",this.pointerUp),this.canvas.addEventListener("pointermove",this.pointerMove)}unmount(){this.canvas.removeEventListener("pointerdown",this.pointerDown),this.canvas.removeEventListener("pointerup",this.pointerUp),this.canvas.removeEventListener("pointermove",this.pointerMove)}usePointer(t,i){const{click:s,move:e}=this.mouseOptions;(s||e)&&(this.x=t.pageX-this.canvas.offsetLeft,this.y=t.pageY-this.canvas.offsetTop,this.active=i)}pointerDown(t){this.usePointer(t,this.mouseOptions.click)}pointerUp(t){this.usePointer(t,!1)}pointerMove(t){this.usePointer(t,this.active)}}class u{hue;rocketsPoint;opacity;acceleration;friction;gravity;particles;explosion;mouse;boundaries;sound;delay;brightness;decay;flickering;intensity;traceLength;traceSpeed;lineWidth;lineStyle;autoresize;constructor(){this.autoresize=!0,this.lineStyle="round",this.flickering=50,this.traceLength=3,this.traceSpeed=10,this.intensity=30,this.explosion=5,this.gravity=1.5,this.opacity=.5,this.particles=50,this.friction=.95,this.acceleration=1.05,this.hue={min:0,max:360},this.rocketsPoint={min:50,max:50},this.lineWidth={explosion:{min:1,max:3},trace:{min:1,max:2}},this.mouse={click:!1,move:!1,max:1},this.delay={min:30,max:60},this.brightness={min:50,max:80},this.decay={min:.015,max:.03},this.sound={enabled:!1,files:["explosion0.mp3","explosion1.mp3","explosion2.mp3"],volume:{min:4,max:8}},this.boundaries={height:0,width:0,x:50,y:50}}update(t){Object.assign(this,a(this,t))}}class d{constructor(t,i){this.options=t,this.render=i}tick=0;rafId=0;fps=60;tolerance=.1;now;mount(){this.now=performance.now();const t=1e3/this.fps,i=s=>{this.rafId=requestAnimationFrame(i);const e=s-this.now;e>=t-this.tolerance&&(this.render(),this.now=s-e%t,this.tick+=e*(this.options.intensity*Math.PI)/1e3)};this.rafId=requestAnimationFrame(i)}unmount(){cancelAnimationFrame(this.rafId)}}class p{constructor(t,i){this.options=t,this.updateSize=i,this.handleResize=this.handleResize.bind(this)}mount(){this.options.autoresize&&window.addEventListener("resize",this.handleResize)}unmount(){this.options.autoresize&&window.removeEventListener("resize",this.handleResize)}handleResize(){this.updateSize()}}class l{constructor(t){this.options=t,this.init()}buffers=[];audioContext;onInit=!1;get isEnabled(){return this.options.sound.enabled}get soundOptions(){return this.options.sound}init(){!this.onInit&&this.isEnabled&&(this.onInit=!0,this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.loadSounds())}async loadSounds(){for(const t of this.soundOptions.files){const i=await(await fetch(t)).arrayBuffer();this.audioContext.decodeAudioData(i).then((t=>{this.buffers.push(t)})).catch((t=>{throw t}))}}play(){if(this.isEnabled&&this.buffers.length){const t=this.audioContext.createBufferSource(),e=this.buffers[s(0,this.buffers.length-1)],n=this.audioContext.createGain();t.buffer=e,n.gain.value=i(this.soundOptions.volume.min/100,this.soundOptions.volume.max/100),n.connect(this.audioContext.destination),t.connect(n),t.start(0)}else this.init()}}class x{x;y;sx;sy;dx;dy;ctx;hue;speed;acceleration;traceLength;totalDistance;angle;brightness;coordinates=[];currentDistance=0;constructor({x:t,y:i,dx:n,dy:h,ctx:o,hue:a,speed:r,traceLength:c,acceleration:u}){for(this.x=t,this.y=i,this.sx=t,this.sy=i,this.dx=n,this.dy=h,this.ctx=o,this.hue=a,this.speed=r,this.traceLength=c,this.acceleration=u,this.totalDistance=e(t,i,n,h),this.angle=Math.atan2(h-i,n-t),this.brightness=s(50,70);this.traceLength--;)this.coordinates.push([t,i])}update(t){this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.speed*=this.acceleration;const i=Math.cos(this.angle)*this.speed,s=Math.sin(this.angle)*this.speed;this.currentDistance=e(this.sx,this.sy,this.x+i,this.y+s),this.currentDistance>=this.totalDistance?t(this.dx,this.dy,this.hue):(this.x+=i,this.y+=s)}draw(){const t=this.coordinates.length-1;this.ctx.beginPath(),this.ctx.moveTo(this.coordinates[t][0],this.coordinates[t][1]),this.ctx.lineTo(this.x,this.y),this.ctx.strokeStyle=n(this.hue,this.brightness),this.ctx.stroke()}}const g=document.querySelector(".fireworks-container"),m=document.querySelector(".hbd-text-container"),f=new class{target;container;canvas;ctx;width;height;traces=[];explosions=[];waitStopRaf;running=!1;opts;sound;resize;mouse;raf;constructor(t,i={}){this.target=t,this.container=t,this.opts=new u,this.updateOptions(i),this.createCanvas(this.target),this.sound=new l(this.opts),this.resize=new p(this.opts,this.updateSize.bind(this)),this.mouse=new c(this.opts,this.canvas),this.raf=new d(this.opts,this.render.bind(this))}get isRunning(){return this.running}get version(){return"2.10.0"}get currentOptions(){return this.opts}start(){this.running||(this.canvas.isConnected||this.createCanvas(this.target),this.running=!0,this.resize.mount(),this.mouse.mount(),this.raf.mount())}stop(t=!1){!this.running||(this.running=!1,this.resize.unmount(),this.mouse.unmount(),this.raf.unmount(),this.clear(),t&&this.canvas.remove())}async waitStop(t){if(this.running)return new Promise((i=>{this.waitStopRaf=()=>{!this.waitStopRaf||(requestAnimationFrame(this.waitStopRaf),!this.traces.length&&!this.explosions.length&&(this.waitStopRaf=null,this.stop(t),i()))},this.waitStopRaf()}))}pause(){this.running=!this.running,this.running?this.raf.mount():this.raf.unmount()}clear(){!this.ctx||(this.traces=[],this.explosions=[],this.ctx.clearRect(0,0,this.width,this.height))}launch(t=1){for(let i=0;i<t;i++)this.createTrace();this.waitStopRaf||(this.start(),this.waitStop())}updateOptions(t){this.opts.update(t)}updateSize({width:t=this.container.clientWidth,height:i=this.container.clientHeight}={}){this.width=t,this.height=i,this.canvas.width=t,this.canvas.height=i,this.updateBoundaries({...this.opts.boundaries,width:t,height:i})}updateBoundaries(t){this.updateOptions({boundaries:t})}createCanvas(t){t instanceof HTMLCanvasElement?(t.isConnected||document.body.append(t),this.canvas=t):(this.canvas=document.createElement("canvas"),this.container.append(this.canvas)),this.ctx=this.canvas.getContext("2d"),this.updateSize()}render(){if(!this.ctx||!this.running)return;const{opacity:t,lineStyle:s,lineWidth:e}=this.opts;this.ctx.globalCompositeOperation="destination-out",this.ctx.fillStyle=`rgba(0, 0, 0, ${t})`,this.ctx.fillRect(0,0,this.width,this.height),this.ctx.globalCompositeOperation="lighter",this.ctx.lineCap=s,this.ctx.lineJoin="round",this.ctx.lineWidth=i(e.trace.min,e.trace.max),this.initTrace(),this.drawTrace(),this.drawExplosion()}createTrace(){const{hue:i,rocketsPoint:e,boundaries:n,traceLength:h,traceSpeed:o,acceleration:a,mouse:r}=this.opts;this.traces.push(new x({x:this.width*s(e.min,e.max)/100,y:this.height,dx:this.mouse.x&&r.move||this.mouse.active?this.mouse.x:s(n.x,n.width-2*n.x),dy:this.mouse.y&&r.move||this.mouse.active?this.mouse.y:s(n.y,.5*n.height),ctx:this.ctx,hue:s(i.min,i.max),speed:o,acceleration:a,traceLength:t(h)}))}initTrace(){if(this.waitStopRaf)return;const{delay:t,mouse:i}=this.opts;(this.raf.tick>s(t.min,t.max)||this.mouse.active&&i.max>this.traces.length)&&(this.createTrace(),this.raf.tick=0)}drawTrace(){let t=this.traces.length;for(;t--;)this.traces[t].draw(),this.traces[t].update(((i,s,e)=>{this.initExplosion(i,s,e),this.sound.play(),this.traces.splice(t,1)}))}initExplosion(e,n,h){const{particles:o,flickering:a,lineWidth:c,explosion:u,brightness:d,friction:p,gravity:l,decay:x}=this.opts;let g=t(o);for(;g--;)this.explosions.push(new r({x:e,y:n,ctx:this.ctx,hue:h,friction:p,gravity:l,flickering:s(0,100)<=a,lineWidth:i(c.explosion.min,c.explosion.max),explosionLength:t(u),brightness:d,decay:x}))}drawExplosion(){let t=this.explosions.length;for(;t--;)this.explosions[t].draw(),this.explosions[t].update((()=>{this.explosions.splice(t,1)}))}}(g,{hue:{min:0,max:360},acceleration:1,autoresize:!1,brightness:{min:50,max:100},decay:{min:.005,max:.015},delay:{min:100,max:100},explosion:5,flickering:50,intensity:15,friction:.97,gravity:1.5,opacity:.5,particles:200,traceLength:3,traceSpeed:5,rocketsPoint:{min:50,max:50},lineWidth:{explosion:{min:1,max:3},trace:{min:1,max:2}},lineStyle:"round",mouse:{click:!0,move:!1,max:15},background:{color:"#000000"}});f.start(),g.offsetWidth;let y=g.offsetHeight;window.addEventListener("resize",(function(){let t={width:g.offsetWidth,height:y};f.updateSize(t)}));let w=new Date;"27/11"!=w.getDate()+"/"+w.getMonth()&&(m.textContent="")})();