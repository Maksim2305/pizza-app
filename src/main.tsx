import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
// import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import { Layout } from './layouts/Menu/Menu';
import Error from './components/Error/Error';
import Product from './pages/Product/Product';
import axios from 'axios';
import { PREFIX } from './helpers/API';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AuthLayout from './layouts/Auth/AuthLayout';
import { RequireAuth } from './helpers/RequireAuth';
import {  Provider} from 'react-redux';
import { store } from './store/store';
import { Success } from './pages/Success/Success';

const Menu = lazy(()=> import('./pages/Menu/Menu'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: '/',
        element: <Suspense fallback={'Загрузка...'}><Menu /></Suspense>
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/success',
        element: 
        <RequireAuth> <Success /> </RequireAuth>
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>Ошибка!</>,
        loader: async ({ params })=> {
          return defer({ 
            data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
          });
        }
      },
      {
        path: '*',
        element: <Error />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>
      <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>
);
