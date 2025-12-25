import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDb();
connectCloudinary();

app.use(express.json());

app.use(cors());

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("get working");
});

app.listen(PORT, () => console.log("Server started on port", PORT));
