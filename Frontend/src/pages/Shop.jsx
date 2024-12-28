import productsData from './../data/products.json';
import { useEffect, useState } from 'react';
import Products from './Shops/Products';
import { ErrorProduct, Loader, ShopSidebar } from '../components';
import { useFetchAllProductsQuery } from '../Redux/Features/products/productApi';

const Shop = () => {
  // const [product, setProduct] = useState(productsData);
  const [filterState, setFilterState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { category, color, priceRange } = filterState;
  const [minPrice, maxPrice] = priceRange
    ? priceRange.split('-').map(Number)
    : [0, Infinity];
  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  const filters = {
    categories: ['all', ...new Set(productsData?.map((item) => item.category))],
    colors: ['all', ...new Set(productsData?.map((item) => item.color))],
    priceRange: [
      { label: 'Under $50', min: 0, max: 50 },
      { label: '$50 - $100', min: 50, max: 100 },
      { label: '$100 - $200', min: 100, max: 200 },
      { label: '$200 +', min: 200, max: Infinity },
    ],
  };

  const clearFilter = () => {
    setFilterState({
      category: 'all',
      color: 'all',
      priceRange: '',
    });
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <ErrorProduct />;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;
  const handlePageChange = (pageChange) => {
    if (pageChange > 0 && pageChange <= totalPages) {
      setCurrentPage(pageChange);
    }
  };
  console.log('products', products);

  return (
    <section>
      <main className='text-center max-w-lg mx-auto'>
        <h1 className='text-3xl md:text-5xl text-primary-dark font-semibold text-center mt-12 mb-8 capitalize'>
          Shop Now
        </h1>
        <p className='text-lg text-gray-700'>
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </main>
      <main className='flex mt-12 mx-auto'>
        <aside className='w-[35%] sm:w-1/4'>
          {' '}
          <ShopSidebar
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilter={clearFilter}
          />
        </aside>
        <main className='w-[60%] sm:w-full '>
          <h1 className='mb-4 font-semibold text-lg '>
            Showing {(products.length > 0 && startProduct) || 0} to {endProduct}{' '}
            of {totalProducts}
          </h1>
          {products?.length <= 0 && (
            <div className='  sm:text-center flex flex-col my-auto gap-6 '>
              <h1 className=' text-primary  font-extrabold sm:text-5xl'>
                Oops
              </h1>
              <h1 className='sm:text-3xl'>
                No Product match your search Criteria
              </h1>
            </div>
          )}
          <Products product={products} />
          {/* Pagination  */}

          {products.length > 0 && totalProducts > productsPerPage && (
            <div className='flex items-center justify-center mt-4'>
              <button
                disabled={currentPage === 1}
                className='px-4 py-2 bg-gray-300 text-gray-600 rounded-sm mr-2'
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2  ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : ' bg-gray-300 text-gray-600'
                    } rounded-sm mr-2`}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button
                disabled={currentPage === totalPages}
                className='px-4 py-2 bg-gray-300 text-gray-600 rounded-sm mr-2'
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </main>
    </section>
  );
};
export default Shop;
