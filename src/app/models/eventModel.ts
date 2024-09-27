import mongoose, { Document, Model } from 'mongoose';

export interface IEvent {
  title: string;
  description: string;
  due_date: Date;
  organizer: string;
}

export interface IEventDocument extends IEvent, Document {
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema<IEventDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event: Model<IEventDocument> =
  mongoose.models?.Event || mongoose.model('Event', eventSchema);

export default Event;
