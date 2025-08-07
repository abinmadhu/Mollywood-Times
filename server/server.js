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

// stripe webhooks route
app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

app.use(express.json()); 
app.use(cors());
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
