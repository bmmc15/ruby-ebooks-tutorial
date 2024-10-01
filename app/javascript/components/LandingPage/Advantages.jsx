import React from "react";
import { IoFlashOutline } from "react-icons/io5";

const AdvatageCard = ({ title, description }) => {
  return (
    <div className="h-56 flex flex-col px-4 bg-white rounded-md">
      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mt-4">
        <IoFlashOutline />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mt-8">{title}</h3>
      <span className="mt-2">{description}</span>
    </div>
  );
};

export const Advantages = () => {
  return (
    <section className="container mx-auto py-20 px-6 items-center ">
      <div className=" flex flex-col items-center text-center">
        <h5 className="text-sm text-indigo-600 ">ADVANTAGES</h5>

        <h1 className="text-4xl font-bold text-gray-900 mt-4 ">
          Instantly Transform Your Figma Designs into Clean HTML Code!
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-20  p-4">
        <AdvatageCard
          title="Compatibility"
          description="Since the generated code is pure html, it is compatible with any email client."
        />
        <AdvatageCard
          title="Versatility"
          description="Works seamlessly with several AI platforms, such as OpenAI, Claude, and Anthropic."
        />
        <AdvatageCard
          title="Efficiency"
          description="Upload your email template, and get HTML code in seconds. No more manual coding!"
        />
        <AdvatageCard
          title="Customization"
          description="The code is clean, well-structured, and easy to modify to match specific design elements."
        />
        <AdvatageCard
          title="Accuracy"
          description="Our AI extracts email layouts and styles with incredible accuracy, reflecting your design."
        />
        <AdvatageCard
          title="Ease of Use"
          description="Upload and convert images to HTML with a simple, intuitive interface that requires no technical knowledge."
        />
      </div>
    </section>
  );
};
