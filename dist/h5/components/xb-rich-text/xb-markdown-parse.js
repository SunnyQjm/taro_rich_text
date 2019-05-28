import Remarkable from 'remarkable';
class XbMarkdownParse {
  constructor() {
    this.parser = new Remarkable({
      // html: true,
      linkify: true
    });
    this.STYLE_PREFIX = 'xb-rich-text-';
    this.tmp = [];
  }
  parse(md, options = {
    raw: false
  }) {
    this.tokens = this.parser.parse(md, {});
    // console.log(this.tokens);
    // markdown 渲染列表
    this.renderList = [];
    // 处理Remarkable.js 处理后的token
    this.tokens.forEach((token, index) => {
      if (token.type === 'inline') {
        this.dealInlineContent(token, index, options);
      } else {
        this[token.type](token, index, options);
      }
    });
    return this.renderList;
  }
  /**
   * 获取内联内容
   * type = inline
   * @param inlineToken
   */
  dealInlineContent(token, index, options) {
    if (token.type === 'text') {
      if (this.tmp.length <= 0) {
        //0级dom
        this.renderList.push({
          content: token.content,
          level: token.level,
          type: 'text',
          children: []
        });
      } else {
        this.tmp[this.tmp.length - 1].children.push({
          content: token.content,
          level: token.level,
          type: 'text',
          children: []
        });
      }
    } else {
      token.children.forEach(t => {
        if (t.type === 'text') {
          this.dealInlineContent(t, index, options);
        } else {
          this[t.type](t, index, options);
        }
      });
    }
  }
  commonOpenDeal(token, index, options = null) {
    let block = {
      ...token,
      ...options,
      children: []
    };
    this.tmp.push(block);
  }
  commonCloseDeal() {
    const currentLen = this.tmp.length;
    if (currentLen === 1) {
      //顶层的直接添加到level_0层dom
      this.renderList.push(this.tmp[0]);
      this.tmp.pop();
    } else {
      if (this.tmp && this.tmp[currentLen - 2] && this.tmp[currentLen - 2].children) {
        this.tmp[currentLen - 2].children.push(this.tmp[currentLen - 1]);
      }
      this.tmp.pop();
    }
  }
  /**
   * 没有open_close标签对包裹的单个标签的block的添加
   * @param block
   */
  easySinglePush(block) {
    if (this.tmp.length > 0) {
      this.tmp[this.tmp.length - 1].children.push(block);
    } else {
      this.renderList.push(block);
    }
  }
  blockquote_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      type: 'link',
      className: `${this.STYLE_PREFIX}blockquote`
    });
  }
  blockquote_close() {
    this.commonCloseDeal();
  }
  code(token) {
    this.easySinglePush({
      ...token,
      type: 'text',
      className: `${this.STYLE_PREFIX}code`
    });
  }
  fence(token) {
    this.easySinglePush({
      ...token,
      className: `${this.STYLE_PREFIX}fence`
    });
  }
  fence_custom() {}
  /**
   * h1、h2....
   */
  heading_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}h${token.hLevel}`
    });
  }
  heading_close() {
    this.commonCloseDeal();
  }
  hr() {}
  /**
   * ul
   */
  bullet_list_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}ul`
    });
  }
  bullet_list_close() {
    this.commonCloseDeal();
  }
  /**
   * li
   */
  list_item_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}li`
    });
  }
  list_item_close() {
    this.commonCloseDeal();
  }
  /**
   * ol
   */
  ordered_list_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}ol`
    });
  }
  ordered_list_close() {
    this.commonCloseDeal();
  }
  /**
   * p
   */
  paragraph_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}${this.tmp.length > 0 ? 'inline_p' : 'p'}`
    });
  }
  paragraph_close() {
    this.commonCloseDeal();
  }
  /**
   * Links
   */
  link_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}a`
    });
  }
  link_close() {
    this.commonCloseDeal();
  }
  /**
   * Images
   */
  image(token) {
    this.easySinglePush({
      ...token,
      className: `${this.STYLE_PREFIX}image`
    });
  }
  /**
   * Tables
   */
  table_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}table`
    });
  }
  table_close() {
    this.commonCloseDeal();
  }
  thead_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}table_thead`
    });
  }
  thead_close() {
    this.commonCloseDeal();
  }
  tbody_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}table_tbody`
    });
  }
  tbody_close() {
    this.commonCloseDeal();
  }
  tr_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}table_tr`
    });
  }
  tr_close() {
    this.commonCloseDeal();
  }
  th_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}table_th`
    });
  }
  th_close() {
    this.commonCloseDeal();
  }
  td_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}table_td`
    });
  }
  td_close() {
    this.commonCloseDeal();
  }
  /**
   * Bold（粗体）
   */
  strong_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}strong`
    });
  }
  strong_close() {
    this.commonCloseDeal();
  }
  /**
   * Italicize（斜体）
   */
  em_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}em`
    });
  }
  em_close() {
    this.commonCloseDeal();
  }
  /**
   * Strikethrough（删除线）
   */
  del_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}del`
    });
  }
  del_close() {
    this.commonCloseDeal();
  }
  /**
   * Insert
   * <ins>
   */
  ins_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}ins`
    });
  }
  ins_close() {
    this.commonCloseDeal();
  }
  /**
   * Highlight
   * <mark>
   */
  mark_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}mark`
    });
  }
  mark_close() {
    this.commonCloseDeal();
  }
  /**
   * Super and sub script
   * <sup> <sub>
   */
  sub() {}
  sup() {}
  /**
   * Breaks（换行）
   * <br>
   *   options.xhtmlOut ? '<br />\n' : '<br>\n';
   */
  hardbreak() {
    this.easySinglePush({
      type: 'text',
      content: '\n',
      level: 0,
      children: [],
      className: 'hardbreak'
    });
  }
  /**
   * options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
   */
  softbreak(token) {
    const softBreakBlock = {
      ...token,
      type: 'text',
      content: '',
      children: [],
      className: `${this.STYLE_PREFIX}softbreak`
    };
    this.easySinglePush(softBreakBlock);
  }
  /**
   * Text
   */
  text(token) {
    this.easySinglePush({
      ...token,
      className: `${this.STYLE_PREFIX}text`
    });
  }
  /**
   * Content
   */
  htmlblock() {}
  htmltag() {}
  /**
   * Abbreviations, initialism (缩写、首字母)
   */
  abbr_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}abbr`
    });
  }
  abbr_close() {
    this.commonCloseDeal();
  }
  /**
   * Footnotes
   */
  footnote_ref() {}
  footnote_block_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}footnote_block`
    });
  }
  footnote_block_close() {
    this.commonCloseDeal();
  }
  footnote_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}footnote`
    });
  }
  footnote_close() {
    this.commonCloseDeal();
  }
  footnote_anchor() {}
  /**
   * Definition lists
   */
  dl_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}dl`
    });
  }
  dl_close() {
    this.commonCloseDeal();
  }
  dd_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}dd`
    });
  }
  dd_close() {
    this.commonCloseDeal();
  }
  dt_open(token, index, options) {
    this.commonOpenDeal(token, index, {
      ...options,
      className: `${this.STYLE_PREFIX}dt`
    });
  }
  dt_close() {
    this.commonCloseDeal();
  }
}
export default XbMarkdownParse;