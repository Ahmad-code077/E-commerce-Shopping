import DashboardChart from '../Charts/DashboardChart';

const UserDashboard = () => {
  return (
    <section className='flex flex-col'>
      <h1 className='text-xl text-center text-primary'>User Dashboard</h1>
      <div className='w-3/4 '>
        <DashboardChart />
      </div>
    </section>
  );
};
export default UserDashboard;
