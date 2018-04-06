/* global process */

class Model{
  constructor(){

  }
}

if (process.env.NODE_ENV === 'development') {

  window.Model = Model;

}

export {
  Model,
};
