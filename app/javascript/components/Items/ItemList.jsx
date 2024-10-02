import React, { useState } from "react";
import Item from "./Item";
import { useQuery } from "react-query";
import { ApiClient } from "../../services";

import { EBOOKS_QUERY_KEY } from "../../utils/constants";

const dummy_items = [
  {
    title: "Mastering React",
    description:
      "Learn the ins and outs of React, from hooks to advanced state management techniques.",
  },
  {
    title: "JavaScript for Beginners",
    description:
      "A comprehensive guide for beginners to get started with JavaScript and build interactive web pages.",
  },
  {
    title: "The Road to Fullstack",
    description:
      "An essential resource for aspiring fullstack developers, covering frontend and backend technologies.",
  },
  {
    title: "CSS Secrets",
    description:
      "Unlock the secrets of CSS to create stunning, responsive designs with minimal effort.",
  },
  {
    title: "Effective Problem Solving in Programming",
    description:
      "Sharpen your problem-solving skills with practical programming challenges and strategies.",
  },
];

const ItemList = () => {
  const [items, setItems] = useState([]);

  const { isLoading } = useQuery(EBOOKS_QUERY_KEY, ApiClient.fetchEbooks, {
    onSuccess: (data) => {
      console.log("First Rails useQuery sucessful:", data);
      setItems(data);
    },
  });

  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <Item key={index} title={item.title} description={item.description} />
      ))}
    </div>
  );
};
export default ItemList;
