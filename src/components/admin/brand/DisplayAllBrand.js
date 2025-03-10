import {FormHelperText,FormControl,InputLabel,Select,MenuItem, IconButton, Grid, TextField,Avatar, Dialog,DialogContent,DialogActions, Button } from '@mui/material';
import { userStyle } from "./BrandCss"
import { useState,useEffect} from "react"
import MaterialTable from '@material-table/core';
import { LoadingButton } from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';
import logo from "F:/quickcomfronted/src/assets/logo.png"
import cart from "F:/quickcomfronted/src/assets/cart.png"
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import {  getData, serverURL,createDate,postData, currentDate } from "F:/quickcomfronted/src/services/FetchNodeAdminServices";


export default function DisplayAllBrand()
{       
               const navigate=useNavigate()
               const classes=userStyle()
               const [brandList,setBrandList]=useState([])
               const [open,setOpen]=useState(false)

/*********************Brand-Actions****************/
const [brandId,setBrandId]=useState('')
const [categoryId,setCategoryId]=useState('')
const [subcategoryId,setSubcategoryId]=useState('')
const [brandName,setBrandName]=useState('')
const [brandIcon,setBrandIcon]=useState({bytes:'',fileName:cart})
const [oldImage,setOldImage]=useState('')
const [loadingStatus,setLoadingStatus]=useState(false)
const [errorMessages,setErrorMessages]=useState({})
const [categoryList,setCategoryList]=useState([])
const [subcategoryList,setSubcategoryList]=useState([])
const [hideUploadButton,setHideUploadButton]=useState(false)

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
  

    

     const fetchAllSubcategory=async(cid)=>{
             var body={categoryid:cid}
               var result=await postData('subcategory/get_all_subcategory_by_categoryid',body)
               setSubcategoryList(result.data)
         }
         

       const  handleSubcategory=(cid)=>{
                  setCategoryId(cid)
                   fetchAllSubcategory(cid)
                   }

                   const  handleSubcategoryDialog=(did)=>{
                               fetchAllSubcategory(did)
                               }
  
      const fillSubcategory=()=>{    
        return subcategoryList.map((item)=>{
               return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
          })             
      }


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
                 if(brandName.length===0)
                 {
                  handleErrorMessages('brandName',"Pls input brandname..")
                  err=true
                 }
 
                 if(brandIcon.bytes.length===0)
                 {
                   handleErrorMessages('brandIcon',"Pls input brandicon..")
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
 
                  return err      
               }


const handleImage=(e)=>{
               handleErrorMessages('brandIcon',null)
               setBrandIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
               setHideUploadButton(true)
               }





const brandForm=()=>{
               return (
                         <Grid container spacing={2}>
                                 <Grid item xs={12}>
                                 <div className={classes.mainHeadingstyle}>
                                           <img src={logo} className={classes.imageStyle}/>
                                         
                                         <div className={classes.headingStyle}>
                                               Brands Register
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
                                         onChange={(e)=>setSubcategoryId(e.target.value)}>
               
                                           {fillSubcategory()}
               
                                       </Select>
                                       <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.subcategoryId}</div></FormHelperText>
                                      </FormControl>
               
                                  </Grid>
               
                                 <Grid item xs={12}>
                                    <TextField onFocus={()=>handleErrorMessages('brandName',null)} error={errorMessages?.brandName} helperText={errorMessages?.brandName} onChange={(e)=>setBrandName(e.target.value)} label="Brand Name" variant="outlined"  value={brandName} fullWidth/>
                                  </Grid>
               
                                  <Grid item xs={6} className={classes.center}>
                                     <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                     {hideUploadButton?<div>{showSaveCancelButton()}</div>:
                                      <Button variant="contained" component="label" style={{width:'100px'}}>Upload
                                             <input onChange={handleImage} hidden style={{width:'100px'}} type="file" accept="image/*" multiple/>
                                      </Button>}
                                      <div className={classes.errorMessageStyle}>{errorMessages?.brandIcon!=null?errorMessages?.brandIcon:<></>}</div>
               
                                      </div>
                                  </Grid>
                                  <Grid item xs={6} className={classes.center}>
                                       <Avatar style={{width:70,height:60}} src={brandIcon.fileName} variant="rounded" />
                                  </Grid>
                                           
                        </Grid>
                    )
       }
 
/***************************************************/

