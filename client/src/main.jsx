import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
// import NotFound from './pages/NotFound';
import HomePage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx';
import AddProduce from './pages/AddProduce.jsx';
import AdvertiseNew from './pages/AdvertiseNew.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />
      }, {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/addproduce',
        element: <AddProduce />
      },
      {
        path: '/advertisenew',
        element: <AdvertiseNew />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
