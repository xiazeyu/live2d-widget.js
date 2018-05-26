# live2d-widget.js

[![npm package][npm-package]][npm-package-url]

[![jsDelivr][jsDelivr]][jsdelivr-url]
[![dependencies][dependencies]][dependencies-url]
[![devDependencies][devDependencies]][devDependencies-url]
[![build][build]][build-url]

[![downloads-total][downloads-total]][downloads-total-url]
[![downloads-month][downloads-month]][downloads-month-url]

[![stars][stars]][stars-url]
[![forks][forks]][forks-url]
[![issues][issues]][issues-url]

[![Maintainability][Maintainability]][Maintainability-url]
[![commitizen][commitizen]][commitizen-url]
[![PRs][PRs]][PRs-url]
[![license][license]][license-url]

Add the Sseexxyyy live2d to your webpages! Seperated from [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d).

Demo: [Playground](https://l2dwidget.js.org/playground.html)

Docs: [Click me!](https://l2dwidget.js.org/docs/index.html)

## Browser requirements

We use config below as our [babel-preset-env](https://babeljs.io/docs/plugins/preset-env/)'s config.

```json

"browsers": [
  "cover 99%",
  "last 2 years",
  "not ie < 9",
  "edge >= 12"
]

```

## Installation

> Please have a look at both README and [CHANGELOG](CHANGELOG.md) if you are upgraded from older version.

### Yarn

`yarn add live2d-widget@4`

> Sometimes yarn does better job than npm.

### NPM

`npm i --save live2d-widget@4`

### Hexo

See [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d) for the hexo plugin.

### Webpages

JS code online generator: [Click me!](https://l2dwidget.js.org/generator.html)

#### Store script on your own web server

Download the [latest release](https://github.com/xiazeyu/live2d-widget.js/releases),

then extract and copy the `dist` folder to your website.

Insert codes into your HTML files using [online generator](https://l2dwidget.js.org/generator.html), or make your own code

<details><summary>Making code manually:</summary><br>

import the js(replcae your own js path here in the `src`):

eg.

```html

<script src="//js/live2d-widget/L2Dwidget.min.js"></script>

```

Then init it.

eg.

```js

var currL2Dwidget = new L2Dwidget().init({});

```

Or with your own config

eg.

```js

var currL2Dwidget = new L2Dwidget().init({
  'modelJsonPath': "https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku/assets/shizuku.model.json",
  'displayWidth': 150,
  'mobileShow': true
});

```

</details>

#### Using CDN

We have 3 CDNs,

- Jsdelivr(Recommended)
  `https://cdn.jsdelivr.net/npm/live2d-widget@4/dist/L2Dwidget.min.js`

- Unkpg
  `https://unpkg.com/live2d-widget@4/dist/L2Dwidget.min.js`

- BundleRun
  `https://bundle.run/live2d-widget@4/dist/L2Dwidget.min.js`

Select your favourite CDN, and put code like this into your webpage.

eg.

```html

<script src ="//cdn.jsdelivr.net/npm/live2d-widget@4/dist/L2Dwidget.min.js"></script>

```

### Bookmarks

```url

data:text/html,<script src=https://cdn.jsdelivr.net/npm/live2d-widget@4/dist/L2Dwidget.min.js></script><script>const currL2Dwidget = new L2Dwidget().init({});</script>

```

```js

javascript:function loadScript(c,b){var a=document.createElement("script");a.type="text/javascript";"undefined"!=typeof b&&(a.readyState?a.onreadystatechange=function(){if("loaded"==a.readyState||"complete"==a.readyState)a.onreadystatechange=null,b()}:a.onload=function(){b()});a.src=c;document.body.appendChild(a)};loadScript("https://cdn.jsdelivr.net/npm/live2d-widget@4/dist/L2Dwidget.min.js",function(){const currL2Dwidget = new L2Dwidget().init({});});

```

## Settings

See the [document](https://l2dwidget.js.org/docs/typedef/index.html#static-typedef-Config).

Default settings are at[configStorage.js](https://cdn.jsdelivr.net/npm/live2d-widget@4/dist/configStorage.js).

Enjoy!:beer:

> This is my first plugin, star :star: and watch :eyeglasses:, pull request is also welcomed.

Github: [https://github.com/xiazeyu/live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)

issues: [https://github.com/xiazeyu/live2d-widget.js/issues](https://github.com/xiazeyu/live2d-widget.js/issues)

## Contribute

### Please pay enough attention to this document if you want to commit your changes or submit issues

[CONTRIBUTING](.github/CONTRIBUTING.md)

## Releated projects

- [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

- [live2d-widget-models](https://github.com/xiazeyu/live2d-widget-models)

- [Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)

## About me

[![author][author]][author-url]
[![author QQ][author-qq]][author-qq-url]
[![author email][author-email]][author-email-url]

[![collaborator0][collaborator0]][collaborator0-url]
[![collaborator0 QQ][collaborator0-qq]][collaborator0-qq-url]
[![collaborator0 email][collaborator0-email]][collaborator0-email-url]

## Dependcies

[![current-device][current-device]][current-device-url]

## Special Thanks

- [@mashirozx](https://github.com/mashirozx)
- [@fghrsh](https://github.com/fghrsh)
- [@journey-ad](https://github.com/journey-ad)
- [@gwzz](https://github.com/gwzz)

Open sourced under the GPL v2.0 license.

[build]: https://www.travis-ci.org/xiazeyu/live2d-widget.js.svg?branch=master
[build-url]: https://www.travis-ci.org/xiazeyu/live2d-widget.js.svg?branch=master

[npm-package]: https://badge.fury.io/js/live2d-widget.svg?label=live2d-widget
[npm-package-url]: https://yarn.pm/live2d-widget

[jsDelivr]: https://data.jsdelivr.com/v1/package/npm/live2d-widget/badge
[jsDelivr-url]: https://www.jsdelivr.com/package/npm/live2d-widget

[dependencies]: https://img.shields.io/david/xiazeyu/live2d-widget.js.svg
[dependencies-url]: javascript:void(0);

[devDependencies]:  https://img.shields.io/david/dev/xiazeyu/live2d-widget.js.svg
[devDependencies-url]: javascript:void(0);

[downloads-total]:  https://img.shields.io/npm/dt/live2d-widget.svg
[downloads-total-url]: https://www.npmjs.com/package/live2d-widget

[downloads-month]: https://img.shields.io/npm/dm/live2d-widget.svg
[downloads-month-url]: https://www.npmjs.com/package/live2d-widget

[stars]: https://img.shields.io/github/stars/xiazeyu/live2d-widget.js.svg
[stars-url]: https://github.com/xiazeyu/live2d-widget.js/stargazers

[forks]: https://img.shields.io/github/forks/xiazeyu/live2d-widget.js.svg
[forks-url]: https://github.com/xiazeyu/live2d-widget.js/network

[issues]: https://img.shields.io/github/issues/xiazeyu/live2d-widget.js.svg
[issues-url]: https://github.com/xiazeyu/live2d-widget.js/issues

[Maintainability]: https://api.codeclimate.com/v1/badges/8d737c43dabeb0f75348/maintainability
[Maintainability-url]: https://codeclimate.com/github/xiazeyu/live2d-widget.js/maintainability

[commitizen]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

[PRs]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[PRs-url]: http://makeapullrequest.com

[license]: https://img.shields.io/github/license/xiazeyu/live2d-widget.js.svg
[license-url]: https://github.com/xiazeyu/live2d-widget.js/blob/master/LICENSE

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
