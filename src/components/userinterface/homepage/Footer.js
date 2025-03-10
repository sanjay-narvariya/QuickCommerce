import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../assets/logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextBoxSearch from './TextBoxSearch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MyMenuBar from './MyMenuBar';
import MyDrawer from './MyDrawer';
import { Divider, Grid } from '@mui/material';

export default function Footer() {
    
  return (
    <Box style={{marginTop:50}}>
      <AppBar position="static" style={{ backgroundColor:'#f5f5f5',display:'flex',flexDirection:'column'}}>
      <Grid container style={{paddingLeft:100,paddingTop:40,paddingBottom:20}}>
         
         <Grid item xs={2} > 
            <div style={{fontWeight:800,fontSize:17,marginBottom:10,padding: 8,color:'#141414'}}> All Categories </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>Groceries</div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>Lifestyle</div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>Fashion</div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>Electronics</div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>Wellness</div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>Furniture</div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>Toys</div>
          </Grid>

          <Grid item xs={2} > 
            <div style={{fontWeight:800,fontSize:17,marginBottom:10,padding: 8,color:'#141414'}}> Popular Categories </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8,width:'70%'}}> Biscuits, Drinks & Packaged Foods</div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> Fruits & Vegetables </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> Cooking Essentials </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> Dairy & Bakery </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> Personal Care </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> Beauty </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> Home Care </div>
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> Mom & Baby Care  </div>
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8,width:'70%'}}>  School, Office & Stationery </div>
          </Grid>
           
          <Grid item xs={2}> 
            <div style={{fontWeight:800,fontSize:17,marginBottom:10,padding: 8,color:'#141414'}}> Customer Account </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> My Account </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> My Orders </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> Wishlist </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> Delivery Addresses </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> JioMart Wallet </div> 
          </Grid>

          <Grid item xs={2}> 
            <div style={{fontWeight:800,fontSize:17,marginBottom:10,padding: 8,color:'#141414'}}> Help & Support </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8,width:'70%'}}>  About Us </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>  FAQ  </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>  Terms & Conditions  </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}>  Privacy Policy  </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> E-waste Policy </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8,width:'70%'}}> Cancellation & Return Policy  </div> 
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8,width:'70%'}}> Shipping & Delivery Policy  </div>
            <div style={{color: '#636e72',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,padding: 8}}> AC Installation by resQ   </div>
          </Grid>

          <Grid item xs={4} >
            <div style={{fontWeight: 900,fontSize: 24,letterSpacing: -0.72,lineHeight: 1,paddingBottom: 16,color: '#141414',marginTop:12}}> Contact Us </div> 
            <div><span style={{fontWeight: 500,fontSize: 14,letterSpacing: -0.07,lineHeight: 1.4285714286,color:'rgba(0, 0, 0, .65)'}}>WhatsApp us: </span>
                  <span style={{fontWeight: 700,fontSize: 13.3,letterSpacing: -0.07,lineHeight: 1.4285714286,color: '#0c5273'}}>70003 70003</span></div>
            <div><span style={{fontWeight: 500,fontSize: 14,letterSpacing: -0.07,lineHeight: 1.4285714286,color:'rgba(0, 0, 0, .65)'}}>Call us: </span>
                  <span style={{fontWeight: 700,fontSize: 13.3,letterSpacing: -0.07,lineHeight: 1.4285714286,color: '#0c5273'}}>1800 890 1222</span></div>
            <div style={{paddingBottom: 24,fontWeight: 500,fontSize: 14,letterSpacing: -0.07,lineHeight: 1.4285714286,color:'rgba(0, 0, 0, .65)'}}>8:00 AM to 8:00 PM, 365 days</div> 
            
            <div style={{width:'66%'}}><span style={{ fontWeight: 500,fontSize: 14,letterSpacing: -0.07,lineHeight: 1.4285714286,color:'rgba(0, 0, 0, .65)'}}>
             Should you encounter any bugs, glitches, lack of functionality, delayed deliveries, billing errors or other problems on the website, please email us on </span>
             <span style={{fontWeight: 750,fontSize: 14,letterSpacing: -0.07,lineHeight: 1.4285714286,color: '#0c5273'}}>cs@Quickcomm.com</span> 
            </div>  

            <div style={{fontWeight: 900,fontSize: 24,letterSpacing: -0.72,lineHeight: 1,paddingBottom: 16,color: '#141414',marginTop:30}}> Download the app </div> 
            <div>
              <span><img src="/google.png" style={{width:'30%'}} /></span>
              <span style={{marginLeft:10}}><img src="/App.jpeg" style={{width:'30%'}} /></span>
            </div>

          </Grid>
           

      </Grid>
    </AppBar>
    <div style={{alignSelf: 'normal', borderTop: '2px solid #bdc3c7'}}></div>
    <div style={{ backgroundColor:'#f5f5f5',display:'flex',alignItems:'center',maxWidth: 1398,width: '100%',paddingLeft: 8,paddingRight: 8,paddingTop:8,paddingBottom:8}}>
    <div style={{display:'flex',alignItems:'center',marginLeft:100}}><span style={{width:42,height:42,borderRadius:15,background:'#81ecec',margin:8}}> <img src={logo} style={{width:45,height:45}} /> </span><span style={{fontWeight: 500,fontSize: 13,letterSpacing: -0.06,lineHeight: 1.3333333333,color: 'rgba(0, 0, 0, .65)'}}>© 2024 All rights reserved. Quickcomm Ltd.</span></div>
    <div style={{marginLeft:360,fontWeight: 500,fontSize: 13,letterSpacing: -0.06,lineHeight: 1.3333333333,color: 'rgba(0, 0, 0, .65)'}}>Best viewed on Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+, Google Chrome 80+</div>
    </div>
  </Box>
  );
}
