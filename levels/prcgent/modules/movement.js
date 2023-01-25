import * as THREE from 'three'
import { character } from './char.js'
const keys = {
    'a': 65,
    's': 83,
    'w': 87,
    'd': 68,
  };

export const characterMovement = () => {
    // let movementSpeed = 20;
    // const rotationSpeed = 10;

    // let moveX = keys.d - keys.a;
    // let moveZ = keys.s - keys.w;
    // let moveY = 0;
    // const physicsBody = character.userData.physicsBody;
    // physicsBody.setDamping(0.9, 0.9)
    // if (moveZ || moveX) {
    //     const temporaryEuler = new THREE.Vector3(moveX * movementSpeed, 0, moveZ * movementSpeed).applyQuaternion(Character.quaternion)
    //     physicsBody.applyForce(new Ammo.btVector3(temporaryEuler.x, temporaryEuler.y, temporaryEuler.z))
    // }
    // if (mouse.y) {
    //     // Camera.quaternion.copy(fpc.rotation_, Math.sqrt(1 - fpc.rotation_.x**2 - fpc.rotation_.y**2 - fpc.rotation_.z**2))
    //     //     Math.sqrt(1 - fpc.rotation_.x**2 - fpc.rotation_.y**2 - fpc.rotation_.z**2))
    //     let {
    //         x,
    //         y,
    //         z,
    //         w
    //     } = fpc.rotation_
    //     // y = 0 
    //     const quat = new Ammo.btQuaternion(x, y, z, w)
    //     var transform = new Ammo.btTransform()
    //     transform.setRotation(quat)
    //     transform.setOrigin(physicsBody.getWorldTransform().getOrigin())
    //     physicsBody.setWorldTransform(transform)
    //     // physicsBody.setAngularVelocity(resultantImpulseRotation);
    // }
}