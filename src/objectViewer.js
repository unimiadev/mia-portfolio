import * as T from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { responsive } from './heroModels'

export function mountViewer(button, canvas) {
  const renderer = new T.WebGLRenderer({canvas, alpha:true, antialias:true})
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
  renderer.toneMapping=T.ACESFilmicToneMapping
  renderer.toneMappingExposure=.98
  const scene=new T.Scene()
  const studio=new RoomEnvironment()
  const generator=new T.PMREMGenerator(renderer)
  const lighting=generator.fromScene(studio,.035)
  scene.environment=lighting.texture
  scene.environmentIntensity=.82
  studio.dispose();generator.dispose()
  const key=new T.DirectionalLight(0xfff3da,2.2);key.position.set(-3,5,4);scene.add(key)
  const edge=new T.DirectionalLight(0xcfe4ff,1.25);edge.position.set(4,2,-3);scene.add(edge)
  const camera=new T.OrthographicCamera(-2,2,2,-2,.1,50)
  camera.position.set(0,2.2,7);camera.lookAt(0,.12,0)
  const pivot=new T.Group(),model=new T.Group()
  scene.add(pivot);pivot.add(model)
  const animate=responsive(model)
  const motion=matchMedia('(prefers-reduced-motion: reduce)')
  let frame=0,visible=true,last=0,elapsed=0,target=0,turn=0,hover=false
  function request() { if(visible && !document.hidden && !frame) frame=requestAnimationFrame(draw) }
  function draw(now) {
    frame=0
    const dt=last ? Math.min((now-last)/1000,.05) : 0
    last=now
    if(!motion.matches) elapsed+=dt
    const goal=turn+(motion.matches?0:target)
    pivot.rotation.y+= (goal-pivot.rotation.y)*(motion.matches?1:1-Math.exp(-9*dt))
    animate(motion.matches ? .8 + turn : elapsed + .8)
    renderer.render(scene,camera)
    canvas.style.opacity='1'
    if(!motion.matches && (elapsed<4 || hover || Math.abs(goal-pivot.rotation.y)>.002))request()
  }
  function size(){
    const {width,height}=button.getBoundingClientRect()
    const aspect=width/Math.max(height,1),half=Math.max(1.98,2.45/aspect)
    camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half
    camera.updateProjectionMatrix();renderer.setSize(width,height,false);request()
  }
  function move(e){if(e.pointerType==='mouse'){const box=button.getBoundingClientRect();target=((e.clientX-box.left)/box.width-.5)*1.05;hover=true;request()}}
  function leave(){hover=false;target=0;request()}
  function rotate(){turn+=Math.PI/5;elapsed=0;request()}
  function pageChange(){last=0;request()}
  const resize=new ResizeObserver(size)
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;last=0;request()})
  button.addEventListener('pointermove',move);button.addEventListener('pointerleave',leave)
  button.addEventListener('pointercancel',leave);button.addEventListener('click',rotate)
  document.addEventListener('visibilitychange',pageChange)
  motion.addEventListener('change',pageChange)
  resize.observe(button);observer.observe(button);size()
  return ()=>{
    cancelAnimationFrame(frame);resize.disconnect();observer.disconnect()
    button.removeEventListener('pointermove',move);button.removeEventListener('pointerleave',leave)
    button.removeEventListener('pointercancel',leave);button.removeEventListener('click',rotate)
    document.removeEventListener('visibilitychange',pageChange);motion.removeEventListener('change',pageChange)
    scene.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose()}})
    lighting.dispose();renderer.dispose();renderer.forceContextLoss()
  }
}
