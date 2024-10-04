import React from 'react';
import { toPriceFormat } from '../../utils/utils';

const Item = ({ item, selected, onAdd, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 border-indigo-400 rounded-lg w-1/3 mx-auto shadow-xl">
      <div className="w-1/3">
        <img
          src={
            item.imageSrc ??
            'https://placehold.co/150x150/efefef/4f46e5?text=Invalid+Image&font=roboto'
          }
          alt="Product"
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="w-2/3 pl-4 flex flex-col justify-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {item.title ?? 'Product Title'}
        </h2>
        <p className="text-gray-600 mb-4">
          {item.description ??
            'This is a short description of the product. It highlights the key features and benefits.'}
        </p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {toPriceFormat(item.price)}
        </h2>
        <a
          className="mt-0.5 text-sm text-gray-500 hover:text-indigo-700 mb-4 transition duration-200 ease-in-out"
          href={item.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to preview the ebook
        </a>
        <button
          className={`${
            selected
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white font-bold py-2 px-4 rounded-lg`}
          onClick={() => (selected ? onRemove(item) : onAdd(item))}
        >
          {selected ? 'Remove from the cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};
export default Item;
