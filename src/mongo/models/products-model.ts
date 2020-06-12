import { Document, model, Schema } from 'mongoose';
import { IUser } from './users-model';

export interface IProduct extends Document {
  title: string;
  desc: string;
  price: number;
  images: string[];
  user: IUser | string;
}

const productSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [{ type: String, required: true }], default: [] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>('Product', productSchema);
