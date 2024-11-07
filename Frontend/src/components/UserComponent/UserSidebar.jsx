import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const UserSidebar = () => {
  const { user } = useSelector((state) => state.auth);

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

  const dropdownMenu = user.role === 'admin' ? adminLinks : userLinks;

  return (
    <aside className='sm:w-1/4  '>
      <h1 className='text-primary text-xl'>Welcome to Dashboard</h1>
      <ul>
        {dropdownMenu.map((link) => (
          <li key={link.label}>
            <NavLink to={link.path}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserSidebar;
