import * as THREE from 'three'

export const prefabArray = [];

//red
prefabArray.push((rs) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(rs,1,rs),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    )
})

//green
prefabArray.push((rs) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(rs,1,rs),
        new THREE.MeshBasicMaterial({color: 0x00ff00})
    )
})

//blue
prefabArray.push((rs) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(rs,1,rs),
        new THREE.MeshBasicMaterial({color: 0x0000ff})
    )
})

//brown / empty
prefabArray.push((rs) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(rs,1,rs),
        new THREE.MeshBasicMaterial({color: new THREE.Color("brown")})
    )
})