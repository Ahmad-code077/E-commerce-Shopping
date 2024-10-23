import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus, FaSearch, FaUser } from 'react-icons/fa';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className='bg-white border-gray-200 dark:bg-secondary'>
      <div className='max-w-6xl  px-4 lg:px-12  flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-darkCharcoal'>
            Ahmad
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded={isOpen}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
          id='navbar-default'
        >
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700'>
            <li>
              <Link
                to='/'
                className='block py-2 px-3 rounded  md:hover:bg-transparent text-white  hover:text-darkCharcoal'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/shop'
                className='block py-2 px-3 rounded  md:hover:bg-transparent text-white hover:text-darkCharcoal '
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to='/pages'
                className='block py-2 px-3 rounded  md:hover:bg-transparent text-white hover:text-darkCharcoal'
              >
                Pages
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='block py-2 px-3 rounded  md:hover:bg-transparent text-white 
                hover:text-darkCharcoal'
              >
                Contact
              </Link>
            </li>
            <div className='flex justify-between md:hidden'>
              {' '}
              <li>
                <Link
                  to='/search'
                  className=' py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent dark:text-white md:dark:hover:bg-transparent flex items-center gap-4 hover:text-darkCharcoal'
                >
                  <FaSearch /> <span>Search</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/cart'
                  className=' py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent dark:text-white md:dark:hover:bg-transparent flex items-center gap-4 hover:text-darkCharcoal'
                >
                  <FaCartPlus /> <span>Cart</span>
                </Link>
              </li>
              <li>
                <Link
                  to='/login'
                  className=' py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent dark:text-white md:dark:hover:bg-transparent flex items-center gap-4 hover:text-darkCharcoal'
                >
                  <FaUser /> <span>Login</span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
        <div className='text-white font-semibold  gap-4 text-2xl hidden md:flex '>
          <Link to={'/search'} className='hover:text-darkCharcoal'>
            {' '}
            <FaSearch />
          </Link>
          <Link to={'/cart'} className='hover:text-darkCharcoal'>
            <FaCartPlus />
          </Link>
          <Link to={'/login'} className='hover:text-darkCharcoal'>
            <FaUser />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
