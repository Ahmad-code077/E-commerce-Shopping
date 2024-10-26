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
import { SingleShopPage } from '../components';

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,

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
]);

export default route;
