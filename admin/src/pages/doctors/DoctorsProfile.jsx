import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorsProfile = () => {
  const { dToken, getProfileData, profile, setProfile, backendUrl } =
    useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      // const updateData = {
      //   address: profile.address,
      //   available: profile.available,
      //   fees: profile.fees,
      // };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        {
          address: profile.address,
          available: profile.available,
          fees: profile.fees,
        },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile , try again");
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    <div>
      <div className="flex flex-col gap-6 m-5">
        <div className="bg-primary/80 w-full sm:max-w-64 rounded-lg ">
          <img src={profile.image} alt="" />
        </div>
        <div className=" flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          {/* doc info  */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {profile.name}
          </p>
          <div className="gap-2 mt-1 text-gray-600 flex items-center ">
            {profile.degree}-{profile.speciality}
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {" "}
              {profile.experience}
            </button>
          </div>
          {/* doc about */}

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800">
              About :{" "}
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {profile.about}
            </p>
          </div>
          <p className="text-gray-600 font-medium mt-4 ">
            Appointment fee: ${" "}
            {isEdit ? (
              <input
                type="number"
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, fees: e.target.value }))
                }
                value={profile.fees}
              />
            ) : (
              profile.fees
            )}
          </p>
          <div className="flex gap-2 py-2 ">
            <p>Address : </p>
            <p className="text-sm">
              {isEdit ? (
                <input
                  value={profile.address.line1}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  type="text"
                />
              ) : (
                profile?.address?.line1
              )}
              <br />
              {isEdit ? (
                <input
                  value={profile.address.line2}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  type="text"
                />
              ) : (
                profile?.address?.line2
              )}
            </p>
          </div>
          <div className="flex gap-1 pt-2">
            <input
              onChange={() =>
                isEdit &&
                setProfile((prev) => ({ ...prev, available: !prev.available }))
              }
              checked={profile.available}
              type="checkbox"
              id=""
            />
            <label htmlFor="">Available</label>
          </div>
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all "
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all "
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsProfile;
