import { db } from '../db';
import { Document, Model } from 'mongoose';

export interface ITag extends Document {
  // 标签id
  _id: string;
  // 标签名称
  name: string;
  // 描述
  descript: string;
  // 文章数目
  num: number;
}


const tagSchema = new db.Schema({
  name: { type: String, required: true, validate: /\S+/ },
  descript: { type: String, required: true, validate: /\S+/ },
  num: { type: Number, default: 0}
}, {
  versionKey: false
});

const Tag: Model<ITag> = db.model<ITag>("Tag", tagSchema);
export default Tag;
