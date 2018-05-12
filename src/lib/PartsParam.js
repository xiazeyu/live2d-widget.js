/* global process */

class PartsParam {

  /**
   * Constructor to partsParam.
   * @param   {String}  id  Part param id.
   * @return  {Function}    The instance function itself.
   */
  constructor (id) {

    this.id = id;
    this.paramIndex = -1;
    this.partsIndex = -1;
    this.link = null;
    return this;

  }

  /**
   * Init index.
   * @param   {Model}  model  A Model.
   * @return  {Function}      The instance function itself.
   */
  initIndex (model) {

    this.paramIndex = model.getParamIndex(`VISIBLE:${this.id}`);
    this.partsIndex = model.getPartsDataIndex(PartsDataID.getID(this.id));
    model.setParamFloat(this.paramIndex, 1);
    return this;

  }

}


if (process.env.NODE_ENV === 'development') {

  window.PartsParam = PartsParam;

}

export {
  PartsParam, };
