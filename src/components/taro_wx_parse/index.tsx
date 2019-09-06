import Taro from '@tarojs/taro'
import {
  View
} from '@tarojs/components'
import './index.scss'
const WxParse = require('./wxParse/wxParse');

interface TaroWxParseProps {
  richText: string,
}

interface TaroWxParseState {

}

export default class  Index extends Taro.Component<TaroWxParseProps, TaroWxParseState> {
  static defaultProps = {
    richText: '',
  };

  constructor(props) {
    super(props)
    this.state = {
      desc: ''
    }
  }

  componentDidMount(): void {
    WxParse.wxParse('article', 'html', this.props.richText, this.$scope, 0)
  }

  componentWillReceiveProps(nextProps: TaroWxParseProps) {
    if(nextProps.richText != this.props.richText) {
      console.log('componentWillReceiveProps::',nextProps);
      WxParse.wxParse('article', 'html', nextProps.richText, this.$scope, 0)
    }
  }

  // componentDidUpdate() {
  //   var that =  this.$scope
  //   if (self.state.desc) {
  //     console.log('有内容')
  //     var  article = self.state.desc
  //     WxParse.wxParse('article', 'html', article, that, 0)
  //   }
  //   else {
  //     console.log('没有获取到资源')
  //   }
  // }

  render() {
    return (
      <View>
        {/*<RichText nodes={detail.item.extra}></RichText>*/}
        <import src='./wxParse/wxParse.wxml'/>
        <template is="wxParse" data="{{wxParseData:article.nodes}}"/>
      </View>
    )
  }
}
