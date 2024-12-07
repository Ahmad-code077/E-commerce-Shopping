import { useState, useEffect } from 'react';
import {
  useEditProfileMutation,
  // useGetMyProfileQuery,
} from '../../Redux/Features/auth/authapi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../../Redux/Features/auth/authSlice';
const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const { _id, username, email, bio, profession } = user;
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    userId: _id,
    username: username || '',
    bio: bio || '',
    profession: profession || '',
  });
  // console.log(profileData);
  const [editProfile, { isLoading }] = useEditProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editProfile(profileData).unwrap();
      toast.success('Profile updated successfully!');
      console.log(res.user);
      dispatch(setUser({ user: res?.user }));
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error(err?.data?.message);
    }
  };

  useEffect(() => {
    setProfileData({
      userId: _id,
      username,
      email,
      bio,
      profession,
    });
  }, [user, _id, username, email, bio, profession]);

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-full max-w-lg'
      >
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-700'>
          Edit Profile
        </h2>

        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Name</label>
          <input
            type='text'
            placeholder='Name'
            value={profileData.username}
            onChange={(e) =>
              setProfileData({ ...profileData, username: e.target.value })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Email</label>
          <input
            type='email'
            placeholder='Email'
            defaultValue={profileData.email}
            readOnly
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Bio</label>
          <textarea
            placeholder='A short bio about yourself'
            value={profileData.bio || ''}
            onChange={(e) =>
              setProfileData({ ...profileData, bio: e.target.value })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
            rows='3'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>
            Profession
          </label>
          <input
            type='text'
            placeholder='Your profession'
            value={profileData.profession || ''}
            onChange={(e) =>
              setProfileData({ ...profileData, profession: e.target.value })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition duration-300'
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
