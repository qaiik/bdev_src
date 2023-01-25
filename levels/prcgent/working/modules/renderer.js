import { WebGLRenderer } from 'three'

export const renderer = new WebGLRenderer({
    antialias: true
})

const canvas = renderer.domElement

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(canvas)