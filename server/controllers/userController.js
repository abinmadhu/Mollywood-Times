import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movies.js";

// API to get all user Bookings
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.auth();

    const bookings = await Booking.find({ user: userId })
      .populate({ path: "show", populate: { path: "movie" } })
      .sort({ createdAt: -1 });
   

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update favorite movies in clerk user metadata
export const updateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const { userId } = req.auth();

    const user = await clerkClient.users.getUser(userId);
    if (!user.privateMetadata.favorites) {
      user.privateMetadata.favorites = [];
    }

    if (!user.privateMetadata.favorites.includes(movieId)) {
      user.privateMetadata.favorites.push(movieId);
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: user.privateMetadata,
      });

      res.json({ success: true, message: "Added to Favorites successfully" });
    } else {
      user.privateMetadata.favorites = user.privateMetadata.favorites.filter(
        (item) => item !== movieId
      );
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: user.privateMetadata,
      });

      res.json({
        success: true,
        message: "Removed from Favorites successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get favorite movies of user
export const getFavorites = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth().userId);
    const favorites = user.privateMetadata.favorites;
    const movies = await Movie.find({ _id: { $in: favorites } });

    res.json({ success: true, movies });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
