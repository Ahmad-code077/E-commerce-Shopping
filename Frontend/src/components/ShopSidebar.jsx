const ShopSidebar = ({ filters, filterState, setFilterState, clearFilter }) => {
  return (
    <section>
      <h1 className='text-2xl font-semibold '>Filters</h1>

      <main>
        <h1 className='my-4 text-primary font-semibold'>Categories</h1>
        <div className='flex flex-col gap-1 justify-center '>
          {filters.categories.map((item) => {
            return (
              <label
                key={item}
                className='flex items-center gap-x-4 cursor-pointer'
              >
                <input
                  type='radio'
                  name='category'
                  id={item}
                  value={item}
                  checked={filterState.category === item}
                  onChange={(e) =>
                    setFilterState({
                      ...filterState,
                      category: e.target.value,
                    })
                  }
                  className='w-4 h-4 appearance-none border-2 border-primary rounded-full checked:bg-primary checked:border-primary focus:ring-primary focus:ring-2 cursor-pointer'
                />
                <span className='capitalize'>{item}</span>
              </label>
            );
          })}
        </div>
      </main>
      <main>
        <h1 className='my-4 text-primary font-semibold'>Colors</h1>
        <div className='flex flex-col gap-1 justify-center '>
          {filters.colors.map((color) => {
            return (
              <label
                key={color}
                className='flex items-center gap-x-4 cursor-pointer'
              >
                <input
                  type='radio'
                  name='color'
                  id={color}
                  checked={filterState.color === color}
                  value={color}
                  onChange={(e) => {
                    setFilterState({ ...filterState, color: e.target.value });
                  }}
                  className='w-4 h-4 appearance-none border-2 border-primary rounded-full checked:bg-primary checked:border-primary focus:ring-primary focus:ring-2 cursor-pointer'
                />
                <span className='capitalize'>{color}</span>
              </label>
            );
          })}
        </div>
      </main>
      <main>
        <h1 className='my-4 text-primary font-semibold'>Pricing</h1>
        <div className='flex flex-col gap-1 justify-center '>
          {filters?.priceRange?.map((range) => {
            return (
              <label
                key={range.label}
                className='flex items-center gap-x-4 cursor-pointer'
              >
                <input
                  type='radio'
                  name='PricingRange'
                  id={range}
                  checked={
                    filterState.priceRange === `${range.min}-${range.max}`
                  }
                  value={`${range.min}-${range.max}`}
                  onChange={(e) => {
                    setFilterState({
                      ...filterState,
                      priceRange: e.target.value,
                    });
                  }}
                  className='w-4 h-4 appearance-none border-2 border-primary rounded-full checked:bg-primary checked:border-primary focus:ring-primary focus:ring-2 cursor-pointer'
                />
                <span className='capitalize'>{range.label}</span>
              </label>
            );
          })}
        </div>
      </main>

      <button
        onClick={clearFilter}
        className='bg-primary text-white px-1 py-1 w-3/4 mt-4 rounded-md text-lg font-semibold hover:bg-primary-dark transition duration-300 ease-in-out '
      >
        Reset
      </button>
    </section>
  );
};
export default ShopSidebar;
