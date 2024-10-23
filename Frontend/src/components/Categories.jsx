import React from 'react';
import { Link } from 'react-router-dom';
import cat1 from '../assets/images/category-1.jpg';
import cat2 from '../assets/images/category-2.jpg';
import cat3 from '../assets/images/category-3.jpg';
import cat4 from '../assets/images/category-4.jpg';

const Categories = () => {
  const categories = [
    {
      id: 1,
      category: 'Accessories',
      path: 'accessories',
      image: cat1,
    },
    {
      id: 2,
      category: 'Dress Collection',
      path: 'dress',
      image: cat2,
    },
    {
      id: 3,
      category: 'Jewellery',
      path: 'jewellery',
      image: cat3,
    },
    {
      id: 4, // Fixed the id here
      category: 'Cosmetics',
      path: 'cosmetics',
      image: cat4,
    },
  ];

  return (
    <section>
      <h1 className='text-3xl md:text-5xl text-primary-dark font-semibold text-center my-12'>
        Categories
      </h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {categories.map((category) => {
          const { category: name, path, id, image } = category;

          return (
            <Link
              to={`/categories/${path}`}
              key={id}
              className='relative block rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105'
            >
              <img
                src={image}
                alt={name}
                className='w-full h-48 object-cover'
              />
              <h4 className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2'>
                {name}
              </h4>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
