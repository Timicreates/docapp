import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left side */}

        <div className="  ">
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique,
            dolor doloremque sequi ipsum nulla, quas esse eveniet maiores quia
            eaque, molestias sit numquam. Soluta ut at, fugit sequi hic aliquam
            quo fugiat cumque ratione? Laborum nemo eos possimus voluptatibus
            quia?
          </p>
        </div>

        {/* center section */}
        <div className="">
          <p className="text-xl mb-6 font-medium">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li> Contact us</li>
            <li> Privacy policy</li>
          </ul>
        </div>

        {/* right section */}
        <div className="">
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-444-444-44</li>

            <li>ktimijohn123@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* copy right section */}
      <div className="">
        <hr className="border-0 h-0.5 bg-gray-200 rounded-lg" />
        <p className="py-5 text-sm text-center">
          Copy Right 2024@ timi_creates All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
