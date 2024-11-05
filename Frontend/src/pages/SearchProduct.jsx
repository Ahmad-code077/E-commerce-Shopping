import { useEffect, useState } from 'react';
// import products from '../data/products.json';
import Products from './Shops/Products';
import { FaSearch } from 'react-icons/fa';
import { useFetchAllProductsQuery } from '../Redux/Features/products/productApi';
import { ErrorProduct } from '../components';
import Loading from '../components/Loader';

const SearchProduct = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const { data, isLoading, isError } = useFetchAllProductsQuery({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      setFiltered(data?.products);
      return;
    }
    const query = search.toLowerCase();
    const filter = data?.products?.filter(
      (item) =>
        item.category.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    setFiltered(filter);
  };

  // Update filtered products whenever data changes or on initial load
  useEffect(() => {
    if (data) setFiltered(data.products);
  }, [data]);

  if (isError) return <ErrorProduct />;

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
      <form onSubmit={handleSubmit} className='w-full flex gap-2 my-12'>
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
      {isLoading && <Loading />}
      {filtered?.length > 0 ? (
        <Products product={filtered || []} />
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
              setFiltered(data?.products);
              setSearch('');
            }}
          >
            Reset Search
          </button>
        </div>
      )}
    </section>
  );
};

export default SearchProduct;
