import { Link } from 'react-router-dom';
import img from '../assets/images/category-1.jpg';
const Banner = () => {
  return (
    <div className='bg-gray-200 h-screen flex items-center justify-between px-8  relative overflow-hidden gap-2'>
      <div className='z-10 space-y-6 max-w-lg'>
        <h1 className='text-4xl md:text-6xl font-bold text-darkCharcoal'>
          Welcome to <span className='text-primary'>Ladies Store</span>
        </h1>
        <p className='text-lg md:text-xl text-darkCharcoal font-semibold'>
          Because men do not buy clothes online 😂
        </p>
        <Link
          to={'/shop'}
          className='bg-primary text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-primary-dark transition duration-300 ease-in-out block w-max'
        >
          Shop Now
        </Link>
      </div>
      <div className='absolute inset-0 md:relative md:w-1/2 flex justify-center items-center '>
        <img
          src={img}
          alt='E-commerce Banner'
          className='object-cover h-full w-full shadow-lg    link'
        />
      </div>
    </div>
  );
};

export default Banner;
