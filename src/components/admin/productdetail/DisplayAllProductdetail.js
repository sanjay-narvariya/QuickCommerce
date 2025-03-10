import { userStyle } from "./ProductdetailCss";
import {FormHelperText,FormControl,InputLabel,Select,MenuItem, IconButton, Grid, TextField,Avatar, Dialog,DialogContent,DialogActions, Button } from '@mui/material';
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { useState,useEffect } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import MaterialTable from '@material-table/core';
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';
import { postData,serverURL, currentDate, getData,createDate} from "../../../services/FetchNodeAdminServices";

export default function DisplayAllProductdetail(props)
    {
        const navigate=useNavigate()
        const classes=userStyle()
        const [value, setValue] = useState('');
       const [productdetailList,setProductdetailList]=useState([])
       const [open,setOpen]=useState(false)
              
/*************************Productdetail Actions*************************************/
      const [productdetailId,setProductdetailId]=useState('')

      const [categoryId,setCategoryId]=useState('')
      const [subcategoryId,setSubcategoryId]=useState('')
      const [brandId,setBrandId]=useState('')
      const [productId,setProductId]=useState('')
      const [productdetailName,setProductdetailName]=useState('')

      const [weight,setWeight]=useState('')
      const [weightType,setWeightType]=useState('')
      const [packagingtype,setPackagingtype]=useState('')
      const [noofqty,setNoofqty]=useState('')
      const [stock,setStock]=useState('')
      const [price,setPrice]=useState('')
      const [offerprice,setOfferprice]=useState('')
      const [offertype,setOffertype]=useState('')
      const [productstatus,setProductstatus]=useState('')
      const [productdetaildescription,setProductdetaildescription]=useState('')
      const [picture,setPicture]=useState({bytes:'',fileName:cart})

      const [oldImage,setOldImage]=useState('')
      const [errorMessages,setErrorMessages]=useState({})
      const [loadingStatus,setLoadingStatus]=useState(false)
      const [hideUploadButton,setHideUploadButton]=useState(false)

      const [categoryList,setCategoryList]=useState([])
      const [subcategoryList,setSubcategoryList]=useState([])
      const [brandList,setBrandList]=useState([])
      const [productList,setProductList]=useState([])


    
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


             const handleBrandDialog=(did)=>{
               fetchAllBrand(did)
               }

const fillBrand=()=>{    
  return brandList.map((item)=>{
         return (<MenuItem value={item.brandid}>{item.brandname}</MenuItem>)
    })             
}

/*******************************Product*********************************************/
const fetchAllProduct=async(brid)=>{
       var body={brandid:brid}
       var result=await postData('product/get_all_product_by_brandid',body)
       setProductList(result.data)
 }
 

const  handleProduct=(brid)=>{
          setBrandId(brid)
           fetchAllProduct(brid)
           }


           const handleProductDialog=(did)=>{
               fetchAllProduct(did)
               }

const fillProduct=()=>{    
return productList.map((item)=>{
       return (<MenuItem value={item.productid}>{item.productname}</MenuItem>)
  })             
}

/*********************************************************************************/

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
 
          if(productdetailName.length===0)
                 {
                  handleErrorMessages('productdetailName',"Pls input productdetailname..")
                  err=true
                 }
 
                 if(productdetaildescription.length===0)
                        {
                         handleErrorMessages('productdetaildescription',"Pls input productdetaildescription..")
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
 
                  if(productId.length===0)
                      {
                       handleErrorMessages('productId',"Pls input productId..")
                       err=true
                       }
                  if(weight.length===0)
                             {
                              handleErrorMessages('weight',"Pls input weightId..")
                              err=true
                              }

                              if(weightType.length===0)
                                             {
                                              handleErrorMessages('weightType',"Pls input weighttype..")
                                              err=true
                                              }
 
                  if(packagingtype.length===0)
                             {
                              handleErrorMessages('packagingtype',"Pls input packagingtype..")
                              err=true
                              }
 
                  if(noofqty.length===0)
                             {
                              handleErrorMessages('noofqty',"Pls input noofqty..")
                              err=true
                              }
 
                  if(stock.length===0)
                             {
                              handleErrorMessages('stock',"Pls input stock..")
                              err=true
                              }
 
                  if(price.length===0)
                             {
                              handleErrorMessages('price',"Pls input Price..")
                              err=true
                              }
 
                   if(offerprice.length===0)
                             {
                              handleErrorMessages('offerprice',"Pls input Offerprice..")
                              err=true
                              }
 
                   if(offertype.length===0)
                             {
                              handleErrorMessages('offertype',"Pls input Offertype..")
                              err=true
                              }
 
                   if(productstatus.length===0)
                             {
                              handleErrorMessages('productstatus',"Pls input Productstatus..")
                              err=true
                              }
 
 
                  return err      
                }
 
 



const handleImage=(e)=>{
               handleErrorMessages('picture',null)
               setPicture({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
               setHideUploadButton(true)
              }



const productdetailForm=()=>{

     return (  <div>
                <Grid container spacing={1} >
                 <Grid item xs={12}>
                   <div className={classes.mainHeadingstyle}>
                    <img src={logo} className={classes.imageStyle}/>
                  
                  <div className={classes.headingStyle}>
                        Product Details Register
                 </div>
                 </div>
                </Grid>
                <Grid item xs={3}>
               {/* <TextField  onFocus={()=>handleErrorMessages('categoryId',null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} onChange={(e)=>setCategoryId(e.target.value)} label="Category Id" value={categoryId} fullWidth /> */}

               <FormControl fullWidth>
               { errorMessages?.categoryId?<InputLabel><div className={classes.errorMessageStyle}>Category</div></InputLabel>:<InputLabel>Category</InputLabel> }
                <Select value={categoryId}
                 onFocus={()=>handleErrorMessages('categoryId',null)}
                 error={errorMessages?.categoryId} 
                 label="Category"
                  onChange={(e)=>handleSubcategory(e.target.value)}>

                    {fillCategory()}

                </Select>
                <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
               </FormControl>

           </Grid>
           <Grid item xs={3}>
               <FormControl fullWidth>
               { errorMessages?.subcategoryId?<InputLabel><div className={classes.errorMessageStyle}>Subcategory</div></InputLabel>:<InputLabel>Subcategory</InputLabel> }
                <Select value={subcategoryId}
                 onFocus={()=>handleErrorMessages('subcategoryId',null)}
                 error={errorMessages?.subcategoryId} 
                 label="Subcategory"
                  onChange={(e)=>handleBrand(e.target.value)}>

                    {fillSubcategory()}

                </Select>
                <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.subcategoryId}</div></FormHelperText>
               </FormControl>

           </Grid>

           <Grid item xs={3}>
               <FormControl fullWidth>
               { errorMessages?.brandId?<InputLabel><div className={classes.errorMessageStyle}>Brand</div></InputLabel>:<InputLabel>Brand</InputLabel> }
                <Select value={brandId}
                 onFocus={()=>handleErrorMessages('brandId',null)}
                 error={errorMessages?.brandId} 
                 label="Brand"
                  onChange={(e)=>handleProduct(e.target.value)}>

                    { fillBrand()}

                </Select>
                <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.brandId}</div></FormHelperText>
               </FormControl>

           </Grid>
           <Grid item xs={3}>
               <FormControl fullWidth>
               { errorMessages?.productId?<InputLabel><div className={classes.errorMessageStyle}>Product</div></InputLabel>:<InputLabel>Product</InputLabel> }
                <Select value={productId}
                 onFocus={()=>handleErrorMessages('productId',null)}
                 error={errorMessages?.productId} 
                 label="Product"
                  onChange={(e)=>setProductId(e.target.value)}>

                    { fillProduct()}

                </Select>
                <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.productId}</div></FormHelperText>
               </FormControl>

           </Grid>

          <Grid item xs={8}>
             <TextField onFocus={()=>handleErrorMessages('productdetailName',null)} error={errorMessages?.productdetailName} helperText={errorMessages?.productdetailName} onChange={(e)=>setProductdetailName(e.target.value)} label="Productdetail Name" variant="outlined"  value={productdetailName} fullWidth/>
           </Grid>
           <Grid item xs={4}>
                       <FormControl fullWidth>
                       { errorMessages?.productstatus?<InputLabel><div className={classes.errorMessageStyle}>Product Status</div></InputLabel>:<InputLabel>Product Status</InputLabel> }
                        <Select value={productstatus}
                         onFocus={()=>handleErrorMessages('productstatus',null)}
                         error={errorMessages?.productstatus} 
                         label="Product Status"
                          onChange={(e)=>setProductstatus(e.target.value)}>

                           <MenuItem value={'Trending'}>Trending</MenuItem> 
                           <MenuItem value={'Popular'}>Popular</MenuItem>
                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.productstatus}</div></FormHelperText>
                       </FormControl>
                   </Grid>

           <Grid item xs={3}>
             <TextField onFocus={()=>handleErrorMessages('weight',null)} error={errorMessages?.weight} helperText={errorMessages?.weight} onChange={(e)=>setWeight(e.target.value)} label="Weight" variant="outlined"  value={weight} fullWidth/>
           </Grid>

           <Grid item xs={3}>
                       <FormControl fullWidth>
                       { errorMessages?.weightType?<InputLabel><div className={classes.errorMessageStyle}>Weight Type</div></InputLabel>:<InputLabel>Weight Type</InputLabel> }
                        <Select value={weightType}
                         onFocus={()=>handleErrorMessages('weightType',null)}
                         error={errorMessages?.weightType} 
                         label="Weight Type"
                          onChange={(e)=>setWeightType(e.target.value)}>

                           <MenuItem value={'gm'}>gm</MenuItem> 
                           <MenuItem value={'kg'}>kg</MenuItem>
                           <MenuItem value={'milltr'}>milltr</MenuItem> 
                           <MenuItem value={'ltr'}>ltr</MenuItem> 
                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.weightType}</div></FormHelperText>
                       </FormControl>
                   </Grid>

           <Grid item xs={3}>
                       <FormControl fullWidth>
                       { errorMessages?.packagingtype?<InputLabel><div className={classes.errorMessageStyle}>Packaging Type</div></InputLabel>:<InputLabel>Packaging Type</InputLabel> }
                        <Select value={packagingtype}
                         onFocus={()=>handleErrorMessages('packagingtype',null)}
                         error={errorMessages?.packagingtype} 
                         label="Packaging Type"
                          onChange={(e)=>setPackagingtype(e.target.value)}>

                           <MenuItem value={'Bottle'}>Bottle</MenuItem> 
                           <MenuItem value={'Box'}>Box</MenuItem>
                           <MenuItem value={'Packet'}>Packet</MenuItem>
                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.packagingtype}</div></FormHelperText>
                       </FormControl>
                   </Grid>

           <Grid item xs={3}>
             <TextField onFocus={()=>handleErrorMessages('noofqty',null)} error={errorMessages?.noofqty} helperText={errorMessages?.noofqty} onChange={(e)=>setNoofqty(e.target.value)} label="No of Qty" variant="outlined"  value={noofqty} fullWidth/>
           </Grid>

           <Grid item xs={3}>
             <TextField onFocus={()=>handleErrorMessages('stock',null)} error={errorMessages?.stock} helperText={errorMessages?.stock} onChange={(e)=>setStock(e.target.value)} label="Stock" variant="outlined"  value={stock} fullWidth/>
           </Grid>
           <Grid item xs={3}>
             <TextField onFocus={()=>handleErrorMessages('price',null)} error={errorMessages?.price} helperText={errorMessages?.price} onChange={(e)=>setPrice(e.target.value)} label="Price" variant="outlined"  value={price} fullWidth/>
           </Grid>
           <Grid item xs={3}>
             <TextField onFocus={()=>handleErrorMessages('offerprice',null)} error={errorMessages?.offerprice} helperText={errorMessages?.offerprice} onChange={(e)=>setOfferprice(e.target.value)} label="Offer Price" variant="outlined"  value={offerprice} fullWidth/>
           </Grid>
          
           <Grid item xs={3}>
                       <FormControl fullWidth>
                       { errorMessages?.offertype?<InputLabel><div className={classes.errorMessageStyle}>Offer Type</div></InputLabel>:<InputLabel>Offer Type</InputLabel> }
                        <Select value={offertype}
                         onFocus={()=>handleErrorMessages('offertype',null)}
                         error={errorMessages?.offertype} 
                         label="Offer Type"
                          onChange={(e)=>setOffertype(e.target.value)}>

                           <MenuItem value={'IndependanceDay Sale'}>IndependanceDay Sale</MenuItem> 
                           <MenuItem value={'Diwali Sale'}>Diwali Sale</MenuItem>
                           <MenuItem value={'Holi Sale'}>Holi Sale</MenuItem> 
                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.offertype}</div></FormHelperText>
                       </FormControl>
                   </Grid>

          

           <Grid item xs={12}>
             {/*<TextField onFocus={()=>handleErrorMessages('productdetaildescription',null)} error={errorMessages?.productdetaildescription} helperText={errorMessages?.productdetaildescription} onChange={(e)=>setProductdetaildescription(e.target.value)} label="Product Detail Description" variant="outlined"  value={productdetaildescription} fullWidth/>*/}
             <ReactQuill
              placeholder="Product Description"
              modules={{
               toolbar: {
                 container: [
                   [{ header: "1" }, { header: "2" }, { font: [] }],
                   [{ size: [] }],
                   ["bold", "italic", "underline", "strike", "blockquote"],
                   [
                     { list: "ordered" },
                     { list: "bullet" },
                     { indent: "-1" },
                     { indent: "+1" },
                   ],
                   ["link", "image", "video"],
                   ["code-block"],
                   ["clean"],
                 ],
               },
               clipboard: {
                 matchVisual: false,
               },
             }}
             formats={[
               "header",
               "font",
               "size",
               "bold",
               "italic",
               "underline",
               "strike",
               "blockquote",
               "list",
               "bullet",
               "indent",
               "link",
               "image",
               "video",
               "code-block",
             ]} theme="snow" value={productdetaildescription} onChange={setProductdetaildescription} />

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
     </div>
       )

     }

