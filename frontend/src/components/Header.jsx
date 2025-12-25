import React from "react";
import { assets } from "../assets/assets";

const leftside = () => {
  return (
    <div className="flex  flex-col md:flex-row flex-wrap  bg-primary rounded-lg p-6 md:px-10 lg:px-20 ">
      {/* left side */}
      <div className=" w-full md:w-1/2 flex flex-col   items-center  md:items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[30px]  ">
        <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br />
          With Trusted Doctors
        </p>
        <div className=" flex flex-col  md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply Browse through our extensive list of trusted doctors,
            <br />
            Schedule your appointment hassle free
          </p>
        </div>
        <a
          href="#specialty"
          className="flex  items-center gap-3 bg-white text-sm px-8 md:py-3 py-3 rounded-full text-gray-600 cursor-pointer m-auto md:m-0 hover:scale-105 transition-all  duration-300"
        >
          Book an appointment{" "}
          <img className="W-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* Right side  */}
      <div className=" w-full md:w-1/2  items-center mx-auto justify-center md:relative">
        <img
          className="w-full md:absolute bottom-0 h-auto "
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default leftside;
