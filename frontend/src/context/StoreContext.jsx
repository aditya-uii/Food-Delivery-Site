import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  const loadCartData = async (token) =>{
    const response = await axios.post('http://localhost:4000/api/cart/getcart', {}, {
      headers: { authorization: `Bearer ${token}` }
    });
    
setCartItems(response.data.cartData);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    async function loadData() {
      await fetchFoodList();
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(localStorage.getItem('token'))
      }
    }

    loadData();
  }, []);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if(token){
      await axios.post('http://localhost:4000/api/cart/add',{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));
    if(token){
      await axios.post('http://localhost:4000/api/cart/remove',{itemId},{headers:{token}})
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        // Match string-to-string (MongoDB _id is a string)
        const itemInfo = food_list.find((product) => product._id === itemId);

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }

    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
