import React from 'react';
import { slowRoll, offsetTop } from '../../plugins/utils';
import './index.scss';

class Footer extends React.Component {
  componentDidMount() {
    // 绑定右下角按钮的点击事件
    const toBox = document.getElementsByClassName('to-box')[0];
    toBox.onclick = (e) => {
      const node = e.target;
      if ( node.tagName === 'I' || node.tagName === 'DIV' ) {
        const { method } = node.dataset;
        if ( method === 'toTop' ) {
          slowRoll(0);
        }

        if ( method === 'showToc') {
          const articleToc = document.getElementById('article-toc');
          articleToc.classList.add('toc-min');
        }

        if ( method === 'toComment' ) {
          const commentBox = document.getElementsByClassName('comment-box')[0];
          const top = offsetTop(commentBox);
          slowRoll(top);
        }

        if ( method === 'openMe') {
          const aside = document.getElementsByClassName('aside')[0];
          aside.style.display = 'block';
          aside.onclick = (event) => {
            const obj = event.target;
            if ( obj.className === 'aside' ) {
              aside.style.display = '';
              aside.onclick = null;
            }
          };
        }
      }
    };
  }

  render() {
    return (
      <footer className="footer">
        <div className="to-box">
          <div className="show-toc-min btn-hidden" data-method="showToc">
            <i className="iconfont icon-caidan6" data-method="showToc" />
          </div>
          <div className="to-comment" data-method="toComment">
            <i className="iconfont icon-shape" data-method="toComment" />
          </div>
          <div className="open-me btn-hidden" data-method="openMe">
            <i className="iconfont icon-wo" data-method="openMe" />
          </div>
          <div className="to-top" data-method="toTop">
            <i className="iconfont icon-jiantou1" data-method="toTop" />
          </div>
        </div>
        <div className="copyright">
          <p>All rights reserved 2018 PAWN &apos; s Blog !</p>
          <p>&copy;蜀ICP备18023961号-1</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
