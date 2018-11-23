import React from 'react';
import './index.scss';

const Aside = props => (
  <div className="aside">
    <div className="aside-layer">
      <div className="search-box">
        <input
          type="text"
          value={ props.keyword }
          onChange={ e => props.keywordChange(e.target.value) }
          placeholder="Search..."
          onKeyUp={ (e) => {
            if ( e.keyCode === 13 ) {
              props.searchkeyWord();
            }
          } }
        />
        <i onClick={ () => props.searchkeyWord() } className="iconfont icon-iconfontzhizuobiaozhun22" />
      </div>
      <div className="user-info">
        <p className="aside-title">简介</p>
        <p className="brief-item user-name">李昌义</p>
        <p title="成都大学2016级计算机科学与技术" className="brief-item">(CDU)2016级计算机科学与技术</p>
        <p className="brief-item">
          <a href="mailto:1052069088@qq.com" title={ '电子邮箱\n1. 1052069088@qq.com\n2. lichangyigod@gmail.com' } target="-blank">Email</a>
        </p>
        <p className="brief-item">
          <a href="http://github.com/lichangyi" title="github搜索: LiChangyi" target="-blank">GitHub</a>
        </p>
        <p className="brief-item">
          <a href="https://juejin.im/user/59eeff42f265da43070275e1" title="掘金搜索: Pawn2018" rel="noopener noreferrer" target="_blank">掘金</a>
        </p>
      </div>
      <div className="categories-box">
        <p className="aside-title">文章标签</p>
        <span onClick={ () => props.searchTag('') } title="查看全部" className="categorige-item">ALL</span>
        {
          props.tags.map(tag => (
            <span
              key={ tag._id }
              onClick={ () => props.searchTag(tag._id) }
              title={ tag.descript }
              className="categorige-item"
            >{ `${tag.name}(${tag.num})` }</span>
          ))
        }
      </div>
    </div>
  </div>
);

export default Aside;
