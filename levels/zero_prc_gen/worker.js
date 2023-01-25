import * as THREE from "three"

onmessage = function(m) {
    let tc = m.data.toClone;
    let s = tc.clone()
    m.data.scene.add(s)
    s.position.set(m.data.x, m.data.y, m.data.z)
}