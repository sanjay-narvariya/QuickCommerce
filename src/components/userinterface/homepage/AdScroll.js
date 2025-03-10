import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AdScroll({data}) {

     var scrollRef=useRef() 
     const theme = useTheme();
     const matches = useMediaQuery(theme.breakpoints.up('md'));
  var settings = {
    dots: false,
    infinite: true,
    //autoplay: true,
    //autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  //var data = ['b1.webp', 'b2.webp', 'b3.jpg', 'b4.webp', 'b5.webp']
  const showImages = () => {
    return data.map((item) => {
      return <div>
        <img src={`${serverURL}/images/${item.filenames}`} style={{ width:'99.4%' , borderRadius:20}} />
      </div>
    })
  }

  const handleNext=()=>{
   scrollRef.current.slickNext()
  }

  const handlePrev=()=>{
    scrollRef.current.slickPrev()
  }

  return (<div style={{position:'relative'}}>
    {matches?<div onClick={handleNext} style={{top:'43%',left:'1%',position:'absolute',zIndex:2,background:'#b2bec3',opacity:0.7,width:30,height:30,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <KeyboardArrowLeftIcon style={{color:'#fff'}} />
    </div>:<div></div>}

    <Slider ref={scrollRef} {...settings}>
      {showImages()}
    </Slider>

     {matches?<div onClick={handlePrev} style={{top:'43%',right:'2%',position:'absolute',zIndex:2,background:'#b2bec3',opacity:0.7,width:30,height:30,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <KeyboardArrowRightIcon style={{color:'#fff'}} />
    </div>:<div></div>}
  </div>)
}