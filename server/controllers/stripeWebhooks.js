import stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeInstance = new stripe(webhookSecret);

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error(`Error verifying webhook signature: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        {
          const paymentIntent = event.data.object;
          const sessionlist = await stripeInstance.paymentIntents.list({
            payment_intent: paymentIntent.id,
          });
          const session = sessionlist.data[0];
          const { bookingId } = session.metadata;
          console.log(bookingId);
          

          await Booking.findByIdAndUpdate(bookingId, {
            isPaid: true,
            paymentLink: "",
          });
        }
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
    response.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    response.status(500).send("Internal Server Error")
  }

};
