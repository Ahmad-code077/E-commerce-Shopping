import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <section className='bg-gray-50 py-16 px-6 lg:px-24'>
      <h1 className='text-4xl md:text-5xl font-semibold text-center text-primary-dark mb-12'>
        Contact Us
      </h1>
      <p className='text-lg text-center text-gray-700 mb-8'>
        We’d love to hear from you! Fill out the form below or reach out to us
        directly.
      </p>

      <div className='flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24'>
        {/* Contact Form */}
        <div className='w-full lg:w-1/2 bg-white shadow-lg rounded-lg my-10 p-8'>
          <form className='space-y-6'>
            <div>
              <label className='block text-gray-600 font-semibold mb-2'>
                Your Name
              </label>
              <input
                type='text'
                className='w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
                placeholder='John Doe'
              />
            </div>
            <div>
              <label className='block text-gray-600 font-semibold mb-2'>
                Your Email
              </label>
              <input
                type='email'
                className='w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
                placeholder='john@example.com'
              />
            </div>
            <div>
              <label className='block text-gray-600 font-semibold mb-2'>
                Message
              </label>
              <textarea
                className='w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary focus:outline-none'
                rows='4'
                placeholder='Type your message here...'
              ></textarea>
            </div>
            <button
              type='submit'
              className='w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary-dark transition'
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <main className='w-full lg:w-1/2 space-y-6'>
          <div className='bg-white shadow-lg rounded-lg flex items-center gap-4 p-6'>
            <FaPhone className='text-3xl text-primary' />
            <div>
              <h3 className='font-semibold text-lg'>Call Us</h3>
              <p className='text-gray-600'>+92-3216832148</p>
            </div>
          </div>
          <div className='bg-white shadow-lg rounded-lg flex items-center gap-4 p-6'>
            <FaEnvelope className='text-3xl text-primary' />
            <div>
              <h3 className='font-semibold text-lg'>Email Us</h3>
              <p className='text-gray-600'>ahmadeveloper077@gmail.com</p>
            </div>
          </div>
          <div className='bg-white shadow-lg rounded-lg flex items-center gap-4 p-6'>
            <FaMapMarkerAlt className='text-3xl text-primary' />
            <div>
              <h3 className='font-semibold text-lg'>Visit Us</h3>
              <p className='text-gray-600'>123 Main St, Bahawalpur, Pakistan</p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ContactPage;
