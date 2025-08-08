import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest, functions } from "./inngest/index.js"
import { serve } from "inngest/express";
import showRouter from "./routes/showRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";


const app = express();
const port = process.env.PORT || 3000;

await connectDB();

// Stripe requires the raw body to verify webhook signatures, so we use express.raw here.
// Do not use express.json() for this route, as it would break Stripe signature verification.
app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks);
// Handle CORS preflight for Stripe webhook
app.options('/api/stripe', cors());




app.use(express.json()); 
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
