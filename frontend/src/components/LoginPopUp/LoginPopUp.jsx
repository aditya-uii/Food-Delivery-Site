import { useContext, useState } from "react"
import { assets } from "../../assets/frontend_assets/assets"
import axios from "axios"
import { StoreContext } from "../../context/StoreContext"


const LoginPopUp = ({setShowLogin}) => {

  const {setToken} = useContext(StoreContext);

const [currentState,setCurrentState] = useState('Sign up');
const [fullName,setFullName] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');

const handleSubmit = async (e) =>{
e.preventDefault();
console.log('form submitted');


if(currentState === 'Sign Up'){
  const data = {
    name:fullName,
    email:email,
    password:password
}

try {
  const res = await axios.post('http://localhost:4000/api/user/register',data);
console.log(res.data);
if(res.data.success){
  // alert('User created successfully');
  setToken(res.data.token);
  setShowLogin(false);
}
} catch (error) {
  console.error('Error creating user:', error);
}

};

if(currentState === 'Login'){ 
  const data = {
    email:email,
    password:password
  }

  try {
    const response = await axios.post('http://localhost:4000/api/user/login',data);
    // console.log(response.data);
    if(response.data.success){
      // alert('Login successful');
      setShowLogin(false);
      setToken(response.data.token);
      localStorage.setItem('token',response.data.token);
      setShowLogin(false);
      // localStorage.setItem('user',JSON.stringify(response.data.user));
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
  
}



}


  return (
   <div className="login-popup absolute z-20 w-full h-full bg-[#00000090] grid">
    <form action="" onSubmit={(e) =>{
      handleSubmit(e)
    }} className="login-popup-container place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 py-7 px-8 rounded-[8px] text-[14px]">
      
      <div className="login-popup-title flex justify-between items-center text-black">
        <h2>{currentState}</h2>
        <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt="" className="w-4 cursor-pointer"/>
    </div>
    <div className="login-popup-inputs flex flex-col gap-5">
      {currentState==='Login'?<></>: <input value={fullName}  onChange={(e) => setFullName(e.target.value)}  type="text" placeholder="Your name" required/>}

      <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)}  placeholder="Your email" required className="outline-none border-[1px] p-5 rounded-[4px]"/>

      <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)}  placeholder="Password" required className="outline-none border-[1px] p-5 rounded-[4px]"/>
    </div>
    <button className="border-none p-5 rounded-[4px] text-white bg-orange-400 text-[15px] cursor-pointer">{currentState==='Sign Up'?'Create account':'Login'}</button>
    <div className="login-popup-condition flex items-start gap-4 mt-[-15px]">
      <input type="checkbox" required className="mt-1"/>
      <p>By continuing, i agree to the terms of use & privacy policy</p>
    </div>
    {currentState==='Login'
    ?
    <p >Create a new account? <span className="text-orange-400 font-bold cursor-pointer" onClick={()=>setCurrentState('Sign Up')}>Click here</span></p>
    :
    <p>Already have an account? <span className="text-orange-400 font-bold cursor-pointer" onClick={()=>setCurrentState('Login')}>Login here</span></p>
    }
       </form>
   </div>
  )
}

export default LoginPopUp;