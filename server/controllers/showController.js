import axios from "axios";
import Movie from "../models/Movies.js";
import Show from "../models/Shows.js";

// API to get now showing movies from TMDB API
export const getNowShowingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    const movies = data.results;

    res.json({ success: true, movies: movies });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error });
  }
};

// API to add a new show to the database
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    let movie = await Movie.findById(movieId);

    if (!movie) {
      // fetch details and credits from tmdb api

      const movieDetailsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );

      const movieCreditsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );
      const movieAPIData = movieDetailsResponse.data;
      const mvoieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: movieAPIData.title,
        overview: movieAPIData.overview,
        poster_path: movieAPIData.poster_path,
        backdrop_path: movieAPIData.backdrop_path,
        genres: movieAPIData.genres,
        casts: mvoieCreditsData.cast,
        release_date: movieAPIData.release_date,
        original_language: movieAPIData.original_language,
        tagline: movieAPIData.tagline || "",
        vote_average: movieAPIData.vote_average,
        runtime: movieAPIData.runtime,
      };

      movie = await Movie.create(movieDetails);
    }

    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    res.json({ success: true, message: "Show added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// API to get all shows from the database
export const getshows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const uniqueShows = new Set(shows.map((show) => show.movie));
    res.status(200).json({ success: true, shows: Array.from(uniqueShows) });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// API to get single show from the database
export const getshow = async (req, res) => {
  try {
    const {movieId}  = req.params;
    const shows = await Show.find({movie: movieId,showDateTime: {$gte: new Date()}});

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    shows.forEach(show => {
      const date = show.showDateTime.toISOString().split('T')[0];
      if(!dateTime[date]){
        dateTime[date] = [];
      }
      dateTime[date].push({time: show.showDateTime, showId : show._id})
    })
    return res.json({success: true, movie, dateTime})
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
