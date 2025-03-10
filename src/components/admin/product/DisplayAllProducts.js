import { userStyle } from 'F:/quickcomfronted/src/components/admin/product/ProductsCss'
import { postData, serverURL, currentDate, getData,createDate} from "../../../services/FetchNodeAdminServices";
import { useState,useEffect } from "react"
import {FormHelperText,FormControl,InputLabel,Select,MenuItem, IconButton, Grid, TextField,Avatar, Dialog,DialogContent,DialogActions, Button } from '@mui/material';
import MaterialTable from '@material-table/core';
import logo from "F:/quickcomfronted/src/assets/logo.png"
import cart from "F:/quickcomfronted/src/assets/cart.png"
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';
import { LoadingButton } from "@mui/lab";


  
export default function DisplayAllProducts()
{          
            const navigate=useNavigate()
            const classes=userStyle()
            const [productList,setProductList]=useState([])
            const [open,setOpen]=useState(false)
              
/*****************Product Actions*************************************/ 
             const [productId,setProductId]=useState('')
             
             const [categoryId,setCategoryId]=useState('')
             const [subcategoryId,setSubcategoryId]=useState('')
             const [brandId,setBrandId]=useState('')
             const [productName,setProductName]=useState('')

             const [productDescription,setProductDescription]=useState('')
             const [picture,setPicture]=useState({bytes:'',fileName:cart})
             const [oldImage,setOldImage]=useState('')
             const [errorMessages,setErrorMessages]=useState({})
             const [categoryList,setCategoryList]=useState([])
             const [subcategoryList,setSubcategoryList]=useState([])
             const [brandList,setBrandList]=useState([])
             const [hideUploadButton,setHideUploadButton]=useState(false)
             const [loadingStatus,setLoadingStatus]=useState(false)


/******************************Category************************************/

const fetchAllCategory=async()=>{
               var result=await getData('category/display_all_category')
               setCategoryList(result.data)
         }
  
      useEffect(function(){
               fetchAllCategory()
         },[])
  
      const fillCategory=()=>{
          return categoryList.map((item)=>{
               return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
          })
      }
  
/********************************Subcategory**************************************/
    

     const fetchAllSubcategory=async(cid)=>{
             var body={categoryid:cid}
               var result=await postData('subcategory/get_all_subcategory_by_categoryid',body)
               setSubcategoryList(result.data)
         }
         

       const  handleSubcategory=(cid)=>{
                  setCategoryId(cid)
                   fetchAllSubcategory(cid)
                   }
                  
               const handleSubcategoryDialog=(did)=>{
                              fetchAllSubcategory(did)
                              }
 
  
      const fillSubcategory=()=>{    
        return subcategoryList.map((item)=>{
               return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
          })             
      }
/********************************Brand***********************************/

      const fetchAllBrand=async(scid)=>{
               var body={subcategoryid:scid}
                 var result=await postData('brand/get_all_brand_by_subcategoryid',body)
                 setBrandList(result.data)
           }
           
  
         const  handleBrand=(scid)=>{
                    setSubcategoryId(scid)
                     fetchAllBrand(scid)
                     }

                const  handleBrandDialog=(did)=>{
                              fetchAllBrand(did)
                              }
 
    
        const fillBrand=()=>{    
          return brandList.map((item)=>{
                 return (<MenuItem value={item.brandid}>{item.brandname}</MenuItem>)
            })             
        }
  
/***********************************************************************************/

const handleErrorMessages=(label,message)=>{
               var msg=errorMessages
               msg[label]=message
               setErrorMessages((prev)=>({...prev,...msg}))
               }

const showSaveCancelButton=()=>{
               return(<div>
                 <Button onClick={handleEditIcon} >Save</Button>
                 <Button onClick={handleCancelIcon} >Cancel</Button>
               </div>)
          }

const validateData=()=>{
               var err=false
                 if(productName.length===0)
                 {
                  handleErrorMessages('productName',"Pls input productname..")
                  err=true
                 }
 
                 if(productDescription.length===0)
                        {
                         handleErrorMessages('productDescription',"Pls input productdescription..")
                         err=true
                        }
 
                 if(picture.bytes.length===0)
                 {
                   handleErrorMessages('picture',"Pls input picture..")
                   err=true
                    }
            
                 if(categoryId.length===0)
                  {
                   handleErrorMessages('categoryId',"Pls input categoryId..")
                   err=true
                  }
            
                 if(subcategoryId.length===0)
                  {
                   handleErrorMessages('subcategoryId',"Pls input subcategoryId..")
                   err=true
                  }
 
                  if(brandId.length===0)
                      {
                       handleErrorMessages('brandId',"Pls input brandId..")
                       err=true
                       }
 
                  return err      
                }
 



const handleImage=(e)=>{
                 handleErrorMessages('picture',null)
                 setPicture({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
                 setHideUploadButton(true)
                              }
               
 const productForm=()=>{
                   return (
                        <Grid container spacing={2}>
                             <Grid item xs={12}>
                              <div className={classes.mainHeadingstyle}>
                                        <img src={logo} className={classes.imageStyle}/>
                                      
                                      <div className={classes.headingStyle}>
                                            Products Register
                                </div>
                                </div>
                             </Grid>
                  <Grid item xs={6}>
                    {/* <TextField  onFocus={()=>handleErrorMessages('categoryId',null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} onChange={(e)=>setCategoryId(e.target.value)} label="Category Id" value={categoryId} fullWidth /> */}

                       <FormControl fullWidth>
                       { errorMessages?.categoryId?<InputLabel><div className={classes.errorMessageStyle}>Category Id</div></InputLabel>:<InputLabel>Category Id</InputLabel> }
                        <Select value={categoryId}
                         onFocus={()=>handleErrorMessages('categoryId',null)}
                         error={errorMessages?.categoryId} 
                         label="Category Id"
                          onChange={(e)=>handleSubcategory(e.target.value)}>

                            {fillCategory()}

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
                       </FormControl>

                   </Grid>
                   <Grid item xs={6}>
                       <FormControl fullWidth>
                       { errorMessages?.subcategoryId?<InputLabel><div className={classes.errorMessageStyle}>Subcategory Id</div></InputLabel>:<InputLabel>Subcategory Id</InputLabel> }
                        <Select value={subcategoryId}
                         onFocus={()=>handleErrorMessages('subcategoryId',null)}
                         error={errorMessages?.subcategoryId} 
                         label="Subcategory Id"
                          onChange={(e)=>handleBrand(e.target.value)}>

                            {fillSubcategory()}

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.subcategoryId}</div></FormHelperText>
                       </FormControl>

                   </Grid>

                   <Grid item xs={6}>
                       <FormControl fullWidth>
                       { errorMessages?.brandId?<InputLabel><div className={classes.errorMessageStyle}>Brand Id</div></InputLabel>:<InputLabel>Brand Id</InputLabel> }
                        <Select value={brandId}
                         onFocus={()=>handleErrorMessages('brandId',null)}
                         error={errorMessages?.brandId} 
                         label="brand Id"
                          onChange={(e)=>setBrandId(e.target.value)}>

                            { fillBrand()}

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.brandId}</div></FormHelperText>
                       </FormControl>
                   </Grid>
          

                    <Grid item xs={12}>
                           <TextField onFocus={()=>handleErrorMessages('productName',null)} error={errorMessages?.productName} helperText={errorMessages?.productName} onChange={(e)=>setProductName(e.target.value)} label="Product Name" variant="outlined"  value={productName} fullWidth/>
                       </Grid>
                      <Grid item xs={12}>
                              <TextField onFocus={()=>handleErrorMessages('productDescription',null)} error={errorMessages?.productDescription} helperText={errorMessages?.productDescription} onChange={(e)=>setProductDescription(e.target.value)} label="Product Description" variant="outlined"  value={productDescription} fullWidth/>
                       </Grid>
            
            
                               <Grid item xs={6} className={classes.center}>
                                  <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                  {hideUploadButton?<div>{showSaveCancelButton()}</div>:
                                   <Button variant="contained" component="label" style={{width:'100px'}}>Upload
                                          <input onChange={handleImage} hidden style={{width:'100px'}} type="file" accept="image/*" multiple/>
                                   </Button>}
                                   <div className={classes.errorMessageStyle}>{errorMessages?.picture!=null?errorMessages?.picture:<></>}</div>
            
                                   </div>
                               </Grid>
                               <Grid item xs={6} className={classes.center}>
                                    <Avatar style={{width:70,height:60}} src={picture.fileName} variant="rounded" />
                               </Grid>
                           
                     </Grid>
                    )
       }
 
/***************************************stop*************************************************/
const fetchAllProduct=async()=>{
               var result=await getData('product/display_all_product')
          
      if(result.status)
      {
         setProductList(result.data)
      }
      else
      {
       alert(result.message)
      }
     }

     
   useEffect(function(){
               fetchAllProduct()
      },[])


const handleCancelIcon=()=>{
               setPicture({bytes:'',fileName:oldImage})
               setHideUploadButton(false)
              }

const handleCloseDialog=()=>{
               setOpen(false)
           }



const handleOpenDialog=(rowData)=>{
               setProductId(rowData.productid)
               setCategoryId(rowData.categoryid)
               setSubcategoryId(rowData.subcategoryid)
               setBrandId(rowData.brandid)
               setProductName(rowData.productname)
               setProductDescription(rowData.productdescription)
               setPicture({bytes:'',fileName:`${serverURL}/images/${rowData.picture}`})
               setOldImage(`${serverURL}/images/${rowData.picture}`)
               setOpen(true)
               handleSubcategoryDialog(rowData.categoryid)
               handleBrandDialog(rowData.subcategoryid)
             }


const handleEditData=async()=>{
            
               var err=validateData()
               if(err==false)
                 {
                  setLoadingStatus(true)
                  
               var body={'productname':productName,'productdescription':productDescription,'updated_at':currentDate(),
                'user_admin':'Frazi','productid':productId,'brandid':brandId,'categoryid':categoryId,'subcategoryid':subcategoryId}
     
                   var result= await postData('product/edit_product_data',body)
                  if(result.status)
                  {
                       Swal.fire({
                             position: "top-end",
                             icon: "success",
                             title: result.message,
                             showConfirmButton: false,
                             timer: 2000,
                             toast:true
                           });
                  }
                  else
                  {
                       Swal.fire({
                             position: "top-end",
                             icon: "Error",
                             title: result.message,
                             showConfirmButton: false,
                             timer: 2000,
                             toast:true
                           });
                  }
     
                  setLoadingStatus(false)
                
                 }
               fetchAllProduct()
          }


const handleEditIcon=async()=>{
            
               setLoadingStatus(true)
          
               var formData=new FormData()
                  formData.append('picture',picture.bytes)
                    formData.append('subcategoryid',subcategoryId)
                    formData.append('updated_at',currentDate())
                    formData.append('user_admin','Frazi')
                    formData.append('categoryid',categoryId)
                    formData.append('brandid',brandId)
                    formData.append('productid',productId)
                    
  
                var result= await postData('product/edit_product_icon',formData)
               if(result.status)
               {
                    Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: result.message,
                          showConfirmButton: false,
                          timer: 2000,
                          toast:true
                        });
               }
               else
               {
                    Swal.fire({
                          position: "top-end",
                          icon: "Error",
                          title: result.message,
                          showConfirmButton: false,
                          timer: 2000,
                          toast:true
                        });
               }
  
                  setLoadingStatus(false) 
                  setHideUploadButton(false)
                 fetchAllProduct()
        } 



