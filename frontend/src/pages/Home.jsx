import React from "react";
import Header from "../components/Header";
import Specialty from "../components/Specialty";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import RelatedDoctors from "../components/RelatedDoctors";

const Home = () => {
  return (
    <div>
      <Header />
      <Specialty />
      <TopDoctors />

      <Banner />
    </div>
  );
};

export default Home;
