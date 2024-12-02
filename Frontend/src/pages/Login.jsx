import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../Redux/Features/auth/authapi';
import { toast } from 'react-toastify';
import { setUser } from '../Redux/Features/auth/authSlice';

const Login = () => {
  const [error, setError] = useState({ emailError: '', passwordError: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { emailError: '', passwordError: '' };
    const myData = new FormData(e.target);
    const payLoad = Object.fromEntries(myData);

    if (!payLoad.email.trim()) {
      newErrors.emailError = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(payLoad.email)) {
      newErrors.emailError = 'Email address is invalid.';
    }

    if (!payLoad.password.trim()) {
      newErrors.passwordError = 'Password is required.';
    } else if (
      payLoad.password.length < 8 ||
      !/[!@#$%^&*]/.test(payLoad.password)
    ) {
      newErrors.passwordError =
        'Password must contain at least 8 characters and one special character.';
    }

    setError(newErrors);

    if (!newErrors.emailError && !newErrors.passwordError) {
      try {
        const response = await loginUser(payLoad).unwrap();
        toast.success(response?.message);
        const { user } = response;
        // console.log(user);
        dispatch(setUser({ user }));
        navigate('/');
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <section className='max-w-[500px] h-screen mx-auto bg-[#FBFCF7] shadow-2xl flex flex-col items-center justify-center'>
      <main className='w-[90%]'>
        <h1 className='text-3xl text-center mb-4 font-bold'>Login Form</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
              type='submit'
              disabled={isLoading}
              className='flex items-center gap-2 justify-center bg-primary rounded-md p-2 w-full text-white text-xl'
            >
              Submit
            </button>
          </div>
        </form>
        <h1 className='mt-8 text-center'>
          Don&apos;t have an account?{' '}
          <Link
            to={'/register'}
            className='text-primary hover:text-primary-dark'
          >
            Register
          </Link>
        </h1>
      </main>
    </section>
  );
};

export default Login;
