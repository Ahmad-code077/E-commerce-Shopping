import image from '../assets/images/deals.png';
const Deals = () => {
  return (
    <section className='bg-pink-200 p-8 flex flex-col lg:flex-row items-center justify-center   gap-4'>
      <div className='w-1/2'>
        <img src={image} alt='image' className='w-full h-full object-cover' />
      </div>
      <div className=' flex flex-col gap-4 lg:w-1/2 text-center lg:text-start'>
        <p className='text-primary font-semibold text-lg'>
          Get Up To 20% Discount
        </p>
        <h1 className='text-3xl text-darkCharcoal font-bold'>
          Deal of the Month
        </h1>
        <p className='text-lg text-darkCharcoal'>
          Our Women's Fashion Deals of the Month are here to make your style
          dreams a reality without breaking the bank. Discover a curated
          collection of exquisite clothing, accessories, and footwear, all
          handpicked to elevate your wardrobe.
        </p>
        <main className='flex items-center justify-center gap-4 flex-wrap '>
          <div className='flex flex-col items-center justify-center bg-white rounded-full h-20 w-20 shadow-lg'>
            <span className='text-xl font-bold'>0</span>
            <span className='text-xl font-semibold'>Days</span>
          </div>
          <div className='flex flex-col items-center justify-center bg-white rounded-full h-20 w-20 shadow-lg'>
            <span className='text-xl font-bold'>0</span>
            <span className='text-xl font-semibold'>Hours</span>
          </div>
          <div className='flex flex-col items-center justify-center bg-white rounded-full h-20 w-20 shadow-lg'>
            <span className='text-xl font-bold'>0</span>
            <span className='text-xl font-semibold'>Mins</span>
          </div>
          <div className='flex flex-col items-center justify-center bg-white rounded-full h-20 w-20 shadow-lg'>
            <span className='text-xl font-bold'>0</span>
            <span className='text-xl font-semibold'>Sec</span>
          </div>
        </main>
      </div>
    </section>
  );
};
export default Deals;
