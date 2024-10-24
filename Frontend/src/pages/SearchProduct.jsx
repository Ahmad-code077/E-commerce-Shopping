import { useState } from 'react';
import products from '../data/products.json';
// import { Link } from 'react-router-dom';
// import { LazyImage, Rating } from '../components';
// import { FaCartPlus } from 'react-icons/fa';

import Products from './Shops/Products';
// import { NoProductFound } from '../components';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const SearchProduct = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(products);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      setFiltered(products);
      return;
    }
    const query = search.toLowerCase();
    const filter = products.filter(
      (item) =>
        item.category.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    setFiltered(filter);
  };

  console.log(filtered);

  return (
    <section>
      <main className='text-center max-w-lg mx-auto'>
        <h1 className='text-3xl md:text-5xl text-primary-dark font-semibold text-center mt-12 mb-8 capitalize'>
          Search Products
        </h1>
        <p className='text-lg text-gray-700'>
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </main>

      <form onClick={handleSubmit} className='w-full flex gap-2 my-12'>
        <input
          type='text'
          placeholder='Search Here'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-3/4 border border-primary p-2 rounded-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary'
        />
        <button className='w-1/4 bg-primary p-2 rounded-sm text-white'>
          Search
        </button>
      </form>

      {filtered.length > 0 ? (
        <Products product={filtered} />
      ) : (
        <div className='flex flex-col items-center mt-12'>
          <FaSearch className='text-6xl text-gray-400 mb-4' />
          <h2 className='text-2xl font-semibold text-gray-700'>
            No products found
          </h2>
          <p className='text-gray-600 mt-2'>
            Try searching for something else or browse our categories.
          </p>
          <button
            className='mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition'
            onClick={() => {
              setFiltered(products);
              setSearch('');
            }}
          >
            Reset Search
          </button>
        </div>
      )}

      {/* <main className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12'>
        {filtered.length > 0 ? (
          filtered?.map((item) => {
            const { id, name, price, oldPrice, image, rating } = item;

            // Function to render stars based on rating

            return (
              <div
                key={id}
                className='border rounded-lg overflow-hidden shadow-md'
              >
                <div className='relative'>
                  <Link to={`/shop/${id}`} className='block'>
                    <LazyImage src={image} alt={name} />
                  </Link>
                  <button className='absolute top-2 right-2 bg-white text-primary p-2 rounded-full shadow hover:scale-105 transition'>
                    <FaCartPlus className='text-xl' />
                  </button>
                </div>
                <div className='p-4'>
                  <h2 className='text-lg font-semibold'>{name}</h2>
                  <div className='flex items-center mt-1'>
                    <Rating rating={rating} />
                  </div>
                  <p className='mt-2 text-xl font-bold text-primary'>
                    ${price}{' '}
                    <span className='line-through text-gray-400'>
                      {oldPrice && `$${oldPrice}`}
                    </span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No product found</h1>
        )}
      </main> */}
    </section>
  );
};
export default SearchProduct;
