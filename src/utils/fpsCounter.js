/* global process */

/*
 * FrameRate from stats.js
 * https://github.com/mrdoob/stats.js
 */

window.fpsCounter = window.fpsCounter || {
  '_beginTime': (performance || Date).now(),
  '_framesCounting': 0,
  'fps': 60,
  '_actived': false,
  'start': () => {

    if (window.fpsCounter._actived) {

      return;

    }
    window.fpsCounter._actived = true;
    window.fpsCounter._counter();

  },
  '_counter': () => {

    const offset = (performance || Date).now() - window.fpsCounter._beginTime;
    window.fpsCounter._framesCounting++;
    if (offset >= 1000) {

      window.fpsCounter._beginTime += offset;
      window.fpsCounter.fps = window.fpsCounter._framesCounting;
      window.fpsCounter._framesCounting = 0;

    }
    window.requestAnimationFrame(window.fpsCounter._counter);

  },
};

window.fpsCounter.start();
