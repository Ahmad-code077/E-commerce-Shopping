import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../Redux/Features/auth/authapi';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [error, setError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { nameError: '', emailError: '', passwordError: '' }; // Updated to emailError
    const myData = new FormData(e.target);
    const payLoad = Object.fromEntries(myData);
    // Username validation
    if (!payLoad.username.trim()) {
      newErrors.nameError = 'Username is required.';
    }
    // Email validation
    if (!payLoad.email.trim()) {
      newErrors.emailError = 'Email is required.'; // Updated to check for email
    } else if (!/\S+@\S+\.\S+/.test(payLoad.email)) {
      // Basic email format validation
      newErrors.emailError = 'Email address is invalid.';
    }

    // Password validation
    if (!payLoad.password.trim()) {
      newErrors.passwordError = 'Password is required.';
    } else if (
      payLoad.password.length < 8 ||
      !/[!@#$%^&*]/.test(payLoad.password)
    ) {
      newErrors.passwordError =
        'Password must be at least 8 characters long and include one special character.';
    }

    setError(newErrors);

    // If no errors, navigate or perform any action
    if (
      !newErrors.nameError &&
      !newErrors.emailError && // Updated to check for emailError
      !newErrors.passwordError
    ) {
      try {
        const res = await registerUser(payLoad).unwrap();
        toast.success(res?.message);
        navigate('/login');
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <section className='max-w-[500px] h-screen mx-auto bg-[#FBFCF7] shadow-2xl flex flex-col items-center justify-center'>
      <main className='w-[90%]'>
        <h1 className='text-3xl text-center mb-4 font-bold'>Register Form</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label htmlFor='userName'>
              {error.nameError ? (
                <p className='text-red-500'>{error.nameError}</p>
              ) : (
                'Username'
              )}
            </label>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              className='flex items-center gap-2 justify-center mt-4 outline-1 rounded-md p-2 w-full text-xl border border-[#9C8F98] text-black'
            />
          </div>
          <div>
            <label htmlFor='email'>
              {error.emailError ? (
                <p className='text-red-500'>{error.emailError}</p>
              ) : (
                'Email'
              )}
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              className='flex items-center gap-2 justify-center mt-4 outline-1 rounded-md p-2 w-full text-xl border border-[#9C8F98] text-black'
            />
          </div>
          <div>
            <label htmlFor='password'>
              {error.passwordError ? (
                <p className='text-red-500'>{error.passwordError}</p>
              ) : (
                'Password'
              )}
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className='flex items-center gap-2 justify-center mt-4 outline-1 rounded-md p-2 w-full text-xl border border-[#9C8F98] text-black'
            />
          </div>
          <div>
            <button
              disabled={isLoading}
              type='submit'
              className='flex items-center gap-2 justify-center bg-primary rounded-md p-2 w-full text-white text-xl'
            >
              Submit
            </button>
          </div>
        </form>
        <h1 className='mt-8 text-center'>
          Already have an account?{' '}
          <Link to={'/login'} className='text-primary'>
            Login
          </Link>
        </h1>
      </main>
    </section>
  );
};

export default Register;
