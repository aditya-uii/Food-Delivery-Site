// import React from 'react'
import { menu_list } from '../../assets/frontend_assets/assets'

const Menu = ({category,setCategory}) => {
  return (

    <div className='explore-menu flex flex-col gap-5'>
<h1 className='text-[#262626] font-semibold'>Explore our menu</h1>

<p className='explore-menu-text max-w-[60%] columns-[#808080]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, animi tenetur natus voluptate ea quibusdam!</p>

<div className="explore-menu-list flex justify-between items-center gap-8 text-center my-[20px] overflow-x-scroll ">

  {menu_list.map((item,index)=>{
    return(
      <div key={index} className='explore-menu-list-item' onClick={()=>setCategory(prev=>prev===item.menu_name?'All':item.menu_name)}>
      <img 
  src={item.menu_image} 
  className={`w-[7.5vw] min-w-[80px] cursor-pointer rounded-6xl transition-0.2s ${category===item.menu_name? 'active' : ''}`} 
  alt="" 
/>

<p className='mt-[10px] text-[#747474] cursor-pointer'>{item.menu_name}</p>
      </div>
    )
  })}

</div>

<hr className='my-3 h-[2px] bg-[#e2e2e2] border-none'/>
    </div>
  )
}

export default Menu