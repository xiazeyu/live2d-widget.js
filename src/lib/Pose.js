/* global process */

import {
  PartsParam,
} from './PartsParam';

class Pose {

  /**
   * Constructor to Pose.
   * @param   {Storage}  storage  Storage.
   * @return  {Function}          The instance function itself.
   */
  constructor (storage) {

    this.storage = storage;
    this.lastTime = 0;
    this.model = null;
    this.partsGroups = new Array();
    return this;

  }

  /**
   * Load Pose.
   * @param   {Array}  buffer  Buffer of Pose.
   * @return  {Function}       The instance function itself.
   */
  static load (buffer) {

    const thisRef = new Pose();
    const json = this.storage.getPFM().jsonParseFromBytes(buffer);
    const poseListInfo = json.parts_visible;
    for(const i in poseListInfo) {

      const poseInfo = poseListInfo[i];
      const idListInfo = postInfo.group;
      const partsGroup = new Array();
      for(const j in idListInfo) {

        const partsInfo = idListInfo[j];
        const parts = new PartsParam(partsInfo.id);
        partsGroup[j] = parts;
        if(partsInfo.link == null) {

          continue;

        }
        const linkListInfo = partsInfo.link;
        parts.link = new Array();
        for(const k in linkListInfo) {

          const linkParts = new PartsParam(linkListInfo[k]);
          parts.link.push(linkParts);

        }

      }
      thisRef.partsGroups.push(partsGroup);

    }
    return thisRef;

  }

  /**
   * Update param
   * @param   {Model}  model  A model.
   * @return  {Function}      The instance function itself.
   */
  updateParam (model) {

    if(model == null) {

      return;

    }
    if(!(model === this.model)) {

      this.initParam(model);

    }
    this.model = model;
    const curTime = UtSystem.getUserTimeMSec();
    const deltaTimeSec = this.lastTime == 0 ? 0 : (curTime - this.lastTime) / 1000.0;
    this.lastTime = curTime;
    if(deltaTimeSec < 0) {

      deltaTimeSec = 0;

    }
    for(const i in partsGroups) {

      this.normalizePartsOpacityGroup(model, this.partsGroups[i], deltaTimeSec)
        .copyOpacityOtherParts(model, this.partsGroups[i]);

    }
    return this;

  }

  /**
   * Init param for Pose.
   * @param   {Model}  model  A Model.
   * @return  {Function}      The instance function itself.
   */
  initParam (model) {

    if(model == null) {

      return;

    }
    for(const i in partsGroups) {

      const partsGroup = this.partsGroups[i];
      for(const j in partsGroup) {

        partsGroup[j].initIndex(model);
        const partsIndex = partsGroup[j].partsIndex;
        const paramIndex = partsGroup[j].paramIndex;
        if (partsIndex < 0) {

          continue;

        }
        const v = model.getParamFloat(paramIndex) !== 0;
        model.setPartsOpacity(partsIndex, v ? 1.0 : 0.0)
          .setParamFloat(paramIndex, v ? 1.0 : 0.0);
        if (partsGroup[j].link == null) {

          continue;

        }
        for(const k in partsGroup) {

          partsGroup[j].link[k].initIndex(model);

        }

      }

    }
    return this;

  }

  /**
   * Normalize parts opacity group
   * @param   {Model}  model              A Model.
   * @param   {PartsParam[]}  partsGroup  Parts group.
   * @param   {Number}  deltaTimeSec      Delta time.
   * @return  {Function}                  The instance function itself.
   */
  normalizePartsOpacityGroup (model, partsGroup, deltaTimeSec) {

    let visibleParts = -1;
    let visibleOpacity = 1.0;
    const clearTimeSec = 0.5;
    const phi = 0.5;
    const maxBackOpacity = 0.15;
    for(i in partsGroup) {

      const partsIndex = partsGroup[i].partsIndex;
      const paramIndex = partsGroup[i].paramIndex;
      if(partsIndex < 0) {

        continue;

      }
      if(model.getParamFloat(paramIndex) !== 0) {

        if(visibleParts >= 0) {

          break;

        }
        visibleParts = i;
        visibleOpacity = model.getPartsOpacity(partsIndex);
        visibleOpacity += deltaTimeSec / clearTimeSec;
        if(visibleOpacity > 1) {

          visibleOpacity = 1;

        }

      }

    }
    if(visibleParts < 0) {

      visibleParts = 0;
      visibleOpacity = 1;

    }
    for(const i in partsGroup) {

      const partsIndex = partsGroup[i].partsIndex;
      if(partsIndex < 0) {

        continue;

      }
      if(visibleParts === i) {

        model.setPartsOpacity(partsIndex, visibleOpacity);

      } else {

        let opacity = model.getPartsOpacity(partsIndex);
        let a1;
        if(visibleOpacity < phi) {

          a1 = visibleOpacity * (phi - 1) / phi + 1;

        }else{

          a1 = (1 - visibleOpacity) * phi / (1 - phi);

        }
        const backOp = (1 - a1) * (1 - visibleOpacity);
        if(backOp > maxBackOpacity) {

          a1 = 1 - maxBackOpacity / (1 - visibleOpacity);

        }
        if(opacity > a1) {

          opacity = a1;

        }
        model.setPartsOpacity(partsIndex, opacity);

      }

    }
    return this;

  }

  /**
   * Copy opacity other parts.
   * @param   {Model}  model              A Model.
   * @param   {PartsParam[]}  partsGroup  Parts group.
   * @return  {Function}                  The instance function itself.
   */
  copyOpacityOtherParts (model, partsGroup) {

    for(const i in partsGroup) {

      const partsParam = partsGroup[i];
      if(partsParam.link == null) {

        continue;

      }
      if(partsParam.partsIndex < 0) {

        continue;

      }
      const opacity = model.getPartsOpacity(partsParam.partsIndex);
      for(const j in partsParam.link) {

        const linkParts = partsParam.link[j];
        if (linkParts.partsIndex < 0) {

          continue;

        }
        model.setPartsOpacity(linkParts.partsIndex, opacity);

      }

    }
    return this;

  }

}


if (process.env.NODE_ENV === 'development') {

  window.Pose = Pose;

}

export {
  Pose,
};
