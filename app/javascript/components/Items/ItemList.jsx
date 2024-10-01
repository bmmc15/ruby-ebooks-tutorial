import React from 'react';
import Item from './Item';

const items = [
  {
    title: 'Mastering React',
    description:
      'Learn the ins and outs of React, from hooks to advanced state management techniques.',
  },
  {
    title: 'JavaScript for Beginners',
    description:
      'A comprehensive guide for beginners to get started with JavaScript and build interactive web pages.',
  },
  {
    title: 'The Road to Fullstack',
    description:
      'An essential resource for aspiring fullstack developers, covering frontend and backend technologies.',
  },
  {
    title: 'CSS Secrets',
    description:
      'Unlock the secrets of CSS to create stunning, responsive designs with minimal effort.',
  },
  {
    title: 'Effective Problem Solving in Programming',
    description:
      'Sharpen your problem-solving skills with practical programming challenges and strategies.',
  },
];

const ItemList = () => {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <Item key={index} title={item.title} description={item.description} />
      ))}
    </div>
  );
};
export default ItemList;
