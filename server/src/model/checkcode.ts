import { db } from '../db';
import { Document, Model } from 'mongoose';

interface ICheckCode extends Document {
  token: string;
  code: string;
}

const checkCodeSchema = new db.Schema({
  token: { type: String, default: ''},
  code: { type: String, default: ''}
}, {
  versionKey: false
});

const CheckCode: Model <ICheckCode> = db.model<ICheckCode>('CheckCCode', checkCodeSchema);

export default CheckCode;
