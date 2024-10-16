import React, { useState } from "react";
import { ApiClient } from "../../services";

const FilterComponent = ({ tags, onFilter }) => {
  const [selectedTag, setSelectedTag] = useState("");
  const [sellerId, setSellerId] = useState("");

  const { isLoading } = useQuery(TAGS_QUERY_KEY, ApiClient.fetchEbooksTags, {
    onSuccess: (data) => {
      console.log("First Rails useQuery sucessful:", data);
      ahoy.track("Ebooks items", { data });
      setItems(data);
    },
  });

  const handleFilter = () => {
    onFilter({ tag: selectedTag, seller_id: sellerId });
  };

  return (
    <div className="flex flex-col mb-4">
      <h2 className="text-lg font-semibold">Filter Ebooks</h2>
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Seller ID
          </label>
          <input
            type="text"
            value={sellerId}
            onChange={(e) => setSellerId(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter seller ID"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tags
          </label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">All Tags</option>
            {tags.map((tag, index) => (
              <option key={index} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleFilter}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterComponent;
