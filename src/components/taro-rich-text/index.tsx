import Taro, {Config} from '@tarojs/taro';
import {View} from '@tarojs/components';
import TaroRichTextNoWxParse, {
  XbRichTextComponentProps, XbRichTextComponentState
} from '../taro-rich-text-no-wxparse';


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
