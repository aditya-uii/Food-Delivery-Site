import { useContext} from "react"
import { assets } from "../../assets/frontend_assets/assets"
import { StoreContext } from "../../context/StoreContext";
// import { useEffect } from "react";


const FoodItems = ({id,name,price,description,image}) => {
    
  
    const{cartItems,addToCart,removeFromCart} = useContext(StoreContext)

  return (
    <div className="food-item w-full m-auto rounded-2xl shadow-custom transition-all">

<div className="food-item-img-container relative">
    <img src={image} alt="" className="food-item-image w-full rounded-custom"
    />
{!cartItems[id] ? (
  <img
    src={assets.add_icon_white}
    alt="Add Icon"
    className="add w-[35px] absolute bottom-4 right-4 cursor-pointer rounded-[50%]"
    onClick={() => addToCart(id)}
  />
) : (
  <div className="food-item-counter absolute bottom-4 right-4 items-center flex gap-2 p-2 rounded-3xl bg-white">
 <img src={assets.remove_icon_red} alt="" onClick={()=>removeFromCart(id)} />
 <p>{cartItems[id]}</p>
 <img src={assets.add_icon_green} alt="" onClick={()=>addToCart(id)}/>
  </div>
)}

</div>
<div className="food-item-info p-5">
    <div className="food-item-name-rating flex justify-between items-center mb-5">
        <p>{name}</p>
        <img src={assets.rating_starts} alt="" />
    </div>
    <p className="food-item-desc">{description}</p>
    <p className="food-item-price">${price}</p>
</div>
    </div>
  )
}

export default FoodItems