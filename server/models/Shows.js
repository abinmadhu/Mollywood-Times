import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const showSchema = new Schema(
  {
    movie: {
      type: String,
      required: true,
      ref: 'Movie',
    },
    showDateTime: {
      type: Date,
      required: true,
    },
    showPrice: {
      type: Number,
      required: true,
    },
    occupiedSeats: {
      type: Object,
      default: {},
    },
  },
  {
    minimize: false, // Keeps empty objects
  }
);

const Show = model('Show', showSchema);

export default Show;
