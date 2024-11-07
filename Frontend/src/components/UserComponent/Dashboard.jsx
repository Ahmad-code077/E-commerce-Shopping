// Dashboard.js
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const Dashboard = () => {
  return (
    <div className='flex'>
      <UserSidebar /> {/* Render your sidebar here */}
      <div className='w-3/4'>
        <Outlet /> {/* This is where the child routes will be rendered */}
      </div>
    </div>
  );
};

export default Dashboard;