/********************************************Stop***********************************************/
const fetchAllProductdetail=async()=>{
               var result=await getData('productdetail/display_all_productdetail')
          
      if(result.status)
      {
         setProductdetailList(result.data)
      }
      else
      {
       alert(result.message)
      }
     }

     
   useEffect(function(){
               fetchAllProductdetail()
      },[])
 

const handleCancelIcon=()=>{
               setPicture({bytes:'',fileName:oldImage})
               setHideUploadButton(false)
              }



const handleCloseDialog=()=>{
               setOpen(false)
           }

const handleOpenDialog=(rowData)=>{
               setProductdetailId(rowData.productdetailid)
               setCategoryId(rowData.categoryid)
               setSubcategoryId(rowData.subcategoryid)
               setBrandId(rowData.brandid)
               setProductId(rowData.productid)

               setProductdetailName(rowData.productdetailname)
               setWeight(rowData.weight)
               setWeightType(rowData.weighttype)
               setPackagingtype(rowData.packagingtype)
               setNoofqty(rowData.noofqty)
               setStock(rowData.stock)
               setPrice(rowData.price)
               setOfferprice(rowData.offerprice)
               setOffertype(rowData.offertype)
               setProductstatus(rowData.productstatus)


               setProductdetaildescription(rowData.productdetaildescription)
               setPicture({bytes:'',fileName:`${serverURL}/images/${rowData.picture}`})
               setOldImage(`${serverURL}/images/${rowData.picture}`)
               setOpen(true)
               handleSubcategoryDialog(rowData.categoryid)
               handleBrandDialog(rowData.subcategoryid)
               handleProductDialog(rowData.brandid)
             }


