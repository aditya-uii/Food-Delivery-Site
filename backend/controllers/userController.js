import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

//Login user
const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({success:false,message:'Please provide email and password'});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:'Please provide a valid email'});
        }
        
        

        const user = await userModel.findOne({email});
        
        if(!user){
            return res.status(401).json({success:false,message:'Invalid email or password'});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({success:false,message:'Invalid email or password'});
        }

        const token =  jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});
        console.log(token);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });
        

    }
    catch(error){
        console.error('Error logging in:', error.message);
        return res.status(500).json({success:false,message:'Failed to login. Please try again.'});
    }

}


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Register user

const registerUser = async (req, res) => {

    const{name,password,email} = req.body;
    try {
        //checking is user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        
        //checking if the user provided a valid info
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:'Please provide name, email and password'});
        }

        //validating email
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:'Please provide a valid email'});
        }
        //validating password   
        // if(!validator.isStrongPassword(password)){
        //     return res.status(400).json({success:false,message:'Please provide a strong password'});
        // }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating user
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        });

        const user = await newUser.save();
       const token = createToken(user._id);
        res.json({success:true,token})
        
    } catch (error) {
        console.error('Error registering user:', error.message);
        return res.status(500).json({success:false,message:'Failed to register. Please try again.'});
        
    }
}

export { loginUser, registerUser };