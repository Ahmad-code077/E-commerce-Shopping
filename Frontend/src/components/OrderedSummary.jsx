import { useSelector } from 'react-redux';

const OrderedSummary = () => {
  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector(
    (state) => state.cart
  );
  return (
    <section className='relative '>
      <h1 className='text-xl text-primary'>Order Summary</h1>
      <div className='flex flex-col gap-4 mt-4'>
        {' '}
        <h1>Selected Items : {selectedItems}</h1>
        <h1>Total Price : ${totalPrice.toFixed(2)}</h1>
        <h1>
          Tax ({taxRate * 100}%) : ${tax.toFixed(2)}
        </h1>
        <h1>Grand Total : ${grandTotal.toFixed(2)}</h1>
      </div>
    </section>
  );
};
export default OrderedSummary;
