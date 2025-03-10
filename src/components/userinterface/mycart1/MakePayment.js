import { useCallback,useEffect } from "react";
import useRazorpay from "react-razorpay";
import {serverURL} from "../../../services/FetchNodeAdminServices"
import { useSelector,useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function MakePayment() {
  const Razorpay = useRazorpay();
  const navigate=useNavigate()
  const dispatch=useDispatch()
  var cartData=useSelector((state)=>state.cart)
  var data =Object.values(cartData) 
  var keys =Object.keys(cartData) 
  var user=useSelector((state)=>state.user)
  var userdata=Object.values(user)[0]
  var total=data.reduce((f,s)=>{
   var ap=0
    if(s.offerprice>0)
   {
    ap=s.offerprice*s.qty
   }
   else
   {
    ap=s.price*s.qty
   }
   return f+ap
  },0)

  const handlePayment= async()=> {
       const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: total*1000,
      currency: "INR",
      name: "QuickComm",
      description: "Test Transaction",
      image: `${serverURL}/images/logo.png`,
    
      handler: (res) => {
        console.log(res);
       
        dispatch({type:'CLEAR_CART',payload:[]})
        navigate("/homepage")
        

      },
      prefill: {
        name: userdata?.fullname,
        email: userdata?.emailaddress,
        contact: userdata?.mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    await rzp1.open();
  }
useEffect(function(){
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);

},[])

  return (
    <div className="App">
     {handlePayment()}
    </div>
  );
}