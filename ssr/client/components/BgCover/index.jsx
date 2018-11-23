import React from 'react';
import './index.scss';

const BgCover = (props) => {
  const { coverInfo } = props;
  const url = coverInfo.cover ? coverInfo.cover : 'https://image.lcylove.cn/blog_default_cover';
  return (
    <div className="bg-cover" style={{ backgroundImage: `url(${url})` }}>
      <div className="cover-wrap">
        <h1 className="title">{ coverInfo.title }</h1>
        <hr />
        <p className="describe">{ coverInfo.descript }</p>
      </div>
    </div>
  );
};

export default BgCover;
