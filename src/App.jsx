
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Orders from './Components/Orders/Orders';
import Brands from './Components/Brands/Brands';
import Notfound from './Components/Notfound/Notfound';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import CounterContextProvider from './Context/CounterContext';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AuthProtectedRoute from './Components/AuthProtectedRoute/AuthProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import CartCountContextProvider from './Context/CartCountContext';
import UserAddress from './Components/UserAddress/UserAddress';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools }  from './../node_modules/react-query/es/devtools/devtools';
import Wishlist from './Components/WishList/WishList';


export default function App() {
  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'login', element: <AuthProtectedRoute><Login /></AuthProtectedRoute> },
        { path: 'register', element: <AuthProtectedRoute><Register /> </AuthProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Orders /> </ProtectedRoute> },
        { path: 'address/:cartId', element: <ProtectedRoute><UserAddress /> </ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'wishList', element: <ProtectedRoute><Wishlist/></ProtectedRoute> },
        { path: '*', element: <Notfound /> }
      ]
    }
  ])

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <CartCountContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <ToastContainer />
              {/* <ReactQueryDevtools /> */}
            </CartCountContextProvider>
          </CounterContextProvider>
        </AuthContextProvider>  
      </QueryClientProvider>
    </>
  )
}
