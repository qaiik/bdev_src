//base
import * as THREE from 'three'
import { scene } from './modules/scene.js'
import { camera } from './modules/camera.js'
import { renderer } from './modules/renderer.js'
// import { controls } from './modules/controls.js'
import { character } from './modules/char.js'
import { physicsWorld, setupPhysicsWorld, createRigidBody, updatePhysics } from './modules/physics.js'
import { mkFPSCamera } from './modules/fpsCamera.js'
import { setCharacterPhysics } from './modules/setCharacterPhysics.js'

//funcs
import { GenerationManagerFunc } from './proto/gm.js'
import { createPrefab } from './proto/cpfb.js'
import { data as guiData, gui, mapSizeSlider, roomSizeSlider } from './proto/gui.js'
import { characterMovement } from './modules/movement.js'

//other
import * as dat from './jsm/dg_module.js'


class PrGen {
    constructor() {
        this.animates = [ this.tickFunc ]
        this.__rendererAnimate = () => { renderer.render ( scene, camera ) }
        this._loadMods()
        this.delta = 0;
    }


    _loadMods() {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        // this.controls = controls;
    }
    tickFunc() {
        requestAnimationFrame(() => this._animate())
    }
    _animate() {
        for (const animate of this.animates) {
            animate.call(this)
        }
    }
    
    start() {
        this._animate()
    }

    animate(f) {
        this.animates.push(f)
    }


    importPrototype(name, f) {
        if (typeof f != "function") throw new Error("Prototype must be a function")
        this[name] = (...args) => f(this, ...args)
    }
}


function setPlane() {
    var geo = new THREE.PlaneGeometry(5, 5);
    var mat = new THREE.MeshBasicMaterial({ color: 0x0000FF, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(geo, mat);

    scene.add(plane);
}

const publicClock = new THREE.Clock()
async function main() {
    const app = new PrGen();

    window.app = app

    setupPhysicsWorld();

    app.importPrototype("createPrefab", createPrefab)
    app.importPrototype("CreateGenerationManager", GenerationManagerFunc);
    const gm = new (app.CreateGenerationManager())({
        mapSize: guiData.map.size,
        roomSize: guiData.map.roomSize,
    })

    setCharacterPhysics()
    window.gm = gm

    setPlane()
    const FPSCamera = mkFPSCamera(character.userData.physicsBody)
    // app.animate(() => {
    //     controls.update()
    // });

    app.animate(() => {
        app.delta = publicClock.getDelta()
        FPSCamera.update(app.delta)
        window.fw = physicsWorld
        characterMovement()
        updatePhysics(app.delta)
        camera.position.set(
            character.userData.physicsBody.getWorldTransform().getOrigin().x(),
            5,
            character.userData.physicsBody.getWorldTransform().getOrigin().z(),
        )
    })
    app.animate(app.__rendererAnimate);
    app.start()

    window.onkeyup = k => {
        if (k.code == "KeyG") {
            gm.generate()
        }
    }
}


Ammo().then(main)

window.camera = camera
window.scene = scene
window.THREE = THREE
window.guid = guiData
window.g = gui
window.slider = mapSizeSlider
window.character = character

mapSizeSlider.onSqrVal = v => {
    gm.mapSize = v
    gm.rows = Math.sqrt(gm.mapSize)
}

roomSizeSlider.onSqrVal = v => {
    gm.roomSize = v
}