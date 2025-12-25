import express from "express";
import {
  addDoctor,
  loginAdmin,
  getDoctors,
  adminAppointment,
  appointmentCancel,
  dashboardData,
} from "../controllers/adminContoller.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/adminAuth.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, getDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/all-appointments", authAdmin, adminAppointment);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, dashboardData);

export default adminRouter;
