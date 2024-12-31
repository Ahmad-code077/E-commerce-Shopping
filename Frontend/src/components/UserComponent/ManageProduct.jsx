import React, { useState } from 'react';
import {
  useFetchAllProductsQuery,
  useDeleteProductMutation,
} from '../../Redux/Features/products/productApi';
import DeleteModal from './DeleteModal'; // Import the modal
import { toast } from 'react-toastify';

const ManageProduct = () => {
  // Fetch products
  const {
    data: products,
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: '',
    color: '',
    minPrice: 0,
    maxPrice: '',
    page: 1,
    limit: 50,
  });

  // Delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productCount, setProductCount] = useState(8);
  const allProducts = products?.products;
  const paginateProduct = products?.products?.slice(0, productCount);
  console.log('all', allProducts);

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success('Product deleted successfully');
      setIsDeleteModalOpen(false); // Close modal after successful deletion
    } catch (err) {
      toast.error(err?.data?.message);
      setIsDeleteModalOpen(false);
      console.log(err); // Close modal on error
    }
  };

  // Handle loading and error states
  if (isLoading)
    return <div className='text-center mt-4'>Loading products...</div>;
  if (error)
    return (
      <div className='text-center mt-4 text-red-500'>
        Error loading products!
      </div>
    );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-6'>Manage Products</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 shadow-md'>
          <thead>
            <tr className='bg-gray-100 text-left'>
              <th className='px-4 py-2 border-b'>Image</th>
              <th className='px-4 py-2 border-b'>Name</th>
              <th className='px-4 py-2 border-b'>Price</th>
              <th className='px-4 py-2 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginateProduct?.map((product) => (
              <tr key={product._id} className='border-b hover:bg-gray-50'>
                <td className='px-4 py-2 w-32 h-32'>
                  <img
                    src={product.image || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    className=' object-cover w-full h-full rounded'
                  />
                </td>
                <td className='px-4 py-2'>{product.name}</td>
                <td className='px-4 py-2'>${product.price}</td>
                <td className='text-center whitespace-nowrap'>
                  <button
                    onClick={() => {
                      setProductToDelete(product._id);
                      setIsDeleteModalOpen(true);
                    }}
                    className='bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors mr-2'
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => alert('Update functionality coming soon!')}
                    className='bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors'
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginateProduct < allProducts && (
        <div className='flex justify-center mt-4'>
          {' '}
          <button
            className='bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors '
            onClick={() => setProductCount((prev) => prev + 8)}
          >
            Load more
          </button>
        </div>
      )}
      {/* Delete Modal */}
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
        productId={productToDelete}
      />
    </div>
  );
};

export default ManageProduct;
