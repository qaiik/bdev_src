import * as THREE from 'three'

const s = new THREE.TextureLoader().load("./cc.jpg")

export const createPrefab = (thisarg, pos, qt, rms) => {
    const geo = new THREE.BoxGeometry(rms, 1, rms)
    const mat = new THREE.MeshBasicMaterial({
        color: ~~(Math.random() * 0xFFFFFF),
        map: s
    })

    const pfb = new THREE.Mesh(geo, mat)
    pfb.position.set(pos.x,pos.y, pos.z)
    pfb.quaternion.set(qt.x,qt.y,qt.z,qt.w)
    return pfb
}