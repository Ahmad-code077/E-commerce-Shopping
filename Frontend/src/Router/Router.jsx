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
  UpdateProfile,
  SeeUserProfile,
  UpdatePassword,
} from '../components';
import AuthenticateUser from '../components/AutenticateUser';

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
        path: 'admin', // Admin Route
        element: (
          <AuthenticateUser>
            {' '}
            <AdminDashboard />{' '}
          </AuthenticateUser>
        ),
      },
      {
        path: 'user',
        element: <UserDashboard />,
      },
      {
        path: 'update-profile',
        element: <UpdateProfile />,
      },
      {
        path: 'update-password',
        element: <UpdatePassword />,
      },
      {
        path: 'manage-product', // Admin Route
        element: (
          <AuthenticateUser>
            <ManageProduct />
          </AuthenticateUser>
        ),
      },
      {
        path: 'manage-orders', // Admin Route
        element: (
          <AuthenticateUser>
            <ManageOrders />
          </AuthenticateUser>
        ),
      },
      {
        path: 'add-new-product', // Admin Route
        element: (
          <AuthenticateUser>
            <AddNewProduct />
          </AuthenticateUser>
        ),
      },
      {
        path: 'profile',
        element: <SeeUserProfile />,
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
