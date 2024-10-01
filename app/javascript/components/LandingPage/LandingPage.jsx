import React from "react";
import { Footer } from "./Footer";
import { PricingPlans } from "./PricingPlans";
import { Advantages } from "./Advantages";
import { LandingIntro } from "./LandingInto";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <LandingIntro />
      {/* <Advantages />
      <PricingPlans /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
