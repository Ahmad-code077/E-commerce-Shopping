import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
  Cart,
  Contact,
  Home,
  Login,
  Page,
  Register,
  SearchProduct,
  Shop,
  SingleCategory,
} from '../pages';
import {
  AddNewProduct,
  AdminDashboard,
  Dashboard,
  Error,
  ManageOrders,
  ManageProduct,
  SingleShopPage,
  UserDashboard,
  UserOrders,
  UserPayment,
  UserProfile,
} from '../components';

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <Shop />,
      },
      {
        path: '/shop/:id',
        element: <SingleShopPage />,
      },
      {
        path: '/pages',
        element: <Page />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/search',
        element: <SearchProduct />,
      },
      {
        path: '/categories/:category',
        element: <SingleCategory />,
      },
      {
        path: '/categories/:category',
        element: <SingleCategory />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'admin', // Admin Dashboard
        element: <AdminDashboard />,
      },
      {
        path: 'User',
        element: <UserDashboard />,
      },
      {
        path: 'manage-product', // Manage Products
        element: <ManageProduct />,
      },
      {
        path: 'manage-orders', // Manage Orders
        element: <ManageOrders />,
      },
      {
        path: 'add-new-product', // Add New Product
        element: <AddNewProduct />,
      },
      {
        path: 'profile', // User Profile
        element: <UserProfile />,
      },
      {
        path: 'payment', // User Payment
        element: <UserPayment />,
      },
      {
        path: 'orders', // User Orders
        element: <UserOrders />,
      },
    ],
  },
]);

export default route;
