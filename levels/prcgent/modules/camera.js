import { PerspectiveCamera } from 'three';
import { scene } from './scene.js'

export const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 30000);
scene.add(camera)


camera.position.set(0, 5, 30)