import { useContext, useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {getTotalAmount,token,setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = ()=>{
console.log('logout');
localStorage.removeItem('token');
setToken("");
navigate('/')
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar py-5 flex items-center justify-between mt-4 px-4 relative">
     <Link to='/'> <img src={assets.logo} alt="Logo" className="logo w-[150px]" /> </Link>

      {/* Mobile Menu Icon */}
      <div className="block lg:hidden">
        <FaBars className="text-2xl cursor-pointer" onClick={handleMenuToggle} />
      </div>

      {/* Navbar Items */}
      <ul className={`navbar-menu flex-col lg:flex-row gap-7 absolute lg:static lg:flex items-center ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <Link to ='/'
          className={`cursor-pointer ${menu === 'Home' ? 'active' : ''}`}
          onClick={() => {
            setMenu('Home');
            setIsMenuOpen(false); // Close menu on item click
          }}
        >
          Home
        </Link>
        <a href='#explore-menu'
          className={`cursor-pointer ${menu === 'Menu' ? 'active' : ''}`}
          onClick={() => {
            setMenu('Menu');
            setIsMenuOpen(false);
          }}
        >
          Menu
        </a>
        <Link to='/'
          className={`cursor-pointer ${menu === 'Mobile-app' ? 'active' : ''}`}
          onClick={() => {
            setMenu('Mobile-app');
            setIsMenuOpen(false);
          }}
        >
          Mobile-app
        </Link>
        <a href='#footer'
          className={`cursor-pointer ${menu === 'Contact-Us' ? 'active' : ''}`}
          onClick={() => {
            setMenu('Contact-Us');
            setIsMenuOpen(false);
          }}
        >
          Contact-Us
        </a>
      </ul>

      <div className="navbar-right flex items-center gap-10">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon relative">
         <Link to='/cart'> <img src={assets.basket_icon} alt="Basket" /> </Link>
          <div className={getTotalAmount() ===0?'': 'absolute min-w-2 min-h-2 bg-red-500 rounded-lg -top-2 -right-2'}></div>
        </div>
        {!token?
         <button className="bg-transparent text-2xl text-[#49557e] border-2 border-red-500 py-3 px-8 rounded-lg pointer" onClick={()=>setShowLogin(true)}>
         Sign In
       </button>
       :
       <div className='nav-profile group relative'>
       <img src={assets.profile_icon} alt="" className="cursor-pointer" />
       
       <ul className='absolute hidden right-0 z-10 w-20 group-hover:flex flex-col gap-5 py-3 px-4 bg-white border-2 border-red-500 rounded-lg shadow-lg list-none'>
         <li><img src={assets.bag_icon} alt="Bag" className='hover:cursor-pointer hover:text-red-600' /> <p className='hover:cursor-pointer hover:text-red-600'>Orders</p></li>
         <hr className="border-t" />
         <li onClick={logout}><img src={assets.logout_icon} alt="Logout" className='hover:cursor-pointer hover:text-red-600' /> <p className='hover:cursor-pointer hover:text-red-600'>LogOut</p></li>
       </ul>
     </div>
     
      }
       
      </div>
    </div>
  );
};

export default Navbar;
