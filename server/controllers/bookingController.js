import Booking from "../models/Booking.js";
import Show from "../models/Shows.js"
import stripe from "stripe"

const checkSeatAvialability = async (showId, selectedSeats)=> {
    try {
        const showData = await Show.findById(showId);
    if(!showData) return false;

    const occupiedSeats = showData.occupiedSeats;

    const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);
    return !isAnySeatTaken;
    } catch (error) {
        console.log(error.message);
        return false;
    } 
}  
 
//  API to create new booking
export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const {showId, selectedSeats} = req.body;
        const {origin} = req.headers;

        const isSeatAvailable = await checkSeatAvialability(showId, selectedSeats);

        if(!isSeatAvailable) return res.json({success:false, message: "Selected seats are not available."})
        
        const showData = await Show.findById(showId).populate('movie');
        
        const newBooking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
            isPaid: true
        });

        selectedSeats.map(seat => showData.occupiedSeats[seat] = userId);

        showData.markModified('occupiedSeats');
        await showData.save();

        // stripe gatewat initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        // creating line item for stripe
        const lineItems = [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: showData.movie.title
                }, 
                unit_amount: Math.floor(newBooking.amount) * 100
            },
            quantity: 1
        }];

        const session = await stripeInstance.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            metadata: {
                bookingId: newBooking._id.toString(),
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
        });

        newBooking.paymentLink = session.url;
        await newBooking.save();

        return res.json({success: true, url: session.url, message: "Booking created successfully."});
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// API to get occupied seats 
export const getOccupiedSeats = async (req, res) => {
    try {
        const {showId} = req.params;
        const showData = await Show.findById(showId);

        const occupiedSeats = Object.keys(showData.occupiedSeats);


        res.json({success:true, occupiedSeats})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}