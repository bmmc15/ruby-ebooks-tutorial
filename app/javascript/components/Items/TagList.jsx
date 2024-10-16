import React from "react";

const TagList = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mt-2">
      <h3 className="font-semibold text-gray-700">Tags:</h3>
      <ul className="flex flex-wrap mt-1">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="mr-2 mb-2 bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-sm"
          >
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
