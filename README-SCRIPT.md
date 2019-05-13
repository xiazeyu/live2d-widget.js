live2d-widget 在 3.1.1 中增加了对话框功能。

目前 API 尚未稳定，请您关注本页面的更新。

# 如何使用对话脚本

对话框开启方式如下

```js
L2Dwidget.init({
  dialog: {
    // 开启对话框
    enable: true,
    script: {
      // 每空闲 10 秒钟，显示一条一言
      'every idle 10s': '$hitokoto$',
      // 当触摸到星星图案
      'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
      // 当触摸到角色身体
      'tap body': '哎呀！别碰我！',
      // 当触摸到角色头部
      'tap face': '人家已经不是小孩子了！'
    }
  }
});
```

* enable: 开启对话框
* script: 对话脚本

对话脚本由条件和内容组成

```
{
  '条件': '内容'
}
```

## 如何编写条件

目前条件以下只有4种

* ### every
  
  设定每过一段时间，发出一段对话。

  还可以用 `idle` 来表示空闲时间。

  #### 例如 

  `every 10s` ： 每过 10 秒钟

  `every 500ms` ： 每过 500 毫秒

  `every 1m` ： 每过 1 分钟

  `every idle 1m` ： 每空闲 1 分钟

  #### 支持的时间单位有：

  秒 `s` `seconds` `second`

  毫秒 `ms` `millisecond` `milliseconds`

  分钟 `m` `minute` `minutes`

* ### hover

  当鼠标或手指碰到页面上某个元素。

  应该使用 css 选择器来定义元素，关于如何编写 css 选择器请看 [这里](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)。

  #### 例如

  `hover .star` ： 碰到 class 为 star 的元素

* ### tap body
  
  当鼠标点击或者触摸到角色的身体。

  某些模型可能不支持。

* ### tap face
  
  当鼠标点击或者触摸到角色的脸部。

  某些模型可能不支持。

## 如何编写内容

内容支持使用 HTML 元素。你还可以在内容中添加变量。

使用美元符号包裹的是变量，例如 `$hitokoto$`，其中 hitokoto 是变量名。

目前只有一个变量，比较鸡肋。

* ### hitokoto

  调用 hitokoto.cn 提供的一言API。

  例子：
  
  `一言： $hitokoto$` ： 一言： 这个世界需要更多的英雄！