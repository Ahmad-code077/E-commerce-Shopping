import { Outlet } from 'react-router-dom';
import { Navbar } from './components';

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 lg:px-12 mt-16 '>
        <Outlet />
        <h1>App jsx</h1>
      </div>
    </div>
  );
};
export default App;
