import Taro from '@tarojs/taro'

Taro.initPxTransform({
  designWidth: 750,
});
export {default as TaroRichText} from './components/taro-rich-text'
export {default as TaroRichTextNoWxParse} from './components/taro-rich-text-no-wxparse'

