import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
import type { PluginOption } from 'vite';
import matter from 'gray-matter';
import prismjs from 'prismjs';
import { cdnUrl, isProd } from '../env';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-json.min.js';

const parseMarkdown = (text: string) => {
  const md = new MarkdownIt({
    highlight: (code, lang) => {
      if (prismjs.languages[lang]) {
        return prismjs.highlight(code, prismjs.languages[lang], lang);
      }
      return code;
    },
  });

  const cacheFns = {
    image: md.renderer.rules.image,
  };

  // a tag
  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx];
    token.attrSet('class', 'link');
    token.attrSet('target', '_blank');
    token.attrSet('rel', 'noopener');
    return self.renderToken(tokens, idx, options);
  };

  // img tag
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    token.attrSet('class', 'image');
    token.attrSet('data-src', token.attrGet('src') || '');
    token.attrSet('src', '/loading.png');
    const imgHtmlStr = cacheFns.image
      ? cacheFns.image(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);

    const title = token.attrGet('title') || token.attrGet('alt');
    const titleHtmlStr = title ? `<p class="image-title">${title}</p>` : '';
    return `<div class="image-block">${imgHtmlStr + titleHtmlStr}</div>`;
  };

  return md.render(text);
};

const findRepeatPath = (articles: Article[]) => {
  const pathObj: Record<string, number> = {};
  articles.forEach((article) => {
    if (pathObj[article.path]) {
      pathObj[article.path]++;
    } else {
      pathObj[article.path] = 1;
    }
  });
  const result: string[] = [];
  Object.entries(pathObj).forEach(([key, value]) => {
    if (value > 1) {
      result.push(key);
    }
  });

  return result;
};

const networkImageReg = /^https?:\/\//;
/**
 * 为了方便本地使用类似 typora 工具进行编写文章，所以 markdown 中使用图片的地址是相对路径
 * 所以如果需要在开发/生产环境进行展示，需要替换 url 地址
 */
const replaceImageUrlFormMD = (md: string, dir: string): string => {
  // image 格式 ![alt](url title)
  const urlReg = /!\[(.*?)\]\((.*?)( (.*?))?\)/g;
  const result = md.replace(urlReg, (...args) => {
    const alt: string = args[1] || '';
    let url: string = args[2] || '';
    const title: string = args[3] ? ` ${args[3]}` : '';
    // 网络图片不做处理
    if (!url.match(networkImageReg)) {
      const match = url.match(/^(\.\/)?(.*?)$/);
      if (match) {
        url = `${cdnUrl}${dir}/${match[2]}`;
      }
    }
    return `![${alt}](${url} ${title})`;
  });
  return result;
};

const getAllArticle = () => {
  const result: Article[] = [];
  const files = fs.readdirSync(path.resolve(__dirname, '../article'));
  files.forEach((file) => {
    // 如果是文件夹
    let filePath = path.resolve(__dirname, `../article/${file}`);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      // 路径是一个文件夹，需要需要拼接后缀
      filePath += '/index.md';
    }
    let md = fs.readFileSync(filePath, 'utf8');
    // 替换图片地址
    md = replaceImageUrlFormMD(md, `article/${file}`);
    const matterInfo = matter(md);

    // 草稿文件，正式发布时不进行发布
    if (isProd && matterInfo.data.status === 'draft') {
      return;
    }
    const data = {
      ...matterInfo.data,
      content: parseMarkdown(matterInfo.content),
    } as Article;
    result.push(data);
  });

  const repeatPath = findRepeatPath(result);
  if (repeatPath.length) {
    throw Error(`文章存在路径重复: [${repeatPath.join(',')}]`);
  }

  // 根据日期进行倒序
  result.sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  return result;
};

const allArticle = getAllArticle();
const allArticleWithNoContent = allArticle.map((article) => ({
  ...article,
  content: undefined,
}));
let routesStr = '[';
allArticle.forEach((article) => {
  routesStr += `{
    path: '/article/${article.path}',
    component: () => import('plugins:article/${article.path}'),
  },`;
});
routesStr += ']';

const Plugin = (): PluginOption => ({
  name: 'article',
  resolveId(id) {
    const match = id.match(/^plugins:article\/(.*)?$/);
    if (match) {
      return id;
    }
  },
  load(id) {
    const match = id.match(/^plugins:article\/(.*)?$/);
    if (match) {
      const articlePath = match[1];
      if (articlePath === 'all') {
        return `export default ${JSON.stringify(allArticleWithNoContent)}`;
      } else if (articlePath === 'get-routes') {
        return `export default ${routesStr}`;
      } else {
        const find = allArticle.find((article) => article.path === articlePath);
        if (find) {
          return `
          import { defineComponent, h } from 'vue';
          import Article from '@/pages/Article/index.vue';

          export default defineComponent({
            setup() {
              return () => h(Article, { article: ${JSON.stringify(find)} })
            }
          })`;
        }
      }
    }
  },
});

export default Plugin;
