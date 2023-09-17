import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  code: {
    type: String,
    required: true,
    max: 100,
    unique: true
  },
  purchase_datetime: {
    type: Date,
    required: true,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
    max: 100,
  },
});

export const TicketModel = model('tickets', schema);