const productDelete=async()=>{
               setLoadingStatus(true)
               var body={'productid':productId}
         
                var result= await postData('product/delete_product',body)
               if(result.status)
               {
                    Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: result.message,
                          showConfirmButton: false,
                          timer: 2000,
                          toast:true
                        });

                        setOpen(false)

               }
               else
               {
                    Swal.fire({
                          position: "top-end",
                          icon: "Error",
                          title: result.message,
                          showConfirmButton: false,
                          timer: 2000,
                          toast:true
                        });
               }
         
               setLoadingStatus(false) 
            setHideUploadButton(false)
            fetchAllProduct()
          }



const handleDeleteProduct=async()=>{
          
               Swal.fire({
                 title: "Do you want to delete the Product?",
                 showDenyButton: true,
                 showCancelButton: true,
                 confirmButtonText: "Delete",
                 denyButtonText: `Don't delete`
               }).then((result) => {
                 /* Read more about isConfirmed, isDenied below */
                 if (result.isConfirmed) {
         
                     productDelete()
         
                 } else if (result.isDenied) {
                   Swal.fire("Product not deleted", "", "info");
                 }
               });
         
             }
         


const showProductDialog=()=>{
               return(<div>
                  <Dialog open={open}>
     
                  <IconButton
                 aria-label="close"
                 onClick={handleCloseDialog}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                 >
               <CloseIcon />
             </IconButton> 
     
                   <DialogContent>
                      {productForm()}
                   </DialogContent>
                   <DialogActions>
     
               <LoadingButton
                  loading={loadingStatus}
                   loadingPosition="start"
                   startIcon={<SaveIcon />}
                   variant="contained"
                   onClick={handleEditData}
                  >
                   Edit Data
              </LoadingButton>

                <Button onClick={handleDeleteProduct} variant="contained">Delete</Button>
     
                   </DialogActions>
                  </Dialog>
     
               </div>)
     
             }


