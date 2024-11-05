// Dashboard.js
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <UserSidebar /> {/* Render your sidebar here */}
      <div className='dashboard-content'>
        <Outlet /> {/* This is where the child routes will be rendered */}
      </div>
      <div>Welcome to Your Dashboard</div>
    </div>
  );
};

export default Dashboard;
