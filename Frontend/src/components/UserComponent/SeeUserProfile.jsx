import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteUserMutation } from '../../Redux/Features/auth/authapi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Features/auth/authSlice';

const SeeUserProfile = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  const { username, email, role, profession, bio, _id } = JSON.parse(
    localStorage.getItem('user')
  );

  const handleDeleteProfile = async () => {
    try {
      const res = await deleteUser(_id).unwrap();
      toast.success(res?.message);
      dispatch(logout());
      console.log(res);
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className='max-w-md mx-auto  shadow-lg rounded-lg overflow-hidden border border-gray-200'>
      <div className='p-6'>
        <h2 className='text-2xl font-bold text-gray-800'>User Profile</h2>
        <p className='text-gray-600 mt-2'>
          Detailed information about your account.
        </p>
        <div className='mt-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-700 font-semibold'>Name:</span>
            <span className='text-gray-900'>{username}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-700 font-semibold'>Email:</span>
            <span className='text-gray-900'>{email}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-700 font-semibold'>Bio:</span>
            <span className='text-gray-900'>{bio}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-700 font-semibold'>Profession:</span>
            <span className='text-gray-900'>{profession}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-700 font-semibold'>Role:</span>
            <span className='text-gray-900'>{role}</span>
          </div>
        </div>
      </div>
      <div className='my-12 flex items-center justify-between'>
        <Link
          to={'/dashboard/update-profile'}
          className='px-4 py-2 animated-button bg-primary '
        >
          <span className='button-content text-white '>Update </span>
        </Link>
        <Link
          to={'/dashboard/update-password'}
          className='px-4 py-2 animated-button bg-primary '
        >
          <span className='button-content text-white'>Change Password </span>
        </Link>
        <button
          className='animated-button bg-primary-dark  px-4 py-2'
          onClick={() => setConfirmDelete(true)}
        >
          <span className='button-content text-white'>Delete</span>
        </button>
      </div>
      {confirmDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md'>
            <h2 className='text-lg font-bold text-gray-800 mb-4'>
              Confirm Delete
            </h2>
            <p className='text-gray-600'>
              Are you sure you want to delete your profile? This action cannot
              be undone.
            </p>
            <div className='mt-6 flex justify-end gap-4'>
              <button
                onClick={() => setConfirmDelete(false)}
                className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
              >
                cancel{' '}
              </button>
              <button
                onClick={handleDeleteProfile}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
              >
                Delete{' '}
              </button>
            </div>
          </div>
        </div>
      )}{' '}
    </div>
  );
};
export default SeeUserProfile;
