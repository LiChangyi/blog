import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import { throttle } from '../../plugins/utils';
import './global.scss';

class Layout extends React.Component {
  componentDidMount() {
    // 原生 js 实现导航吸顶
    const navLogo = document.getElementsByClassName('nav-logo')[0];
    const fn = throttle(() => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop >= 40) {
        navLogo.classList.add('fiexd');
      } else {
        navLogo.classList.remove('fiexd');
      }
    }, 200);
    fn();
    window.onscroll = fn;

    // 原生js 实现导航的点击切换
    const nav_list_min_btn = document.getElementsByClassName('nav-list-min-btn')[0];
    const nav_list_min_box = document.getElementsByClassName('nav-list-min-box')[0];
    nav_list_min_btn.onclick = (e) => {
      nav_list_min_box.classList.toggle('open');
      window.onclick = () => {
        nav_list_min_box.classList.remove('open');
        window.onclick = null;
      };
      // js阻止事件冒泡
      e.cancelBubble = true;
      e.stopPropagation();
    };
  }

  render() {
    return (
      <Fragment>
        <Header header={ this.props.header } />
        { this.props.children }
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  helmet: state.helmet
});

export default connect(mapStateToProps, null)(Layout);
