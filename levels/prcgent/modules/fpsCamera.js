import FirstPersonCamera from '../unused/fpc.js'
import { camera } from './camera.js'

export const mkFPSCamera = (pb) => new FirstPersonCamera(camera, null, 0.3, pb)