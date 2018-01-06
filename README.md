[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![devdeps][devdeps]][devdeps-url]

[![downloads][downloads]][downloads-url]
[![downloads-month][downloads-month]][downloads-month-url]

[![GitHub stars][GitHub stars]][GitHub stars-url]
[![GitHub forks][GitHub forks]][GitHub forks-url]
[![GitHub issues][GitHub issues]][GitHub issues-url]

[![Commitizen friendly][Commitizen friendly]][Commitizen friendly-url]
[![PRs Welcome][PRs Welcome]][PRs Welcome-url]
[![license][license]][license-url]


# live2d-widget.js

Add the Sseexxyyy live2d to your webpages!

[TOC]

Demo: [TBD.](javascript:void(0);)

Online generator: [TBD.](javascript:void(0);)


## Installation

### Hexo

Please visit [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d) for the hexo plugin.

### Webpack

Install the module:

```
npm install --save live2d-widet.js
```

Import the module:

```js
// using as es modules
import 'live2d-widget.js';
```

Then call the function along with your config.

```js
initL2Dwidget({
  'config1': 'value1',
  'config2': 'value2',
});
```

### Online

https://github.com/jsdelivr/jsdelivr/

TBD.

## Settings

See src/SettingTip.txt

<details><summary>Current supported models:</summary><br>

  - `chitose`
  - `Epsilon2.1`
  - `Gantzert_Felixander`
  - `haru01`
  - `haru02`
  - `haruto`
  - `hibiki`
  - `hijiki`
  - `izumi`
  - `koharu`
  - `miku`
  - `nico`
  - `ni-j`
  - `nipsilon`
  - `nito`
  - `shizuku`
  - `tororo`
  - `tsumiki`
  - `Unitychan`
  - `wanko`
  - `z16`

</details>

## Custom model

1. Create a `live2d_models` folder at your blog's root directory.

2. Create a folder by the name of your model.

3. Copy your model to this folder.

**Attention! The path of the model's json must be  `/live2d_models/{name}/{name}.model.json`**

<details><summary>An Example:</summary><br>

Your model is named `mymiku`.

Then, create a folder at  `/` (Which should exists `_config.yml` 、`sources` 、 `themes` ) named `mymiku`.

Copy your model to `/live2d_models/mymiku/`.

Up to now, there should be `mymiku.model.json` in the directory of `/live2d_models/mymiku/`.

</details>

<br>~The problem was once releated to [(#22)](https://github.com/EYHN/hexo-helper-live2d/issues/22).~

<br>

Enjoy!:beer:

> This is my first hexo plugin, star :star: and watch :eyeglasses:, pull request is also welcomed.

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Contribute

**Please pay enough attention to this document if you want to commit your changes or submit issues.**

[CONTRIBUTING](./CONTRIBUTING.md)

## Releated projects

- [Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)

- [pixi-live2d](https://github.com/avgjs/pixi-live2d)

- [CubismJsComponents](https://github.com/Live2D/CubismJsComponents)

- [live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)

- [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)


## About me

[![Author][author]][author-url]
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fxiazeyu%2Flive2d-widget.js.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fxiazeyu%2Flive2d-widget.js?ref=badge_shield)

[![QQ][qq]][qq-url]

[![Email][email]][email-url]


## Imported

[![current-device][current-device]][current-device-url]

<br>

Open sourced under the GPL v2.0 license.

[npm]: https://badge.fury.io/js/hexo-helper-live2d.svg?label=hexo-helper-live2d
[npm-url]: https://www.npmjs.com/package/hexo-helper-live2d

[deps]: https://img.shields.io/david/EYHN/hexo-helper-live2d.svg
[deps-url]: javascript:void(0);

[devdeps]:  https://img.shields.io/david/dev/EYHN/hexo-helper-live2d.svg
[devdeps-url]: javascript:void(0);

[license]: https://img.shields.io/github/license/EYHN/hexo-helper-live2d.svg
[license-url]: https://github.com/EYHN/hexo-helper-live2d/blob/master/LICENSE

[PRs Welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[PRs Welcome-url]: http://makeapullrequest.com

[downloads]:  https://img.shields.io/npm/dt/hexo-helper-live2d.svg
[downloads-url]: https://www.npmjs.com/package/hexo-helper-live2d

[downloads-month]: https://img.shields.io/npm/dm/hexo-helper-live2d.svg
[downloads-month-url]: https://www.npmjs.com/package/hexo-helper-live2d

[Commitizen friendly]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[Commitizen friendly-url]: http://commitizen.github.io/cz-cli/

[GitHub stars]: https://img.shields.io/github/stars/EYHN/hexo-helper-live2d.svg
[GitHub stars-url]: https://github.com/EYHN/hexo-helper-live2d/stargazers

[GitHub forks]: https://img.shields.io/github/forks/EYHN/hexo-helper-live2d.svg
[GitHub forks-url]: https://github.com/EYHN/hexo-helper-live2d/network

[GitHub issues]: https://img.shields.io/github/issues/EYHN/hexo-helper-live2d.svg
[GitHub issues-url]: https://github.com/EYHN/hexo-helper-live2d/issues

[author]: https://img.shields.io/badge/author-cneyhn-green.svg
[author-url]: https://delusion.coding.me/

[qq]: https://img.shields.io/badge/QQ-1106996185-blue.svg
[qq-url]: http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes

[email]: https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg
[email-url]: mailto:cneyhn@gmail.com

[current-device]: https://img.shields.io/npm/v/current-device.svg?label=current-device
[current-device-url]: https://github.com/matthewhudson/current-device


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fxiazeyu%2Flive2d-widget.js.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fxiazeyu%2Flive2d-widget.js?ref=badge_large)