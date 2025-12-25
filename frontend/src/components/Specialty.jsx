import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const Specialty = () => {
  return (
    <div
      id="specialty"
      className="flex flex-col items-center gap-4 py-16 text-gray-600"
    >
      <h1 className="text-3xl font-medium">Find By Specialty</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Browse through our extensive list of trusted Doctors ,schedule your
        appoinment hasssle free
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll ">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col  shrink-0 items-center text-xs transition-all duration-500 cursor-pointer hover:-translate-y-2.5"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img className="w-16 sm:w-20 mb-2" src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Specialty;
