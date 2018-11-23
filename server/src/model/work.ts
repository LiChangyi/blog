import { db } from '../db';

export interface IWork {
  // 项目名称
  name: string;
  // 项目描述
  descript: string;
  // 项目预览站点
  website: string;
  // 项目时间
  time: string;
  // 封面
  cover: string;
}

const workSchema = new db.Schema({
  name: { type: String, required: true },
  descript: { type: String, required: true },
  website: { type: String, required: true },
  time: { type: String, required: true },
  cover: { type: String, required: true }
}, {
  versionKey: false
});

const Work = db.model('Work', workSchema);
export default Work;
