import * as T from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

const red = '#d94c25', ink = '#312d2c', ivory = '#f7e9ce', silver = '#bcbab1'
function mesh(parent, geometry, color, metalness = 0) {
  const material = new T.MeshStandardMaterial({color, metalness, roughness: metalness ? .31 : .52, side: T.DoubleSide})
  const part = new T.Mesh(geometry, material)
  parent.add(part)
  return part
}
function box(parent, size, color, position, radius = .05, metal = 0) {
  const part = mesh(parent, new RoundedBoxGeometry(...size, 3, radius), color, metal)
  part.position.set(...position)
  return part
}
function group(parent) { const g = new T.Group(); parent.add(g); return g }

export function responsive(root) {
  const frame = group(root)
  box(frame,[3.25,2.12,.19],ink,[0,0,0],.11)
  box(frame,[3.04,1.91,.08],ivory,[0,0,.12],.06)
  box(frame,[3.04,.24,.05],silver,[0,.81,.18],.025)
  const cards = [red,'#9fada7', '#d8aa71'].map(color => {
    const tile=group(root)
    box(tile,[.79,.74,.12],color,[0,.09,0])
    box(tile,[.58,.065,.045],ink,[-.1,-.42,0],.014)
    return tile
  })
  root.rotation.set(-.12,-.32,-.055)
  return t => {
    const fold = T.MathUtils.smoothstep((1-Math.cos(t*1.55))/2,.12,.9)
    frame.scale.x=1-.48*fold
    cards.forEach((card,i)=>{
      card.position.set((i-1)*.96*(1-fold),-.03+(.45-i*.48)*fold,.23)
      card.scale.set(1+.25*fold,1-.56*fold,1)
    })
  }
}

