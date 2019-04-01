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

[![Backers on Open Collective](https://opencollective.com/live2d-widgetjs/backers/badge.svg)](#backers)
 [![Sponsors on Open Collective](https://opencollective.com/live2d-widgetjs/sponsors/badge.svg)](#sponsors) 

# live2d-widget.js

Add the Sseexxyyy live2d to your webpages! Seperated from [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d).

Demo: [Still working, but you can have a look~](https://l2dwidget.js.org/dev.html)

Docs(including APIs): [Click me!](https://l2dwidget.js.org)

Online generator: [TBD.](javascript:void(0);)


## Useage

### Hexo

Please visit [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d) for the hexo plugin.

### Webpages

#### File on your server

Download the [latest release](https://github.com/xiazeyu/live2d-widget.js/releases),

and then copy and extract the `lib` folder to your website.

Use [online generator](javascript:void(0);) **(recommended)** to generate codes.

<details><summary>However, if you want to do it manually, follow the instruction below:</summary><br>

import the js:

```html

<script src = "( your script path here )"></script>

```

Then call the function along with your config.

```js
L2Dwidget.init({
  'config1': 'value1',
  'config2': 'value2',
});
```

</details>

### Bookmark (any pages)

TBD.

https://www.cnblogs.com/pcyy/p/5655542.html


## Settings

See the [document](https://xiazeyu.github.io/live2d-widget.js/docs/class/src/index.js~L2Dwidget.html#instance-method-init).

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

See [WEBPACK VISUALIZER](https://l2dwidget.js.org/stats.html)

Enjoy!:beer:

> This is my first hexo plugin, star :star: and watch :eyeglasses:, pull request is also welcomed.

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Contribute

**Please pay enough attention to this document if you want to commit your changes or submit issues.**

[CONTRIBUTING](./CONTRIBUTING.md)

## Releated projects

- [Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)

- [live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)

- [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

- [pixi-live2d](https://github.com/avgjs/pixi-live2d)

- [CubismJsComponents](https://github.com/Live2D/CubismJsComponents)



## About me

[![Author][author]][author-url]

[![Author QQ][author-qq]][author-qq-url]

[![Author Email][author-email]][author-email-url]


[![Collaborator 0][collaborator0]][collaborator0-url]

[![Collaborator 0 QQ][collaborator0-qq]][collaborator0-qq-url]

[![Collaborator 0 Email][collaborator0-email]][collaborator0-email-url]


## Imported

[![current-device][current-device]][current-device-url]

## Special Thanks

- @mashirozx 
- @fghrsh
- @journey-ad
- @gwzz

<br>

Open sourced under the GPL v2.0 license.

[npm]: https://badge.fury.io/js/live2d-widget.svg?label=live2d-widget
[npm-url]: https://www.npmjs.com/package/live2d-widget

[deps]: https://img.shields.io/david/xiazeyu/live2d-widget.js.svg
[deps-url]: javascript:void(0);

[devdeps]:  https://img.shields.io/david/dev/xiazeyu/live2d-widget.js.svg
[devdeps-url]: javascript:void(0);

[license]: https://img.shields.io/github/license/xiazeyu/live2d-widget.js.svg
[license-url]: https://github.com/xiazeyu/live2d-widget.js/blob/master/LICENSE

[PRs Welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[PRs Welcome-url]: http://makeapullrequest.com

[downloads]:  https://img.shields.io/npm/dt/live2d-widget.svg
[downloads-url]: https://www.npmjs.com/package/live2d-widget

[downloads-month]: https://img.shields.io/npm/dm/live2d-widget.svg
[downloads-month-url]: https://www.npmjs.com/package/live2d-widget

[Commitizen friendly]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[Commitizen friendly-url]: http://commitizen.github.io/cz-cli/

[GitHub stars]: https://img.shields.io/github/stars/xiazeyu/live2d-widget.js.svg
[GitHub stars-url]: https://github.com/xiazeyu/live2d-widget.js/stargazers

[GitHub forks]: https://img.shields.io/github/forks/xiazeyu/live2d-widget.js.svg
[GitHub forks-url]: https://github.com/xiazeyu/live2d-widget.js/network

[GitHub issues]: https://img.shields.io/github/issues/xiazeyu/live2d-widget.js.svg
[GitHub issues-url]: https://github.com/xiazeyu/live2d-widget.js/issues

[author]: https://img.shields.io/badge/author-cneyhn-green.svg
[author-url]: https://delusion.coding.me/

[author-qq]: https://img.shields.io/badge/QQ-1106996185-blue.svg
[author-qq-url]: tencent://message/?uin=1106996185&Site=Senlon.Net&Menu=yes

[author-email]: https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg
[author-email-url]: mailto:cneyhn@gmail.com

[collaborator0]: https://img.shields.io/badge/author-xiazeyu-green.svg
[collaborator0-url]: https://xiazeyu.coding.me/

[collaborator0-qq]: https://img.shields.io/badge/QQ-2320732807-blue.svg
[collaborator0-qq-url]: tencent://message/?uin=2320732807&Site=Senlon.Net&Menu=yes

[collaborator0-email]: https://img.shields.io/badge/Emali%20me-xiazeyu_2011@126.com-green.svg
[collaborator0-email-url]: mailto:xiazeyu_2011@126.com

[current-device]: https://img.shields.io/npm/v/current-device.svg?label=current-device
[current-device-url]: https://github.com/matthewhudson/current-device

## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/xiazeyu/live2d-widget.js/graphs/contributors"><img src="https://opencollective.com/live2d-widgetjs/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/live2d-widgetjs#backer)]

<a href="https://opencollective.com/live2d-widgetjs#backers" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/live2d-widgetjs#sponsor)]

<a href="https://opencollective.com/live2d-widgetjs/sponsor/0/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/1/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/2/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/3/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/4/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/5/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/6/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/7/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/8/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/9/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/9/avatar.svg"></a>


