import { Link, useParams } from 'react-router-dom';
import products from '../data/products.json';
import { FaGreaterThan } from 'react-icons/fa';
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Features/CartSlice';
import { useEffect } from 'react';
const SingleShopPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // set the single shop  page

  // console.log(id);
  const singleProduct = products.find((item) => item.id === Number(id));
  // console.log(singleProduct);
  const { name, price, category, color, oldPrice, image, description, rating } =
    singleProduct;
  const handleAddCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <section>
      <main className='text-center max-w-lg mx-auto'>
        <h1 className='text-3xl md:text-5xl text-primary-dark font-semibold text-center mt-12 mb-8 capitalize'>
          Single Product Page
        </h1>
        <div className='text-lg text-gray-700 flex  items-center justify-center gap-4'>
          <Link to={'/'} className='hover:text-primary font-semibold'>
            Home{' '}
          </Link>
          <span className='text-primary'>
            <FaGreaterThan />
          </span>
          <Link to={'/shop'} className='hover:text-primary font-semibold'>
            Shop
          </Link>
          <span className='text-primary'>
            <FaGreaterThan />
          </span>
          <span className='hover:text-primary font-semibold cursor-pointer'>
            {name}
          </span>
        </div>
      </main>
      <main className='mt-16 flex flex-col sm:flex-row items-center justify-center sm:items-start sm:justify-normal sm:gap-x-16'>
        <div className='w-full sm:w-2/4'>
          <img
            src={image}
            alt={description}
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex flex-col gap-y-2 mt-6 capitalize'>
          <h1 className='text-3xl font-bold'>{name}</h1>
          <h1 className='text-lg font-bold'>
            Price : <span className='text-xl text-primary'>${price}</span>
          </h1>
          <h1 className='text-lg font-bold'>
            Category : <span className='text-xl text-primary '>{category}</span>
          </h1>
          <h1 className='text-lg font-bold'>
            Color : <span className={`text-xl  `}>{color}</span>
          </h1>
          <h1 className='text-lg font-bold'>
            Description :{' '}
            <span className={` text-base font-medium text-text-light `}>
              {description}
            </span>
          </h1>
          <div className='flex text-lg font-bold items-center gap-6'>
            Ratings : <Rating rating={rating} />
          </div>
          <button
            className='bg-primary text-white py-1 px-4 rounded-md text-lg font-semibold hover:bg-primary-dark transition duration-300 ease-in-out mt-4 '
            onClick={(e) => {
              e.stopPropagation();
              handleAddCart(singleProduct);
            }}
          >
            Add to Cart
          </button>
        </div>
      </main>
    </section>
  );
};
export default SingleShopPage;
