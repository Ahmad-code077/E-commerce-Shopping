import errorImage from '../assets/images/error.png';

const ErrorProduct = () => {
  return (
    <section className='mt-8 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg'>
      <div className='flex items-center'>
        <img
          src={errorImage}
          alt='Error image'
          className='w-80 h-auto animate-pulse'
        />
      </div>
      <div className='text-center mt-4'>
        <h2 className='text-2xl font-semibold text-primary'>
          Oops! Something went wrong
        </h2>
        <p className='text-gray-600 mt-2 text-lg'>
          We're having trouble fetching the products. Please try again.
        </p>
      </div>
    </section>
  );
};

export default ErrorProduct;
