import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const List = ({url}) => {
  // const url = 'http://localhost:4000';
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error in fetching data');
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

 const removeFood = async (id) => {  
    try{
      const response = await axios.post(`${url}/api/food/remove`, { id });
      if(response.data.success){
        toast.success('Food deleted successfully');
       await fetchList();
      }
    }
    catch(error){
      toast.error('Error deleting food');
    }
  }

  return (
    <div className="w-[80%] mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <p className="text-2xl font-bold text-gray-700 mb-6">All Foods List</p>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[0.5fr_3fr_1fr_1fr_0.5fr] gap-y-8 items-center bg-gray-200 py-4 px-4 text-gray-700 font-semibold rounded-t-lg">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_3fr_1fr_1fr_0.5fr] gap-y-10 items-center py-6 px-4 border-b border-gray-300 text-[14px] hover:bg-gray-50 transition"
          >
            <img src={`${url}/images/` + item.image} alt="food" className="w-14 h-14 object-cover rounded-md shadow-md" />
            <p className="text-gray-700">{item.name}</p>
            <p className="text-gray-500">{item.category}</p>
            <p className="text-green-600 font-semibold">${item.price}</p>
            <div className="flex gap-3">
              <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 transition">Edit</button>
              <button onClick={()=>{removeFood(item._id)}} className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
