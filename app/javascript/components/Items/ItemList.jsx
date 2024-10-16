import React, { useState } from "react";
import Item from "./Item";
import FilterComponent from "./FilterComponent";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

const lawsOfPowerImage = "/images/48-laws-of-power.png";
const atomicHabitsImage = "/images/atomic-habits.png";
const priceTomorrowImage = "/images/the-price-of-tomorrow.png";

import { useQuery } from "react-query";
import Fab from "@mui/material/Fab";
import { FaCartShopping } from "react-icons/fa6";

import { EBOOKS_QUERY_KEY } from "../../utils/constants";
import { ApiClient } from "../../services";
import ahoy from "ahoy.js";

const ItemList = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ tag: [], seller_id: "" });
  const [page, setPage] = useState(1);

  const handleAddToCart = (item) => {
    setSelectedProducts((prev) => [...prev, item]);
    console.log("Item added to the cart");

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleRemoveFromCart = (item) => {
    setSelectedProducts((prev) =>
      prev.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

  const handleFilter = (filter) => {
    setFilters(filter);
    setPage(1);
    refetch();
  };

  const { isLoading, data, refetch } = useQuery(
    [EBOOKS_QUERY_KEY, filters, page],
    () => ApiClient.fetchEbooks({ ...filters, page }),
    {
      onSuccess: (data) => {
        console.log("Fetch ebooks successful:", data);
        ahoy.track("Ebooks items");
        setItems(data.ebooks);
      },
    }
  );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <FilterComponent
        tags={items.flatMap((item) => item.tags || [])}
        onFilter={handleFilter}
      />
      <div className="flex flex-col">
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            selected={selectedProducts.some(
              (selectedItem) => selectedItem.id === item.id
            )}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4 mb-8 space-x-2">
        <button
          className={`${
            page === 1
              ? "bg-gray-400 hover:bg-gray-500"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-bold py-2 px-4 rounded-lg`}
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="font-bold py-2 px-4">Page {page}</span>
        <button
          className={`${
            data?.meta.total_pages === page
              ? "bg-gray-400 hover:bg-gray-500"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-bold py-2 px-4 rounded-lg`}
          onClick={handleNextPage}
          disabled={data?.meta.total_pages === page}
        >
          Next
        </button>
      </div>
      {!isCheckoutOpen && (
        <Fab
          variant="extended"
          style={{
            gap: "12px",
            position: "fixed",
            bottom: "32px",
            right: "32px",
            zIndex: 1000,
            color: "#fff",
            backgroundColor: "#4f46e5",
          }}
          className={`transition-transform ${
            isAnimating ? "animate-bounce" : ""
          }`}
          onClick={() => setIsCheckoutOpen(!isCheckoutOpen)}
        >
          <FaCartShopping />
          Order Now
        </Fab>
      )}
      <ShoppingCart
        open={isCheckoutOpen}
        setOpen={setIsCheckoutOpen}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </>
  );
};
export default ItemList;
