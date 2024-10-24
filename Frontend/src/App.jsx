import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from './components';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 lg:px-12  '>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
export default App;
