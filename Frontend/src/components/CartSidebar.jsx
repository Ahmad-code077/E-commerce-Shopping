import { useSelector } from 'react-redux';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import OrderedSummary from './OrderedSummary';
// import { removeFromCart } from './cartSlice'; // Import your action to remove items

const CartSidebar = ({ handleCart, openCart }) => {
  const { cartItem } = useSelector((state) => state.cart);

  const handleIncrease = (itemId) => {
    // Dispatch action to increase item quantity
  };

  const handleDecrease = (itemId) => {
    // Dispatch action to decrease item quantity
  };

  const handleClearCart = () => {
    // Dispatch action to clear the cart
  };

  const handlePurchase = () => {
    // Handle the purchase logic
  };

  const handleRemove = (itemId) => {
    // dispatch(removeFromCart(itemId)); // Dispatch action to remove item
  };

  return (
    <aside
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-6 z-50 transition-transform transform translate-x-0 overflow-y-auto hide-scrollbar ${
        openCart ? '' : ''
      }`}
    >
      <div className='mb-6 flex justify-between '>
        <h1 className='text-xl font-bold'>Your Shopping Bag</h1>
        <button className='text-gray-600' onClick={handleCart}>
          <CgClose />
        </button>
      </div>
      <div className='overflow-y-auto '>
        {cartItem.length === 0 ? (
          <p className='text-gray-500 text-lg text-center h-96 flex items-center justify-center '>
            Your cart is empty. Add Your desire products to the cart 😊
          </p>
        ) : (
          cartItem.map((item) => (
            <div
              key={item.id}
              className='flex justify-between items-center mb-4 border-b pb-2'
            >
              <img
                src={item.image}
                alt={item.name}
                className='w-16 h-16 object-cover mr-4'
              />
              <div className='flex-grow'>
                <h2 className='font-semibold'>{item.name}</h2>
                <p className='text-gray-600'>${item.price.toFixed(2)}</p>
              </div>
              <div className='flex items-center'>
                <button
                  onClick={() => handleDecrease(item.id)}
                  className='p-1 text-gray-600'
                >
                  <FaMinus />
                </button>
                <span className='mx-2'>{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item.id)}
                  className='p-1 text-gray-600'
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className='p-1 text-red-600'
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItem.length > 0 && <OrderedSummary />}
      {cartItem.length > 0 && (
        <div className='mt-4'>
          <button
            onClick={handleClearCart}
            className='w-full bg-red-500 text-white py-2 rounded mb-2'
          >
            Clear Cart
          </button>
          <button
            onClick={handlePurchase}
            className='w-full bg-green-500 text-white py-2 rounded'
          >
            Purchase
          </button>
        </div>
      )}
    </aside>
  );
};

export default CartSidebar;
