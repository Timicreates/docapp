import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";

import CheckoutPayment from "../components/CheckoutPayment";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, getUserData } =
    useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const [clientSecret, setClientSecret] = useState(null);
  const [payingAppointmentId, setPayingAppointmentId] = useState(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");

    return (
      dateArray[0] +
      " " +
      " " +
      months[Number(dateArray[1]) - 1] +
      " " +
      " " +
      dateArray[2]
    );
  };
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const initPay = (order) => {
  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amounimport CheckoutPayment from './../components/CheckoutPayment';
  // t: order.amount,
  //     currency: order.currency,
  //     name: "Appointment Payment",
  //     description: "Appointment Payment",
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response) => {
  //       console.log(response);
  //     },
  //   };
  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  // const appointmentRazorpay = async (appointmentId) => {
  //   try {
  //     const { data } = await axios.post(
  //       backendUrl + "/api/user/payment-razorpay",
  //       { appointmentId },
  //       { headers: { token } }
  //     );
  //     if (data.success) {
  //       initPay(data.order);
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const stripeApppointmentPayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        setClientSecret(data.clientSecret);
        setPayingAppointmentId(appointmentId);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to start payment");
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">
        My Appointment
      </p>
      <div className="">
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300"
            key={index}
          >
            <div className="">
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600 ">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p className="">{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1 mb-1 ">Adress:</p>
              <p className="text-xs"> {item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1 ">
                <span className="text-sm text-neutral-700 font-medium">
                  Date and Time :
                </span>
                {""} {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className=""></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && (item.payment || item.isCompleted) && (
                <button className="text-center sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                  Paid
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => stripeApppointmentPayment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:text-white hover:bg-primary transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {clientSecret && payingAppointmentId === item._id && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutPayment
                    amount={item.amount}
                    appointmentId={item._id}
                    backendUrl={backendUrl}
                    token={token}
                    getUserData={getUserData}
                    onSuccess={() => {
                      toast.success("Payment successful");
                      setClientSecret(null);
                      setPayingAppointmentId(null);
                      getAppointments();
                      console.log(appointments);
                    }}
                  />
                </Elements>
              )}

              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:text-white hover:bg-red-600 transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className=" sm:min-w-48 rounded border border-red-500 text-red-500 py-2">
                  Appointment Cancelled
                </button>
              )}
              {!item.cancelled && item.isCompleted && (
                <button className="text-center sm:min-w-48 py-2 border border-green-300 rounded text-green-400 bg-white">
                  Consultation Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
