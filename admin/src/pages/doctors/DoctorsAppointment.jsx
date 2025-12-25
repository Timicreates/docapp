import React from "react";
import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorsAppointment = () => {
  const {
    dToken,
    appointments,
    setAppointments,
    getAppointment,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointment();
    }
  }, [dToken]);
  return (
    <div className="m-5 w-full max-w-6xl">
      <p className="mb-3 text-lg font-medium">All appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll  ">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 p-3 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age </p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-4 border-b hover:bg-gray-300 "
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className=" flex items-center gap-2">
              <img
                className="size-7 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name} </p>
            </div>
            <div>
              <p className="text-xs border-primary inline border px-2 py rounded-full">
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>
            <p className="max-sm:hidden"> {calculateAge(item.userData.dob)}</p>
            <p>
              {" "}
              {slotDateFormat(item.slotDate)} {""}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-xs font-medium text-red-400">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-xs font-medium text-green-500">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="size-9"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="size-9"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsAppointment;
