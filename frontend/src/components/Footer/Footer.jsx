import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
<div className="footer text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 py-5 px-2 pt-[80px] mt-[100px]" id='footer'>
<div className="footer-content w-full grid  grid-cols-[2fr_1fr_1fr] gap-[80px]">

    <div className="footer-content-left flex flex-col items-start gap-5">
        <img src={assets.logo} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, dolore!</p>
        <div className="footer-social-icons flex gap-5 cursor-pointer">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
    </div>

    <div className="footer-content-center flex flex-col items-start gap-5">
<h2>COMPANY</h2>
<ul>
    <li>Home</li>
    <li>About us</li>
    <li>Delivery</li>
    <li>Privacy policy</li>
</ul>
    </div>

    <div className="footer-content-right flex flex-col items-start gap-5">
<h2>GET IN TOUCH</h2>
<ul>
    <li>+1-212-456-7890</li>
    <li>contact@tomato.com</li>
</ul>
    </div>
</div>
<hr />
<p className="footer-copyright">Copyright 2024 &copy; Tomato.com - All Right Reserved.</p>
</div>
  )
}

export default Footer