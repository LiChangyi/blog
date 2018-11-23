import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './index.scss';

const navMenu = [
  {
    path: '/',
    name: '首页',
    key: 'home'
  }, {
    path: '/work',
    name: '作品',
    key: 'work'
  }, {
    path: '/archives',
    name: '归档',
    key: 'archives'
  }, {
    path: '/about',
    name: '关于',
    key: 'about'
  }
];

const Header = () => (
  <header className="header">
    <div className="nav-logo">
      <div className="page-container">
        <div className="logo">
          <Link to="/">
            <img className="logo-img" src="/img/logo.png" alt="logo" />
          </Link>
        </div>
        <nav className="nav-list">
          {
            navMenu.map(item => (
              <li className="nav-item display-inline-block" key={ item.key }>
                <NavLink className="nav-link" exact to={ item.path } { ...item }>{ item.name }</NavLink>
              </li>
            ))
          }
        </nav>
        <div className="nav-list-min-btn">
          <i className="iconfont icon-caidan6"></i>
        </div>
        <ul className="nav-list-min-box">
          {
            navMenu.map(item => (
              <li className="nav-item" key={ item.key }>
                <NavLink className="nav-link" exact to={ item.path } { ...item }>{ item.name }</NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </header>
);

export default Header;
