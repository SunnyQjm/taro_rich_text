> # taro_rich_text

taro_rich_text 是Taro小程序框架下使用的跨端的Markdown解析组件，目前测试在微信小程序端和H5端的Markdown解析的正常的

> ### 使用方式

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

> ### 参数说明
| 参数名 | 参数类型 | 参数说明 |
| ------ | ------ | ------ |
| richText | string | 富文本（Markdown文本） |
| raw | boolean | 是否显示无格式文本(如果为true，则组件显示的内容会只包含文字，不包含格式，一般用于显示Markdown富文本的简介) |
| rawMaxLength | number | raw为true时本参数有效，表示最多显示多少个文字，超出部分显示成省略号（...） |
| type | 'markdown' \| 'html' | 富文本类型，Markdown支持跨端，目前html主要是针对微信小程序端，使用微信小程插件wxParse来实现 |
| omImageClick | (image: XbRichTextImageClickCallbackData) => void | Markdown中图片被点击的回调 |


> ### 注意
 - #### 如果希望使用本组件在微信小程序端解析HTML
   如果需要在微信小程序中使用本组件，则需要在开发者中心添加wxParse插件，添加方式参考[wxParse-plugin](https://github.com/ifanrx/wxParser-plugin)
 
 - #### 如果只想使用本组件的Markdown解析功能，不希望添加wxParse插件
   本组件提供了不包干wxParse插件的版本，则可引用 `TaroRichTextNoWxParse` 组件，使用方式和参数同 `TaroRichText`
   ```tsx
   import {
    TaroRichTextNoWxParse
    } from 'taro_rich_text';
   ``` 
