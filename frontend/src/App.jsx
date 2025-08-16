// import React from 'react'
import Navbar from './components/Navabr/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'

const App = () => {

  const[showLogin,setShowLogin] = useState(false);

  return (
    <>
  {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
    <div className='app w-[80%] m-auto'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/cart' element={<Cart/>}></Route>
<Route path='/order' element={<PlaceOrder/>}></Route>
      </Routes>
    </div>
      <Footer/>
      </>
  )
}

export default App;