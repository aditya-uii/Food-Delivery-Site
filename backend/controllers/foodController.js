import foodModel from "../models/foodModel.js";

// addFood item
const addFood = async (req, res) => {
  const image_filename = req.file ? req.file.filename : null;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename 
  });

  try {
    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.error('Error adding food:', error.message);
    res.status(500).json({ success: false, message: 'Failed to add food. Please try again.' });
  }
};

//show list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({success:true ,data:foods});
  } catch (error) {
    console.error('Error getting food:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get food. Please try again.' });
  }
};

//remover  item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: 'Food not found' });
    }
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food removed' });
  } catch (error) {
    console.error('Error removing food:', error.message);
    res.status(500).json({ success: false, message: 'Failed to remove food. Please try again.' });
  }
};



export { addFood,listFood ,removeFood};
