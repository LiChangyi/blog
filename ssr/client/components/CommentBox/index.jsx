import React from 'react';
import { md5 } from '../../plugins/utils';
import './index.scss';

class CommentBox extends React.Component {
  componentDidMount() {
    const toComment = document.getElementsByClassName('to-comment')[0];
    toComment.style.display = 'block';
    if (window.Gitalk) {
      const gitalk = new window.Gitalk({
        clientID: 'd75901ac79dacf9fc13a',
        clientSecret: 'bdebffae134a6899651e6c1156e07c5de799dbd7',
        repo: 'blog',
        owner: 'LiChangyi',
        admin: ['LiChangyi'],
        id: md5(window.location.href),
        distractionFreeMode: false,
        labels: ['blog.lcylove.cn'],
        body: `文章地址: ${window.location.href}`,
        title: "PAWNs'blog的博客文章: http://blog.lcylove.cn"
      });
      gitalk.render('gitalk-comment');
    }
  }

  componentWillUnmount() {
    const toComment = document.getElementsByClassName('to-comment')[0];
    toComment.style.display = '';
  }

  render() {
    return (
      <div className="comment-box">
        <p className="comment-title">留下点什么吧 . . .</p>
        <div id="gitalk-comment"></div>
      </div>
    );
  }
}

export default CommentBox;
