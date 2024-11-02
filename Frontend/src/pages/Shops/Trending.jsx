import Products from './Products';
// import products from '../../data/products.json';
import { useState } from 'react';
import { useFetchAllProductsQuery } from '../../Redux/Features/products/productApi';
const Trending = () => {
  const [visibleProduct, setVisibleProduct] = useState(8);
  const loadMoreProducts = () => {
    setVisibleProduct((prev) => prev + 4);
  };
  const { data, error, isLoading } = useFetchAllProductsQuery({
    category: '', // specify a category or leave empty for all
    color: '', // specify a color or leave empty for all
    minPrice: 0, // minimum price
    maxPrice: '', // maximum price (or leave empty for no max)
    page: 1, // current page
    limit: 10, // number of items per page
  });
  if (isLoading) return <h1>Loading....</h1>;
  if (error) return <h1>Error while fetching products</h1>;
  const products = data?.products;
  return (
    <section>
      <h1 className='text-3xl md:text-5xl text-primary-dark font-semibold text-center mt-12 mb-8'>
        Trending Products
      </h1>
      <p className='text-xl font-semibold text-darkCharcoal mx-auto max-w-[500px] text-center mb-8'>
        Unleash your style with the hottest trends of 2024! Discover the latest
        must-haves that every fashionista is talking about!
      </p>
      <Products product={products.slice(0, visibleProduct)} />

      <div className='w-full flex items-center justify-center my-8'>
        {visibleProduct <= products.length && (
          <button
            className='text-center bg-primary text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-primary-dark transition duration-300 ease-in-out'
            onClick={loadMoreProducts}
          >
            LoadMore
          </button>
        )}
      </div>
    </section>
  );
};
export default Trending;
