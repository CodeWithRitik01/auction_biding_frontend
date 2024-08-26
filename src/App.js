import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import { lazy, Suspense, useEffect } from 'react';
import { getInitialStateAsync } from './redux/reducers/auction';
import { useDispatch } from 'react-redux';

const Navbar  = lazy(() => import('./Components/Navbar/navbar'))
const Login  = lazy(() => import('./Components/FormPage/loginForm'))
const AuctionForm  = lazy(() => import('./Components/AuctionForm/auctionForm'))
const AllUsers  = lazy(() => import('./Components/AllUsers/allUsers'))
const MyItems  = lazy(() => import('./Components/MyItems/myItems'))



function MainLayout(){
  return(
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

function HomePage(){
   return(
    <div>
      <Suspense>
        <Login />
      </Suspense>
    </div>
   )
}

function App() {

  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getInitialStateAsync());
},[])


  const router = createBrowserRouter([
    {
      path:'/',
      element: (
        <Suspense fallback={<div><h1>Loading...</h1></div>}>
          <MainLayout />
        </Suspense>
      ),
      children:[
        {path: '/', element: <HomePage />},
        {path: '/additem', element: <AuctionForm />},
        {path: '/allusers', element: <AllUsers />},
        {path: '/myitem', element:<MyItems />}
      ]
    }
  ])
  return (
    <div className="App">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
