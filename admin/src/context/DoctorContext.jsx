import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDtoken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [appointments, setAppointments] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [profile, setProfile] = useState([]);

  const getAppointment = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error("cannot get appointments");
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Cannot get appointments");
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success("Appointment completed");
        getAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Cannot complete appointment");
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success("Appointment cancelled");
        getAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Cannot cancel appointment");
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });

      if (data.success) {
        setDashboard(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error("Couldn't get dash data");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Cannot cancel appointment");
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctor-profile",
        { headers: { dToken } }
      );
      if (data.success) {
        setProfile(data.docData);
        console.log(data.docData);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Cannot  get profile");
    }
  };

  const value = {
    dToken,
    setDtoken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointment,
    completeAppointment,
    cancelAppointment,
    dashboard,
    setDashboard,
    getDashData,
    getProfileData,
    profile,
    setProfile,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
