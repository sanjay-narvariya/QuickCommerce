import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useState,useEffect } from 'react';
import { Box } from '@mui/material';
import { serverURL, postData } from "../../../services/FetchNodeAdminServices";
import AddToCart from './AddToCart';
import PlusMinusButton from '../homepage/PlusMinusButton';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Avatar, Divider, Grid, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRef } from "react";



export default function ProductImageComponent({refresh,setRefresh,product,setProduct}) {
 // alert(JSON.stringify(product.picture))

 const theme = useTheme();
 const navigate = useNavigate()
 const dispatch=useDispatch();
 const matches = useMediaQuery(theme.breakpoints.up("sm"));
 const md_matches = useMediaQuery(theme.breakpoints.up("md"));

 var cartData=useSelector((state)=>state.cart)
 var keys=Object.keys(cartData);

  const [index, setIndex] = useState(0)

  var scrollRef = useRef()
  var settings = {
    dots: false,
    infinite: true,
    spaceBetween: 24,
    // autoplay: true,
    // autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    // afterChange: () => setIndex(index + 1),
    beforeChange: (current, next) => setIndex(next)
  };

  const [productImages,setProductImages]=useState([])
  const [selectedImages,setSelectedImages]=useState(product.picture)

  const fatchAllImages= async()=>{
       var response=await postData('userinterface/user_display_product_pictures',{productdetailid:product?.productdetailid})
       // alert(JSON.stringify(response?.data))
       setProductImages(response?.data[0]?.filenames?.split(","))
  }

useEffect(()=>{
  setSelectedImages(product.picture)
   fatchAllImages()
 },[product])


const handleImage=(item)=>{
        setSelectedImages(item)
   }


  const showImage = () => {
    return productImages.map((item, i) => {
      return <div>
        <img onClick={()=>handleImage(item)} src={`${serverURL}/images/${item}`} style={{ width: '60%', borderRadius: 20, border: '1px solid #e0e0e0', padding: 6, }} />
      </div>
    })
  }


  const handleNext = () => {
    scrollRef.current.slickNext()

  }

  const handlePrev = () => {
    scrollRef.current.slickPrev()
  }
  
const handleChange=(value,item)=>{
    // alert(value)   
    if(value==0)
    {
     dispatch({type:"DELETE_CART",payload:[item.productdetailid]})
    }
    else
    {
    item['qty']=value
    dispatch({type:"ADD_CART",payload:[item.productdetailid,item]})
    }
     setRefresh(!refresh)
}


  const showImages = () => {

    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 330, }}>

        <div >
          <img src={`${serverURL}/images/${selectedImages}`} style={{ height: 440, width: 400 , marginTop:20}} />
        </div>

        <div style={{ marginLeft: 80,marginBottom: 10 }}>
        <PlusMinusButton qty={keys.includes(product?.productdetailid+"")?cartData[product?.productdetailid]?.qty:0} onChange={(value)=>handleChange(value,product)}/>
        </div>
      </div>
    )

  }


  return (
  
    <div style={{ marginLeft: -10, display: 'flex', marginTop: 40, position: 'relative' }}>

      <div onClick={handleNext} style={{ cursor: 'pointer', marginLeft: 80, marginBottom: 50, marginTop: 5, position: 'absolute', zIndex: 1, background: '#fff', width: 80, height: 35, verticalAlign: 'top', transition: 'cubic-bezier(0.35, 0, 0.25, 1) 300ms', borderRadius: 22, border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <KeyboardArrowUpIcon style={{ color: '#0c5273' }} />
      </div>

      <div elevation={0.5} style={{marginLeft:80}} >
        <Slider ref={scrollRef} {...settings} style={{ position: 'relative', objectFit: 'contain', marginTop: 35, paddingTop: 15, overflow: 'hidden', width: 100, }}>
          {showImage()}
        </Slider>
      </div>

      <div onClick={handlePrev} style={{ cursor: 'pointer', marginLeft: 80, marginTop: 380, position: 'absolute', zIndex: 1, background: '#fff', width: 80, height: 35, transition: 'cubic-bezier(0.35, 0, 0.25, 1) 300ms', borderRadius: 22, border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <KeyboardArrowDownIcon style={{ color: '#0c5273' }} />
      </div>


      <Paper elevation={0.5} style={{ position: 'relative', marginLeft:10, borderRadius: 24, border: '1px solid #e0e0e0', overflow: 'hidden' ,height:550}}>

        <Slider style={{ display: 'flex', justifyContent: 'center', marginLeft: -5, height: 530, width:400}} >
          {showImages()}
        </Slider>

      </Paper>
     
     
      </div>
     
      

   
  )
}