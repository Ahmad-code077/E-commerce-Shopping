import image1 from './../assets/images/instagram-1.jpg';
import image2 from './../assets/images/instagram-2.jpg';
import image3 from './../assets/images/instagram-3.jpg';
import image4 from './../assets/images/instagram-4.jpg';

const blogs = [
  {
    id: 1,
    title: 'Timeless Elegance',
    description: 'Mastering the Art of Capsule Wardrobes',
    date: '12th August 2022',
    image: image1,
  },
  {
    id: 2,
    title: 'Summer Breeze',
    description: 'Unveiling the Hottest Beachwear Trends',
    date: '18th January 2023',
    image: image2,
  },
  {
    id: 3,
    title: 'Power Dressing',
    description: "Navigating the World of Women's Tailoring",
    date: '5th January 2025',
    image: image3,
  },
  {
    id: 4,
    title: 'New York Times',
    description: "The World's Best Fashion Fair 2025",
    date: '25th May 2025',
    image: image4,
  },
];
const Blogs = () => {
  return (
    <>
      <div className='my-12'>
        <h1 className='text-3xl md:text-5xl text-primary-dark font-semibold text-center my-4'>
          Latest Blog
        </h1>
        <p className='text-center text-xl max-w-md mx-auto'>
          Elevate your wardrobe with our freshest style tips, trends, and
          inspiration on our blog.
        </p>
      </div>

      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className='border rounded-lg shadow-md overflow-hidden cursor-pointer'
          >
            <img
              src={blog.image}
              alt={blog.title}
              className='w-full h-64 object-cover'
            />
            <div className='p-4 text-center'>
              <h2 className='text-lg text-primary'>{blog.title}</h2>
              <p className=' text-xl font-medium'>{blog.description}</p>
              <p className='text-lg  mt-2 text-darkCharcoal'>{blog.date}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default Blogs;
