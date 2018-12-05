import React from 'react';
import Helmet from 'react-helmet';
import * as qiniu from 'qiniu-js';
import axios from '../../axios';
import Toast from '../../components/Toast';
import './index.scss';

export default class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      uploadList: [],
      token: ''
    }
  }
  render() {
    return (
      <div className="upload-page">
        <Helmet>
          <title>图片上传 | Pawn 's Blog</title>
        </Helmet>
        <div className="tool">
          <input type="file" onChange={ (e) => this.handleUpload(e) }/>
        </div>
        <div className="upload_list">
          <ul className="item table-th">
            <li className="realname">Realname</li>
            <li className="codename">Codename</li>
            <li className="size">Size</li>
            <li className="detail">Detail</li>
            <li className="website">website</li>
          </ul>
          {
            this.state.uploadList.map( (item, index) => {
              const progress = item.progress;
              return (
                <ul className="item" key={ index }>
                  <li className="realname">{ item.realname }</li>
                  <li className="codename">
                    <p>{ item.codename }</p>
                    <div className="preview_box" style={{ display: item.website === ''?'none':'block'}}>
                      <a href={ item.website } rel="noopener noreferrer" target="_blank" title="预览">
                        <img className="preview" src={ item.website } alt="上传图片预览" />
                      </a>
                    </div>
                  </li>
                  <li className="size">{ item.size }</li>
                  <li className="detail">
                    <div className="uploadBox" style={ { display: progress < 100?'':'none' }}>
                      <div className="progress">
                        <div className="bar" style={ {width: progress + '%'}}></div>
                      </div>
                      <button className="btn"
                        onClick={ () => this.uploadCloud(item) }>开始上传</button>
                    </div>
                    <div className="file_detail" style={ { display: progress === 100?'block':'none' }} >
                      <p><span className="detail-title">Hash:</span>{ item.detail.hash }</p>
                      <p><span className="detail-title">Bucket:</span>{ item.detail.bucket }</p>
                    </div>
                  </li>
                  <li className="website">
                    <textarea
                      title="点击复制地址到剪切板"
                      className="copy-text"
                      value={ item.website }
                      readOnly
                      onClick={ (e) => this.handleCopy(e) }></textarea>
                  </li>
                </ul>
              );
            })
          }
        </div>
      </div>
    );
  }
  handleCopy(e) {
    let el = e.target;
    el.select();
    document.execCommand("Copy");
    Toast.success("网址已复制好，可贴粘。");
  }
  handleUpload(e) {
    let obj = e.target;
    let file = obj.files[0];
    let temp = {
      realname: file.name,
      codename: random_file_name(),
      size: file.size,
      website: '',
      progress: 0,
      detail: {
        hash: '',
        bucket: ''
      },
      file
    }
    let uploadList = [...this.state.uploadList, temp];
    this.setState(() => ({
      uploadList
    }))
  }
  uploadCloud(item) {
    const _self = this;
    let putExtra = {
      fname: "",
      params: {},
      mimeType: [] || null
    };
    let config = {
      useCdnDomain: true
    };

    let error = function(err) {
      Toast.error("上传出错" + err.message);
    };
    let complete = function(res) {
      Toast.success("上传完成！");
      let uploadList = _self.state.uploadList;
      for( let i = 0,len = uploadList.length; i < len; i++){
        let el = uploadList[i];
        if ( el.codename === item.codename ) {
          el.detail.hash = res.hash;
          el.detail.bucket = 'blog';
          el.website = "https://image.lcylove.cn/" + item.codename;
          break;
        }
      }
      _self.setState(() => ({
        uploadList
      }))
    };

    let next = function(res) {
      let percent = res.total.percent || 0;
      let uploadList = _self.state.uploadList;
      for( let i = 0,len = uploadList.length; i < len; i++){
        let el = uploadList[i];
        if ( el.codename === item.codename ) {
          el.progress = percent;
          break;
        }
      }
      _self.setState(() => ({
        uploadList
      }))
    };

    let subObject = { 
      next: next,
      error: error,
      complete: complete
    };
    const token = this.state.token;
    let observable = qiniu.upload(item.file, item.codename, token, putExtra, config);
    observable.subscribe(subObject); // 开始上传
  }
  async componentDidMount() {
    // 获取七牛云上传的token
    const res = await axios.api_get_qiniu();
    const { code = 0, msg = '', token = '' } = res.data;
    if ( code === 0 ) {
      Toast.error(msg);
    } else {
      Toast.success(msg);
      this.setState(() => ({
        token
      }))
    }
  }
}

function random_file_name() {
  // 随机生成文件名，16进制时间戳+8位随机
  let s = new Date().getTime().toString(16);
  s += '_';
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 8; i++) {
    s += hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  return s;
}