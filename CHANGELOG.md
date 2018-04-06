<a name="4.0.0"></a>
## 4.0.0 (2018-04-05)

* ci: add eslint step ([1996a91](https://github.com/xiazeyu/live2d-widget.js/commit/1996a91))
* ci: add markdownlint ([8c32097](https://github.com/xiazeyu/live2d-widget.js/commit/8c32097))
* ci: auto add title on CHANGELOG.md ([b8e187d](https://github.com/xiazeyu/live2d-widget.js/commit/b8e187d))
* ci: encrypt new ssh key ([5e49a05](https://github.com/xiazeyu/live2d-widget.js/commit/5e49a05))
* ci: fix error ([357391e](https://github.com/xiazeyu/live2d-widget.js/commit/357391e))
* ci: fix error ([7f504ef](https://github.com/xiazeyu/live2d-widget.js/commit/7f504ef))
* ci: fix secure errors for prs ([c311bd8](https://github.com/xiazeyu/live2d-widget.js/commit/c311bd8))
* ci: fix typo ([b41562f](https://github.com/xiazeyu/live2d-widget.js/commit/b41562f))
* ci: move compiled folder from lib to dist ([a4228fb](https://github.com/xiazeyu/live2d-widget.js/commit/a4228fb))
* ci: update for codeclimate ([de79a34](https://github.com/xiazeyu/live2d-widget.js/commit/de79a34)), closes [#21](https://github.com/xiazeyu/live2d-widget.js/issues/21)
* refactor: daily update ([9f28e25](https://github.com/xiazeyu/live2d-widget.js/commit/9f28e25))
* refactor: matrix: ViewMatrix, ModelMatrix ([6c364b0](https://github.com/xiazeyu/live2d-widget.js/commit/6c364b0))
* refactor: ModelSettingJson ([2caa709](https://github.com/xiazeyu/live2d-widget.js/commit/2caa709))
* refactor: refector config ([8c0e004](https://github.com/xiazeyu/live2d-widget.js/commit/8c0e004))
* refactor: rewrite index.js for class support ([c23f6aa](https://github.com/xiazeyu/live2d-widget.js/commit/c23f6aa))
* style: change createElement to static ([343690b](https://github.com/xiazeyu/live2d-widget.js/commit/343690b))
* style: change defaultConfig.js to defaultConfig.json ([5185ecf](https://github.com/xiazeyu/live2d-widget.js/commit/5185ecf))
* style: lint code ([71087a6](https://github.com/xiazeyu/live2d-widget.js/commit/71087a6))
* style: lint Matrix.js ([e047dde](https://github.com/xiazeyu/live2d-widget.js/commit/e047dde))
* style: new private varible method ([766d4c0](https://github.com/xiazeyu/live2d-widget.js/commit/766d4c0))
* style: seperate class into seperated files ([e9ca56b](https://github.com/xiazeyu/live2d-widget.js/commit/e9ca56b))
* build: greater build flow ([4a99b1c](https://github.com/xiazeyu/live2d-widget.js/commit/4a99b1c))
* build: move copy from npm script to node.js script ([b4540b8](https://github.com/xiazeyu/live2d-widget.js/commit/b4540b8))
* build: update build logic ([816889e](https://github.com/xiazeyu/live2d-widget.js/commit/816889e))
* build: update build logic, use npm run build to get final build ([b76e065](https://github.com/xiazeyu/live2d-widget.js/commit/b76e065))
* build: update dependcies ([b608753](https://github.com/xiazeyu/live2d-widget.js/commit/b608753))
* build: update dependcies ([5f72d27](https://github.com/xiazeyu/live2d-widget.js/commit/5f72d27)), closes [#6](https://github.com/xiazeyu/live2d-widget.js/issues/6)
* fix: bugs ([1bb9ee5](https://github.com/xiazeyu/live2d-widget.js/commit/1bb9ee5))
* fix: fix bugs ([fc1d6d0](https://github.com/xiazeyu/live2d-widget.js/commit/fc1d6d0))
* fix: fix matrix bugs ([df437f1](https://github.com/xiazeyu/live2d-widget.js/commit/df437f1))
* fix: use custom "tree shaking" instead of webpack ones ([86b9c59](https://github.com/xiazeyu/live2d-widget.js/commit/86b9c59)), closes [#22](https://github.com/xiazeyu/live2d-widget.js/issues/22)
* chore: add note for hacking ([8783aae](https://github.com/xiazeyu/live2d-widget.js/commit/8783aae))
* chore: bump version to 4.0.0 ([d5f51f9](https://github.com/xiazeyu/live2d-widget.js/commit/d5f51f9))
* chore: use offcial live2d.core.js ([6aa27a0](https://github.com/xiazeyu/live2d-widget.js/commit/6aa27a0))
* feat: finish element manager, change config ([dd31caa](https://github.com/xiazeyu/live2d-widget.js/commit/dd31caa))
* feat: matrix works saving ([4174b54](https://github.com/xiazeyu/live2d-widget.js/commit/4174b54))
* feat: working saving - matrixStack ([36517e9](https://github.com/xiazeyu/live2d-widget.js/commit/36517e9))
* perf: remove lodash and use Object.assign() instead ([fa85b84](https://github.com/xiazeyu/live2d-widget.js/commit/fa85b84))
* perf: use custom Object.assign ([d776e70](https://github.com/xiazeyu/live2d-widget.js/commit/d776e70))
* perf: use smaller polyfill ([aabc8b1](https://github.com/xiazeyu/live2d-widget.js/commit/aabc8b1))
* docs: update docs ([d14a789](https://github.com/xiazeyu/live2d-widget.js/commit/d14a789))
* docs: update submodule ([c47dcac](https://github.com/xiazeyu/live2d-widget.js/commit/c47dcac))
* docs: update submodule, fix errors ([892fdbe](https://github.com/xiazeyu/live2d-widget.js/commit/892fdbe))
* docs: use @typedef to define Config ([c611b72](https://github.com/xiazeyu/live2d-widget.js/commit/c611b72))


### BREAKING CHANGE

* change defaultConfig.js into defaultConfig.json
* config: displayPosition to displaySide
* Please use /dist/L2Dwidget.min.js instead of using /lib/L2Dwidget.min.js
* see new config: defaultConfig.json


<a name="3.0.5"></a>
## <small>3.0.5 (2018-02-15)</small>

* chore: bump version, upload production lib ([d321872](https://github.com/xiazeyu/live2d-widget.js/commit/d321872))
* ci: add support for Travis ([b575b69](https://github.com/xiazeyu/live2d-widget.js/commit/b575b69))
* ci: config travis ([870f27a](https://github.com/xiazeyu/live2d-widget.js/commit/870f27a))
* ci: fix config error ([dc2ebd5](https://github.com/xiazeyu/live2d-widget.js/commit/dc2ebd5))
* ci: fix config errors ([7c9b867](https://github.com/xiazeyu/live2d-widget.js/commit/7c9b867))
* ci: fix errors ([43d8a10](https://github.com/xiazeyu/live2d-widget.js/commit/43d8a10))
* ci: fix travis bug ([99f392f](https://github.com/xiazeyu/live2d-widget.js/commit/99f392f))
* ci: modify npm script 'build:esdoc' for linux-only-use ([f8905f9](https://github.com/xiazeyu/live2d-widget.js/commit/f8905f9))
* ci: remove encrypt, since this is only used to access ghpage ([e2cf234](https://github.com/xiazeyu/live2d-widget.js/commit/e2cf234))
* ci: travis bugs ([1d3db7b](https://github.com/xiazeyu/live2d-widget.js/commit/1d3db7b))
* ci: travis errors ([6aefd13](https://github.com/xiazeyu/live2d-widget.js/commit/6aefd13))
* ci: try...to...fix... travis error ([0e9c1b5](https://github.com/xiazeyu/live2d-widget.js/commit/0e9c1b5))
* style: add eslint ([9080413](https://github.com/xiazeyu/live2d-widget.js/commit/9080413))
* style: npm script style ([0ef7538](https://github.com/xiazeyu/live2d-widget.js/commit/0ef7538))
* build: update CHANGELOG build flow ([17de15a](https://github.com/xiazeyu/live2d-widget.js/commit/17de15a))
* docs: add git module of ghpages ([8492034](https://github.com/xiazeyu/live2d-widget.js/commit/8492034))
* docs: ghpages ([103b1dc](https://github.com/xiazeyu/live2d-widget.js/commit/103b1dc))
* docs: update build:docs ([9b1ce55](https://github.com/xiazeyu/live2d-widget.js/commit/9b1ce55))
* docs: use submodule to store docs ([0e25ac7](https://github.com/xiazeyu/live2d-widget.js/commit/0e25ac7))



<a name="3.0.4"></a>
## <small>3.0.4 (2018-02-07)</small>

* docs: migrate documents to live2d-widget.js-doc ([90b9894](https://github.com/xiazeyu/live2d-widget.js/commit/90b9894))
* docs: update CHANGELOG ([9ae492e](https://github.com/xiazeyu/live2d-widget.js/commit/9ae492e))
* 3.0.4 ([d71c60b](https://github.com/xiazeyu/live2d-widget.js/commit/d71c60b))
* build: remove lib from github, rename output file ([efc0f53](https://github.com/xiazeyu/live2d-widget.js/commit/efc0f53))
* build(entry): add entry point in package.json ([b7240fb](https://github.com/xiazeyu/live2d-widget.js/commit/b7240fb))



<a name="3.0.2"></a>
## <small>3.0.2 (2018-01-20)</small>

* 3.0.2 ([1bd3909](https://github.com/xiazeyu/live2d-widget.js/commit/1bd3909))
* docs(update doc): ([423465f](https://github.com/xiazeyu/live2d-widget.js/commit/423465f))
* feat: seperate defaultConfig for supporting helper ([5fa4587](https://github.com/xiazeyu/live2d-widget.js/commit/5fa4587))



<a name="3.0.1"></a>
## <small>3.0.1 (2018-01-19)</small>

* docs: relink js to unpkg CDN ([0bd9cdf](https://github.com/xiazeyu/live2d-widget.js/commit/0bd9cdf))
* docs: update CHANGELOG ([c840cfa](https://github.com/xiazeyu/live2d-widget.js/commit/c840cfa))
* docs: update docs ([188368a](https://github.com/xiazeyu/live2d-widget.js/commit/188368a))
* docs(method of execute): finish the doc of launch it (use var) ([1b43dc0](https://github.com/xiazeyu/live2d-widget.js/commit/1b43dc0))
* feat: new build ([f70a36c](https://github.com/xiazeyu/live2d-widget.js/commit/f70a36c))
* fix: achieve frameshot, recover event system ([aed9c26](https://github.com/xiazeyu/live2d-widget.js/commit/aed9c26))
* style: change L2Dwidget into Class ([59909df](https://github.com/xiazeyu/live2d-widget.js/commit/59909df))
* build(add script to bump version better): ([a2d04e8](https://github.com/xiazeyu/live2d-widget.js/commit/a2d04e8))
* build(fix changelog script path problem): ([67c56ee](https://github.com/xiazeyu/live2d-widget.js/commit/67c56ee))
* chore(update dependency settings): ([7796aac](https://github.com/xiazeyu/live2d-widget.js/commit/7796aac))
* build: remove ghpages from npm publish ([7401ffe](https://github.com/xiazeyu/live2d-widget.js/commit/7401ffe))



<a name="3.0.0"></a>
## 3.0.0 (2018-01-13)

* feat: 3.0 API now is fixed. reday to publish ([32a7b6d](https://github.com/xiazeyu/live2d-widget.js/commit/32a7b6d))
* feat: API chanes again ! get current frame ([cc76f02](https://github.com/xiazeyu/live2d-widget.js/commit/cc76f02))
* feat: config ([62118e1](https://github.com/xiazeyu/live2d-widget.js/commit/62118e1))
* feat: config validater ([cc587b2](https://github.com/xiazeyu/live2d-widget.js/commit/cc587b2))
* feat: delete config validate function ([0234132](https://github.com/xiazeyu/live2d-widget.js/commit/0234132))
* feat: elementMgr codes, modify API ([e6433e3](https://github.com/xiazeyu/live2d-widget.js/commit/e6433e3))
* feat: elementMgr functionally done ([aa09c5d](https://github.com/xiazeyu/live2d-widget.js/commit/aa09c5d))
* feat: FINALLY USEABLE (basically) ([7c121a2](https://github.com/xiazeyu/live2d-widget.js/commit/7c121a2))
* feat: finish config validater ([67a0558](https://github.com/xiazeyu/live2d-widget.js/commit/67a0558))
* feat: fix webpack PublicPath prob. ([093ee10](https://github.com/xiazeyu/live2d-widget.js/commit/093ee10))
* feat: http(s) protocol supports for model's json's textures ([d9b854a](https://github.com/xiazeyu/live2d-widget.js/commit/d9b854a))
* feat: import lodash ([be5531d](https://github.com/xiazeyu/live2d-widget.js/commit/be5531d))
* feat: marked unfinished files, rebuild file structure, config works ([62555a9](https://github.com/xiazeyu/live2d-widget.js/commit/62555a9))
* feat: modified live2d core js ([d3c7ab5](https://github.com/xiazeyu/live2d-widget.js/commit/d3c7ab5))
* feat: TEST Create DOM use js ([1a8db01](https://github.com/xiazeyu/live2d-widget.js/commit/1a8db01))
* feat: update source code ([28d350b](https://github.com/xiazeyu/live2d-widget.js/commit/28d350b))
* feat: use ~ to mark version ([4f0e865](https://github.com/xiazeyu/live2d-widget.js/commit/4f0e865))
* feat(API): typo ([b342953](https://github.com/xiazeyu/live2d-widget.js/commit/b342953))
* feat(config): new config ([5f13a2b](https://github.com/xiazeyu/live2d-widget.js/commit/5f13a2b))
* feat(Webpack): lazy load and chunks ([ccbe0d0](https://github.com/xiazeyu/live2d-widget.js/commit/ccbe0d0))
* feat(Webpack): updated webpack config ([260cbad](https://github.com/xiazeyu/live2d-widget.js/commit/260cbad))
* chore: add comments ([24b43e3](https://github.com/xiazeyu/live2d-widget.js/commit/24b43e3))
* chore: new build version ([c698c90](https://github.com/xiazeyu/live2d-widget.js/commit/c698c90))
* chore: new build version ([7216003](https://github.com/xiazeyu/live2d-widget.js/commit/7216003))
* docs: add ESDoc ([9a67891](https://github.com/xiazeyu/live2d-widget.js/commit/9a67891))
* docs: added demo and doc ([5d4cddc](https://github.com/xiazeyu/live2d-widget.js/commit/5d4cddc))
* docs: fix bugs, update ([14d0730](https://github.com/xiazeyu/live2d-widget.js/commit/14d0730))
* docs: new doc build logic ([a7f1d54](https://github.com/xiazeyu/live2d-widget.js/commit/a7f1d54))
* docs: Update API varible types ([f3ab76b](https://github.com/xiazeyu/live2d-widget.js/commit/f3ab76b))
* docs: update CHANGELOG ([abf0618](https://github.com/xiazeyu/live2d-widget.js/commit/abf0618))
* docs: update CHANGELOG ([89765f5](https://github.com/xiazeyu/live2d-widget.js/commit/89765f5))
* docs: update docs ([0ec0dec](https://github.com/xiazeyu/live2d-widget.js/commit/0ec0dec))
* docs: update docs ([3955611](https://github.com/xiazeyu/live2d-widget.js/commit/3955611))
* docs(LICENSE): combine LICENSE ([6be306f](https://github.com/xiazeyu/live2d-widget.js/commit/6be306f))
* feat: ([8c668b1](https://github.com/xiazeyu/live2d-widget.js/commit/8c668b1))
* Initial commit ([cc61b39](https://github.com/xiazeyu/live2d-widget.js/commit/cc61b39))
* The Real Initial Commit ([23ba71c](https://github.com/xiazeyu/live2d-widget.js/commit/23ba71c))
* build: new doc build method ([6854707](https://github.com/xiazeyu/live2d-widget.js/commit/6854707))
* fix: old dependencies ([7a2f272](https://github.com/xiazeyu/live2d-widget.js/commit/7a2f272))
* fix(webpack): fix webpack publicPath issue ([a8a630e](https://github.com/xiazeyu/live2d-widget.js/commit/a8a630e))
* style: fix indent ([cb6f7d9](https://github.com/xiazeyu/live2d-widget.js/commit/cb6f7d9))


### BREAKING CHANGE

* change userConfig.display.AA to userConfig.display.antialias
* change userConfig.display.widght to userConfig.display.width
* Please use L2DWidget.init() and L2DWidget.captureFrame() instead of initL2DWidget()


