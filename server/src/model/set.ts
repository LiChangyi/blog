import { db } from '../db';
import { Document, Model } from 'mongoose';

interface IQiniu {
  ACCESS_KEY: string;
  SECRET_KEY: string;
  BUCKET: string;
}


export interface ISet extends Document {
  myInfo: string;
  qiniu: IQiniu;
  registrationCode: string;
}

const SetSchema = new db.Schema({
  myInfo: { type: String, default: ''},
  qiniu: {
    ACCESS_KEY: { type: String, default: ''}, 
    SECRET_KEY: { type: String, default: ''},
    BUCKET: { type: String, default: ''}
  },
  registrationCode: { type: String, default: '' }
}, {
  versionKey: false
});

const Set: Model<ISet> = db.model<ISet>('Set', SetSchema);
export default Set;
