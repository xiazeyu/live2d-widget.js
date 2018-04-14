class Physics{
  constructor(){

  }
}


if (process.env.NODE_ENV === 'development') {

  window.Physics = Physics;

}

export {
  Physics,
};
