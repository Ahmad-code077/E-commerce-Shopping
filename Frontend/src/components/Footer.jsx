import { FaLocationDot } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { IoCall } from 'react-icons/io5';
import image1 from './../assets/images/instagram-1.jpg';
import image2 from './../assets/images/instagram-2.jpg';
import image3 from './../assets/images/instagram-3.jpg';
import image4 from './../assets/images/instagram-4.jpg';
import image5 from './../assets/images/instagram-5.jpg';
import image6 from './../assets/images/instagram-6.jpg';

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
  const UseFulLinks = [
    {
      id: 1,
      linkText: 'Help',
    },
    {
      id: 2,
      linkText: 'Track my Order',
    },
    {
      id: 3,
      linkText: 'Men',
    },
    {
      id: 4,
      linkText: 'Women',
    },
    {
      id: 5,
      linkText: 'Dresses',
    },
  ];
  const Instagram = [
    {
      id: 1,
      image: image1,
    },
    {
      id: 2,
      image: image2,
    },
    {
      id: 3,
      image: image3,
    },
    {
      id: 4,
      image: image4,
    },
    {
      id: 5,
      image: image5,
    },
    {
      id: 6,
      image: image6,
    },
  ];
  return (
    <footer className='flex my-12 gap-16 flex-wrap items-start justify-center  lg:justify-evenly'>
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
        <h1 className='text-xl font-bold  my-4'>Company</h1>
        {Link.map(({ id, linkText }) => {
          return (
            <a
              href='#'
              key={id}
              className='hover:text-primary text-gray-600 font-semibold'
            >
              {linkText}
            </a>
          );
        })}
      </main>
      <main className='flex flex-col gap-4 '>
        <h1 className='text-xl font-bold mx-auto my-4'>UseFul Link</h1>
        {UseFulLinks.map(({ id, linkText }) => {
          return (
            <div key={id} className='flex items-center gap-4 '>
              <a
                href='#'
                className='text-gray-600 font-semibold hover:text-primary'
              >
                {linkText}
              </a>
            </div>
          );
        })}
      </main>
      <main className='flex flex-col gap-4 '>
        <h1 className='text-xl font-bold mx-auto my-4'>Instagram</h1>
        <div className='grid grid-cols-3 gap-4'>
          {Instagram.map(({ id, image }) => {
            return (
              <div key={id} className='flex items-center  h-20  w-20'>
                <img src={image} alt='image' />
              </div>
            );
          })}
        </div>
      </main>
    </footer>
  );
};
export default Footer;
