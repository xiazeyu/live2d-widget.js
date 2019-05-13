
function parseTime(sourcetime) {
  const secondsRe = /^(\d+)(s|seconds?)$/g
  const millisecondsRe = /^(\d+)(ms|milliseconds?)$/g
  const minutesRe = /^(\d+)(m|minutes?)$/g
  const time = sourcetime.toLowerCase();
  let resultMillisecond = 0;
  if (secondsRe.test(time)) {
    secondsRe.lastIndex = 0;
    resultMillisecond = parseInt(secondsRe.exec(time)[1]) * 1000;
  } else if (millisecondsRe.test(time)) {
    millisecondsRe.lastIndex = 0;
    resultMillisecond = parseInt(millisecondsRe.exec(time)[1]);
  } else if (minutesRe.test(time)) {
    minutesRe.lastIndex = 0;
    resultMillisecond = parseInt(minutesRe.exec(time)[1]) * 60 * 1000;
  }
  return resultMillisecond;
}

function everyEmitter(engine) {
  return (args, cb) => {
    let sourcetime, idle;
    if (args.length === 1) {
      sourcetime = args[0];
      idle = false
    } else if (args.length === 2) {
      sourcetime = args[1];
      idle = args[0] === 'idle';
    } else {
      return;
    }
    const resultMillisecond = parseTime(sourcetime)
    if (!resultMillisecond) return;

    let timeout = null;

    const func = () => {
      timeout = null;
      cb();
      if (!idle) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(func, resultMillisecond);
      }
    }

    engine.on('emit', () => {
      if (idle) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(func, resultMillisecond);
      }
    });

    func();
  }
}

module.exports = {
  everyEmitter
};