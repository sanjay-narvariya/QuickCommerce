import { useState, useEffect, useRef } from 'react';
import { serverURL, getData, postData } from "../../../services/FetchNodeAdminServices";
import { Button, Divider, Paper } from '@mui/material';
import { Grid, TextField, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';



export default function AccountDetails() {

  const location=useLocation()
  const [mobileno,setMobileno]=useState(location.state.mobileno)
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastnameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  //const [date, setDate] = useState("");
  //const [error, setError] = useState(false);
  const [gender, setGender] = React.useState('female');
  const [snackBar,setSnackBar] = useState({open:false,message:''})
  const navigate=useNavigate()
  const dispatch=useDispatch()

  let data = new Date('')
  const [value1, setValue1] = useState(dayjs(data));

  const handleChange = (event) => {
    setGender(event.target.value);
  };


  const handleNameChange = e => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const handleLastNameChange = e => {
    setLastname(e.target.value);
    if (e.target.validity.valid) {
      setLastnameError(false);
    } else {
      setLastnameError(true);
    }
  };


  const handleEmailChange = e => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handleDateChange = (e) => {
    setValue1(e.target.value);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    var body={mobileno,firstname:name,lastname:lastname,emailaddress:email,dob:value1,gender}
    var response=await postData('userinterface/submit_user_data',body);
    if (e.target.checkValidity() && response.status) 
    {
      body['userid']=response.userid
      dispatch({type:"ADD_USER",payload:[response?.userid,body]})
      setSnackBar({message:response.message,open:true})
      navigate('/mycart')
    }
    else
    {
      setSnackBar({message:response.message,open:true})
    }
  };

const handleClose=()=>{
    setSnackBar({message:'',open:false})
}



  return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 500, height: 'auto', marginTop: 40, borderRadius: 24 }}>
      <Grid container style={{ marginLeft: 20 }}>
        <Grid item xs={12} style={{ marginLeft: 25, marginTop: 20, marginRight: 50 }}>
          <span style={{ display: 'flex', alignSelf: 'flex-start', marginBottom: 10, fontWeight: 900, textTransform: 'none', fontSize: '1.8rem', letterSpacing: -0.72, lineHeight: 1.1666666 }}>
            Setup your account
          </span>
          <span style={{ marginRight: 50, fontWeight: 500, textTransform: 'none', fontSize: '1.2rem', letterSpacing: -0.90, lineHeight: 1.16666, color: 'rgba(0, 0, 0, .65)' }}>
            Seamless onboarding, quick checkouts, and faster deliveries across <span style={{ marginLeft: 5, marginRight: 5, fontWeight: 600, textTransform: 'none', fontSize: '1.2rem', letterSpacing: -.72, lineHeight: 1.166666666, color: '#0a2885' }}>QuickComm.Mart</span>, A QuickComm and other Retail Platforms.
          </span>
        </Grid>




        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid item xs={12} style={{ marginLeft: 25, marginTop: 15, marginBottom: 10, width: '100%' }}>
            <TextField
              id="name"
              required
              label="First Name"
              value={name}
              placeholder="First Name"
              variant="standard"
              onChange={handleNameChange}
              error={nameError}
              inputProps={{
                pattern: "[A-Za-z ]+",
              }}
              helperText={
                nameError ? "Please enter your first name (letters and spaces only)" : ""
              }
              sx={{
                width: 400,
                "& .MuiInput-root": {
                  color: "rgba(0, 0, 0, .65)",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  // Bottom border
                  "&:before": {
                    borderColor: "rgba(0, 0, 0, .65)",
                    borderWidth: "3px",
                  },
                  // Border on focus
                  "&:after": {
                    borderColor: "#000067",
                    borderWidth: "4px",
                  },
                },
                // Label
                "& .MuiInputLabel-standard": {
                  color: "rgba(0, 0, 0, .65)",
                  fontWeight: "bold",
                  fontSize: 18,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: 25, marginTop: 15, marginBottom: 10, width: '100%' }}>
            <TextField
              id="surname"
              required
              label="Last Name"
              value={lastname}
              placeholder="Last Name"
              variant="standard"
              onChange={handleLastNameChange}
              error={lastnameError}
              inputProps={{
                pattern: "[A-Za-z ]+",
              }}
              helperText={
                lastnameError ? "Please enter your last name (letters and spaces only)" : ""
              }
              sx={{
                width: 400,
                "& .MuiInput-root": {
                  color: "rgba(0, 0, 0, .65)",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  // Bottom border
                  "&:before": {
                    borderColor: "rgba(0, 0, 0, .65)",
                    borderWidth: "3px",
                  },
                  // Border on focus
                  "&:after": {
                    borderColor: "#000067",
                    borderWidth: "4px",
                  },
                },
                // Label
                "& .MuiInputLabel-standard": {
                  color: "rgba(0, 0, 0, .65)",
                  fontWeight: "bold",
                  fontSize: 18,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: 25, marginTop: 25, marginBottom: 10, width: '100%' }}>
            <FormControl>
              <FormLabel style={{ fontWeight: 600, textTransform: 'none', fontSize: '1.1rem', letterSpacing: -0.90, lineHeight: 1.16666, color: '#141414' }}>Gender</FormLabel>
              <RadioGroup
                defaultValue="female"
                name="gender"
                value={gender}
                onChange={handleChange}
                sx={{ my: 1, display: 'flex', alignItems: 'center' }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
              >
                <span style={{ display: 'flex', marginRight: 30 }}> <FormControlLabel value="female" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 }, }} />} label={<span style={{ fontWeight: 600, textTransform: 'none', fontSize: 18, letterSpacing: -0.90, lineHeight: 1.16666, color: 'rgba(0, 0, 0, .65)' }}>Female</span>} /></span>
                <span style={{ display: 'flex', marginRight: 30 }}> <FormControlLabel value="male" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 }, }} />} label={<span style={{ fontWeight: 600, textTransform: 'none', fontSize: 18, letterSpacing: -0.90, lineHeight: 1.16666, color: 'rgba(0, 0, 0, .65)' }}>Male</span>} /></span>
                <span style={{ display: 'flex', marginRight: 10 }}><FormControlLabel value="other" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 }, }} />} label={<span style={{ fontWeight: 600, textTransform: 'none', fontSize: 18, letterSpacing: -0.90, lineHeight: 1.16666, color: 'rgba(0, 0, 0, .65)' }}>Others</span>} /></span>
              </RadioGroup>
            </FormControl>
          </Grid>



