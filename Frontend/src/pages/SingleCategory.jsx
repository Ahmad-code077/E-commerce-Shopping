import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Products from './Shops/Products';
import { useFetchAllProductsQuery } from '../Redux/Features/products/productApi';
import { ErrorProduct, Loader } from '../components';
const SingleCategory = () => {
  const { category } = useParams();
  const { data, isError, isLoading } = useFetchAllProductsQuery({ category });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorProduct />;
  const product = data?.products;

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
        <Products product={product} />
      </main>
    </section>
  );
};
export default SingleCategory;
