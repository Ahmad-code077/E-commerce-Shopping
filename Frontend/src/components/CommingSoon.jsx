import { toast } from 'react-toastify';

const ComingSoon = () => {
  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-gray-900 text-white'>
      <div className='text-center space-y-4 px-4'>
        <h1 className='text-4xl md:text-6xl font-bold'>Coming Soon</h1>
        <p className='text-lg md:text-2xl text-gray-300'>
          We're working hard to bring you something amazing. Stay tuned!
        </p>
        <form className='mt-4 flex justify-center'>
          <input
            type='email'
            placeholder='Enter your email'
            className='px-4 py-2 w-full max-w-sm rounded-l-md text-gray-900 focus:outline-none'
          />
          <button
            type='button'
            className='px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-r-md'
            onClick={() =>
              toast.success('Thanks, You will be notified via Email')
            }
          >
            Notify Me
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComingSoon;
