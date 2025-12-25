import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          About <span className="text-gray-700 font-medium">Us</span>{" "}
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm  text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
            repellendus veniam maxime in ab necessitatibus veritatis at sit
            quaerat dolorum, ex tempore voluptates numquam officiis adipisci
            dicta fugiat quo harum quas, esse culpa. Dolores, quam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            voluptas exercitationem quas, possimus ex, optio sed ad labore nisi
            a aliquid esse. Earum, debitis dolores!
          </p>
          <b>Our Vision</b>
          <p>
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            veniam. Quas quaerat, praesentium ratione nam, nulla nobis in, hic
            laboriosam laudantium mollitia blanditiis explicabo sit!
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-600 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600">
          <b>Efficiency:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600">
          <b>Convenience</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600">
          <b>Personalisation:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
