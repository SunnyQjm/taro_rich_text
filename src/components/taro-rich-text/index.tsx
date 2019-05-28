import Taro, { Config } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import XbMarkdownParse from './xb-markdown-parse';

import './index.scss';

// import XbRichTextBlock from './xb-rich-text-block';

export interface XbRichTextImageClickCallbackData {
  src: string,
  title: string
}

interface XbRichTextComponentProps {
  richText: string,                   // Markdown Or Html 富文本
  raw: boolean,                       // 是否显示无格式文本
  rawMaxLength: number,               // 显示的无格式文本的最大长度
  type: 'markdown' | 'html',          // 富文本类型，Markdown支持跨端，目前html主要是针对微信小程序端，使用微信小程插件wxParse来实现
  customStyle: string,
  // 图片点击回调
  onImageClick: (image: XbRichTextImageClickCallbackData) => void
}

interface XbRichTextComponentState {
}


class XbRichTextComponent extends Taro.PureComponent<XbRichTextComponentProps, XbRichTextComponentState> {
  config: Config = {
    // usingComponents: {
    //   wxparser: 'plugin://wxparserPlugin/wxparser'
    // }
  };

  static defaultProps = {
    richText: '',
    raw: true,
    rawMaxLength: 100,
    type: 'markdown',
    customStyle: '',
    onImageClick: () => {
    }
  };

  constructor(props) {
    super(props);
    this.onImageClick = this.onImageClick.bind(this);
  }

  mdParser = new XbMarkdownParse();

  onImageClick(block: XbRichTextImageClickCallbackData) {
    this.props.onImageClick(block);
  }

  getRawText(block) {
    let result = '';
    if (block.type === 'text') {
      result += block.content;
    }
    if (block.children) {
      block.children.forEach(b => {
        result += this.getRawText(b);
      });
    }
    return result;
  }

  render0(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else if (block) {
      const notuse = 1;
    } else {
      dom_block = (
        <View className={block.className} key={index}>
          {
            block.children && (
              block.children.map((child, i) => {
                  return this.render1(child, i);
                }
              )
            )
          }
        </View>);
    }
    return dom_block;
  }

  render1(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else if (block) {
      const notuse = 1;
    } else {
      dom_block = (
        <View className={block.className} key={'what' + index}>
          {
            block.children && (
              block.children.map((child, i) => {
                  return this.render2(child, i);
                }
              )
            )
          }
        </View>);
    }
    return dom_block;
  }

  render2(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else if (block) {
      const notuse = 1;
    } else {
      dom_block = (
        <View className={block.className} key={'what' + index}>
          {
            block.children && (
              block.children.map((child, i) => {
                  return this.render3(child, i);
                }
              )
            )
          }
        </View>);
    }
    return dom_block;
  }

  render3(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else if (block) {
      const notuse = 1;
    } else {
      dom_block = (
        <View className={block.className} key={'what' + index}>
          {
            block.children && (
              block.children.map((child, i) => {
                  return this.render4(child, i);
                }
              )
            )
          }
        </View>);
    }
    return dom_block;
  }

  render4(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else if (block) {
      const notuse = 1;
    } else {
      dom_block = (
        <View className={block.className} key={'what' + index}>
          {
            block.children && (
              block.children.map((child, i) => {
                  return this.render5(child, i);
                }
              )
            )
          }
        </View>);
    }
    return dom_block;
  }

  render5(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else if (block) {
      const notuse = 1;
    } else {
      dom_block = (
        <View className={block.className} key={'what' + index}>
          {
            block.children && (
              block.children.map((child, i) => {
                  return this.render6(child, i);
                }
              )
            )
          }
        </View>);
    }
    return dom_block;
  }

  render6(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else if (block) {
      const notuse = 1;
    } else {
      dom_block = (
        <View className={block.className} key={'what' + index}>
          {
            block.children && (
              block.children.map((child, i) => {
                  return this.render7(child, i);
                }
              )
            )
          }
        </View>);
    }
    return dom_block;
  }

  render7(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else if (block) {
      const notuse = 1;
    } else {
      dom_block = (
        <View className={block.className} key={'what' + index}>
          {
            block.children && (
              block.children.map((child, i) => {
                  return this.render8(child, i);
                }
              )
            )
          }
        </View>);
    }
    return dom_block;
  }

  render8(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else if (block) {
      const notuse = 1;
    } else {
      dom_block = (
        <View className={block.className} key={'what' + index}>
          {
            block.children && (
              block.children.map((child, i) => {
                  return this.render9(child, i);
                }
              )
            )
          }
        </View>);
    }
    return dom_block;
  }

  render9(block, index) {
    let dom_block: any = null;
    if (block.type === 'text') {          // 处理文字
      dom_block = (<Text className={block.className} key={block.content + index}>{block.content}</Text>);
    } else if (block.type === 'image') {  // 处理图片
      dom_block = (
        <View className='xb-rich-text-image-wrapper' key={block.src + index}>
          <Image
            className={block.className} src={block.src ? block.src : ''}
            lazyLoad mode='aspectFit'
            onClick={this.onImageClick.bind(this, block)}
          />
          <Text className='xb-rich-text-image-title'>{block.alt}</Text>
        </View>
      );
    } else if (block.type === 'fence') {   //处理代码块
      dom_block = (
        <View className={block.className} key={block.content + index}>{block.content}</View>
      );
    } else {
      dom_block = (
        <View className={block.className} key={'what' + index}>
        </View>);
    }
    return dom_block;
  }

  render(): any {
    const {
      richText,
      raw,
      rawMaxLength,
      customStyle,
      type
    } = this.props;
    const result = this.mdParser.parse(richText);
    let rawText = '';
    if (raw) {
      result.forEach(block => {
        if (rawText.length <= rawMaxLength)
          rawText += this.getRawText(block);
      });
      if (rawText.length > rawMaxLength) {
        rawText = rawText.slice(0, rawMaxLength);
        rawText += '...';
      }
    }
    if (type === 'markdown') {
      return (
        <View className='xb-rich-text-wrapper' style={customStyle}>
          {
            raw ? rawText :
              result.map((block, index) => {
                return this.render0(block, index);
              })
          }
        </View>
      );
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
