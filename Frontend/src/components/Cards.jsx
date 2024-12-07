import { Link } from 'react-router-dom';
import card1 from '../assets/images/card-1.png';
import card2 from '../assets/images/card-2.png';
import card3 from '../assets/images/card-3.png';

const Cards = () => {
  const cards = [
    {
      id: 1,
      trend: '2024 Trend',
      title: 'Women Shirt',
      image: card1,
    },
    {
      id: 2,
      trend: '2024 Trend',
      title: 'Women Dresses',
      image: card2,
    },
    {
      id: 3,
      trend: '2024 Trend',
      title: 'Women Casuals',
      image: card3,
    },
  ];

  return (
    <section>
      <h1 className='text-3xl md:text-5xl text-primary-dark font-semibold text-center my-12'>
        Latest Trends
      </h1>
      <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
        {cards.map((item) => {
          const { id, title, trend, image } = item;
          return (
            <div
              key={id}
              className='relative block overflow-hidden rounded-lg shadow-lg group '
            >
              <img
                src={image}
                alt={title}
                className='w-full h-48 object-cover'
              />
              <div className='absolute inset-0 flex left-20 flex-col justify-center items-center    text-center p-4'>
                <h3 className=' font-semibold text-primary group-hover:scale-150 transition-all duration-300'>
                  {trend}
                </h3>
                <h2 className='text-2xl font-bold text-darkCharcoal my-2 group-hover:scale-110 transition-all duration-300'>
                  {title}
                </h2>
                <Link to={'/shop'} className='underline'>
                  Discover more
                </Link>
              </div>
            </div>
          );
        })}
      </main>
    </section>
  );
};

export default Cards;
