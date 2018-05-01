/* global UtSystem, process, PhysicsHair, UtDebug */

class Physics {

  /**
   * Constructor to Plysics
   * @return  {Function}  The instance funcion itself.
   */
  constructor (storage) {

    this.storage = storage;
    this.physicsList = new Array();
    this.startTimeMSec = UtSystem.getUserTimeMSec();
    return this;

  }

  /**
   * Load Physics.
   * @param   {Array}  buffer     Buffer of Physics.
   * @param   {Storage}  storage  Storage.
   * @return  {Function}          The instance function itself.
   */
  static load (buffer, storage) {

    const thisRef = new Physics(storage);
    const json = thisRef.storage.getPFM().jsonParseFromBytes(buffer);
    const params = json.physics_hair;
    for (const i in params) {

      const param = params[i];
      const physics = new PhysicsHair();
      const setup = param.setup;
      const length = parseFloat(setup.length);
      const resist = parseFloat(setup.regist);
      const mass = parseFloat(setup.mass);
      physics.setup(length, resist, mass);
      const srcList = param.src;
      for (const j in srcList) {

        const src = srcList[j];
        const id = src.id;
        const type = PhysicsHair.Src.SRC_TO_X;
        const typeStr = src.ptype;
        if (typeStr === 'x') {

          type = PhysicsHair.Src.SRC_TO_X;

        } else if (typeStr === 'y') {

          type = PhysicsHair.Src.SRC_TO_Y;

        } else if (typeStr === 'angle') {

          type = PhysicsHair.Src.SRC_TO_G_ANGLE;

        } else {

          UtDebug.error('live2d', 'Invalid parameter:PhysicsHair.Src');

        }
        const scale = parseFloat(src.scale);
        const weight = parseFloat(src.weight);
        physics.addSrcParam(type, id, scale, weight);

      }
      const targetList = param.targets;
      for (const j in targetList) {

        const target = targetList[j];
        const id = target.id;
        let type = PhysicsHair.Target.TARGET_FROM_ANGLE;
        const typeStr = target.ptype;
        if (typeStr === 'angle') {

          type = PhysicsHair.Target.TARGET_FROM_ANGLE;

        } else if (typeStr === 'angle_v') {

          type = PhysicsHair.Target.TARGET_FROM_ANGLE_V;

        } else {

          UtDebug.error('live2d', 'Invalid parameter:PhysicsHair.Target');

        }
        const scale = parseFloat(target.scale);
        const weight = parseFloat(target.weight);
        physics.addTargetParam(type, id, scale, weight);

      }
      thisRef.physicsList.push(physics);

    }
    return thisRef;

  }

  /**
   * Update Physics param.
   * @param   {Model}  model  A model.
   * @return  {Function}      The instance function itself.
   */
  updateParam (model) {

    const timeMSec = UtSystem.getUserTimeMSec() - this.startTimeMSec;
    for (const i in physicsList) {

      this.physicsList[i].update(model, timeMSec);

    }
    return this;

  }

}


if (process.env.NODE_ENV === 'development') {

  window.Physics = Physics;

}

export {Physics, };
