import { FormHelperText, FormControl, InputLabel, Select, MenuItem, IconButton, Grid, TextField, Avatar, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import { userStyle } from "F:/quickcomfronted/src/components/admin/subcategory/SubcategoryCss"
import logo from "F:/quickcomfronted/src/assets/logo.png"
import cart from "F:/quickcomfronted/src/assets/cart.png"
import { useState, useEffect } from "react"
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import MaterialTable from '@material-table/core';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { getData, serverURL, createDate, postData, currentDate } from "F:/quickcomfronted/src/services/FetchNodeAdminServices";

export default function DisplayAllSubcategory() {
  const navigate = useNavigate()
  const classes = userStyle()
  const [subcategoryList, setSubcategoryList] = useState([])
  const [open, setOpen] = useState(false)

  /************Subcategory Actions************/
  const [subcategoryId, setSubcategoryId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryName, setSubcategoryName] = useState('')
  const [subcategoryIcon, setSubcategoryIcon] = useState({ bytes: '', fileName: cart })
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [errorMessages, setErrorMessages] = useState({})
  const [hideUploadButton, setHideUploadButton] = useState(false)
  const [oldImage, setOldImage] = useState('')
  const [categoryList, setCategoryList] = useState([])


  const fetchAllCategory = async () => {
    var result = await getData('category/display_all_category')
    setCategoryList(result.data)
  }

  useEffect(function () {
    fetchAllCategory()
  }, [])

  const fillCategory = () => {
    return categoryList.map((item) => {
      return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
    })
  }


  const handleErrorMessages = (label, message) => {
    var msg = errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, ...msg }))
  }


  const showSaveCancelButton = () => {
    return (<div>
      <Button onClick={handleEditIcon} >Save</Button>
      <Button onClick={handleCancelIcon} >Cancel</Button>
    </div>)
  }


  const validateData = () => {
    var err = false
    if (subcategoryName.length == 0) {
      handleErrorMessages('subcategoryName', "Pls input subcategoryname..")
      err = true
    }

    if (categoryId.length == 0) {
      handleErrorMessages('categoryId', "Pls input categoryId..")
      err = true
    }

    /* if(subcategoryIcon.bytes.length==0)
      {
       handleErrorMessages('subcategoryIcon',"Pls input subcategoryicon..")
       err=true
      }*/
    return err
  }




  const handleImage = (e) => {
    handleErrorMessages('subcategoryIcon', null)
    setSubcategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
    setHideUploadButton(true)
  }


  const subcategoryForm = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.mainHeadingstyle}>
            <img src={logo} className={classes.imageStyle} />

            <div className={classes.headingStyle}>
              Subcategory Register
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>

          <FormControl fullWidth>
            {errorMessages?.categoryId ? <InputLabel><div className={classes.errorMessageStyle}>Category Id</div></InputLabel> : <InputLabel>Category Id</InputLabel>}

            <Select value={categoryId}
              onFocus={() => handleErrorMessages('categoryId', null)}
              error={errorMessages?.categoryId}
              label="Category Id"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {fillCategory()}
            </Select>
            <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField onFocus={() => handleErrorMessages('subcategoryName', null)} error={errorMessages?.subcategoryName} helperText={errorMessages?.subcategoryName} onChange={(e) => setSubcategoryName(e.target.value)} label="Subcategory Name" value={subcategoryName} fullWidth />
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            {hideUploadButton ? <div>{showSaveCancelButton()}</div> :
              <Button variant="contained" component="label" style={{ width: '100px' }}>Upload
                <input onChange={handleImage} hidden style={{ width: '100px' }} type="file" accept="image/*" multiple />
              </Button>}

            <div className={classes.errorMessageStyle}>{errorMessages?.subcategoryIcon != null ? errorMessages?.subcategoryIcon : <></>}</div>

          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar style={{ width: 70, height: 60 }} src={subcategoryIcon.fileName} variant="rounded" />
        </Grid>

      </Grid>
    )
  }

  /****************************************/


  const fetchAllSubcategory = async () => {
    var result = await getData('subcategory/display_all_subcategory')

    if (result.status) {
      setSubcategoryList(result.data)
    }
    else {
      alert(result.message)
    }
  }


  useEffect(function () {
    fetchAllSubcategory()
  }, [])


  const handleCancelIcon = () => {
    setSubcategoryIcon({ bytes: '', fileName: oldImage })
    setHideUploadButton(false)
  }


  const handleCloseDialog = () => {
    setOpen(false)
  }


  const handleOpenDialog = (rowData) => {
    setCategoryId(rowData.categoryid)
    setSubcategoryId(rowData.subcategoryid)
    setSubcategoryName(rowData.subcategoryname)
    setSubcategoryIcon({ bytes: '', fileName: `${serverURL}/images/${rowData.subcategoryicon}` })
    setOldImage(`${serverURL}/images/${rowData.subcategoryicon}`)
    setOpen(true)
  }




  const handleEditData = async () => {

    var err = validateData()
    if (err == false) {
      setLoadingStatus(true)

      var body = {
        'subcategoryname': subcategoryName, 'updated_at': currentDate(),
        'user_admin': 'Frazi', 'categoryid': categoryId, 'subcategoryid': subcategoryId
      }

      var result = await postData('subcategory/edit_subcategory_data', body)
      if (result.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      }
      else {
        Swal.fire({
          position: "top-end",
          icon: "Error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      }

      setLoadingStatus(false)

    }
    fetchAllSubcategory()
  }


  const handleEditIcon = async () => {

    setLoadingStatus(true)

    var formData = new FormData()
    formData.append('subcategoryicon', subcategoryIcon.bytes)
    formData.append('updated_at', currentDate())
    formData.append('user_admin', 'Frazi')
    formData.append('subcategoryid', subcategoryId)
    formData.append('categoryid', categoryId)

    var result = await postData('subcategory/edit_subcategory_icon', formData)
    if (result.status) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
    else {
      Swal.fire({
        position: "top-end",
        icon: "Error",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }

    setLoadingStatus(false)
    setHideUploadButton(false)
    fetchAllSubcategory()
  }



  const subcategoryDelete = async () => {

    setLoadingStatus(true)
    var body = { 'subcategoryid': subcategoryId }

    var result = await postData('subcategory/delete_subcategory', body)
    if (result.status) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });

      setOpen(false)

    }
    else {
      Swal.fire({
        position: "top-end",
        icon: "Error",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }

    setLoadingStatus(false)
    setHideUploadButton(false)
    fetchAllSubcategory()
  }


  const handleDeleteSubcategory = async () => {

    Swal.fire({
      title: "Do you want to delete the subcategory?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        subcategoryDelete()

      } else if (result.isDenied) {
        Swal.fire("Subcategory not deleted", "", "info");
      }
    });

  }




  const showSubcategoryDialog = () => {
    return (<div>
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
          {subcategoryForm()}
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

          <Button onClick={handleDeleteSubcategory} variant="contained">Delete</Button>

        </DialogActions>
      </Dialog>

    </div>)

  }


  /*****************Table*********/

  function subcategoryTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="Subcategory List"
            columns={[
              { title: 'Id', field: 'subcategoryid' },
              { title: 'Category', field: 'categoryname' },
              { title: 'Subcategory', field: 'subcategoryname' },
              { title: 'Create-Update', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },
              { title: 'Admin', field: 'user_admin' },
              { title: 'Icon', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.subcategoryicon}`} style={{ width: 60, height: 60, borderRadius: 10 }} /></div> },

            ]}

            data={subcategoryList}

            options={{
              pageSize: 3,
              pageSizeOptions: [3, 5, 10, { value: subcategoryList.length, label: 'All' }],
            }}

            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Subcategory',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/subcategory')
              }
            ]}
          />
        </div>
      </div>
    )
  }

  /*******************************/

  return (<div>
    {subcategoryTable()}
    {showSubcategoryDialog()}
  </div>)
}