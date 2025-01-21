// UserDashboard.js
import DashboardChart from '../../Charts/DashboardChart';

const UserDashboard = () => {
  const data = [
    { name: 'Total Payment', purchases: 10 },
    { name: 'Total Reviews', purchases: 20 },
    { name: 'Total Purchase', purchases: 23 },
  ];

  return (
    <section className='flex flex-col'>
      <h1 className='text-4xl md:text-5xl font-semibold text-center text-primary-dark mb-12'>
        User Dashboard
      </h1>

      <main className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
        {data.map((item, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center p-6 border border-gray-300 rounded-xl shadow-lg bg-white transition-transform transform hover:scale-105 hover:bg-gray-100 hover:shadow-2xl'
          >
            <h1 className='text-xl font-bold text-gray-800'>{item.name}</h1>
            <p className='text-2xl font-bold text-green-500 mt-2'>
              {index === 0 && '$'}
              {item.purchases}
            </p>
          </div>
        ))}
      </main>

      <div className='w-full mt-8'>
        <DashboardChart data={data} />
      </div>
    </section>
  );
};

export default UserDashboard;
