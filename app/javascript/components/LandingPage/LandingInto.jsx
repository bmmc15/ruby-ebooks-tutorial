import React from "react";
const landingPageImage = "/images/landing_ebooks_image.png";

import { useGetNavigate } from "../../hooks/useGetNavigate";

export const LandingIntro = () => {
  const { navigateTo } = useGetNavigate();

  return (
    <section className="container mx-auto py-12 px-6 flex flex-row items-center gap-48">
      <div className=" flex flex-col text-left w-1/2">
        <h5 className="text-sm text-indigo-600 ">
          A REVOLUTION TO YOUR READING
        </h5>
        <h1 className="text-6xl font-bold text-gray-900 mt-4 ">Elevate Your</h1>
        <h1 className="text-6xl font-bold text-indigo-600">Reading Journey</h1>
        <p className="text-lg text-gray-600 mt-4">
          Effortlessly transform your ebook collection into high-quality digital
          experiences. Our platform converts your passion for reading into a
          seamless and immersive adventure, bringing every story to life
          instantly and with ease.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={navigateTo("/")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Buy Now !
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <img
          src={landingPageImage}
          alt="UI Development Preview"
          className="rounded-lg shadow-lg max-w-full mx-auto"
        />
      </div>
    </section>
  );
};
