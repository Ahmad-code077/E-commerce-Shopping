import { CiDollar } from 'react-icons/ci';
import { RiSpeakLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';

const FaithCards = () => {
  const Delivery = [
    {
      id: 1,
      icon: <TbTruckDelivery />,
      heading: 'Free Delivery',
      para: 'Offers convenience and the ability to shop from anywhere, anytime.',
    },
    {
      id: 2,
      icon: <CiDollar />,
      heading: '100% Money Back Guaranty',
      para: 'E-commerce have a review system where customers can share feedback.',
    },
    {
      id: 3,
      icon: <RiSpeakLine />,
      heading: 'Strong Support',
      para: 'Offer customer support services to assist customers with queries and issues.',
    },
  ];

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 gap-4'>
      {Delivery.map(({ id, icon, heading, para }) => {
        return (
          <div
            className='flex flex-col gap-2 items-center justify-center text-center'
            key={id}
          >
            <span className='text-4xl text-primary font-bold'>{icon}</span>
            <h1 className='text-2xl font-semibold'>{heading}</h1>
            <p className='text-lg text-gray-600'>{para}</p>
          </div>
        );
      })}
    </section>
  );
};
export default FaithCards;
