import userModel from "../models/userModel.js";


//add to cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.user.id);

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const itemId = req.body.itemId;
        let cartData = userData.cartData;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.user.id, { cartData: cartData });

        res.json({ success: true, message: 'Item added to cart' });

    } catch (error) {
        console.error('Error adding to cart:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add to cart. Please try again.' });
    }
};


//remove from cart
const removeFormCart = async (req,res)=>{
try {
    const userData = await userModel.findById(req.user.id);
    const cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.user.id,{ cartData: cartData });
    res.json({ success: true, message: 'Item removed from cart' });
} catch (error) {
    console.error('Error removing from the cart:'.error.message);
    res.status(500).json({ success: false, message: 'Failed to remove from cart. Please try again.' });
}
};

//fetch user cart
const getCarts = async (req,res)=>{
try {
    const userData = await userModel.findById(req.user.id);
    const cartData =  userData.cartData;
    res.json({ success: true, cartData: cartData });
} catch (error) {
    console.error('Error fetching cart data:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch cart data. Please try again.' });
}
};


export { addToCart,removeFormCart,getCarts };