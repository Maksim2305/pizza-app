import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import { Layout } from './layouts/Menu/Menu';
import Error from './components/Error/Error';
import Product from './components/Product/Product';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/product',
        element: <Menu />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '*',
        element: <Error />
      }
    ]
  }
 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
