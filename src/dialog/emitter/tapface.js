function tapfaceEmitter(app) {
  return (args, cb) => {
    app.on('tapface', cb);
  };
}

module.exports = {
  tapfaceEmitter
};