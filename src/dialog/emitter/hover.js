function hoverEmitter() {
  return (args, cb) => {
    document.querySelectorAll(args[0]).forEach(element => {
      element.addEventListener('mouseenter', () => {
        cb();
      })
    })
  };
}

module.exports = {
  hoverEmitter
};