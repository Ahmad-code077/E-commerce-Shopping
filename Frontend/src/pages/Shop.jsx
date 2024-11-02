import productsData from './../data/products.json';
import { useEffect, useState } from 'react';
import Products from './Shops/Products';
import { ShopSidebar } from '../components';
import { useFetchAllProductsQuery } from '../Redux/Features/products/productApi';
const filters = {
  categories: ['all', ...new Set(productsData.map((item) => item.category))],
  colors: ['all', ...new Set(productsData.map((item) => item.color))],
  priceRange: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 +', min: 200, max: Infinity },
  ],
};
const Shop = () => {
  // const [product, setProduct] = useState(productsData);
  const [filterState, setFilterState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
  });

  // const applyFilters = () => {
  //   let filteredProducts = productsData;
  //   // filter by category
  //   if (filterState.category && filterState.category !== 'all') {
  //     filteredProducts = filteredProducts.filter(
  //       (item) => item.category === filterState.category
  //     );
  //     // console.log(filteredProducts);
  //   }

  //   // filtered by colors
  //   if (filterState.color && filterState.color !== 'all') {
  //     filteredProducts = filteredProducts.filter(
  //       (item) => item.color === filterState.color
  //     );
  //   }

  //   //  filter by range

  //   if (filterState.priceRange) {
  //     const [minPrice, maxPrice] = filterState.priceRange
  //       .split('-')
  //       .map(Number);
  //     filteredProducts = filteredProducts.filter(
  //       (item) => item.price >= minPrice && item.price <= maxPrice
  //     );
  //   }
  //   setProduct(filteredProducts);
  // };

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(2);
  const { categories, colors, priceRange } = filterState;
  const [maxPrice, minPrice] = priceRange.split('-').map(Number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: categories !== 'all' ? categories : '',
    color: colors !== 'all' ? colors : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  // useEffect(() => {
  //   applyFilters();
  // }, [filterState]);

  const clearFilter = () => {
    setFilterState({
      category: 'all',
      color: 'all',
      priceRange: '',
    });
  };

  if (isLoading) return <h1>Loading</h1>;
  if (error) return <h1>Error while deploying </h1>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  const handlePageChange = (pageChange) => {
    if (pageChange > 0 && pageChange <= totalPages) {
      setCurrentPage(pageChange);
    }
  };
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
      <main className='flex mt-12'>
        <aside className='w-2/4 sm:w-1/4'>
          {' '}
          <ShopSidebar
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilter={clearFilter}
          />
        </aside>
        <main>
          <h1 className='mb-4 font-semibold text-lg '>
            Product Available : {products.length}
          </h1>
          <Products product={products} />
          {/* Pagination  */}

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
        </main>
      </main>
    </section>
  );
};
export default Shop;
