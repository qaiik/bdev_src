import * as THREE from 'three';

export let character = null;

const characterGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const characterMaterial = new THREE.MeshPhongMaterial({ color: "blue" });
character = new THREE.Mesh(characterGeometry, characterMaterial);
character.castShadow = true;
character.receiveShadow = true;
character.name = "character";
character.position.set(1, 1, 1);

const gunGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.2);
const gunMaterial = new THREE.MeshPhongMaterial({ color: "gold" });
const gun = new THREE.Mesh(gunGeometry, gunMaterial);
gun.castShadow = true;
gun.receiveShadow = true;
gun.position.set(0, 0, -0.2);

character.add(gun);