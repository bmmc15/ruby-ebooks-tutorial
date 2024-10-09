import React from "react";
import { useQuery } from "react-query";
import { ApiClient } from "../../services";

const OrdersSummary = () => {
  const { data, isLoading } = useQuery(
    "orders",
    ApiClient.purchaseEbooks
  );

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Orders Summary</h2>
      {data.map((order, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <p className="text-2xl font-semibold mb-3 text-gray-800">
            {order.datetime}
          </p>
          <ul className="space-y-3">
            {order.ebooks.map((ebook) => (
              <li
                key={`${ebook.ebook_id}-${ebook.created_at}`}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <div>
                  <span className="font-medium text-gray-700">
                    {ebook.title}
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  ${ebook.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersSummary;