{/*

          <Grid item xs={12} style={{marginLeft:25,cursor:'pointer'}}>
            <LocalizationProvider  dateAdapter={AdapterDayjs} >
              <DatePicker label="Date of birth" value={value1}   onChange={handleDateChange}
                 slotProps={{cursor:'pointer', textField: { fullWidth: true, error:"",variant:"standard",  
                   sx:{
                  width: 400,
                  cursor:'pointer',
                  "& .MuiInput-root": {
                    color: "rgba(0, 0, 0, .65)",
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    // Bottom border
                    "&:before": {
                      borderColor: "rgba(0, 0, 0, .65)",
                      borderWidth: "3px",
                    },
                    // Border on focus
                    "&:after": {
                      borderColor: "#000067",
                      borderWidth: "4px",
                    },
                  },
                  // Label
                  "& .MuiInputLabel-standard": {
                    color: "rgba(0, 0, 0, .65)",
                    fontWeight: "bold",
                    fontSize: 18,
                  },
                }},
            
                 }}
              />
            </LocalizationProvider>
          </Grid>

*/}
          <Grid item xs={12} style={{ marginLeft: 25, marginTop: 15, marginBottom: 10, width: '100%' }}>
            <TextField
              required
              label="Date of Birth"
              placeholder="YY/MM/DD"
              value={value1}
              onChange={handleDateChange}
              inputProps={{
                type: "date",
              }}
              variant="standard"
              sx={{
                width: 400,
                "& .MuiInput-root": {
                  color: "rgba(0, 0, 0, .65)",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  // Bottom border
                  "&:before": {
                    borderColor: "rgba(0, 0, 0, .65)",
                    borderWidth: "3px",
                  },
                  // Border on focus
                  "&:after": {
                    borderColor: "#000067",
                    borderWidth: "4px",
                  },
                },
                // Label
                "& .MuiInputLabel-standard": {
                  color: "rgba(0, 0, 0, .65)",
                  fontWeight: "bold",
                  fontSize: 18,
                },
              }}
            />
          </Grid>
         {/* <Grid item xs={12} style={{ marginLeft: 25, marginTop: 15, marginBottom: 10, width: '100%' }}>
            <TextField
              required
              label="Date of birth"
              value={date}
              variant="standard"
              onChange={handleDateChange}
              error={dateError}
              helperText={dateError ? "Please enter a valid date" : ""}
              type='date'

              sx={{
                width: 400,
                "& .MuiInput-root": {
                  color: "rgba(0, 0, 0, .65)",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  // Bottom border
                  "&:before": {
                    borderColor: "rgba(0, 0, 0, .65)",
                    borderWidth: "3px",
                  },
                  // Border on focus
                  "&:after": {
                    borderColor: "#000067",
                    borderWidth: "4px",
                  },
                },
                // Label
                "& .MuiInputLabel-standard": {
                  color: "rgba(0, 0, 0, .65)",
                  fontWeight: "bold",
                  fontSize: 18,
                },
              }}
            />
          </Grid>
         */}





          <Grid item xs={12} style={{ marginLeft: 25, marginTop: 15, marginBottom: 10, width: '100%' }}>
            <TextField
              required
              label="Email ID"
              placeholder="...@gmail.com"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "Please enter a valid email" : ""}
              inputProps={{
                type: "email",
              }}
              variant="standard"
              sx={{
                width: 400,
                "& .MuiInput-root": {
                  color: "rgba(0, 0, 0, .65)",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  // Bottom border
                  "&:before": {
                    borderColor: "rgba(0, 0, 0, .65)",
                    borderWidth: "3px",
                  },
                  // Border on focus
                  "&:after": {
                    borderColor: "#000067",
                    borderWidth: "4px",
                  },
                },
                // Label
                "& .MuiInputLabel-standard": {
                  color: "rgba(0, 0, 0, .65)",
                  fontWeight: "bold",
                  fontSize: 18,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginLeft: 25, marginTop: 50, marginBottom: 10, width: '100%' }}>
            <Button fullWidth color="primary" type="submit" style={{ cursor: 'pointer', marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '95%', height: 50, border: `0.7px solid #b5b5b5`, background: '#0f3cc9', color: '#fff', fontSize: 18, fontWeight: 600, borderRadius: 30 }}>
              Continue
            </Button>
          </Grid>
        </Box>






        <Grid item xs={12} sx={{ marginTop: 1, marginBottom: 5, marginLeft: 4.5, marginRight: 2, }}>
          <span style={{ padding: 1, marginLeft: '0rem', fontWeight: 500, textTransform: 'none', fontSize: '0.9rem', letterSpacing: -.06, lineHeight: 1.33333, color: 'rgba(0, 0, 0, .65)' }}>
            By continuing, you agree to our &nbsp;
            <span style={{ marginLeft: 5, marginRight: 5, width: 20, fontWeight: 500, textTransform: 'none', fontSize: '0.9rem', letterSpacing: -.06, lineHeight: 1.33333, color: '#0a2885' }}>Terms and Conditions of Use</span>,<span style={{ marginLeft: 5, marginRight: 5, width: 20, fontWeight: 500, textTransform: 'none', fontSize: '0.9rem', letterSpacing: -.06, lineHeight: 1.33333, color: '#0a2885' }}>
              Privacy Policy
            </span>and
            <span style={{ marginLeft: 5, marginRight: 5, width: 20, fontWeight: 500, textTransform: 'none', fontSize: '0.9rem', letterSpacing: -.06, lineHeight: 1.33333, color: '#0a2885' }}>
              Retail Account Privacy Policy
            </span>
          </span>
        </Grid>
      </Grid>
    </Paper>
     

     
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={snackBar.open}
     autoHideDuration={5000}
     onClose={handleClose}
     message={snackBar.message}
     
     />

  </div>)
}