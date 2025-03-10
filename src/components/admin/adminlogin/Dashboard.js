import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Category  from '../category/Category';
import DisplayAllCategory from '../category/DisplayAllCategory';
import Subcategory from '../subcategory/Subcategory';
import DisplayAllSubcategory from '../subcategory/DisplayAllSubcategory';
import Brand from '../brand/Brand';
import DisplayAllBrand from '../brand/DisplayAllBrand';
import Products from '../product/Products';
import DisplayAllProducts from '../product/DisplayAllProducts';
import Productdetail from '../productdetail/Productdetail';
import DisplayAllProductdetail from '../productdetail/DisplayAllProductdetail';
import ProductPicture from '../productpictures/ProductPicture';
import Mainbanner from '../mainbanner/Mainbanner';
import Bankandotheroffers from '../bankandotheroffers/Bankandotheroffers';
import Adoffers from '../adoffers/Adoffers'
import { Avatar, Divider, Grid, Paper,List,ListItem,ListItemButton,ListItemIcon,ListItemText } from '@mui/material';
import { serverURL } from '../../../services/FetchNodeAdminServices';
import {Routes,Route,useNavigate} from 'react-router-dom';


export default function Dashboard() {
         var navigate=useNavigate()
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuickComm
          </Typography>
          <Button color="inherit">LogOut</Button>
        </Toolbar>
      </AppBar>

      <div>
        <Grid container >
          <Grid item xs={2}>
            <Paper elevation={3} style={{flexDirection:'column' , display:'flex', alignItems:'center',height:580,margin:10}}>
              <div>
                  <img src={`${serverURL}/images/5.jpg`} style={{width:70,height:70,borderRadius:35,marginTop:10}} />
              </div>
              <div style={{fontSize:12,fontWeight:'bold',letterSpacing:1}}>
                Harry Singh
              </div>
              <div style={{fontSize:10,fontWeight:'bold',color:'grey'}}>
                harrysingh@gmail.com
              </div>
              <Divider style={{width:'90%',marginTop:10}} />
      <div style={{height:'100%',marginTop:-15}}>
          <List>
              <ListItem>
                    <ListItemButton>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/dashboard.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                              Dashboard
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/category.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                             Category
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/subcategory.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                             SubCategory
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/displayallbrand')}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/brand.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                             Brand
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/displayallproducts')}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/products.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                             Product
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton  onClick={()=>navigate('/dashboard/displayallproductdetail')}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/product-details.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                          Product Detail
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/productpictures')}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/product-image.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                             Product Image
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton  onClick={()=>navigate('/dashboard/mainbanner')}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/banner.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                             Main Banner
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/adoffers')}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/adimages.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                              Products Ad
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/bankandotheroffers')}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/bank-account.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                             Bank Offers
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                          <img src='/check-out.png' style={{width:30,height:30}}/>
                          <div style={{fontWeight:600,marginLeft:15}}>
                             LogOut
                          </div>
                        </div>
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={10}>
          <Routes>
          <Route element={<Category/>} path="/category"></Route>
          <Route element={<DisplayAllCategory/>} path="/displayallcategory"></Route>
          <Route element={<Subcategory/>} path="/subcategory"></Route>
          <Route element={<DisplayAllSubcategory/>} path="/displayallsubcategory"></Route>
           <Route element={<Brand/>} path="/brand"></Route>
          <Route element={<DisplayAllBrand/>} path="/displayallbrand"></Route>
          <Route element={<Products/>} path="/products"></Route>
          <Route element={<DisplayAllProducts/>} path="/displayallproducts"></Route>        
          <Route element={<Productdetail/>} path="/productdetail"></Route>
          <Route element={<DisplayAllProductdetail/>} path="/displayallproductdetail"></Route>
         <Route element={<ProductPicture/>} path="/productpictures"></Route>
          <Route element={<Mainbanner/>} path="/mainbanner"></Route>    
          <Route element={<Adoffers/>} path="/adoffers"></Route>
           <Route element={<Bankandotheroffers/>} path="/bankandotheroffers"></Route>
    
          </Routes>
          </Grid>
        </Grid>
      </div>
     
    </div>
  )
}