import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
// import NotFound from './pages/NotFound';
import HomePage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx';
import AddProduce from './pages/AddProduce.jsx';
import NewBatch from './pages/NewBatch.jsx';
import FindLocal from './pages/findLocal.jsx';

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
        element: <NewBatch />
      },
      {
        path: '/findlocal',
        element: <FindLocal />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
