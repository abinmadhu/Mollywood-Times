import { getAuth } from "@clerk/express";
import Booking from "../models/Booking.js";
import Show from "../models/Shows.js";
import User from "../models/User.js";
import {clerkClient} from "@clerk/clerk-sdk-node"

// API to check if user is admin
export const isAdmin = async (req, res) => {
  try {
    const { userId } = getAuth(req); // Extract user from JWT
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);
    const role = user.privateMetadata?.role;
 
    const isAdmin = role === "admin";

    return res.json({ success: true, isAdmin });
  } catch (err) {
    console.error("check-admin error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// API to get dashboaerd Data
export const getDashBoardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");
    const totalUsers = await User.countDocuments();
    
    const dashBoardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUsers,
    };

    res.json({ success: true, dashBoardData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all shows Data
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({showDateTime:{$gte: new Date()}}).populate('movie').sort({showDateTime: 1});

    res.json({success: true, shows});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all bookings Data
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user').populate({
            path: "show", populate: {path: "movie"}
        }).sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        console.log(error);
    res.json({ success: false, message: error.message });
    }
}