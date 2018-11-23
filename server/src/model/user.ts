import { db } from '../db';
import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  name: string;
  pwd: string;
  token: string;
}

const userSchema = new db.Schema({
  userId: { type: String, required: true, validate: /\S+/ },
  name: { type: String, required: true, validate: /\S+/ },
  pwd: { type: String, required: true, validate: /\S+/ },
  token: { type: String, default: '' }
}, {
  versionKey: false
});

const User: Model<IUser> = db.model<IUser>("User", userSchema);
export default User;
