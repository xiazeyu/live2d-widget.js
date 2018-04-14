/* global process, MotionQueueManager */

class MotionManager extends MotionQueueManager{
  /**
   * Constructor to MotionManager.
   * @return  {Function}  The instance function itself.
   */
  constructor(){
    super();
    this.currentPriority = null;
    this.reservePriority = null;
    return this;
  }

  /**
   * Get current priority.
   * @return  {Number}  Current priority.
   */
  getCurrentPriority(){
    return this.currentPriority;
  }

  /**
   * Get reserve priority.
   * @return  {Number}  Reserce priority.
   */
  getReservePriority(){
    return this.reservePriority;
  }

  /**
   * Reserve motion.
   * @param   {Number}  priority  Priority to reserve.
   * @return  {Boolean}           Succeed or not.
   */
  reserveMotion(priority){
    if(this.getReservePriority() >= priority){
      return false;
    } else if(this.getCurrentPriority() >= priority ){
      return false;
    }
    this.reservePriority = priority;
    return true;
  }

  /**
   * Set reserve priority.
   * @param  {Function}  value  The instance function itself.
   */
  setReservePriority(value){
    this.reservePriority = value;
    return this;
  }

  /**
   * Update param.
   * @param   {Model}  model  A Model.
   */
  updateParam(model){
    const updated = MotionQueueManager.prototype.updateParam.call(this, model);
    if(this.isFinished()){
      this.currentPriority = 0;
    }
    return updated;
  }

  /**
   * start motion prio.
   * @param   {Motion}  motion    A motion.
   * @param   {Number}  priority  Priority.
   */
  startMotionPrio(motion, priority){
    if(priority === this.reservePriority){
      this.reservePriority = 0;
    }
    this.currentPriority = priority;
    return this.startMotion(motion, false);
  }
}


if (process.env.NODE_ENV === 'development') {

  window.MotionManager = MotionManager;

}

export {
  MotionManager,
};
