// Dashboard.js
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../../Redux/Features/auth/authSlice';

const Dashboard = () => {
  const { isOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <main>
      <FaBars
        className='text-3xl text-primary cursor-pointer ml-4 mt-4 '
        onClick={() => dispatch(setIsOpen(!isOpen))}
      />
      <UserSidebar />
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
