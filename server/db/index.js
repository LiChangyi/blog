const mongoose = require('mongoose');
const db = mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser:true}, function(err){
  if(err){
    console.log(err)
  }else{
    console.log("Connection success!")
  }
})
const Schema = mongoose.Schema; 

// 文章表
let articleSchema = new Schema({
  article_title: String,
	article_tags: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }], 
  article_create_time: {type: String, default: Date.now},
  article_update_time: {type: String, default: Date.now},
  article_state: {
    type: Number,
    defaule: 1 // 0 => draft  1=> published
  }, 
  article_cover: String,
  article_desc: String,
  article_content: String
})

// 标签表
let TagsSchema = new Schema({
  tags_name: String, 
  tags_desc: String
})

// 作品表
let worksSchema = new Schema({
  works_name: String, 
  works_desc: String, 
  works_time: String,
  works_website: String, 
  works_cover: String, 
})

// 管理员表
let AdminSchema = new Schema({
  admin_name: String,
  admin_id: String, 
  admin_pwd: String, 
  token: {
    type: String,
    default: ''
  }, 
})

// 全局设置表
let settingSchema = new Schema({
  myInfo:{
    about_me_page: String
  },
  website_cover:{
	  home: String,
    production: String,
    archives: String,
    about: String
  },
  qiniu:{
    ACCESS_KEY:String, 
    SECRET_KEY:String,
    BUCKET:String,
  },
  other: {
    ICP:String, 
    blog_website:String 
  }
})

// 验证码
let checkcodeSchema = new Schema({
  token: String,
  code: String
})

exports.Article = mongoose.model('Article', articleSchema); 
exports.Tag = mongoose.model('Tag', TagsSchema); 
exports.Work = mongoose.model('Work', worksSchema); 
exports.Admin = mongoose.model('Admin', AdminSchema); 
exports.Setting = mongoose.model('Setting', settingSchema); 
exports.Checkcode = mongoose.model('Checkcode', checkcodeSchema); 