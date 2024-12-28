// DeleteModal.js
import React from 'react';

const DeleteModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleDelete,
  productId,
}) => {
  return (
    isDeleteModalOpen && (
      <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded-xl shadow-lg'>
          <h2 className='text-lg font-semibold mb-4'>
            Are you sure you want to delete?
          </h2>
          <div className='flex justify-end gap-4'>
            <button
              onClick={() => handleDelete(productId)}
              className='bg-red-500 text-white px-4 py-2 rounded-lg'
            >
              Delete
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className='bg-gray-300 px-4 py-2 rounded-lg'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteModal;
