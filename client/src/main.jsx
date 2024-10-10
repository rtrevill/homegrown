import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Matchup from './pages/Matchup';
import Vote from './pages/Vote';
import NotFound from './pages/NotFound';
import HomePage from './pages/Homepage.jsx';
import Login from './pages/Login.jsx'
import CreateUser from './pages/CreateUser.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />
      }, {
        path: '/matchup',
        element: <Matchup />
      }, {
        path: '/matchup/:id',
        element: <Vote />
      }, {
        path: '/login',
        element: <Login />
      },
      {
        path: '/newuser',
        element: <CreateUser />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
