[![Build Status](https://travis-ci.com/SunnyQjm/taro_rich_text.svg?branch=master)](https://travis-ci.com/SunnyQjm/taro_rich_text)
[![](https://img.shields.io/npm/v/taro_rich_text.svg?style=flat-square)](https://www.npmjs.com/package/taro_rich_text)
[![](https://img.shields.io/npm/l/taro_rich_text.svg?style=flat-square)](https://www.npmjs.com/package/taro_rich_text)
[![](https://img.shields.io/npm/dt/taro_rich_text.svg?style=flat-square)](https://www.npmjs.com/package/taro_rich_text)
> # taro_rich_text
> 项目地址: [https://github.com/SunnyQjm/taro_rich_text](https://github.com/SunnyQjm/taro_rich_text)

taro_rich_text 是Taro小程序框架下使用的跨端的Markdown解析组件，目前测试在微信小程序端和H5端的Markdown解析的正常的

> ## 注意

 - ### 如果希望使用本组件在微信小程序端使用wxParse解析HTML
 
   如果需要在微信小程序端使用wxParse解析HTML，则需要在开发者中心添加wxParse插件，添加方式参考[wxParse-plugin](https://github.com/ifanrx/wxParser-plugin)
 
 - ### 如果只想使用本组件的Markdown解析功能，不希望添加wxParse插件
 
   本组件提供了不包含wxParse插件的版本，则可引用 `TaroRichTextNoWxParse` 组件，使用方式和参数同 `TaroRichText`
   此时会默认使用RichText来解析HTML富文本
   ```tsx
   import {
    TaroRichTextNoWxParse
    } from 'taro_rich_text';
   ``` 
  
 - ### Taro 1.3.0-beta.5 版本 前后差异
 
    在`Taro 1.3.0-beta.5`之前包括`1.3.0-beta.5`的版本，在解析函数式组件的分支逻辑的时候存在bug，所以`taro_rich_text 1.0.4`包括`1.0.4`之前的版本对此做了特殊处理，所以
    - Taro版本 > 1.3.0-beta.5 则对应使用 taro_rich_text > 1.0.4
    - Taro版本 <= 1.3.0-beta.5 则对应使用 taro_rich_text <= 1.0.4
    - 如果想在 `Taro 1.3.0-beta.5` 之前的版本使用 > 1.0.4 版本的本组件，参考[该commit](https://github.com/NervJS/taro/commit/2609f7ac3906b5f94a71e1edb46cc002b3330edf)进行修改
  
> ## 使用方式

- 首先用npm安装
  ```bash
  npm install --save taro_rich_text
  ```
- 引入组件库
  ```bash
  import {
    TaroRichText
  } from 'taro_rich_text';
  ```
- 在代码中使用
  ```tsx
  <TaroRichText
    raw={false}
    type='markdown'
    richText={richText}
  />
  ```

> ## 参数说明
| 参数名 | 参数类型 | 参数说明 |
| ------ | ------ | ------ |
| richText | string | 富文本（Markdown文本） |
| raw | boolean | 是否显示无格式文本(如果为true，则组件显示的内容会只包含文字，不包含格式，一般用于显示Markdown富文本的简介) |
| rawMaxLength | number | raw为true时本参数有效，表示最多显示多少个文字，超出部分显示成省略号（...） |
| type | 'markdown' \| 'html' | 富文本类型，Markdown支持跨端，目前html主要是针对微信小程序端，使用微信小程插件wxParse来实现 |
| omImageClick | (image: XbRichTextImageClickCallbackData) => void | Markdown中图片被点击的回调 |
| onLinkClick | (src: string) => void | Markdown中链接被点击的回调 |


> ## 效果展示

<img src="https://raw.githubusercontent.com/SunnyQjm/taro_rich_text/master/document/demo1.png" width="375"/>
<img src="https://raw.githubusercontent.com/SunnyQjm/taro_rich_text/master/document/demo2.png" width="375"/>

