import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';

import Products from './Shops/Products';
const SingleCategory = () => {
  const { category } = useParams();

  const [Filtered, setFiltered] = useState([]);

  useEffect(() => {
    const filter = products.filter(
      (item) => item.category === category.toLowerCase()
    );
    setFiltered(filter);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <main className='text-center max-w-lg mx-auto'>
        <h1 className='text-3xl md:text-5xl text-primary-dark font-semibold text-center mt-12 mb-8 capitalize'>
          {category}
        </h1>
        <p className='text-lg text-gray-700'>
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </main>

      <main className='mt-12'>
        <Products product={Filtered} />
      </main>
    </section>
  );
};
export default SingleCategory;
