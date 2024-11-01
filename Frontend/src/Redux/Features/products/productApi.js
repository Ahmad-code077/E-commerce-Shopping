import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseUrl';
const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParam = new URLSearchParams({
          category: category || '',
          color: color || '',
          minPrice: minPrice || 0,
          maxPrice: maxPrice || '',
          page: page.toString(),
          limit: limit.toString(),
        });
        return `/?${queryParam}`;
      },
      providesTags: ['Products'],
    }),

    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    AddProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/create-product',
        method: 'Post',
        credentials: 'include',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});
