import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true, // Optional: makes sure IDs are unique
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      required: true,
    },
    original_language: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    genres: {
      type: [],
      required: true,
    },
    casts: {
      type: [],
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
