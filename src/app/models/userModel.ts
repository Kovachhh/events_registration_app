import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
  full_name: string;
  email: string;
  birth_date: Date;
  source: string;
  event_id: mongoose.Schema.Types.ObjectId;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
