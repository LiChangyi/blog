import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import BgCover from '../../components/BgCover';
import { getWorks } from '../../store/action';
import './index.scss';
import clientApi from '../../axios/clientApi';

const coverInfo = {
  title: 'My Works',
  descript: '学习过程中的作品 & 轮子！',
  cover: 'https://image.lcylove.cn/blog_work_cover'
};

class Work extends React.Component {
  componentDidMount() {
    if ( !this.props.works.isRequest ) {
      this.props.getWorks();
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>作品 | Pawn ' s Blog</title>
        </Helmet>
        <BgCover coverInfo={ coverInfo } />
        <main className="work-page page-container">
          <div className="work-list">
            {
              this.props.works.data.map(item => <WorkItem key={ item._id } work={ item } />)
            }
          </div>
        </main>
      </Fragment>
    );
  }
}

const WorkItem = (props) => {
  const { work = {} } = props;
  return (
    <div className="work-item">
      <div className="box">
        <a rel="noopener noreferrer" target="_blank" href={ work.website } title={ `打开项目地址:${work.website}` }>
          <div className="works-img-cover">
            <div className="cover">
              <p className="works-desc">{ work.descript }</p>
              <span>点击查看</span>
            </div>
            <img src={ work.cover } alt="作品图片" />
          </div>
        </a>
        <div className="works-info">
          <p className="works-name">{ work.name }</p>
          <p className="works-time">{ work.time }</p>
        </div>
      </div>
    </div>
  );
};

Work.loadData = (store, serverApi) => (
  store.dispatch(getWorks(serverApi))
);

const mapDispatchToProps = dispatch => ({
  getWorks() {
    dispatch(getWorks(clientApi));
  }
});

const mapStateToProps = state => ({
  works: state.works
});

export default connect(mapStateToProps, mapDispatchToProps)(Work);
