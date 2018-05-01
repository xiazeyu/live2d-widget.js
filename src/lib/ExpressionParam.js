/* global process */

class ExpressionParam {

  /**
   * Constructor to ExpressionParam
   * @return  {Function}  The instance function itself.
   */
  constructor () {

    this.id = '';
    this.type = -1;
    this.value = null;
    return this;

  }

}


if (process.env.NODE_ENV === 'development') {

  window.ExpressionParam = ExpressionParam;

}

export {ExpressionParam, };
