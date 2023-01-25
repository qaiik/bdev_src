import InputController from './ipc.js'
import * as THREE from "three"
const KEYS = {
  'a': 65,
  's': 83,
  'w': 87,
  'd': 68,
};

function clamp(x, a, b) {
  return Math.min(Math.max(x, a), b);
}
export default class FirstPersonCamera {
  constructor(camera, objects, sensitivity, po) {
    this.po_ = po
    this.camera_ = camera;
    this.input_ = new InputController();
    this.rotation_ = new THREE.Quaternion();
    this.translation_ = new THREE.Vector3(0, 2, 0);
    this.phi_ = 0;
    this.phiSpeed_ = 8;
    this.theta_ = 0;
    this.thetaSpeed_ = 5;
    this.headBobActive_ = false;
    this.headBobTimer_ = 0;
    this.objects_ = objects;
    this.sensitivity_ = sensitivity;
  }
  update(timeElapsedS) {
    // this.updateRotation_(timeElapsedS);
    // this.updateCamera_(timeElapsedS);
    // this.updateTranslation_(timeElapsedS);
    // // this.updateHeadBob_(timeElapsedS);
    // this.input_.update(timeElapsedS);
  }
  updateCamera_(_) {
    window.pfb = this.po_
    // this.po_.applyImpulse(
    //   new Ammo.btVector3(this.translation_.x, this.translation_.y, this.translation_.z)
    // )
    this.camera_.position.set(
      this.po_.getWorldTransform().getOrigin().x(), 
      this.po_.getWorldTransform().getOrigin().y() + 2, 
      this.po_.getWorldTransform().getOrigin().z()
    );

    // this.po_.
    this.camera_.quaternion.set(
      this.po_.getWorldTransform().getRotation().x(), // this.po_.getWorldTransform().getRotation().x(), 
      this.po_.getWorldTransform().getRotation().y(),
      this.po_.getWorldTransform().getRotation().z(), //this.po_.getWorldTransform().getRotation().z(),
      this.po_.getWorldTransform().getRotation().w()
    );
    

    
    // this.camera_.quaternion.set(
    //   this.po_.getWorldTransform().getRotation().x(), 
    //   this.po_.getWorldTransform().getRotation().y(), 
    //   this.po_.getWorldTransform().getRotation().z()
    // );
    this.camera_.position.y += Math.sin(this.headBobTimer_ * 13) * 0.2;
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(this.rotation_);
    const dir = forward.clone();
    forward.multiplyScalar(100);
    forward.add(this.translation_);
    // let closest = forward;
    // const result = new THREE.Vector3();
    // const ray = new THREE.Ray(this.translation_, dir);
    // for (let i = 0; i < this.objects_.length; ++i) {
    //   if (ray.intersectBox(this.objects_[i], result)) {
    //     if (result.distanceTo(ray.origin) < closest.distanceTo(ray.origin)) {
    //       closest = result.clone();
    //     }
    //   }
    // }
    // console.log(closest)
  }
  updateHeadBob_(timeElapsedS) {
    if (this.headBobActive_) {
      const wavelength = Math.PI;
      const nextStep = 1 + Math.floor(((this.headBobTimer_ + 0.000001) * 10) / wavelength);
      const nextStepTime = nextStep * wavelength / 10;
      this.headBobTimer_ = Math.min(this.headBobTimer_ + timeElapsedS, nextStepTime);
      if (this.headBobTimer_ == nextStepTime) {
        this.headBobActive_ = false;
      }
    }
  }
  updateTranslation_(timeElapsedS) {
    const forwardVelocity = (this.input_.key(KEYS.w) ? 1 : 0) + (this.input_.key(KEYS.s) ? -1 : 0)
    const strafeVelocity = (this.input_.key(KEYS.a) ? 1 : 0) + (this.input_.key(KEYS.d) ? -1 : 0)
    const qx = new THREE.Quaternion();
    qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi_);
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(qx);
    forward.multiplyScalar(forwardVelocity * timeElapsedS * 10);
    const left = new THREE.Vector3(-1, 0, 0);
    left.applyQuaternion(qx);
    left.multiplyScalar(strafeVelocity * timeElapsedS * 10);
    this.translation_.add(forward);
    this.translation_.add(left);
    if (forwardVelocity != 0 || strafeVelocity != 0) {
      this.headBobActive_ = true;
    }
  }
  updateRotation_(timeElapsedS) {
    const xh = this.input_.current_.mouseXDelta / window.innerWidth * this.sensitivity_;
    const yh = this.input_.current_.mouseYDelta / window.innerHeight * this.sensitivity_;
    this.phi_ += -xh * this.phiSpeed_;
    this.theta_ = clamp(this.theta_ + -yh * this.thetaSpeed_, -Math.PI / 3, Math.PI / 3);
    const qx = new THREE.Quaternion();
    qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi_);
    const qz = new THREE.Quaternion();
    qz.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.theta_);
    const q = new THREE.Quaternion();
    q.multiply(qx);
    q.multiply(qz);
    this.rotation_.copy(q);
  }
}