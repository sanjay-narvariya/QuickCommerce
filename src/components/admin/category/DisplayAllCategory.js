import {useState,useEffect} from 'react';
import { getData, serverURL,createDate} from '../../../services/FetchNodeAdminServices';
import MaterialTable from '@material-table/core';
import { userStyle } from './CategoryCss';
import { IconButton, Grid, TextField,Avatar, Dialog,DialogContent,DialogActions, Button } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import { postData,currentDate } from '../../../services/FetchNodeAdminServices';
import { useNavigate } from 'react-router-dom';

export default function DisplayAllCategory()
{      
  const navigate=useNavigate()
  const classes=userStyle()      
  const [categoryList,setCategoryList]=useState([])
  const [open,setOpen]=useState(false)

  /************Category Actions******/
  const [categoryId,setCategoryId]=useState('')
  const [categoryName,setCategoryName]=useState('')
            const [loadingStatus,setLoadingStatus]=useState(false)
           const [categoryIcon,setCategoryIcon]=useState({bytes:'',fileName:cart})
           const [errorMessages,setErrorMessages]=useState({})
           const [hideUploadButton,setHideUploadButton]=useState(false)
           const [oldImage,setOldImage]=useState('')

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
                   if(categoryName.length==0)
                   {
                    handleErrorMessages('categoryName',"Pls input categoryname..")
                    err=true
                   }

                /*   if(categoryIcon.bytes.length==0)
                    {
                     handleErrorMessages('categoryIcon',"Pls input categoryicon..")
                     err=true
                    }*/
                return err      
           }

           const handleImage=(e)=>{
                 handleErrorMessages('categoryIcon',null)
                 setCategoryIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
                 setHideUploadButton(true)
           }

      const categoryForm=()=>{
        return(
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.mainHeadingstyle}>
                <img src={logo} className={classes.imageStyle}/>
              
              <div className={classes.headingStyle}>
                    Category Register
              </div>
              </div>
            </Grid>

            <Grid item xs={12}>
                 <TextField value={categoryName} onFocus={()=>handleErrorMessages('categoryName',null)} error={errorMessages?.categoryName} helperText={errorMessages?.categoryName} onChange={(e)=>setCategoryName(e.target.value)} label="Category Name" fullWidth/>
            </Grid>
            <Grid item xs={6} className={classes.center}>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                  
                  {hideUploadButton?<div>{showSaveCancelButton()}</div>:
                  <Button variant="contained" component="label" >Upload
                        <input onChange={handleImage} hidden type="file" accept="image/*" multiple/>
                  </Button>}


                  <div className={classes.errorMessageStyle}>{errorMessages?.categoryIcon!=null?errorMessages?.categoryIcon:<></>}</div>
              </div>


            </Grid>
            <Grid item xs={6} className={classes.center}>
                  <Avatar src={categoryIcon.fileName} style={{width:70,height:70}} variant="rounded" />
            </Grid>

                                  
          </Grid>
        )
      }

  /**********************************/

      const fetchAllCategory=async()=>{
                 var result=await getData('category/display_all_category')
            
        if(result.status)
        {
           setCategoryList(result.data)
        }
        else
        {
         alert(result.message)
        }
      }

        useEffect(function(){
                 fetchAllCategory()
        },[])

        

      const handleCloseDialog=()=>{
          setOpen(false)
      }

      const handleCancelIcon=()=>{
        setCategoryIcon({bytes:'',fileName:oldImage})
        setHideUploadButton(false)
       }


        const handleOpenDialog=(rowData)=>{
                setCategoryId(rowData.categoryid)
                setCategoryName(rowData.categoryname)
                setCategoryIcon({bytes:'',fileName:`${serverURL}/images/${rowData.categoryicon}`})
                setOldImage(`${serverURL}/images/${rowData.categoryicon}`)
                setOpen(true)
        }

           
    const handleEditData=async()=>{
            
          var err=validateData()
          if(err==false)
            {
             setLoadingStatus(true)
             
          var body={'categoryname':categoryName,'updated_at':currentDate(),
                  'user_admin':'Frazi','categoryid':categoryId}

              var result= await postData('category/edit_category_data',body)
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
          fetchAllCategory()
     }



      const handleEditIcon=async()=>{
          
             setLoadingStatus(true)

             var formData=new FormData()
                formData.append('categoryicon',categoryIcon.bytes)
                formData.append('updated_at',currentDate())
                  formData.append('user_admin','Frazi')
                  formData.append('categoryid',categoryId)

              var result= await postData('category/edit_category_icon',formData)
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
          fetchAllCategory()
     }

  const categoryDelete=async()=>{

      setLoadingStatus(true)
      var body={'categoryid':categoryId}

       var result= await postData('category/delete_category',body)
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
   fetchAllCategory()
 }


     const handleDeleteCategory=async()=>{
          
      Swal.fire({
        title: "Do you want to delete the category?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't delete`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

            categoryDelete()

        } else if (result.isDenied) {
          Swal.fire("Category not deleted", "", "info");
        }
      });

    }



        const showCategoryDialog=()=>{
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
                 {categoryForm()}
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
           <Button onClick={handleDeleteCategory} variant="contained">Delete</Button>

              </DialogActions>
             </Dialog>

          </div>)

        }
       
 /*********Table******/ 


 function categoryTable() {
   return (
   <div className={classes.root}>
     <div className={classes.displayBox}>
     <MaterialTable
       title="Category List"
       columns={[
         { title: 'Id', field: 'categoryid' },
         { title: 'Name', field: 'categoryname' },
         { title: 'Create Update', render:(rowData)=><div style={{display:'flex',flexDirection:'column'}}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div>},
         { title: 'Admin', field: 'user_admin'},
         { title: 'Icon', render:(rowData)=><div><img src={`${serverURL}/images/${rowData.categoryicon}`} style={{width:60,height:60,borderRadius:10}} /></div>},
         
       ]}
       
       data={categoryList} 

       options={{ 
           pageSize: 3,
           pageSizeOptions: [3, 5, 10,{ value: categoryList.length, label: 'All' }],
          }}

       actions={[
         {
           icon: 'edit',
           tooltip: 'Edit Category',
           onClick: (event, rowData) => handleOpenDialog(rowData)
         },
         {
          icon: 'add',
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event) => navigate('/dashboard/category')
        }
       ]}
     />
     </div>
     </div>
   )
 }
 


 /********************/

   return (<div>
         {categoryTable()}
         {showCategoryDialog()}
   </div>)
}