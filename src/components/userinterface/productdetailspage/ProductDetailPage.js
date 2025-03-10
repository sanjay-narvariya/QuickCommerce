import Footer from '../homepage/Footer'
import Header from '../homepage/Header'
import * as React from 'react';
import { useState,useEffect } from 'react';
import { serverURL, getData, postData  } from "../../../services/FetchNodeAdminServices";
import { Divider,Grid } from '@mui/material';
import ProductImageComponent from '../productdetailspage/ProductImageComponent'
import ProductDescription from '../productdetailspage/ProductDescription'
import ProductsScroll from '../homepage/ProductsScroll'
import { useLocation } from 'react-router-dom';

export default function ProductDetailPage() {

      var location=useLocation()
        // console.log('LOCATION',location)
      var p=location?.state?.product

    const [product,setProduct]=useState(p);
    const [refresh,setRefresh]=useState(true)

    const [popularProducts,setPopularProducts]=useState([]);
    
const fatchAllProductDetails=async(productstatus)=>{
    var result=await postData('userInterface/display_all_productdetail_by_status',{productstatus})
    setPopularProducts(result.data)
}


useEffect(function(){
    fatchAllProductDetails('Popular');
},[])



    return (<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

        <div>
            <Header />
        </div>

        <Grid container spacing={2}>
            <Grid item xs={5.5}>
            <ProductImageComponent refresh={refresh} setRefresh={setRefresh} product={product} setProduct={setProduct}/>
            </Grid>
            <Grid item xs={6.5}>
             <ProductDescription refresh={refresh} setRefresh={setRefresh} product={product} setProduct={setProduct}/>
            </Grid>
        </Grid>

    <div style={{backgroundColor: '#f5f6fa',borderRadius:40,border:'1px #f5f6fa', marginBottom: 8, marginLeft: 100, width: '83%',height:6, marginTop: 30 }}>
    </div>

    <div style={{width:'82%',alignSelf:'center',marginTop:40}}>
       <ProductsScroll title={"Popular Category"} data={popularProducts} />
   </div>

   <div style={{backgroundColor: '#f5f6fa',borderRadius:40,border:'1px #f5f6fa', marginBottom: 8, marginLeft: 100, width: '83%',height:7, marginTop: 30 }}>
    </div>

   <div style={{width:'82%',alignSelf:'center',marginTop:40}}>
      <ProductsScroll title={"Similar Category"} data={popularProducts} />
    </div>

        <div>
            <Footer />
        </div>

    </div>)
}  