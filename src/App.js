import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import Footer from './Shared/Footer/Footer';
import About from './Pages/About/About';
import Servicedetail from './Pages/Home/Service/Servicedetail/Servicedetail';
import Header from './Shared/Header/Header';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import RequiredAuth from './Shared/RequiredAuth/RequiredAuth';
import Checkout from './Pages/Home/Service/Checkout/Checkout';
import AddService from './Pages/AddService/AddService';
import ManageService from './Pages/manageService/ManageService';
import Orders from './Pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<RequiredAuth>
          <About />
        </RequiredAuth>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/checkout/:id' element={<RequiredAuth>
          <Checkout />
        </RequiredAuth>}></Route>
        <Route path='/addservice' element={
          <RequiredAuth>
            <AddService />
          </RequiredAuth>
        }></Route>
        <Route path='/manage' element={
          <RequiredAuth>
            <ManageService />
          </RequiredAuth>
        }></Route>
        <Route path='/orders' element={
          <RequiredAuth>
            <Orders />
          </RequiredAuth>
        }></Route>
        <Route path='/service/:id' element={<Servicedetail />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
