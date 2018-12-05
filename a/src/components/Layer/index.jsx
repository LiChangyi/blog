import React from 'react';
import './index.scss';

export default class Layer extends React.Component {
  render() {
    const { formData=[], data={}, layer:{ title,isShow } } = this.props;
    return (
      <div className="layer" style={ { display: isShow?'block':'none' } }>
        <div className="wrap">
          <div className="layer-header">
            <p className="title">{ title }</p>
          </div>
          <div className="layer-form">
            {
              formData.map( (item, index) => {
                const { name, key } = item;
                return (
                  <div className="layer-form-item" key={ index }>
                    <span className="form-title">{ name }</span>
                    <div className="form-content">
                      <input className="form-input" type="text"
                        value={ data[key] }
                        onChange={ (e) => this.handleChange(e, key) }/>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="layer-footer">
            <button className="btn red-btn"
              onClick={ () => this.props.handleLayer(false) }>关闭</button>
            <button className="btn blue-btn"
              onClick={ () => this.props.handleSave() }>保存</button>
          </div>
        </div>
      </div>
    );
  };
  handleChange(e, key) {
    const val = e.target.value;
    this.props.changeCurrentData(val, key);
  }
}
