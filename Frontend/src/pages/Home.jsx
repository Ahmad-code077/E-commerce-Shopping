import {
  Banner,
  Blogs,
  Cards,
  Categories,
  Deals,
  FaithCards,
} from '../components';
import Trending from './Shops/Trending';

const Home = () => {
  return (
    <div className=''>
      <Banner />
      <Categories />
      <Cards />
      <Trending />
      <Deals />
      <FaithCards />
      <Blogs />
    </div>
  );
};
export default Home;
