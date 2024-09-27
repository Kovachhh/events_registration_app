import { User } from './User';

export type Event = {
  _id: string;
  title: string;
  description: string;
  due_date: Date;
  organizer: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
};
