import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IBlog extends Document {
  title: string;
  content: string;
  author: IUser['_id'];
  isPublished: boolean;
  isPremium: boolean;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublished: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
