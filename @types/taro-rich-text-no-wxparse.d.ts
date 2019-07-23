import {XbRichTextImageClickCallbackData} from "./base";
import {ComponentClass} from "react";

export interface TaroRichTextNoWxparseProps {
  richText: string,                   // Markdown Or Html 富文本
  raw?: boolean,                       // 是否显示无格式文本
  rawMaxLength?: number,               // 显示的无格式文本的最大长度
  type?: 'markdown' | 'html',          // 富文本类型，Markdown支持跨端，目前html主要是针对微信小程序端，使用微信小程插件wxParse来实现
  customStyle?: string,
  // 图片点击回调
  onImageClick?: (image: XbRichTextImageClickCallbackData) => void,
  // 链接点击回调
  onLinkClick?: (link: string) => void,
}

declare const TaroRichTextNoWxParse: ComponentClass<TaroRichTextNoWxparseProps>;

export default TaroRichTextNoWxParse;
