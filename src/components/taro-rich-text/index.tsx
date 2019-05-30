import Taro, {Config} from '@tarojs/taro';
import {View} from '@tarojs/components';
import TaroRichTextNoWxParse from '../taro-rich-text-no-wxparse';


export interface XbRichTextImageClickCallbackData {
  src: string,
  alt: string
}

interface XbRichTextComponentProps {
  richText: string,                   // Markdown Or Html 富文本
  raw: boolean,                       // 是否显示无格式文本
  rawMaxLength: number,               // 显示的无格式文本的最大长度
  type: 'markdown' | 'html',          // 富文本类型，Markdown支持跨端，目前html主要是针对微信小程序端，使用微信小程插件wxParse来实现
  customStyle: string,
  // 图片点击回调
  onImageClick: (image: XbRichTextImageClickCallbackData) => void,

  // 链接点击回调
  onLinkClick: (link: string) => void,
}

interface XbRichTextComponentState {
}


class XbRichTextComponent extends Taro.PureComponent<XbRichTextComponentProps, XbRichTextComponentState> {
  config: Config = {
    usingComponents: {
      wxparser: 'plugin://wxparserPlugin/wxparser'
    }
  };

  static defaultProps = {
    richText: '',
    raw: true,
    rawMaxLength: 100,
    type: 'markdown',
    customStyle: '',
    onImageClick: () => {
    },
    onLinkClick: () => {

    }
  };

  constructor(props) {
    super(props);
  }


  render(): any {
    const {
      richText,
      customStyle,
      type
    } = this.props;
    if (type === 'markdown') {
      return (
        <TaroRichTextNoWxParse {...this.props} />
      )
    } else if (type === 'html') {
      return (
        <View style={customStyle}>
          {/*<RichText nodes={richText} />*/}
          <wxparser rich-text={richText}/>
        </View>
      );
    }
  }
}


export default XbRichTextComponent;
