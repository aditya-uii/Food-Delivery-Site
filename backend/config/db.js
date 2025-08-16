import mongoose from "mongoose";

export const connectDb = async () => {
    await mongoose.connect('mongodb+srv://foodSite:foodSite123@cluster0.s8ev5.mongodb.net/foodSite')
      .then(() => {
        console.log(`DB connected`);
      })
      .catch((error) => {
        console.error(`Error connecting to DB: ${error.message}`);
      });
  };
  