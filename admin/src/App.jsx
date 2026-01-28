import Navbar from "./components/Navbar"
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from "react-router-dom"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import { ToastContainer } from 'react-toastify';

const App = () => {

  const url = 'http://localhost:4000';


  return (
   <div>
    <ToastContainer/>
     <Navbar/>
     {/* <hr /> */}
     <div className="app-component flex">
      <Sidebar/>
      <Routes>
        <Route path="/add" element={<Add  url={url}/>} />
        <Route path="/list" element={<List  url={url}/>} />
        <Route path="/orders" element={<Orders url={url} />} />
      </Routes>
     </div>
   </div>
  )
}

export default App