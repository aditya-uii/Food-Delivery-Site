
import  { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItems from "../FoodItems/FoodItems";

const FoodDisplay = ({ category }) => {
  // Access the food_list from the StoreContext
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display mt-8" id="food-display">
      <h2 className="text-[max(2vw,24px)] font-semibold">Top dishes near you</h2>
      <div className="food-display-list grid grid-cols-auto-fill-240 mt-8 gap-7 row-gap-[50px]">
        {food_list.map((item) => {
          if(category==='All' || category ===item.category){

          return  <FoodItems
              key={item._id} // Use a unique identifier for the key
              id={item._id}   // Ensure you're using the correct property for id
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          }
})}
      </div>
    </div>
  );
};

export default FoodDisplay;
