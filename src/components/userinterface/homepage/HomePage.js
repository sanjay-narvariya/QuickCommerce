import AdScroll from './AdScroll'
import Footer from './Footer'
import Header from './Header'
import OfferScroll from './OfferScroll'
import ProductsScroll from './ProductsScroll'
import { getData, postData } from '../../../services/FetchNodeAdminServices'
import { useState,useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function HomePage()
{
       const [banner,setBanner]=useState([]);
       const [bankOffer,setBankOffer]=useState([]);
       const [adOffer,setAdOffer]=useState([]);
       const [refresh,setRefresh]=useState(false)
       const [popularProducts,setPopularProducts]=useState([]);
       const theme = useTheme();
       const matches = useMediaQuery(theme.breakpoints.up('md'));


const fatchAllProductDetails=async(productstatus)=>{
              var result=await postData('userInterface/display_all_productdetail_by_status',{productstatus})
              setPopularProducts(result.data)
       }

const fatchAllOffers=async()=>{
              var result=await getData('userInterface/all_adoffers')
              setAdOffer(result.data)
       }


const fatchAllBanner=async()=>{
              var result=await getData('userInterface/show_all_banner')
              setBanner(result.data)
       }

const fatchAllBankOffer=async()=>{
              var result=await getData('userInterface/show_all_bankoffer')
              setBankOffer(result.data)
       }

useEffect(function(){
       fatchAllBanner();
       fatchAllBankOffer();
       fatchAllOffers();
       fatchAllProductDetails('Popular');
},[])

       return(<div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
              
              <div>
              <Header />
              </div>

              <div style={{width:'82.8%',alignSelf:'center',marginTop:35}}>
              <OfferScroll state={"Offer"} data={adOffer}/>
              </div>

              <div style={{width:'82.8%',alignSelf:'center',marginTop:40}}>
              <OfferScroll state={"Bank"} data={bankOffer}/>
              </div>

              <div style={{width:'82%',alignSelf:'center',marginTop:40}}>
              <ProductsScroll refresh={refresh} setRefresh={setRefresh} title={"Popular"} data={popularProducts} />
              </div>

              <div style={{width:'82%',alignSelf:'center',marginTop:40}}>
              <ProductsScroll refresh={refresh} setRefresh={setRefresh} title={"Top Brands"} data={popularProducts} />
              </div>

              <div style={{width:'82%',alignSelf:'center',marginTop:40}}>
              <AdScroll data={banner} />
              </div>

             { matches?<div>
              <Footer/>
              </div>:<></>}
            
         </div>)
}  