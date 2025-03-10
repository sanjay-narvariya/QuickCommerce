import {FormHelperText,FormControl,InputLabel,Select,MenuItem, Button, Grid, TextField, Avatar} from "@mui/material"
import { userStyle } from 'F:/quickcomfronted/src/components/admin/product/ProductsCss'
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { useState,useEffect } from "react"
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";
import { postData, currentDate, getData,createDate} from "../../../services/FetchNodeAdminServices";

export default function Products(props)
{
       var classes=userStyle()
       
       const [productName,setProductName]=useState('')
       const [picture,setPicture]=useState({bytes:'',fileName:cart})
       const [productDescription,setProductDescription]=useState('')
       
       const [brandId,setBrandId]=useState('')
       const [subcategoryId,setSubcategoryId]=useState('')
       const [categoryId,setCategoryId]=useState('')
       const [errorMessages,setErrorMessages]=useState({})
       const [categoryList,setCategoryList]=useState([])
       const [subcategoryList,setSubcategoryList]=useState([])
       const [brandList,setBrandList]=useState([])
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

      const handleImage=(e)=>{
               handleErrorMessages('picture',null)
               setPicture({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
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


     const resetValue=()=>{
               setProductName('')
               setCategoryId('') 
               setSubcategoryId('')
               setBrandId('')  
               setPicture({bytes:'',fileName:cart})
               setProductDescription('')
               }
                        


      const handleSubmit=async()=>{
            
               var err=validateData()
               if(err===false)
                 {
                  setLoadingStatus(true)
                  var formData=new FormData()
                  formData.append('categoryid',categoryId)
                  formData.append('subcategoryid',subcategoryId)
                  formData.append('brandid',brandId)
                 
                  formData.append('productname',productName)
                  formData.append('picture',picture.bytes)
                  formData.append('productdescription',productDescription)
                  formData.append('created_at',currentDate())
                  formData.append('updated_at',currentDate())
                  formData.append('user_admin','Frazi')
           
                   var result= await postData('product/product_submit',formData)
                  if(result.status)
                  {
                       Swal.fire({
                           //  position: "top-end",
                             icon: "success",
                             title: result.message,
                             showConfirmButton: false,
                             timer: 2000,
                              toast:false
                           });
                  }
                  else
                  {
                       Swal.fire({
                            // position: "top-end",
                             icon: "Error",
                             title: result.message,
                             showConfirmButton: false,
                             timer: 2000,
                             toast:true
                           });
                  }
           
                  setLoadingStatus(false)
                  resetValue()
                 }
           }
           


   const handleReset=()=>{
               resetValue()
             }


       return (<div className={classes.root}>
               <div className={classes.box}>
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
                       <Button variant="contained" component="label" style={{width:'100px'}}>Upload
                              <input onChange={handleImage} hidden style={{width:'100px'}} type="file" accept="image/*" multiple/>
                       </Button>
                       <div className={classes.errorMessageStyle}>{errorMessages?.picture!=null?errorMessages?.picture:<></>}</div>

                       </div>
                   </Grid>
                   <Grid item xs={6} className={classes.center}>
                        <Avatar style={{width:70,height:60}} src={picture.fileName} variant="rounded" />
                   </Grid>

                   <Grid item xs={6} className={classes.center}>
                   <LoadingButton
                      loading={loadingStatus}
                      loadingPosition="start"
                       variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSubmit}
                       >
                         Save
                        </LoadingButton>
                   </Grid>
                   <Grid item xs={6} className={classes.center}>
                   <Button onClick={handleReset} variant="contained" style={{width:'100px'}}>Reset
                       </Button>
                   </Grid>


               
         </Grid>
       </div>
      </div>)

}