import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
import type { PluginOption } from 'vite';
import matter from 'gray-matter';
import prismjs from 'prismjs';
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

const getAllArticle = () => {
  const result: Article[] = [];
  const files = fs.readdirSync(path.resolve(__dirname, '../article'));
  files.forEach((file) => {
    // 排除测试文件
    if (process.env.NODE_ENV === 'production' && file === 'test.md') {
      return;
    }
    const md = fs.readFileSync(
      path.resolve(__dirname, `../article/${file}`),
      'utf8'
    );
    const matterInfo = matter(md);
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
