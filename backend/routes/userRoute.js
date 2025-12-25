import express from "express";

import {
  bookAppointment,
  cancelAppointment,
  confirmPayment,
  createStripePayment,
  getUserProfile,
  listAppointment,
  loginUser,
  // paymentRazorPay,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import authUser from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getUserProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateUser
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
// userRouter.post("/payment-razorpay", authUser, paymentRazorPay);
userRouter.post("/payment-stripe", authUser, createStripePayment);
userRouter.post("/payment-confirmation", authUser, confirmPayment);

export default userRouter;
