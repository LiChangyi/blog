/*
 * @Author: Pawn
 * @Date: 2018-10-29 18:27:31
 * @Last Modified by: Pawn
 * @Last Modified time: 2018-10-29 19:23:08
 */

import mongoose =  require('mongoose');
import config = require('../config');

(mongoose as any).Promise = global.Promise;

// export const mongoose = mongoose

export const db = mongoose;

// 数据库
export const connect = () => {

  // 连接数据库
  mongoose.connect(config.MONGODB.uri, { useNewUrlParser: true, useFindAndModify: false});

  // 连接错误
  mongoose.connection.on('error', error => {
    console.log('数据库连接失败!', error);
  });

  // 连接成功
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功!');
  });

  return mongoose;
};
