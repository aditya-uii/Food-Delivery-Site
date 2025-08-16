import {assets} from '../assets/assets'

const Navbar = () => {
  return (
  <div className="navbar flex justify-between items-center pt-[8px] px-[6%]">
    <img src={assets.logo} alt=""  className='logo w-[max(10%,80px)]'/>
    <img src={assets.profile_image} alt=""  className='profile w-10'/>
  </div>
  )
}

export default Navbar