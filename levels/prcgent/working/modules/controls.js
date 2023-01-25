import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import { camera } from './camera.js'
import { renderer } from './renderer.js'

export const controls = new OrbitControls(camera, renderer.domElement)