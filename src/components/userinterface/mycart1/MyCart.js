import Header from "../homepage/Header"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { serverURL, getData, postData } from "../../../services/FetchNodeAdminServices";
import { Divider, Button, Paper, Grid, TextField } from '@mui/material';
import ProductsScroll from '../homepage/ProductsScroll';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector, useDispatch } from 'react-redux';
import PlusMinusButton from "../homepage/PlusMinusButton";
import { useNavigate } from "react-router-dom";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Swal from "sweetalert2";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Drawer from '@mui/material/Drawer';
import Snackbar from '@mui/material/Snackbar';
import useRazorpay from "react-razorpay";
import { Subject } from "@mui/icons-material";

const steps = [
    'Your Cart',
    'Order Review',
    'Payment',
];



export default function MyCart() {

    var cartData = useSelector((state) => state.cart)
    var user = useSelector((state) => state.user)
 
    var userData = Object.values(user)
    console.log("USEEEEEER DATTTTTTA:",userData)
    var data = Object.values(cartData)
    var keys = Object.keys(cartData)
    var dispatch = useDispatch()
    var navigate = useNavigate()

var totalamount = data.reduce((f, s) => {
        var ap = 0
        if (s.offerprice > 0) {
            ap = s.offerprice * s.qty
        }
        else {
            ap = s.price * s.qty
        }
        return f + ap
    }, 0)

    
var totalamount1 = data.reduce((f, s) => {
    var ap = 0
        ap = s.price * s.qty

    return f + ap
}, 0)

    var totalmrp = data.reduce((f, s) => {
        var ap = 0

        ap = s.price * s.qty
        return f + ap
    }, 0)


    

    var discount = data.reduce((f, s) => {
        var ap = 0
        if (s.offerprice > 0) {
            ap = (s.price - s.offerprice) * s.qty
        }
        return f + ap
    }, 0)


    /***************************States********************/

    const [userId, setUserId] = useState('')
    const [pinCode, setPinCode] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [floorNo, setFloorNo] = useState('')
    const [towerNo, setTowerNo] = useState('')
    const [building, setBuilding] = useState('')
    const [address, setAddress] = useState('')
    const [landmark, setLandmark] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [btnTxt, setBtnTxt] = useState('Place Order')
    const [refresh, setRefresh] = useState(true)
    const [open, setOpen] = useState(false)

  
    

   
  /*************************react-razorpay-content ***************/
  const handlePayment= async()=> {
    const options = {
   key: "rzp_test_GQ6XaPC6gMPNwH",
   amount: (totalamount1-discount)*100,
   currency: "INR",
   name: "QuickComm",
   description: "Test Transaction",
   image: `${serverURL}/images/logo.png`,
 
   handler: async (res) => {
     console.log(res);
    
     dispatch({type:'CLEAR_CART',payload:[]})
     await postData('sms/send_mail',{to:userData[0]?.emailaddress,subject:'Your Cart',message:'<h1>Bill</h1>'})
     navigate("/homepage")
     

   },
   prefill: {
     name: userData[0]?.fullname,
     email: userData[0]?.emailaddress,
     contact: userData[0]?.mobileno,
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


/***************************************************/



    const handleSubmitAddress = async () => {
        var body = { userid: userData[0].userid, pincode: pinCode, houseno: houseNo, floorno: floorNo, towerno: towerNo, building: building, address: address, landmark: landmark, city: city, state: state }
        var response = await postData('userInterface/submit_user_address', body)
        if (response.status) {
            // var {userid , ...remainingData}=userData[0]
            var userDataWithAddress = { ...userData[0], ...body }
            dispatch({ type: "ADD_USER", payload: [userData[0]?.userid, userDataWithAddress] })

            Swal.fire({
                icon: "success",
                text: response.message,
                showConfirmButton: false,
                timer: 1500,
                toast: false
            });
            setBtnTxt("Make Payment")
            setRefresh(!refresh)
            navigate('/mycart')
        }
        else {
            Swal.fire({

                icon: "success",
                text: response.message,
                showConfirmButton: false,
                timer: 1500,
                toast: false
            });
        }
            setOpen(false)
    }


    const addressView = () => {
        return (
            <div>
                <Paper style={{ width: 380, height: 650, borderRadius: 15, justifySelf: 'right' }}>
                    <div style={{ marginLeft: 25 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ marginTop: 30, fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: 0.15, lineHeight: 1 }}>
                                Add Address
                            </div>
                            <div>
                                <img src={'/cross.png'} style={{ width: 15, height: 15, marginTop: 30, marginRight: 20 }} />
                            </div>
                        </div>
                        <div style={{ marginTop: 30, fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 900, fontSize: 14, letterSpacing: 0.15, lineHeight: 1 }}>
                            Address Details
                        </div>

                        <div style={{ marginTop: 15, display: "flex" }}>
                            <MyLocationIcon style={{ fontSize: 20, color: '#0078ad' }} />
                            <div style={{ color: '#0078ad', fontWeight: 500, fontSize: 13.5, letterSpacing: 0.25, lineHeight: 1.4285714286 }}>
                                Use Current Location
                            </div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 11.5, letterSpacing: 0.07, lineHeight: 1.4285714286, color: 'rgba(0, 0, 0, .65)', overflow: "hidden", textOverflow: 'ellipsis', display: "-webkit-box", webkitLineClamp: "1", webkitBoxOrient: "vertical", marginLeft: 20 }}>
                            Using GPS
                        </div>
                        <Grid container spacing={1}>
                            <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                                <TextField onChange={(e) => setPinCode(e.target.value)} label="Pin Code" variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={6} style={{ marginTop: 5, width: '45%' }} >
                                <TextField onChange={(e) => setHouseNo(e.target.value)} label="House No." variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={6} style={{ marginTop: 5, width: '45%' }} >
                                <TextField onChange={(e) => setFloorNo(e.target.value)} label="Floor No." variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                                <TextField onChange={(e) => setTowerNo(e.target.value)} label="Tower No." variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                                <TextField onChange={(e) => setBuilding(e.target.value)} label="Building / Apartment Name" variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                                <TextField onChange={(e) => setAddress(e.target.value)} label="Address" variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                                <TextField onChange={(e) => setLandmark(e.target.value)} label="Landmark / Area" variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                                <TextField onChange={(e) => setCity(e.target.value)} label="City" variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={12} style={{ width: '90%', marginTop: 5 }} >
                                <TextField onChange={(e) => setState(e.target.value)} label="State" variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={handleSubmitAddress} style={{ borderRadius: 25, height: 53, marginTop: 10, color: '#fff', background: '#0078ad', fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: -0.07, lineHeight: 1.4285714286, width: '95%' }} fullWidth>Save and Proceed</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
                <Paper style={{ width: 380, height: 250, borderRadius: 15, justifySelf: 'right', marginTop: 40 }}>
                    <div>
                        <div style={{ padding: 25, fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 900, fontSize: 14, letterSpacing: 0.15, lineHeight: 1 }}>
                            Delivery Contact Details
                        </div>
                        <div style={{ fontWeight: 500, fontSize: 11.5, letterSpacing: 0.15, lineHeight: 1.4285714286, color: 'rgba(0, 0, 0, .65)', webkitLineClamp: "1", webkitBoxOrient: "vertical", marginTop: 15, marginLeft: 20 }}>
                            This mobile number will receive an OTP, required for collecting the order.
                        </div>
                        <Grid container spacing={1}>
                            <Grid item xs={12} style={{ width: '90%', marginTop: 5, marginLeft: 20 }} >
                                <TextField label="Receiver's Name" variant="standard" fullWidth />
                            </Grid>
                            <Grid item xs={12} style={{ width: '90%', marginTop: 5, marginLeft: 20 }} >
                                <TextField label="Receiver's Number" variant="standard" fullWidth />
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
                <Paper style={{ width: 380, height: 250, borderRadius: 15, justifySelf: 'right', marginTop: 40 }}>
                    <div style={{ padding: 25, fontFamily: 'JioType, helvetica, arial, sans-serif', fontWeight: 900, fontSize: 15, letterSpacing: 0.15, lineHeight: 1 }}>
                        Save as
                    </div>
                    <div style={{ display: 'flex', marginLeft: 20, justifyContent: 'space-evenly' }}>
                        <div style={{ cursor: 'pointer', width: 70, height: 28, border: '1px solid #ddd', display: 'flex', justifyContent: 'center', borderRadius: 15, padding: 3, color: '#0078ad', marginTop: 2, fontWeight: 500, fontSize: 15, letterSpacing: 0.25, lineHeight: 1.4285714286, alignItems: 'center' }}>
                            Home
                        </div>
                        <div style={{ cursor: 'pointer', width: 70, height: 28, border: '1px solid #ddd', display: 'flex', justifyContent: 'center', borderRadius: 15, padding: 3, color: '#0078ad', marginTop: 2, fontWeight: 500, fontSize: 15, letterSpacing: 0.25, lineHeight: 1.4285714286, alignItems: 'center' }}>
                            Work
                        </div>
                        <div style={{ cursor: 'pointer', width: 70, height: 28, border: '1px solid #ddd', display: 'flex', justifyContent: 'center', borderRadius: 15, padding: 3, color: '#0078ad', marginTop: 2, fontWeight: 500, fontSize: 15, letterSpacing: 0.25, lineHeight: 1.4285714286, alignItems: 'center' }}>
                            Other
                        </div>
                    </div>
                    <div style={{ marginTop: 10, marginLeft: 25, width: '90%' }}>
                        <TextField label="Add New Address Type" variant="standard" placeholder="Eg: Club House, Kumar's Home" fullWidth />
                    </div>
                </Paper></div>)

    }

    const [popularProducts, setPopularProducts] = useState([]);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    const md_matches = useMediaQuery(theme.breakpoints.up("md"));
    const [overState, setOverState] = useState('#b5b5b5')


    const handleClose = (bool) => {
        setOpen(bool)
    }

const handlePlaceOrder = async () => {
    if(btnTxt=="Make Payment")
        { 
            handlePayment() 
         }
     else{

        if (userData.length == 0) {
            navigate('/signin')
        }
        else {
            var response = await postData('userInterface/check_user_address', { userid: userData[0]?.userid })
            if (response.status) {
                var userDataWithAddress = { ...userData[0], ...response?.data[0] }
                dispatch({ type: "ADD_USER", payload: [userData[0]?.userid, userDataWithAddress] })
                setBtnTxt("Make Payment")
            }
            else {
                setOpen(true)
            }
        }
    }
    }



    const showAddress = () => {

        return (<div style={{ marginLeft: 105, marginTop: 10, fontWeight: 400, textTransform: 'none', fontSize: '1rem', letterSpacing: -.72, lineHeight: 1.166666666,border:'0.5px solid #e2e2e2', borderRadius:20,padding:20,width:'30%'}}>
            <div style={{fontWeight:'bold',fontSize:18,marginBottom:5}}>Delivery Address</div>
            <div style={{fontWeight:500,fontSize:16,marginBottom:2}}>{userData[0].firstname} {userData[0].lastname}</div>
            <div>{userData[0].address}</div>
            <div>{userData[0].building}</div><div>{userData[0].towerno}</div><div>{userData[0].floorno}</div>
            <div>House No: {userData[0].houseno}</div>
            <div>{userData[0].state}</div><div>{userData[0].city}</div><div>{userData[0].pincode}</div>
        </div>)

    }


    const handleChange = (value, item) => {

        if (value == 0) {
            dispatch({ type: "DELETE_CART", payload: [item.productdetailid] })
        }
        else {
            item['qty'] = value

            dispatch({ type: "ADD_CART", payload: [item.productdetailid, item] })
        }
        setRefresh(!refresh)
    }


    const showImages = () => {

        return data.map((item) => {

            var op = parseInt(((item.price - item.offerprice) / item.price) * 100)
            return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginLeft: 20, marginTop: 20, alignSelf: 'flex-start', height: matches ? 180 : 80 }}>
                        <img src={`${serverURL}/images/${item.picture}`} style={{ width: md_matches ? 100 : matches ? '60%' : '50%', borderRadius: 15 }} />
                    </div>

                    <div style={{ height: 115, width: 400, marginLeft: 20 }}>
                        <div style={{
                            marginTop: 15,
                            fontWeight: 500,
                            fontSize: 14,
                            letterSpacing: -0.07,
                            lineHeight: 1.4285714286,
                            width: '70%',
                            overflow: "hidden",
                            textOverflow: 'ellipsis',
                            display: "-webkit-box",
                            webkitLineClamp: matches ? "2" : "1",
                            webkitBoxOrient: "vertical",
                        }}>

                            {item.productdetailname}
                        </div>

                        <div style={{ marginLeft: -10, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <img src={`${serverURL}/images/smart.jpg`} width="100" />
                        </div>

                        <div style={{
                            fontWeight: 500,
                            fontSize: 14,
                            letterSpacing: -0.07,
                            lineHeight: 1.4285714286,
                        }}>

                            {item.weight} {item.weighttype}
                        </div>
                        {item.offerprice > 0 ? <div style={{ marginTop: 7, display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                fontWeight: 700,
                                fontSize: 14,
                                letterSpacing: -0.07,
                                lineHeight: 1.4285714286,
                            }}>
                                <span>&#8377;</span> {item.offerprice * item.qty}
                            </div>

                            <div style={{
                                fontWeight: 500,
                                fontSize: 14,
                                letterSpacing: -0.07,
                                lineHeight: 1.4285714286,
                                color: 'grey'
                            }}>

                                <div style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}><s><span>&#8377;{item.price * item.qty}</span></s><span style={{ margin: 5, width: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 2, background: '#e5f7ee', color: '#03753c' }}>{op}% OFF</span></div>
                            </div>

                        </div> : <div>
                            <div style={{
                                marginTop: 7,
                                fontWeight: 700,
                                fontSize: 14,
                                letterSpacing: -0.07,
                                lineHeight: 1.4285714286,

                            }}>

                                <span>&#8377;</span> {item.price * item.qty}
                            </div>
                            <div style={{ lineHeight: 1.6285714286, }}>&nbsp;</div>
                        </div>

                        }
                    </div>
                    <div style={{ marginTop: 80, marginLeft: 40, width: '25%' }}>
                        <PlusMinusButton qty={keys.includes(item?.productdetailid + "") ? item?.qty : 0} onChange={(value) => handleChange(value, item)} />
                    </div>
                </div>
            )
        })
    }



    const fatchAllProductDetails = async (productstatus) => {
        var result = await postData('userInterface/display_all_productdetail_by_status', { productstatus })
        setPopularProducts(result.data)
    }


    useEffect(function () {
        fatchAllProductDetails('Popular');
    }, [])



    return (<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

        <div>
            <Header />
        </div>

        <div>
            {userData?.length > 0 ? <div>{showAddress()}</div> : <div></div>}
        </div>

        <div style={{ marginLeft: 105, marginTop: 35, fontWeight: 900, textTransform: 'none', fontSize: '1.5rem', letterSpacing: -.72, lineHeight: 1.166666666 }}>
            My Cart
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', }}>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                <div style={{ display: 'inline-block', marginLeft: 100, marginTop: 10, borderRadius: 24, border: '1px solid #e0e0e0', width: 700, height: 'auto' }}>
                    <div style={{ marginLeft: 25, marginTop: 20, alignItems: 'center', display: 'flex', width: 650 }}>
                        <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: -.72, lineHeight: 1.166 }}>Scheduled Delivery Basket</span><span style={{ marginLeft: 10 }}>({keys.length})</span><span style={{ marginLeft: 'auto', fontWeight: 700, fontSize: 18, letterSpacing: -.72, lineHeight: 1.166 }}>&nbsp;&#8377; {totalamount}</span>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        {showImages()}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', }}>
                <div style={{ marginTop: 5, borderRadius: 24, backgroundColor: '#C5DEB8', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 400, height: 100, marginLeft: 20 }}>
                    <Box sx={{ width: '100%', height: 50 }}>
                        <Stepper activeStep={0} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8, marginLeft: 200, borderRadius: 24, border: '1px solid #e0e0e0', display: 'flex', justifyContent: 'flex-start', width: 370, height: 120, marginLeft: 20, marginTop: 15, padding: 15 }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}><img src="/bank.jpg" style={{ marginRight: 8, display: 'block', width: 24, height: 24 }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontWeight: 700, fontStyle: 'calibari', fontSize: 14, letterSpacing: -0.07, lineHeight: 1.4, }}>Apply Coupon </div>
                            <div style={{ width: 250, fontWeight: 500, fontStyle: 'calibari', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: -0.08, lineHeight: 1.5, color: 'rgba(0, 0, 0, .65)' }}>
                                Login to see best offers & promotions  </div>
                        </div>
                        <div style={{ alignSelf: 'flex-end', marginLeft: 50 }}><ArrowForwardIosIcon style={{ blockSize: '1rem', stroke: '#0c5273', strokeWidth: 2.5, color: '#0c5273' }} /></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 24, border: '1px solid #e0e0e0', width: 300, height: 20, marginLeft: 20, marginTop: 15, padding: 15, fontSize: '1rem', fontWeight: 900, color: '#0c5273' }}>Log-in</div>
                </div>


                <Box style={{ position: 'relative', padding: 16, borderRadius: 24, border: '1px solid #e0e0e0', overflow: 'hidden', marginLeft: 21, marginTop: 40 }}>

                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', clear: 'both', paddingLeft: 5, fontWeight: 800, fontSize: '1rem', letterSpacing: -0.48, lineHeight: 1.25, color: '#141414', webkitFontSmoothing: 'antialiased' }}>
                        Payment Details</div>

                    <div style={{ paddingLeft: 8, marginTop: 12, fontWeight: 500, fontSize: 17, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', justifyContent: 'space-between', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                        <div>MRP Total</div>
                        <div style={{ color: '#141414', fontWeight: 700 }}>&#8377; {totalmrp.toFixed(2)}</div>
                    </div>

                    <Divider style={{ width: '100%', marginTop: 10, marginBottom: 10 }} />

                    <div style={{ paddingLeft: 8, marginTop: 12, fontWeight: 500, fontSize: 17, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', justifyContent: 'space-between', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                        <div>Product Discount</div>
                        <div style={{ color: 'green', fontSize: 17, fontWeight: 700 }}>&#8377; {discount.toFixed(2)}</div>
                    </div>

                    <Divider style={{ width: '100%', marginTop: 10, marginBottom: 10 }} />

                    <div style={{ paddingLeft: 8, marginTop: 12, fontWeight: 500, fontSize: 17, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', justifyContent: 'space-between', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                        <div style={{ width: 200 }}>Delivery Fee (Scheduled Delivery)</div>
                        <div style={{ color: 'green', fontSize: 17, fontWeight: 700 }}>FREE</div>
                    </div>

                    <Divider style={{ width: '100%', marginTop: 10, marginBottom: 10 }} />

                    <div style={{ paddingLeft: 8, marginTop: 12, fontWeight: 500, fontSize: 17, letterSpacing: -0.07, lineHeight: 1.4285714286, display: 'flex', justifyContent: 'space-between', color: 'rgba(0, 0, 0, .65)', cursor: 'pointer', position: 'relative' }}>
                        <div>Total</div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <div style={{ color: '#141414', fontWeight: 700, display: 'flex', justifyContent: 'flex-end' }}>&#8377; {(totalmrp - discount).toFixed(2)}</div>
                            <div style={{ color: 'green', fontWeight: 700 }}>You Saved &#8377; {discount.toFixed(2)}</div>
                        </div>
                    </div>
                </Box>

                <Button style={{ marginLeft: 22, cursor: 'pointer', marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 400, height: 50, border: `0.7px solid #b5b5b5`, color: '#fff', background: '#2e86de', fontSize: 16, fontWeight: 'bold', borderRadius: 25 }} onClick={handlePlaceOrder} fullWidth>
                    {btnTxt}
                </Button>

            </div>
        </div>



        <div style={{ backgroundColor: '#f5f6fa', borderRadius: 40, border: '1px #f5f6fa', marginBottom: 8, marginLeft: 100, width: '83%', height: 1, marginTop: 30 }}>
            <Divider />
        </div>

        <div style={{ width: '82%', alignSelf: 'center', marginTop: 40, marginBottom: 20 }}>
            <ProductsScroll title={<div style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: -0.48, lineHeight: 1.25 }}>Top Deals</div>} data={popularProducts} />
        </div>

        <Drawer anchor={'right'} open={open} onClose={() => handleClose(false)}>
            {addressView()}
        </Drawer>


    </div>)
}