import { FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <section className=''>
      <div className='flex items-center justify-center my-48 flex-col font-poppins gap-4'>
        <FaLightbulb className='text-7xl animate-pulse text-yellow-300' />
        <h1 className='text-3xl md:text-5xl tracking-wide font-bold'>
          404 Not found
        </h1>
        <Link
          className='bg-primary px-4 py-2 text-xl text-white font-bold rounded'
          to={'/'}
        >
          Back Home
        </Link>
      </div>
    </section>
  );
};
export default Error;
