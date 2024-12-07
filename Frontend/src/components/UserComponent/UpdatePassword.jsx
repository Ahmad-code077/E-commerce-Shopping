import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdatePasswordMutation } from '../../Redux/Features/auth/authapi';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    userId: user?._id,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [visibility, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New Password and Confirm Password do not match.');
      return;
    }

    try {
      const res = await updatePassword(passwordData).unwrap();
      toast.success(res?.message);
      navigate('/dashboard/profile');
    } catch (err) {
      console.error('Failed to update password:', err);
      toast.error(err?.data?.message || 'Failed to update password.');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg'
      >
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-700'>
          Update Password
        </h2>

        {/* Current Password */}
        <div className='mb-4 relative'>
          <label className='block text-gray-700 font-medium mb-2'>
            Current Password
          </label>
          <input
            type={visibility.currentPassword ? 'text' : 'password'}
            placeholder='Current Password'
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
          <button
            type='button'
            onClick={() => toggleVisibility('currentPassword')}
            className='absolute right-3 top-10 text-gray-500'
          >
            {visibility.currentPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {/* New Password */}
        <div className='mb-4 relative'>
          <label className='block text-gray-700 font-medium mb-2'>
            New Password
          </label>
          <input
            type={visibility.newPassword ? 'text' : 'password'}
            placeholder='New Password'
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
          <button
            type='button'
            onClick={() => toggleVisibility('newPassword')}
            className='absolute right-3 top-10 text-gray-500'
          >
            {visibility.newPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {/* Confirm New Password */}
        <div className='mb-4 relative'>
          <label className='block text-gray-700 font-medium mb-2'>
            Confirm New Password
          </label>
          <input
            type={visibility.confirmPassword ? 'text' : 'password'}
            placeholder='Confirm New Password'
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
          <button
            type='button'
            onClick={() => toggleVisibility('confirmPassword')}
            className='absolute right-3 top-10 text-gray-500'
          >
            {visibility.confirmPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition duration-300'
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
