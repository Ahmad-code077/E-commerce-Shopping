import productsData from './../data/products.json';
import { useEffect, useState } from 'react';
import Products from './Shops/Products';
import { ShopSidebar } from '../components';
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
  const [product, setProduct] = useState(productsData);
  const [filterState, setFilterState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
  });

  const applyFilters = () => {
    let filteredProducts = productsData;
    // filter by category
    if (filterState.category && filterState.category !== 'all') {
      filteredProducts = filteredProducts.filter(
        (item) => item.category === filterState.category
      );
      // console.log(filteredProducts);
    }

    // filtered by colors
    if (filterState.color && filterState.color !== 'all') {
      filteredProducts = filteredProducts.filter(
        (item) => item.color === filterState.color
      );
    }

    //  filter by range

    if (filterState.priceRange) {
      const [minPrice, maxPrice] = filterState.priceRange
        .split('-')
        .map(Number);
      filteredProducts = filteredProducts.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    }
    setProduct(filteredProducts);
  };
  useEffect(() => {
    applyFilters();
  }, [filterState]);

  const clearFilter = () => {
    setFilterState({
      category: 'all',
      color: 'all',
      priceRange: '',
    });
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
            Product Available : {product.length}
          </h1>
          <Products product={product} />
        </main>
      </main>
    </section>
  );
};
export default Shop;
