import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { serverURL } from "../../../services/FetchNodeAdminServices";
import PlusMinusButton from "../homepage/PlusMinusButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from 'react-redux';


const Accordion = styled((props) => (
    <MuiAccordion  elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `0px solid `,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.5rem', color: '#0652DD' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    
    flexDirection: 'col-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(0),
    },
    ...theme.applyStyles('white', {
      backgroundColor: 'inherit',
    }),
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    borderBottom: '0px solid #e0e0e0',
  }));


export default function ProductDetailsCategory({productData,refresh,setRefresh})
{
     var cartData=useSelector((state)=>state.cart)
     var keys=Object.keys(cartData);
    // console.log('xxxxxxxxx:',cartData)
     var dispatch=useDispatch();
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
         setExpanded(newExpanded ? panel : false);
        };


 const handleChangeQty=(value,item)=>{
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
 
/*
var data=[{ productdetailname:'Maaza Mango Drink ', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
            offerprice:0, offertype:'Festival', productstatus:'Trending', picture:'maaza.webp'},
    { productdetailname:'Maggi 2-Minute Masala Noodles', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:420, 
             offerprice:390, offertype:'Festival', productstatus:'Trending', picture:'maggi.webp'},
    { productdetailname:'Britannia Nutri Choice Hi-Fibre Digestive Biscuits', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
             offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'britanniabisckit.webp'},
    { productdetailname:'Kissan Fresh Tomato Ketchup', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
               offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'tamatoshoop.jpg'},
    { productdetailname:'Cadbury Dairy Milk Chocolate Home Treats', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
              offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'chocolate.webp'},
    { productdetailname:'Brooke Bond Red Label Strong Blend Tea', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
             offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'redtea.webp'},
    { productdetailname:'Wagh Bakri Premium Leaf Tea ', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
              offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'waghbakri.webp'},
    { productdetailname:'Kelloggs Fruit, Nut & Seeds Muesli', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
                offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'kellogg.webp'},
    { productdetailname:'Brooke Bond Taj Mahal Tea', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
                  offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'tajchai.webp'}
     
            ]*/


 const showImages = () => {
            
          return productData.map((item)=>{

              var op=parseInt(((item.price-item.offerprice)/item.price)*100)
          
            return ( 
              <Box  sx={{marginLeft:4,display: 'flex', flexWrap: 'wrap','& > :not(style)': { m: 1, width: 250, height: 370,}}}>
                  <section elevation={3}  style={{position:'relative',padding: 16,borderRadius: 24,border: '1px solid #e0e0e0',overflow: 'hidden'}}>
                        <div style={{marginLeft:10}}>
                <div style={{display:'flex',flexDirection:'column',width:220,marginLeft:20}}>
                <div style={{marginLeft:10}}>
                  <img src={`${serverURL}/images/${item.picture}`} style={{ width:150 , borderRadius:20}} />
                </div>
                 
                {item.productdetailname=='Saffola Gold'?<></>:<div style={{ lineHeight: 1.2456,marginTop:15}}> </div>}
                  <div style={{
                    marginTop:15,
                     fontWeight: 500,
                     fontSize: 14,
                     letterSpacing: -0.07,
                     lineHeight: 1.4285714286,
                      width:'75%', 
                      overflow: "hidden",
                      textOverflow: 'ellipsis',
                      display:"-webkit-box",
                      webkitLineClamp: "2",
                      webkitBoxOrient: "vertical",
                      }}>
          
                 {item.productdetailname}
                  </div>
                    {item.productdetailname.length<=24?<div style={{ lineHeight: 1.2456,}}>&nbsp;</div>:<></>} 
    
                    <div style={{marginLeft:-10,width:'100%',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
                       <img src={`${serverURL}/images/smart.jpg`} width="100"/>
                      </div>
                  <div style={{
                     fontWeight: 500,
                     fontSize: 14,
                     letterSpacing: -0.07,
                     lineHeight: 1.4285714286,
                     }}>
          
                      {item.weight} {item.weighttype}
                     </div>
                     {item.offerprice>0 ? <div style={{marginTop:7,display:'flex',flexDirection:'column'}}>
                     <div style={{
                     fontWeight: 700,
                     fontSize: 16,
                     letterSpacing: -0.07,
                     lineHeight: 1.4285714286,
                     }}>
          
                 <span>&#8377;</span> {item.offerprice} 
                     </div>
          
                     <div style={{
                     fontWeight: 500,
                     fontSize: 14,
                     letterSpacing: -0.07,
                     lineHeight: 1.4285714286,
                     color:'grey'
                     }}>
          
          <div style={{display:'flex',alignItems:'center',fontSize: 13}}><s><span>&#8377;{item.price}</span></s><span style={{margin:5,width:55,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:2,background:'#e5f7ee',color:'#03753c'}}>{op}% OFF</span></div>
                     </div>
          
                     </div>:<div>
                     <div style={{
                      marginTop:7,
                     fontWeight: 700,
                     fontSize: 16,
                     letterSpacing: -0.07,
                     lineHeight: 1.4285714286,
                 
                     }}>
          
                     <span>&#8377;</span> {item.price}
                     </div>
                     <div style={{ lineHeight:1.6285714286,}}>&nbsp;</div>
                     </div>
                     }
                     <div>
                        <PlusMinusButton qty={keys.includes(item?.productdetailid+"")?cartData[item?.productdetailid]?.qty:0} onChange={(value)=>handleChangeQty(value,item)} />
                     </div>
             </div>
             </div>
        </section>
     </Box>
         )})
      
  }



    return (<div>

            <div style={{display:'flex',flexDirection:'column'}}>
               <Box  sx={{marginTop:1,marginLeft:96,display: 'flex', flexWrap: 'wrap','& > :not(style)': { m: 1, width:180, height: 15}}}>
                  <section elevation={3}  style={{position:'relative',display: 'flex',alignItems:'center',padding: 10,borderRadius: 24,border: '1px solid #e0e0e0',overflow: 'hidden'}}>
                        <div style={{display: 'flex',fontSize: 15}}>
        
             <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}  >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"style={{ display: 'flex',alignItems: 'center',flexGrow: 1,width:200}} >
              <Typography><span style={{fontWeight: 500,fontSize: 14,letterSpacing: -0.07,lineHeight: 1.4285714286 }}>Sort by:</span><span style={{marginLeft: 3,fontWeight: 700,fontSize: 15,letterSpacing: -0.07,lineHeight: 1.4285714286 }}>Popularity</span></Typography>
             </AccordionSummary>
               <AccordionDetails> 
             </AccordionDetails>
            </Accordion>
                       
             </div>
           </section>
          </Box>
        </div>




    <div style={{display:'flex',flexDirection:'column'}}>
       <div style={{display:'flex',flexDirection:'row'}}>
       {showImages()}
       </div>
    </div>

    </div>)
         
}