import React from 'react';
import NavLeft from '../NavLeft';
import './index.scss';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="nav-left">
          <NavLeft />
        </div>
        <main className="main-right">
          { this.props.children }
        </main>
      </div>
    );
  }
}