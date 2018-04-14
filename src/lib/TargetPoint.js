/* global UtSystem, process */

class TargetPoint{
  /**
   * Constructor to TargetPoint.
   * @return  {Function}  The instance function itself.
   */
  constructor(){
    this.EPS = 0.01;
    this.faceTargetX = 0;
    this.faceTargetY = 0;
    this.faceX = 0;
    this.faceY = 0;
    this.faceVX = 0;
    this.faceVY = 0;
    this.lastTimeSec = 0;
    return this;
  }

  /**
   * Set point where model will look at.
   * @param  {Number}  x  X position.
   * @param  {Number}  y  Y position.
   * @return {Function}   The instance function itself.
   */
  setPoint(x, y){
    this.faceTargetX = x;
    this.faceTargetY = y;
    return this;
  }

  /**
   * Get X value. (-1 - 1)
   * @return  {Number}  X value.
   */
  getX(){
    return this.faceX;
  }

  /**
   * Get Y value. (-1 - 1)
   * @return  {Number}  Y value.
   */
  getY(){
    return this.faceY;
  }

  /**
   * Update faceX and faceY.
   * @return  {Function}  The instance function itself.
   */
  update(){
    const timeToMaxSpeed = 0.15;
    const faceParamMaxV = 40.0 / 7.5;
    const maxV = faceParamMaxV / window.fpsCounter.fps;
    if(this.lastTimeSec === 0){
      this.lastTimeSec = UtSystem.getUserTimeMSec();
      return;
    }
    const curTimeSec = UtSystem.getUserTimeMSec();
    const deltaTimeWeight = (curTimeSec - this.lastTimeSec) * window.fpsCounter.fps / 1000.0;
    this.lastTimeSec = curTimeSec;
    const frameToMaxSpeed = timeToMaxSpeed * window.fpsCounter.fps;
    const maxA = deltaTimeWeight * maxV / frameToMaxSpeed;
    const dx = this.faceTargetX - this.faceX;
    const dy = this.faceTargetY - this.faceY;
    if(Math.abs(dx) <= this.EPS && Math.abs(dy) <= this.EPS) return;
    const d = Math.sqrt(dx * dx + dy * dy);
    const vx = maxV * dx / d;
    const vy = maxV * dy / d;
    const ax = vx - this.faceVX;
    const ay = vy - this.faceVY;
    const a = Math.sqrt(ax * ax + ay * ay);
    if(a < -maxA || a > maxA){
      ax *= maxA / a;
      ay *= maxA / a;
      a = maxA;
    }
    this.faceVX += ax;
    this.faceVY += ay;
    {
      const maxV = 0.5 * (Math.sqrt(maxA * maxA + 16 * maxA * d - 8 * maxA * d)- maxA);
      const curV = Math.sqrt(this.faceVX * this.faceVX + this.faceVY + this.faceVY);
      if(curV > maxV){
        this.faceVX *= maxV / curV;
        this.faceVY *= maxV / curV;
      }
    }
    this.faceX += this.faceVX;
    this.faceY += this.faceVY;
    return this;
  }
}


if (process.env.NODE_ENV === 'development') {

  window.TargetPoint = TargetPoint;

}

export {
  TargetPoint,
};