const handleEditData=async()=>{         
               var err=validateData()
               if(err==false)
                 {

                  setLoadingStatus(true)

               var body={'productdetailname':productdetailName,'weight':weight,   'weighttype':weightType,'packagingtype':packagingtype,'noofqty':noofqty,'stock':stock,'price':price,'offerprice':offerprice,'offertype':offertype,'productstatus':productstatus,'productdetaildescription':productdetaildescription,'updated_at':currentDate(),
                'user_admin':'Frazi',
                'productdetailid':productdetailId,'productid':productId,'brandid':brandId,'categoryid':categoryId,'subcategoryid':subcategoryId}
     
                   var result= await postData('productdetail/edit_productdetail_data',body)
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
               fetchAllProductdetail()
          }




const handleEditIcon=async()=>{
            
               setLoadingStatus(true)
          
               var formData=new FormData()
                    formData.append('productdetailid',productdetailId)
                    formData.append('picture',picture.bytes)              
                    formData.append('updated_at',currentDate())
                    formData.append('user_admin','Frazi')

                    formData.append('categoryid',categoryId)
                    formData.append('subcategoryid',subcategoryId)
                    formData.append('brandid',brandId)
                    formData.append('productid',productId)
                    
  
                var result= await postData('productdetail/edit_productdetail_icon',formData)
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
                 fetchAllProductdetail()
        } 



const productdetailDelete=async()=>{
               setLoadingStatus(true)
               var body={'productdetailid':productdetailId}
         
                var result= await postData('productdetail/delete_productdetail',body)
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
            fetchAllProductdetail()
          }




const handleDeleteProductdetail=async()=>{
          
               Swal.fire({
                 title: "Do you want to delete the Productdetail?",
                 showDenyButton: true,
                 showCancelButton: true,
                 confirmButtonText: "Delete",
                 denyButtonText: `Don't delete`
               }).then((result) => {
                 /* Read more about isConfirmed, isDenied below */
                 if (result.isConfirmed) {
         
                     productdetailDelete()
         
                 } else if (result.isDenied) {
                   Swal.fire("Productdetail not deleted", "", "info");
                 }
               });
         
             }
         



const showProductdetailDialog=()=>{
               return(<div>
                  <Dialog open={open} maxWidth="md">
     
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
                      {productdetailForm()}
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

                <Button onClick={handleDeleteProductdetail} variant="contained">Delete</Button>
     
                   </DialogActions>
                  </Dialog>
     
               </div>)
     
             }
 

/****************************Productdetail Table************************************/

function productdetailTable() {     
               return (
                      <div className={classes.root}>
                        <div className={classes.displayBox}>
                        <MaterialTable
                          title="Product Detail List"
                          columns={[

                              { title: 'Id', field:'productdetailid'},
                            { title: "Sub-Id's", render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.categoryname}<b>/</b>{rowData.subcategoryname}</div><div>{rowData.brandname}<b>/</b>{rowData.productname}</div></div>},
                            { title: 'About', render:(rowData)=><div style={{display:'flex',flexDirection:'column',fontSize:12}}><b><div>{rowData.weight} {rowData.weighttype}</div><div>{rowData.packagingtype} [{rowData.noofqty} Qty.]</div><div>Stock: {rowData.stock}</div></b></div>},
                            { title: 'Name', field: 'productdetailname'},  
                            { title: 'Price Status', render:(rowData)=><div style={{display:'flex',flexDirection:'column',fontSize:12}}><b><div><s>{rowData.price}&#8377;</s> {rowData.offerprice}&#8377;</div><div>{rowData.offertype}<b>/</b>{rowData.productstatus}</div></b></div>},
                            { title: 'Description', render:(rowData)=><div><textarea  style={{display:'flex',flexDirection:'column',fontSize:12, width:100, height:50}}>{rowData.productdetaildescription}</textarea></div> }, 
                            { title: 'Picture', render:(rowData)=><div><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:10}} /></div>},
                            
                          ]}
                          
                          data={productdetailList} 
                   
                          options={{ 
                              pageSize: 3,
                              pageSizeOptions: [3, 5, 10,{ value: productdetailList.length, label: 'All' }],
                             }}
                   
                          actions={[
                            {
                              icon: 'edit',
                              tooltip: 'Edit Productdetail',
                              onClick: (event, rowData) => handleOpenDialog(rowData)
                            },
                            {
                              icon: 'add',
                              tooltip: 'Add User',
                              isFreeAction: true,
                              onClick: (event) => navigate('/dashboard/productdetail')
                            }
                          ]}
                        />
                        </div>
                        </div>
                      )
               } 

/*********************************************/

       return(<div>
          {productdetailTable()}
          {showProductdetailDialog()}
       </div>)
   }