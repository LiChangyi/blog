import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../plugins/utils';
import './index.scss';

const AsiticleItem = (props) => {
  const { article, tags } = props;
  const create_at = formatDate(article.create_at);
  const update_at = formatDate(article.update_at);
  return (
  <article className="article-item">
    <div className="article-wrap">
      <Link
        to={ `/article/${article._id}` }
        title={ `创建时间:${create_at.time}\n上次修改:${update_at.time}` }
      >
        <div className="article-cover">
          <div className="layer" />
          <img className="article-cover-img" src={ article.cover } alt="777,LOADING FAIL!" />
          <div className="draft" style={{ display: article.publish === 0 ? '' : 'none' }}>
            <span className="draft-title">Draft</span>
          </div>
          <div className="article-time">
            <span className="day">{update_at.day}</span>
            <span className="month">{`${update_at.month}月`}</span>
          </div>
        </div>
      </Link>
      <div className="article-info">
        <Link
          to={ `/article/${article._id}` }
          title="查看文章"
        >
          <p className="article-title">{ article.title }</p>
        </Link>
        <p className="article-desc">{ article.descript }</p>
        <div className="article-tags">
          <i className="iconfont icon-tag" />
          {
            article.tag.map((tagId) => {
              const tag = tags.find(item => item._id === tagId );
              if ( tag ) {
                return (<span key={ tag._id } onClick={ () => props.searchTag(tag._id) } title={ tag.descript }>{ tag.name }</span>);
              }
              return false;
            })
          }
        </div>
      </div>
    </div>
  </article>);
};

export default AsiticleItem;
