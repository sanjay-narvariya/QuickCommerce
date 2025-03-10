import {FormHelperText,FormControl,InputLabel,Select,MenuItem, Button, Grid, TextField, Avatar} from "@mui/material"
import { userStyle } from "./SubcategoryCss"
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { useState,useEffect } from "react"
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";
import { postData, currentDate, getData } from "../../../services/FetchNodeAdminServices";


export default function Subcategory(props)
{
       var classes=userStyle()
   const [subcategoryName,setSubcategoryName]=useState('')
   const [categoryId,setCategoryId]=useState('')
   const [loadingStatus,setLoadingStatus]=useState(false)
   const [subcategoryIcon,setSubcategoryIcon]=useState({bytes:'',fileName:cart})
   const [errorMessages,setErrorMessages]=useState({})
   const [categoryList,setCategoryList]=useState([])
  
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

   const handleErrorMessages=(label,message)=>{
    var msg=errorMessages
    msg[label]=message
    setErrorMessages((prev)=>({...prev,...msg}))
  }

  const handleImage=(e)=>{
    handleErrorMessages('subcategoryIcon',null)
      setSubcategoryIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
   }

   const validateData=()=>{
    var err=false
     if(subcategoryName.length==0)
     {
      handleErrorMessages('subcategoryName',"Pls input subcategoryname..")
      err=true
     }

     if(categoryId.length==0)
      {
       handleErrorMessages('categoryId',"Pls input categoryId..")
       err=true
      }

     if(subcategoryIcon.bytes.length==0)
      {
       handleErrorMessages('subcategoryIcon',"Pls input subcategoryicon..")
       err=true
      }
      return err      
    }

    const resetValue=()=>{
      setSubcategoryName('') 
      setCategoryId('') 
      setSubcategoryIcon({bytes:'',fileName:cart})
      }

   const handleSubmit=async()=>{
            
    var err=validateData()
    if(err==false)
      {
       setLoadingStatus(true)
       var formData=new FormData()
       formData.append('subcategoryname',subcategoryName)
       formData.append('categoryid',categoryId)
       formData.append('subcategoryicon',subcategoryIcon.bytes)
       formData.append('created_at',currentDate())
       formData.append('updated_at',currentDate())
       formData.append('user_admin','Frazi')

        var result= await postData('subcategory/subcategory_submit',formData)
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
                                Subcategory Register
                    </div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    {/* <TextField  onFocus={()=>handleErrorMessages('categoryId',null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} onChange={(e)=>setCategoryId(e.target.value)} label="Category Id" value={categoryId} fullWidth /> */}

                       <FormControl fullWidth>
                       { errorMessages?.categoryId?<InputLabel><div className={classes.errorMessageStyle}>Category Id</div></InputLabel>:<InputLabel>Category Id</InputLabel> }
                        <Select value={categoryId}
                         onFocus={()=>handleErrorMessages('categoryId',null)}
                         error={errorMessages?.categoryId} 
                         label="Category Id"
                          onChange={(e)=>setCategoryId(e.target.value)}>

                            {fillCategory()}

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
                       </FormControl>

                   </Grid>
                  <Grid item xs={12}>
                     <TextField onFocus={()=>handleErrorMessages('subcategoryName',null)} error={errorMessages?.subcategoryName} helperText={errorMessages?.subcategoryName} onChange={(e)=>setSubcategoryName(e.target.value)} label="Subcategory Name" value={subcategoryName} fullWidth/>
                   </Grid>
                   <Grid item xs={6} className={classes.center}>
                      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                       <Button variant="contained" component="label" style={{width:'100px'}}>Upload
                              <input onChange={handleImage} hidden style={{width:'100px'}} type="file" accept="image/*" multiple/>
                       </Button>
                       <div className={classes.errorMessageStyle}>{errorMessages?.subcategoryIcon!=null?errorMessages?.subcategoryIcon:<></>}</div>

                       </div>
                   </Grid>
                   <Grid item xs={6} className={classes.center}>
                        <Avatar style={{width:70,height:60}} src={subcategoryIcon.fileName} variant="rounded" />
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