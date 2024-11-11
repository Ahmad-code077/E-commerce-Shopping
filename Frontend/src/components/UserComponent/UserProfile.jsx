import { useState, useEffect } from 'react';
import { useEditProfileMutation } from '../../Redux/Features/auth/authapi';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { id, username, email, bio, profession, imageUrl } = user;
  console.log(user);
  const [profileData, setProfileData] = useState({
    userId: id,
    username: username || '',
    email: email || '',
    oldPassword: '', // added oldPassword field for validation
    newPassword: '', // added newPassword field
    bio: bio || '',
    profession: profession || '',
    imageUrl: imageUrl || '',
  });

  const [editProfile, { isLoading, isSuccess, error }] =
    useEditProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that the old password and new password are provided if updating password

    try {
      await editProfile(profileData).unwrap();
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  useEffect(() => {
    setProfileData({
      userId: id,
      username,
      email,
      bio,
      profession,
      imageUrl,
      oldPassword: '', // reset password fields when user data changes
      newPassword: '',
    });
  }, [user, id, username, email, bio, profession, imageUrl]);

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
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>
            Old Password
          </label>
          <input
            type='password'
            placeholder='Old Password'
            value={profileData.oldPassword}
            onChange={(e) =>
              setProfileData({ ...profileData, oldPassword: e.target.value })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>
            New Password
          </label>
          <input
            type='password'
            placeholder='New Password'
            value={profileData.newPassword}
            onChange={(e) =>
              setProfileData({ ...profileData, newPassword: e.target.value })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Bio</label>
          <textarea
            placeholder='A short bio about yourself'
            value={profileData.bio}
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
            value={profileData.profession}
            onChange={(e) =>
              setProfileData({ ...profileData, profession: e.target.value })
            }
            className='w-full p-3 border rounded-lg focus:outline-none focus:border-primary'
          />
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 font-medium mb-2'>
            Image URL
          </label>
          <input
            type='text'
            placeholder='Link to your profile image'
            value={profileData.imageUrl}
            onChange={(e) =>
              setProfileData({ ...profileData, imageUrl: e.target.value })
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

        {isSuccess && (
          <p className='text-green-500 text-center mt-4'>
            Profile updated successfully!
          </p>
        )}
        {error && (
          <p className='text-red-500 text-center mt-4'>
            Error updating profile. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
