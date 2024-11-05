import storeImg from '../assets/images/StoreImg.jpg';

const Page = () => {
  return (
    <section className='bg-gray-50 py-16 '>
      <h1 className='text-4xl md:text-5xl font-semibold text-center text-primary-dark mb-12'>
        About Us
      </h1>
      <p className='text-lg text-center text-gray-700 mb-8'>
        Discover unbeatable prices, a diverse range of products, and a shopping
        experience designed just for you.
      </p>

      <div className='flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24'>
        {/* About Section */}
        <div className='w-full lg:w-2/3 bg-white shadow-lg rounded-lg  space-y-6'>
          <h2 className='text-2xl font-semibold text-primary-dark mb-4'>
            Our Mission
          </h2>
          <p className='text-gray-700'>
            At Ahmad Store, we believe that shopping should be enjoyable,
            affordable, and accessible for everyone. We strive to bring you
            high-quality products at prices that won’t break the bank, making it
            easy to find exactly what you’re looking for, from everyday
            essentials to unique finds. We’re committed to providing an
            experience that keeps our customers coming back.
          </p>

          <h2 className='text-2xl font-semibold text-primary-dark mb-4'>
            Why Shop With Us?
          </h2>
          <ul className='space-y-4'>
            <li className='flex items-start'>
              <span className='text-primary text-lg mr-2'>•</span>
              <div>
                <h3 className='font-semibold text-lg'>Affordable Prices</h3>
                <p className='text-gray-600'>
                  Our goal is to offer the best prices possible without
                  compromising on quality.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <span className='text-primary text-lg mr-2'>•</span>
              <div>
                <h3 className='font-semibold text-lg'>
                  Wide Range of Products
                </h3>
                <p className='text-gray-600'>
                  With an extensive selection across various categories, we have
                  something for everyone.
                </p>
              </div>
            </li>
            <li className='flex items-start'>
              <span className='text-primary text-lg mr-2'>•</span>
              <div>
                <h3 className='font-semibold text-lg'>
                  Customer-Centric Experience
                </h3>
                <p className='text-gray-600'>
                  We prioritize our customers and ensure an enjoyable, seamless
                  shopping experience every time.
                </p>
              </div>
            </li>
          </ul>

          <h2 className='text-2xl font-semibold text-primary-dark mb-4'>
            Our Values
          </h2>
          <p className='text-gray-700'>
            At the heart of our company are values that we take pride in:
            integrity, dedication, and quality. We are dedicated to fostering
            trust and providing products that you’ll love. We’re always
            improving, based on your feedback, to serve you better every day.
          </p>
        </div>

        {/* Image/Graphic */}
        <aside className='w-full lg:w-1/3 flex justify-center'>
          <img
            src={storeImg}
            alt='About us graphic'
            className='rounded-lg shadow-lg'
          />
        </aside>
      </div>
    </section>
  );
};

export default Page;
