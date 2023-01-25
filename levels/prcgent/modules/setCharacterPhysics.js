import { character } from './char.js';

import { createRigidBody, physicsWorld } from './physics.js';
export const setCharacterPhysics = () => {
    let pos = {
        x: 0,
        y: 0,
        z: 0
    };
    let quat = {
        x: 0,
        y: 0,
        z: 0,
        w: 1
    };
    let mass = 1;
    let scale = {
        x: 0.3,
        y: 0.3,
        z: 0.3
    };
    character.position.set(pos.x, pos.y, pos.z);
    let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
    colShape.setMargin(0.05);
    const playerBody = createRigidBody(physicsWorld, character, colShape, mass, pos, quat);
    playerBody.setAngularFactor(0, 1, 0);
    window.pb = playerBody;
}