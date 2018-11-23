import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import markdown from '../../plugins/marked';
import { getArticle, setArticle } from '../../store/action';
import { throttle, slowRoll, offsetTop } from '../../plugins/utils';
import CommentBox from '../../components/CommentBox';
import BgCover from '../../components/BgCover';
import './index.scss';
import clientApi from '../../axios/clientApi';

class Article extends React.Component {
  componentDidMount() {
    // 请求文章数据
    const { id } = this.props.match.params;
    const article = this.props.artsContent.find(item => item._id === id);
    if ( !article ) {
      this.props.getArticle(id);
    } else {
      this.props.setArticle(article);
    }
    // 下面是一些原生 js 事件
    // 右下角图标
    const showToc = document.getElementsByClassName('show-toc-min')[0];
    showToc.style.display = 'block';

    const articlePage = document.getElementsByClassName('article-page')[0];
    const articleToc = document.getElementById('article-toc');
    const imgs = articlePage.getElementsByClassName('lazy-img');

    // 文章里面图片懒加载
    function isInSight(el) {
      const bound = el.getBoundingClientRect();
      const clientHeight = window.innerHeight;
      return bound.top <= clientHeight + 100;
    }

    function loadImg(el) {
      const source = el.dataset.src;
      if ( el.src !== source ) {
        el.src = source;
      }
    }

    function checkImgs() {
      Array.from(imgs).forEach((el) => {
        if (isInSight(el)) {
          loadImg(el);
        }
      });
    }

    checkImgs();
    // toc 位置设置 & 图片懒加载  => 节流
    const fn = throttle(() => {
      checkImgs();
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const right_val = document.defaultView.getComputedStyle(articlePage, null)['margin-right'];
      if (scrollTop >= 330) {
        articleToc.classList.add('toc-fixed');
        articleToc.style.right = right_val;
      } else {
        articleToc.classList.remove('toc-fixed');
        articleToc.style.right = 0;
      }
    }, 200);
    fn();
    window.onresize = fn;
    window.addEventListener('scroll', fn);

    // toc 点击事件
    articleToc.addEventListener('click', (e) => {
      const obj = e.target;
      if (obj === articleToc) {
        articleToc.classList.remove('toc-min');
      }
      if (obj.tagName !== 'LI') return;
      const name = obj.getAttribute('data-id').replace('#', '');
      const tem = document.getElementById(name);
      const top = offsetTop(tem);
      slowRoll(top - 200);
      articleToc.classList.remove('toc-min');
    });

    const showImgBox = document.getElementsByClassName('show-img-box')[0];
    const showImg = document.getElementsByClassName('show-img')[0];
    // 文章 图片点击,出现大图,,事件代理
    articlePage.addEventListener('click', (e) => {
      const node = e.target;
      if (node.className === 'lazy-img') {
        console.log(node);
        showImgBox.style.display = 'block';
        showImg.src = node.dataset.src;
      }
    });
    showImgBox.onclick = () => {
      showImgBox.style.display = '';
    };
  }

  componentWillUnmount() {
    const showToc = document.getElementsByClassName('show-toc-min')[0];
    showToc.style.display = '';
  }

  get_content() {
    const res = markdown(this.props.article.content, false, true).html;
    return { __html: res };
  }

  get_toc() {
    let tochtml = '';
    const tocArr = markdown(this.props.article.content, false, true).toc;
    if (tocArr == null) return { __html: '' };
    tocArr.forEach((item) => {
      tochtml += `<li data-id=${item.anchor}>`;
      for (let i = 1; i < item.level; i += 1) {
        tochtml += '<i class="iconfont icon-dian"></i>';
      }
      tochtml += ` ${item.text}</li>`;
    });
    return { __html: tochtml };
  }

  redirect() {
    if ( this.props.staticContext ) {
      this.props.staticContext.redirect = true;
      this.props.staticContext.url = '/';
    }
  }

  render() {
    const { article } = this.props;
    const coverInfo = {
      title: article.title,
      descript: article.descript,
      cover: article.cover
    };
    return (
      <Fragment>
        <Helmet>
          <title>{`${coverInfo.title} | Pawn ' s Blog`}</title>
          <link rel="stylesheet" href="/css/markdown.css" />
        </Helmet>
        <BgCover coverInfo={ coverInfo } />
        <main className="article-page page-container">
          <div className="article-content markdown-body-article" id="articleContent" dangerouslySetInnerHTML={ this.get_content() }>
          </div>
          <div className="toc" id="article-toc">
            <div className="article-page-wrap">
              <p className="toc-title">目录</p>
              <ul dangerouslySetInnerHTML={ this.get_toc() }></ul>
            </div>
          </div>
          <CommentBox />
          <div className="show-img-box">
            <img className="show-img" src="" alt="原图加载失败！" />
          </div>
        </main>
      </Fragment>
    );
  }
}

Article.loadData = (store, serverApi, url ) => {
  // 匹配文章
  const res = url.match(/\/article\/(\S*)/);
  let _id = '';
  if ( res ) {
    _id = res[1];
  }
  return Promise.all(
    [
      store.dispatch(getArticle(serverApi, _id))
    ]
  );
};

const mapDispatchToProps = dispatch => ({
  getArticle(_id) {
    dispatch(getArticle(clientApi, _id));
  },
  setArticle(article) {
    dispatch(setArticle(article));
  }
});

const mapStateToProps = state => ({
  artsContent: state.artsContent,
  article: state.article,
  set: state.set
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
