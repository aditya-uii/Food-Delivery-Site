import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
  // const url = 'http://localhost:4000';
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${url}/api/food/add`,
        formData
      );
      // console.log("Response:", response.data);
      if(response.data.success){
        // alert('Food Added');
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message)
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div
      className="add w-[70%] mt-[50px] text-[#6d6d6d] font-bold"
      style={{ marginLeft: "max(5vw, 25px)" }}
    >
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 bg-white p-6 shadow-lg rounded-lg"
      >
        {/* Upload Image Section */}
        <div className="add-img-upload flex flex-col items-center gap-2">
          <p className="text-lg">Upload Image</p>
          <label
            htmlFor="image"
            className="border-2 border-dashed border-gray-400 p-4 w-32 h-32 flex items-center justify-center cursor-pointer rounded-lg hover:bg-gray-100"
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
              className="w-16 h-16"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex flex-col gap-1">
          <p className="text-lg">Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="border rounded-lg p-2 outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex flex-col gap-1">
          <p className="text-lg">Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here..."
            className="border rounded-lg p-2 outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div className="add-category flex flex-col gap-1">
          <p className="text-lg">Category</p>
          <select
            onChange={onChangeHandler}
            name="category"
            className="border rounded-lg p-2 outline-none focus:ring focus:ring-blue-300"
          >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Desert">Desert</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>

        {/* Product Price */}
        <div className="add-price flex flex-col gap-1">
          <p className="text-lg">Product Price</p>
          <input
            onChange={onChangeHandler}
            value={data.price}
            type="number"
            name="price"
            placeholder="$20"
            className="border rounded-lg p-2 outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="add-btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
