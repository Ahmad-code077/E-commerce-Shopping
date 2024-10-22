import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Contact, Home, Page, Shop } from '../pages';

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
        path: '/pages',
        element: <Page />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
]);

export default route;
