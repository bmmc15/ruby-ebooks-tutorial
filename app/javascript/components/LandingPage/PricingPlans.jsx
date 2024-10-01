import React from "react";
import { PlanCard } from "./PlanCard";

export const PricingPlans = () => {
  return (
    <section className="container mx-auto px-6">
      <div className="flex flex-col items-center text-center mt-12">
        <h5 className="text-sm text-indigo-600 ">PLANS</h5>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 ">
          Choose your plan
        </h1>
        <h5 className="text-sm text-gray-400">
          Choose between a basic and a premium feature stacked version.
        </h5>
      </div>
      <div className="container flex flex-row">
        <PlanCard />
        <PlanCard />
      </div>
    </section>
  );
};
