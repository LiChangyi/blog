import marked from 'marked';
import Hljs from './highlight';

const languages = ['cpp', 'xml', 'bash', 'coffeescript', 'css', 'markdown', 'http', 'java', 'javascript', 'json', 'less', 'makefile', 'nginx', 'php', 'python', 'scss', 'sql', 'stylus'];
const renderer = new marked.Renderer();

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, lang) {
    if (languages.indexOf(lang) > -1) {
      return Hljs.highlight(lang, code).value;
    }
    return true;
  }
});

// 段落解析
const paragraphParse = ( text ) => {
  const textIsImage = text.includes('<img');
  if (textIsImage) return `<div class="image-package">${text}</div>`;
  return `<p>${text}</p>`;
};

// 对图片进行弹窗处理, 及懒加载处理
const imageParse = (src, title, alt) => (`<img class="lazy-img" src="/img/loadingImg.png" data-src="${src}" title="${title || "Pawn 's Blog => http://blog.lcylove.cn"}" alt="${alt || '图片加载失败,Pawn Blog'}" class="img-pop"/>`
);

// 外链
const linkParse = (href, title, text) => (
  `<a href="${href}"
      target="${href.substr(0, 1) === '#' ? '_self' : '_blank'}" 
      class="${href.substr(0, 1) === '#' ? '' : 'c-link'}"
      title="访问 ${text} | Welcome to Pawn's blog!">
      ${href.substr(0, 1) === '#' ? text : text.length > 40 ? `${text.slice(0, 40)}...` : text}
  </a>`.replace(/\s+/g, ' ').replace('\n', '')
);

renderer.link = linkParse;
renderer.paragraph = paragraphParse;
renderer.image = imageParse;

export default (content, tags, parseHtml = false) => {
  if (typeof content !== 'string') {
    return '';
  }
  // 生成目录树
  const toc = [];

  const headingParse = (text, level) => {
    toc.push({
      anchor: `#header-${toc.length}`,
      level,
      text
    });
    return `<h${level} id="header-${toc.length - 1}">${text}</h${level}>\n`;
  };

  marked.setOptions({ sanitize: !parseHtml });

  renderer.heading = headingParse;

  const html = marked(content, { renderer });

  // 返回解析内容
  return { html, toc };
};
