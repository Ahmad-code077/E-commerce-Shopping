import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { IoCall } from 'react-icons/io5';

const Footer = () => {
  const contactInfo = [
    {
      id: 1,
      icon: <FaLocationDot />,
      title: '232 Main street London',
    },
    {
      id: 2,
      icon: <IoMdMail />,
      title: 'support@ahmad.com',
    },
    {
      id: 3,
      icon: <IoCall />,
      title: '(+92 3437564930)',
    },
  ];
  const Link = [
    {
      id: 1,
      linkText: 'Home',
    },
    {
      id: 2,
      linkText: 'About us',
    },
    {
      id: 3,
      linkText: 'Work with Us',
    },
    {
      id: 4,
      linkText: 'Our Blog',
    },
    {
      id: 5,
      linkText: 'Term and Conditions',
    },
  ];
  return (
    <footer className='flex my-12 gap-4 flex-wrap items-center justify-center sm:justify-normal'>
      <main className='flex flex-col gap-4 '>
        <h1 className='text-xl font-bold mx-auto my-4'>Contact info</h1>
        {contactInfo.map(({ id, icon, title }) => {
          return (
            <div key={id} className='flex items-center gap-4 '>
              <span className='text-primary text-xl'>{icon}</span>
              <p className='text-gray-600 font-semibold'>{title}</p>
            </div>
          );
        })}
      </main>
      <main className='flex flex-col gap-4 '>
        <h1 className='text-xl font-bold mx-auto my-4'>Company</h1>
        {Link.map(({ id, linkText }) => {
          return (
            <a href='#' key={id} className='hover:text-primary'>
              {linkText}
            </a>
          );
        })}
      </main>
      <main className='flex flex-col gap-4 '>
        <h1 className='text-xl font-bold mx-auto my-4'>UseFul Link</h1>
        {contactInfo.map(({ id, icon, title }) => {
          return (
            <div key={id} className='flex items-center gap-4 '>
              <span className='text-primary text-xl'>{icon}</span>
              <p className='text-gray-600 font-semibold'>{title}</p>
            </div>
          );
        })}
      </main>
      <main className='flex flex-col gap-4 '>
        <h1 className='text-xl font-bold mx-auto my-4'>Instagram</h1>
        {contactInfo.map(({ id, icon, title }) => {
          return (
            <div key={id} className='flex items-center gap-4 '>
              <span className='text-primary text-xl'>{icon}</span>
              <p className='text-gray-600 font-semibold'>{title}</p>
            </div>
          );
        })}
      </main>
    </footer>
  );
};
export default Footer;
