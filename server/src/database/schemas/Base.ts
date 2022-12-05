import { Schema } from 'mongoose';
import { Data } from '..';

export const Base = new Schema<Data<any>>({
  id: { type: Schema.Types.String, required: true },
  data: { type: Schema.Types.Mixed, required: true },
});