import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddProductMutation } from '../../../Redux/Features/products/productApi';

// All available colors for any category
const allColors = ['black', 'blue', 'red', 'green', 'gold', 'silver', 'beige'];

const AddNewProduct = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();

  // Updated formData with all required fields including oldPrice, rating, and author
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '', // New field for old price
    image: null,
    category: '',
    description: '',
    color: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If oldPrice is empty, remove it from formData
    const dataToSubmit = { ...formData };
    if (!dataToSubmit.oldPrice) {
      delete dataToSubmit.oldPrice;
    }
    if (Number(dataToSubmit.oldPrice) <= Number(dataToSubmit.price)) {
      toast.error('Old Price should be greater than Price');
      return;
    }

    try {
      // Create a new FormData object
      const formDataToSend = new FormData();

      // Append all fields to FormData except image
      for (const key in dataToSubmit) {
        if (dataToSubmit?.hasOwnProperty(key) && key !== 'image') {
          formDataToSend.append(key, dataToSubmit[key]);
        }
      }

      // Ensure the image is appended correctly
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Log the form data before sending
      console.log('Form Data:', formDataToSend);

      // Send the data to the API using addProduct mutation
      const res = await addProduct(formDataToSend).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className='container max-w-lg mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Add New Product</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='block'>
            Product Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter product name'
            className='w-full px-4 py-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div>
          <label htmlFor='price' className='block'>
            Price
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={formData.price}
            onChange={handleChange}
            placeholder='Enter product price'
            className='w-full px-4 py-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div>
          <label htmlFor='oldPrice' className='block'>
            Old Price
          </label>
          <input
            type='number'
            id='oldPrice'
            name='oldPrice'
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder='Enter old price'
            className='w-full px-4 py-2 border border-gray-300 rounded'
          />
        </div>

        <div>
          <label htmlFor='category' className='block'>
            Category
          </label>
          <select
            id='category'
            name='category'
            value={formData.category}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            required
          >
            <option value=''>Select category</option>
            <option value='accessories'>Accessories</option>
            <option value='dress'>Dress</option>
            <option value='jewellery'>Jewellery</option>
            <option value='cosmetics'>Cosmetics</option>
          </select>
        </div>

        <div>
          <label htmlFor='color' className='block'>
            Color
          </label>
          <select
            id='color'
            name='color'
            value={formData.color}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            required
          >
            <option value=''>Select color</option>
            {allColors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='description' className='block'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Enter product description'
            className='w-full px-4 py-2 border border-gray-300 rounded'
          />
        </div>

        <div>
          <label htmlFor='image' className='block'>
            Product Image
          </label>
          <input
            type='file'
            id='image'
            name='image'
            onChange={handleFileChange}
            className='w-full px-4 py-2 border border-gray-300 rounded'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded mt-4'
        >
          {isLoading ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
