import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Paginatortion extends React.Component {
  constructor() {
    super();
    this.state = {
      jump_page: 0
    };
    this.jump_input_change = this.jump_input_change.bind(this);
  }

  componentDidMount() {
    const { current_page } = this.props.pagination;
    this.setState( () => ({
      jump_page: current_page
    }));
  }

  jump_input_change(e) {
    const val = e.target.value;
    if (val % 1 !== 0) return;
    this.setState(() => ({
      jump_page: Number(val)
    }));
  }

  jump_page(num) {
    this.props.page_jump(Number(num));
  }

  renderPageNum() {
    const { total = 0, current_page = 1, page_size = 6 } = this.props.pagination;
    const total_page = Math.ceil(total / page_size);
    const ret = [];
    const min = total_page > 5 ? 5 : total_page;
    if (current_page <= min - 2) {
      for (let i = 1; i <= min; i += 1) {
        ret.push(i);
      }
    } else {
      if ( current_page + 2 < total_page ) {
        for (let i = (current_page - 2) > 0 ? current_page - 2 : 1; i < current_page + 3; i += 1 ) {
          ret.push(i);
        }
      } else {
        if (total_page >= 5) {
          for (let i = total_page - 4; i <= total_page; i += 1) {
            ret.push(i);
          }
        } else {
          for (let i = 1; i <= total_page && i > 0; i += 1) {
            ret.push(i);
          }
        }
      }
    }
    // 返回整个页码组
    return ret.map(item => (
      <li
        className={ Number(current_page) === item ? 'active' : '' }
        key={ item }
        onClick={ () => this.jump_page(item) }
      >
        { item }
      </li>
    ));
  }

  render() {
    const totalStr = `共${Math.ceil(this.props.pagination.total / this.props.pagination.page_size)}页 ${this.props.pagination.total}条数据`;
    return (
      <div className="paginatortion">
        <ul>
          <li
            onClick={ () => this.jump_page( this.props.pagination.current_page - 1 ) }
          >
            <i className="iconfont icon-jiantou" />
          </li>
          { this.renderPageNum() }
          <li
            onClick={ () => this.jump_page( this.props.pagination.current_page + 1 ) }
          >
            <i className="iconfont icon-jiantou-copy" />
          </li>
        </ul>
        <div className="paginatortion-total display-inline-block">{ totalStr }</div>
        <input className="jump_input" onChange={ this.jump_input_change } type="text" value={ this.state.jump_page } />
        <button
          className="jump_btn"
          type="button"
          onClick={ () => { this.jump_page(this.state.jump_page); } }
        >跳转</button>
      </div>
    );
  }
}

Paginatortion.defaultProps = {
  pagination: {
    total: 0,
    current_page: 1,
    page_size: 6
  }
};

Paginatortion.propTypes = {
  pagination: PropTypes.shape({
    total: PropTypes.number,
    current_page: PropTypes.number,
    page_size: PropTypes.number
  })
};

export default Paginatortion;
