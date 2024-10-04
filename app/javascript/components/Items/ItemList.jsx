import React, { useState } from "react";
import Item from "./Item";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

const lawsOfPowerImage = "/images/48-laws-of-power.png";
const atomicHabitsImage = "/images/atomic-habits.png";
const priceTomorrowImage = "/images/the-price-of-tomorrow.png";

import { useQuery } from "react-query";

import Fab from "@mui/material/Fab";
import { FaCartShopping } from "react-icons/fa6";

import { EBOOKS_QUERY_KEY } from "../../utils/constants";
import { ApiClient } from '../../services'

const items = [
  {
    id: 1,
    title: "The Price of Tomorrow",
    description: "The Price of Tomorrow Description",
    href: "#",
    color: "Salmon",
    price: 19.99,
    quantity: 1,
    ebook_cover_url: priceTomorrowImage,
    imageAlt: "The Price of Tomorrow",
    pdf_url:
      "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTEsInB1ciI6ImJsb2JfaWQifX0=--f01abf8d10dff5d368032e5cb6f57299189fcc59/In%20This%20Economy%20-%20How%20Money%20%20Markets%20Really%20Work%20-%20Kyla%20Scanlon.pdf",
  },
  {
    id: 2,
    title: "48 Laws of Power",
    description: "48 Laws of Power description",
    href: "#",
    color: "Blue",
    price: 32.0,
    quantity: 1,
    ebook_cover_url: lawsOfPowerImage,
    imageAlt: "48 Laws of Power",
    pdf_url:
      "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTEsInB1ciI6ImJsb2JfaWQifX0=--f01abf8d10dff5d368032e5cb6f57299189fcc59/In%20This%20Economy%20-%20How%20Money%20%20Markets%20Really%20Work%20-%20Kyla%20Scanlon.pdf",
  },
  {
    id: 3,
    title: "Atomic Habits",
    description: "Atomic Habits description",
    href: "#",
    color: "Blue",
    price: 23.99,
    quantity: 1,
    ebook_cover_url: atomicHabitsImage,
    imageAlt: "Atomic Habits",
    pdf_url:
      "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTEsInB1ciI6ImJsb2JfaWQifX0=--f01abf8d10dff5d368032e5cb6f57299189fcc59/In%20This%20Economy%20-%20How%20Money%20%20Markets%20Really%20Work%20-%20Kyla%20Scanlon.pdf",
  },
];

const ItemList = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [items, setItems] = useState([]);

  const handleAddToCart = (item) => {
    setSelectedProducts((prev) => [...prev, item]);

    console.log("Item added to the cart");

    // Trigger animation when an item is added
    setIsAnimating(true);

    // Stop the animation after a short delay
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleRemoveFromCart = (item) => {
    setSelectedProducts((prev) =>
      prev.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

  const { isLoading } = useQuery(EBOOKS_QUERY_KEY, ApiClient.fetchEbooks, {
    onSuccess: (data) => {
      console.log("First Rails useQuery sucessful:", data);
      setItems(data);
    },
  });

  return (
    <>
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
