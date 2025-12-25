import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAtoken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, seDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboard, setDashboard] = useState([]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        seDoctors(data.doctors);
      } else {
        toast.error("Can't get doctors, network error");
      }
    } catch (error) {
      console.log(error);

      toast.error("Network error");
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error("Network error");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/all-appointments",
        { headers: { aToken } }
      );

      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error("error getting appointment");
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error("cannot cancel appointment");
      }
    } catch (error) {
      console.log(error);
      toast.error("error cancelling appointment");
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });

      if (data.success) {
        setDashboard(data.dashData);
      } else {
        toast.error("cannot get dash data");
      }
    } catch (error) {
      console.log(error);
      toast.error("error getting dashboard data");
    }
  };
  useEffect(() => {
    console.log("Dashboard updated:", dashboard);
  }, [dashboard]);

  const value = {
    aToken,
    setAtoken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAppointments,
    cancelAppointment,
    getDashData,
    dashboard,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
