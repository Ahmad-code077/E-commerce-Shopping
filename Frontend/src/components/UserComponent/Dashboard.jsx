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
    <main className='flex '>
      <FaBars
        className='text-3xl text-primary cursor-pointer ml-4 mt-4 lg:hidden'
        onClick={() => dispatch(setIsOpen(!isOpen))}
      />
      <UserSidebar />
      <div className='w-[80%]'>
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
