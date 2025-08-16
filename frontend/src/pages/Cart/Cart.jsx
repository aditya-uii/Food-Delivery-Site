import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalAmount } = useContext(StoreContext);

const navigate = useNavigate();


  return (
    <div className="cart mt-[100px]">
      <div className="cart-items">
        <div className="cart-items-title grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-400 text-[max(1vw,12px)] gap-4">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list?.length > 0 ? (
          food_list.map((item) => {
            if ((cartItems[item._id] ?? 0) > 0) {
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-4 p-2 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })
        ) : (
          <p className="text-center text-gray-500 mt-5">
            No items in the cart.
          </p>
        )}
      </div>

<div className="cart-bottom mt-[80px] flex justify-between gap-[max(12vw,20px)]">
<div className="cart-total flex-1 flex flex-col gap-5">
  <h2>Cart Total</h2>
  <div className="cart-total-details flex justify-between text-[#555]">
<p>Subtotal</p>
<p>${getTotalAmount()}</p>
  </div>
<hr className="mt-5"/>

  <div className="cart-total-details flex justify-between text-[#555]">
<p>Delivery Fee</p>
<p>${getTotalAmount()===0?0:2}</p>
  </div>
<hr  className="mt-5"/>

  <div className="cart-total-details flex justify-between text-[#555]">
<p>Total</p>
<p>${getTotalAmount()===0?0:getTotalAmount() + 2}</p>
  </div>
<button className="uppercase border-none text-white bg-red-500 w-[max(15vw,200px)] py-[12px] rounded-[4px] cursor-pointer"
onClick={()=>navigate('/order')}
>Proceed to payment</button>
</div>


<div className="cart-promocode flex-1">
  <div>
    <p className="text-[#555]">If u have a promocode ,enter it here</p>
    <div className="cart-promo-input border-2 mt-3 flex justify-between items-center bg-[#eaeaea] rounded-[4px]">
      <input type="text" placeholder="Your PromoCode" className="bg-transparent border-none outline-none pl-3"/>
      <button className="w-[max(10vw,150px)] py-3 px-1 border-none text-white rounded-[4px] bg-black">Submit</button>
    </div>
  </div>
</div>
</div>


    </div>
  );
};

export default Cart;
