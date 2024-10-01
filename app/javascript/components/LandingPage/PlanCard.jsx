import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PlanCardBulletPoint = () => {
  return (
    <div className="flex flex-row items-center mx-4 my-4">
      <FaCheckCircle size="24px" color="#22C55E" className="mr-2" />
      <h5 className="text-md text-gray-500">
        Tortor interdum condimentum nunc molestie quam lectus.
      </h5>
    </div>
  );
};

export const PlanCard = () => {
  return (
    <div className="container mx-auto w-2/5 border-2 border-indigo-600 rounded-md mt-12">
      <div className="container flex flex-col p-4">
        <div className="container flex flex-row items-center ">
          <h5 className="text-md text-indigo-600 ">Premium</h5>
          <div className="ml-auto border rounded-xl bg-second-blue ">
            <h5 className="text-md text-brand px-4 py-1 ">🔥 Most Popular</h5>
          </div>
        </div>
        <div className="container flex flex-row items-end mb-4">
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mr-2">$19</h1>
          <h5 className="text-sm text-gray-500 mb-1">user / month</h5>
        </div>

        <h5 className="text-md text-gray-400">
          Aenean at lectus posuere enim id nec. Molestie neque, sed fusce
          faucibus.
        </h5>
        <hr className="border-gray-300 mt-6 mb-4" />
        <div className="container flex flex-col">
          <PlanCardBulletPoint />
          <PlanCardBulletPoint />
          <PlanCardBulletPoint />
          <PlanCardBulletPoint />
          <PlanCardBulletPoint />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Primary Action
        </button>
      </div>
    </div>
  );
};