const fetchAllBrand=async()=>{
               var result=await getData('brand/display_all_brand')
          
      if(result.status)
      {
         setBrandList(result.data)
      }
      else
      {
       alert(result.message)
      }
     }

     
     useEffect(function(){
               fetchAllBrand()
      },[])

const handleCancelIcon=()=>{
               setBrandIcon({bytes:'',fileName:oldImage})
               setHideUploadButton(false)
              }
       


const handleCloseDialog=()=>{
               setOpen(false)
           }

const handleOpenDialog=(rowData)=>{
               setBrandId(rowData.brandid)
               setCategoryId(rowData.categoryid)
               handleSubcategoryDialog(rowData.categoryid)
               setSubcategoryId(rowData.subcategoryid) 

               setBrandName(rowData.brandname)
               setBrandIcon({bytes:'',fileName:`${serverURL}/images/${rowData.brandicon}`})
               setOldImage(`${serverURL}/images/${rowData.brandicon}`)
               setOpen(true)
       }


const handleEditData=async()=>{
            
               var err=validateData()
               if(err==false)
                 {
                  setLoadingStatus(true)
                  
               var body={'brandname':brandName,'updated_at':currentDate(),
                       'user_admin':'Frazi','brandid':brandId,'categoryid':categoryId,'subcategoryid':subcategoryId}
     
                   var result= await postData('brand/edit_brand_data',body)
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
               fetchAllBrand()
          }


const handleEditIcon=async()=>{
            
               setLoadingStatus(true)
          
               var formData=new FormData()
                  formData.append('brandicon',brandIcon.bytes)
                  formData.append('updated_at',currentDate())
                    formData.append('user_admin','Frazi')
                    formData.append('subcategoryid',subcategoryId)
                    formData.append('categoryid',categoryId)
                    formData.append('brandid',brandId)
  
                var result= await postData('brand/edit_brand_icon',formData)
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
                 fetchAllBrand()
        } 

 const brandDelete=async()=>{

               setLoadingStatus(true)
               var body={'brandid':brandId}
         
                var result= await postData('brand/delete_brand',body)
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
            fetchAllBrand()
          }



const handleDeleteBrand=async()=>{
          
               Swal.fire({
                 title: "Do you want to delete the Brand?",
                 showDenyButton: true,
                 showCancelButton: true,
                 confirmButtonText: "Delete",
                 denyButtonText: `Don't delete`
               }).then((result) => {
                 /* Read more about isConfirmed, isDenied below */
                 if (result.isConfirmed) {
         
                     brandDelete()
         
                 } else if (result.isDenied) {
                   Swal.fire("Brand not deleted", "", "info");
                 }
               });
         
             }
         






    const showBrandDialog=()=>{
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
                      {brandForm()}
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

                <Button onClick={handleDeleteBrand} variant="contained">Delete</Button>
     
                   </DialogActions>
                  </Dialog>
     
               </div>)
     
             }


/***********************Brand Table***********************/
   function brandTable(){
               return(<div className={classes.root}>
                 <div className={classes.displayBox}>

                 <MaterialTable
                   title="Brand List"
                   columns={[
                     { title: 'Id', field: 'brandid' },
                     { title: 'Category', field: 'categoryname' },
                     { title: 'Subcategory', field: 'subcategoryname' },
                     {title: 'Brand', field: 'brandname'},
                    { title: 'Create Update', render:(rowData)=><div style={{display:'flex',flexDirection:'column',fontSize:12}}><b><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></b></div>},
                     { title: 'Admin', field: 'user_admin'},
                     { title: 'Icon', render:(rowData)=><div><img src={`${serverURL}/images/${rowData.brandicon}`} style={{width:60,height:60,borderRadius:10}}  /></div>},
                     
                   ]}
                   
                   data={brandList} 
            
                   options={{ 
                       pageSize: 3,
                       pageSizeOptions: [3, 5, 10,{ value: brandList.length, label: 'All' }],
                      }}
            
                   actions={[
                     {
                       icon: 'edit',
                       tooltip: 'Edit Brand',
                       onClick: (event, rowData) => handleOpenDialog(rowData)
                     },
                     {
                      icon: 'add',
                      tooltip: 'Add User',
                      isFreeAction: true,
                      onClick: (event) => navigate('/dashboard/brand')
                    }
                   ]}
                 />

                 </div>
               </div>)
         }

/*********************************************************/
       return(<div>
               {brandTable()}
               {showBrandDialog()}
             </div>)
 }
