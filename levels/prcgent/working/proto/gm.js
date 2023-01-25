import * as THREE from 'three'
import { prefabArray } from '../modules/prefabs.js'

export const GenerationManagerFunc = (thisarg) => {

    const { scene, createPrefab } = thisarg
    return class GenManager {
        constructor({mapSize, roomSize, extraEmptyLevel}) {
            this.mapSize = Math.round(Math.sqrt(mapSize)) ** 2
            this.rows = Math.sqrt(this.mapSize)
            this.roomSize = roomSize
            this.roomPtr = 0;
            this.pos = new THREE.Vector3(0, 0, 0);
            this.px = 0;
            this.pz = 0;
            this.chunks = []
            this.emptyLevel = extraEmptyLevel;
        }

        generate() {
            const chunk = new THREE.Object3D();
            this.chunks.push(chunk)
            scene.add(chunk)

            for (let i = 0; i < this.mapSize; i++) {

                if (this.roomPtr == this.rows) {
                    this.px = 0;
                    this.roomPtr = 0

                    this.pz -= this.roomSize
                }
                this.pos.set(this.px, 0, this.pz)
                const p = createPrefab(this.pos, new THREE.Quaternion, this.roomSize, this.emptyLevel)

                chunk.add(p)

                this.roomPtr++
                this.px += this.roomSize

            }
        }
    }
}