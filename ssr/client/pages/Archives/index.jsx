import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { formatDate } from '../../plugins/utils';
import BgCover from '../../components/BgCover';
import './index.scss';
import { getArch } from '../../store/action';
import clientApi from '../../axios/clientApi';

const coverInfo = {
  title: 'Archives',
  descript: '只有做好了当前应该做的事情,以后才能做想做的事情!',
  cover: 'https://image.lcylove.cn/blog_arch_cover'
};

function computed(data) {
  const obj = {};
  data.forEach((item) => {
    const update_at = formatDate(item.update_at);
    const key = `${update_at.year}-${update_at.monthNum}`;
    if ( !obj[key] ) {
      obj[key] = {
        time: `${update_at.year} 年 ${update_at.monthNum} 月`,
        data: []
      };
    }
    obj[key].data.push(item);
  });
  return obj;
}

class Archives extends React.Component {
  componentDidMount() {
    if ( !this.props.arch.isRequest ) {
      this.props.getArch();
    }
  }

  render() {
    const data = computed(this.props.arch.data);
    return (
      <Fragment>
        <Helmet>
          <title>归档 | Pawn ' s Blog</title>
        </Helmet>
        <BgCover coverInfo={ coverInfo } />
        <main className="archives-page page-container">
          <div className="arch-box">
            {
              Object.keys(data).map(item => <ArchivesItem key={ item } arch={ item } data={ data } />)
            }
          </div>
        </main>
      </Fragment>
    );
  }
}

const ArchivesItem = (props) => {
  const { arch } = props;
  const { data, time } = props.data[arch];
  return (
    <div className="arch-item">
      <p className="arch-item-title">{ time }</p>
      <ul className="arch-item-children">
        {
          data.map((item) => {
            const create_at = formatDate(item.create_at);
            const update_at = formatDate(item.update_at);
            return (
              <a key={ item._id } className="arch-link" href={ `/article/${item._id}` } title={ `上次更新:${update_at.time}\n创建时间:${create_at.time}` }>
                <li className="arch-children-descript">{ `${item.title}${item.publish === 0 ? ' => 草稿ing' : ''}` }</li>
              </a>
            );
          })
        }
      </ul>
    </div>
  );
};

Archives.loadData = (stroe, serverApi) => (
  stroe.dispatch(getArch(serverApi))
);

const mapStateToProps = state => ({
  arch: state.arch
});

const mapDispatchToProps = dispatch => ({
  getArch() {
    dispatch(getArch(clientApi));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Archives);
