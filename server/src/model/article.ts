import { db } from '../db';
import { ITag } from './tag';
import { Document } from 'mongoose';

export interface IArticle extends Document {
  // 标题
  title: string;
  // 标签
  tag: ITag[];
  // 内容
  descript: string;
  // 状态 => 1:发布 0:草稿
  publish: number;
  // 封面
  cover: string;
  // 发布日期
  create_at: Date;
  // 上一次修改日期
  update_at: Date;
  // 内容
  content: string;
}

const articleSchema = new db.Schema({
  title: { type: String, required: true },
  tag: [{ type: db.Schema.Types.ObjectId, ref: 'Tag' }], 
  descript: { type: String, required: false },
  publish: { type: Number, default: 1 },
  cover: { type: String, required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  content: { type: String, required: true }
}, {
  versionKey: false,
  timestamps: { createdAt: 'create_at', updatedAt: 'update_at' }
});


const Article = db.model('Article', articleSchema);
export default Article;
