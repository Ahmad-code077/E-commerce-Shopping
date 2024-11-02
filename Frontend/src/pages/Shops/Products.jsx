import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LazyImage, Rating } from '../../components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Features/CartSlice';

const Products = ({ product = [] }) => {
  const dispatch = useDispatch();
  const handleAddCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {product.map((item) => {
        const { _id, id, name, price, oldPrice, image, rating } = item;

        // Function to render stars based on rating

        return (
          <div
            key={id || _id}
            className='border rounded-lg overflow-hidden shadow-md'
          >
            <div className='relative'>
              <Link to={`/shop/${id}`} className='block'>
                <LazyImage src={image} alt={name} />
              </Link>
              <button
                className='absolute top-2 right-2 bg-white text-primary p-2 rounded-full shadow hover:scale-105 transition'
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddCart(item);
                }}
              >
                <FaCartPlus className='text-xl' />
              </button>
            </div>
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>{name}</h2>
              <div className='flex items-center mt-1'>
                <Rating rating={rating} />
              </div>
              <p className='mt-2 text-xl font-bold text-primary'>
                ${price}{' '}
                <span className='line-through text-gray-400'>
                  {oldPrice && `$${oldPrice}`}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Products;
