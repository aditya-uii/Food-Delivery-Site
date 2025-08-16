import { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2,
    };
  
    try {
      const res = await axios.post(
        'http://localhost:4000/api/order/place',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.data.success) {
        const { sessionUrl } = res.data;
        window.location.replace(sessionUrl);
        
      } else {
        alert('Error');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an issue with your order.');
    }
  };
  


  return (
    <form onSubmit={placeOrder}>
      <div className="place-order flex items-start justify-between gap-[50px] mt-[100px]">
        <div className="place-order-left w-full max-w-[30%,500px]">
          <p className="title text-[30px] font-semibold mb-[50px]">Delivery Information</p>
          <div className="multi-fields flex gap-3">
            <input
            required
              type="text"
              name="firstName"
              value={data.firstName}
              placeholder="First name"
              onChange={onChangeHandler}
              className="mb-4 w-full p-3 border-1 border-gray-500 rounded-[4px] outline-dashed"
            />
            <input
              required
              type="text"
              name="lastName"
              value={data.lastName}
              placeholder="Last name"
              onChange={onChangeHandler}
              className="mb-4 w-full p-3 border-1 border-gray-500 rounded-[4px] outline-dashed"
            />
          </div>
          <input
            required
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={onChangeHandler}
            className="mb-4 w-full p-3 border-1 border-gray-500 rounded-[4px] outline-dashed"
          />
          <input
            required
            type="text"
            name="street"
            value={data.street}
            placeholder="Street"
            onChange={onChangeHandler}
            className="mb-4 w-full p-3 border-1 border-gray-500 rounded-[4px] outline-dashed"
          />
          <div className="multi-fields flex gap-3">
            <input
              required
              type="text"
              name="city"
              value={data.city}
              placeholder="City"
              onChange={onChangeHandler}
              className="mb-4 w-full p-3 border-1 border-gray-500 rounded-[4px] outline-dashed"
            />
            <input
              required
              type="text"
              name="state"
              value={data.state}
              placeholder="State"
              onChange={onChangeHandler}
              className="mb-4 w-full p-3 border-1 border-gray-500 rounded-[4px] outline-dashed"
            />
          </div>
          <div className="multi-fields flex gap-3">
            <input
              required
              type="text"
              name="zipcode"
              value={data.zipcode}
              placeholder="Zip code"
              onChange={onChangeHandler}
              className="mb-4 w-full p-3 border-1 border-gray-500 rounded-[4px] outline-dashed"
            />
            <input
              required
              type="text"
              name="country"
              value={data.country}
              placeholder="Country"
              onChange={onChangeHandler}
              className="mb-4 w-full p-3 border-1 border-gray-500 rounded-[4px] outline-dashed"
            />
          </div>
          <input
            required
            type="text"
            name="phone"
            value={data.phone}
            placeholder="Phone"
            onChange={onChangeHandler}
            className="mb-4 w-full p-3 border-1 border-gray-500 rounded-[4px] outline-dashed"
          />
        </div>

        <div className="place-order-right w-full max-w-[40%,500px]">
          <div className="cart-total flex-1 flex flex-col gap-5">
            <h2>Cart Total</h2>
            <div className="cart-total-details flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr className="mt-5" />

            <div className="cart-total-details flex justify-between text-[#555]">
              <p>Delivery Fee</p>
              <p>${getTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className="mt-5" />

            <div className="cart-total-details flex justify-between text-[#555]">
              <p>Total</p>
              <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
            </div>
            <button type='submit' className="uppercase border-none text-white bg-red-500 w-[max(15vw,200px)] py-[12px] rounded-[4px] cursor-pointer mt-[30px]">
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
