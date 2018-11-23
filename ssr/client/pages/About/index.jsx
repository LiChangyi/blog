import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import BgCover from '../../components/BgCover';
import CommentBox from '../../components/CommentBox';
import { getSet } from '../../store/action';
import markdown from '../../plugins/marked';
import clientApi from '../../axios/clientApi';
import './index.scss';

const coverInfo = {
  title: 'About Me',
  descript: '人生如棋，我愿为卒，行动虽慢，可谁? 见我后退半步!',
  cover: 'https://image.lcylove.cn/blog_about_cover'
};

class About extends React.Component {
  componentDidMount() {
    if ( !this.props.set.isRequest ) {
      this.props.getSet();
    }
  }

  get_content() {
    const res = markdown(this.props.set.data, false, true).html;
    return { __html: res };
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>关于我 | Pawn ' s Blog</title>
        </Helmet>
        <BgCover coverInfo={ coverInfo } />
        <main className="about-page page-container">
          <div className="about-avatar">
            <img src="/img/me.png" alt="me" />
          </div>
          <div className="myInfo" dangerouslySetInnerHTML={ this.get_content() }></div>
          <CommentBox />
        </main>
      </Fragment>
    );
  }
}

About.loadData = (store, serverApi) => (
  store.dispatch(getSet(serverApi))
);

const mapStateToProps = state => ({
  set: state.set
});

const mapDispatchToProps = dispatch => ({
  getSet() {
    dispatch(getSet(clientApi));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
