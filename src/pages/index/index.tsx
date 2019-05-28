import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import TaroRichText from '../../components/taro-rich-text';
import './index.scss'


interface IndexProps {

}

interface IndexState {
  richText: string,
}
export default class Index extends  PureComponent<IndexProps, IndexState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  };

  constructor(props) {
    super(props);
    this.state = {
      richText: '> ### 列表示例\n- 星期一\n  - 摸鱼\n  - 学习\n  - 刷剧\n- 星期二\n - 摸一天鱼\n\n> ### 图片示例\n![学伴小程序](https://user-images.githubusercontent.com/7202516/58466803-03ff6b80-816d-11e9-8afd-f56bdff5a60a.jpg)\n\n> ### 链接示例\n[学伴H5](https://xueban.qjm253.cn/h5)\n\n> ### 表格示例\n\nname | 价格 |  数量  \n-|-|-\n香蕉 | $1 | 5 |\n苹果 | $1 | 6 |\n草莓 | $1 | 7 |\n> ### 字体示例\n\n**粗体**\n*斜体*\n***粗体斜体***\n`高亮`\n> ### 代码块示例\n\n```c\n#include<stdio.h>\n```'
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {
      richText
    } = this.state;
    return (
      <View className='index' style={{
        padding: Taro.pxTransform(20)
      }}
      >
        <TaroRichText
          raw={false}
          type='markdown'
          richText={richText}
        />
      </View>
    )
  }
}