/*****************Product Table***************/

    function productTable() {     
                       return (
                              <div className={classes.root}>
                                <div className={classes.displayBox}>
                                <MaterialTable
                                  title="Product List"
                                  columns={[
                                    { title: 'Id', field: 'productid' },
                                    { title: 'Category', field: 'categoryname' },
                                    { title: 'Subcategory', field: 'subcategoryname' },
                                    { title: 'Brand', field: 'brandname' },
                                    { title: 'Product', field: 'productname' },
                                    { title: 'Description', render:(rowData)=><div><textarea  style={{display:'flex',flexDirection:'column',fontSize:12, width:100, height:50}}>{rowData.productdescription}</textarea></div> },
                                    { title: 'Create Update', render:(rowData)=><div style={{display:'flex',flexDirection:'column',fontSize:12}}><b><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></b></div>},
                                    { title: 'Picture', render:(rowData)=><div><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:10}} /></div>},
                                    
                                  ]}
                                  
                                  data={productList} 
                           
                                  options={{ 
                                      pageSize: 3,
                                      pageSizeOptions: [3, 5, 10,{ value: productList.length, label: 'All' }],
                                     }}
                           
                                  actions={[
                                    {
                                      icon: 'edit',
                                      tooltip: 'Edit Product',
                                      onClick: (event, rowData) => handleOpenDialog(rowData)
                                    },
                                    {
                                      icon: 'add',
                                      tooltip: 'Add User',
                                      isFreeAction: true,
                                      onClick: (event) => navigate('/dashboard/products')
                                    }
                                  ]}
                                />
                                </div>
                                </div>
                              )
                       } 

/**************************************/
 return(<div>
          {productTable()}
          {showProductDialog()}
 </div>)
 }
