import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { setIsOpen } from '../../Redux/Features/auth/authSlice';
import { GiCrossMark } from 'react-icons/gi';

const UserSidebar = () => {
  const { user, isOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const adminLinks = [
    { label: 'Dashboard', path: '/dashboard/admin' },
    { label: 'Manage Item', path: '/dashboard/manage-product' },
    { label: 'All Orders', path: '/dashboard/manage-orders' },
    { label: 'Add new Post', path: '/dashboard/add-new-product' },
  ];

  const userLinks = [
    { label: 'Dashboard', path: '/dashboard/user' },
    { label: 'Profile', path: '/dashboard/profile' },
    { label: 'Payment', path: '/dashboard/payment' },
    { label: 'Orders', path: '/dashboard/orders' },
  ];

  const dropdownMenu = user?.role === 'admin' ? adminLinks : userLinks;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static top-0 left-0 transform transition-transform duration-300 lg:w-[300px] w-64 h-full bg-primary text-white shadow-lg z-50 lg:min-h-[100vh]`}
      >
        <div className='flex justify-between items-center py-6 px-4 border-b border-gray-700'>
          <Link
            to='/'
            className='text-3xl font-semibold text-primary-light  transition duration-300'
          >
            Ahmad
          </Link>
          <button
            onClick={() => dispatch(setIsOpen(!isOpen))}
            className='text-3xl text-primary-light cursor-pointer lg:hidden'
          >
            <GiCrossMark />
          </button>
        </div>

        <ul className='mt-8 space-y-4 px-4'>
          {dropdownMenu.map((link) => (
            <li key={link.label} className='group'>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-lg font-medium ${
                    isActive ? 'bg-primary-dark text-white' : 'text-gray-300'
                  } hover:bg-primary hover:text-white transition duration-300`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-40 lg:hidden'
          onClick={() => dispatch(setIsOpen(false))}
        />
      )}
    </>
  );
};

export default UserSidebar;
