import { useState, useEffect, useRef } from 'react';
import { serverURL, getData, postData } from "../../../services/FetchNodeAdminServices";
import { Button, Divider, Paper } from '@mui/material';
import { Grid, TextField, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function OtpVerification() {
  const [overState, setOverState] = useState('#b5b5b5')
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const mobileno = location?.state?.phoneNumber;
  const genOtp=location?.state?.genOtp1

  const emptyArr = ['', '', '', '', '', '']
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const [inputs, setInputs] = useState(emptyArr)
  const [missing, setMissing] = useState(emptyArr);
  //const CODE = '123456'
  
  /*  
  const handleVerify=async()=>{
              
          if(otp==genOtp)
             {
                   var response=await postData('userInterface/check_user_mobileno',{mobileno})
                   if(response.status)
                   {
                     dispatch({type:"ADD_USER",payload:[response.data.userid,response.data]})
                     var res=await postData('userInterface/check_user_address',{userid:response.data.userid})
              //alert(res.status)
              if(res.status)
              {
               // alert(JSON.stringify(res.data))
                  var userDataWithAddress={...response.data,...res?.data[0]}
                dispatch({type:"ADD_USER",payload:[response.data.userid,userDataWithAddress]})
               
              }
             
                     navigate('/mycart')
                   }
                   else
                   {
                       navigate('/signup',{state:{mobileno}})
                   }
  
                  }
                  else
                  {
                    alert("Invalid Otp.........")
                  }
          }*/





  const handleInputChange = (e, index) => {
    const val = e.target.value
    setMissing('')
    if (!Number(val)) {
      return;
    }

    if (index < inputs.length - 1) {
      refs[index + 1].current.focus()
    }

    const copyInputs = [...inputs]
    copyInputs[index] = val
    setInputs(copyInputs)
  }

  const handleOnKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs]
      copyInputs[index] = '';
      setInputs(copyInputs)

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  }

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text')
    if (!Number(data) || data.length !== inputs.length)
      return;
    const pastCode = data.split('');
    setInputs(pastCode)
    refs[inputs.length - 1].current.focus();
  }


  const handleSubmit = async () => {
    const missed = inputs.map((item, i) => {
      if (item === '')
        return i;
    }).filter((item) => (item || item === 0));

    setMissing(missed)

    if (missed.length) {
      alert('Please submit your OTP......')
      return;
    }

    const userInput = inputs.join('');
    if (userInput === genOtp) {
      
      var response = await postData('userInterface/check_user_mobileno', { mobileno })
      if (response.status) {
        dispatch({ type: "ADD_USER", payload: [response.data.userid, response.data] })
        var res = await postData('userInterface/check_user_address', { userid: response.data.userid })

        if (res.status) {

          var userDataWithAddress = { ...response.data, ...res?.data[0] }
          dispatch({ type: "ADD_USER", payload: [response.data.userid, userDataWithAddress] })

        }

        navigate('/mycart')
      }
      else {
        navigate('/signup', { state: { mobileno } })
      }

    }
    else {
      alert("Invalid Otp.....sanjay....")
    }

  }



  return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Paper elevation={3} style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', height: 600, width: 450, marginTop: 40, borderRadius: 24 }}>
      <Grid container>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
            <ArrowBackIosIcon style={{ marginTop: 25, marginLeft: 30, fontSize: 25 }} />
          </div>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: 25, }}>
          <span style={{ display: 'flex', alignSelf: 'flex-start', marginTop: 20, marginBottom: 10, fontWeight: 900, textTransform: 'none', fontSize: '1.8rem', letterSpacing: -.72, lineHeight: 1.166666666 }}>
            OTP verification
          </span>
          <span style={{ padding: 1, marginLeft: '0rem', fontWeight: 500, textTransform: 'none', fontSize: '1.2rem', letterSpacing: -.72, lineHeight: 1.166666666, color: 'rgba(0, 0, 0, .65)' }}>
            Enter the OTP sent to you on<br /><b>+91-{mobileno}</b>
            <span style={{ marginLeft: 5, marginRight: 5, width: 20, fontWeight: 700, textTransform: 'none', fontSize: '1.2rem', letterSpacing: -.72, lineHeight: 1.166666666, color: '#0a2885' }}>Change number</span>
          </span>
        </Grid>

        <Grid item xs={12}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 22, marginTop: 50 }}>
            <div style={{ display: 'flex', marginRight: 10, alignItems: 'center', width: '100%', height: '1.5em', fontWeight: 500, fontSize: '1.2rem', letterSpacing: -.72, lineHeight: 1.166666666, color: '#141414' }} >
              {
                emptyArr.map((item, i) => {

                  var ch = (missing.includes(i) ? '3px solid red' : '3px solid #141414')
                  return <input
                    key={i}
                    value={inputs[i]}
                    ref={refs[i]}
                    type='text'
                    maxLength={1}
                    style={{ borderBottom: ch, outlineWidth: 0, borderTop: 0, borderRight: 0, borderLeft: 0, width: '45px', height: '50px', margin: '10px', fontWeight: 500, fontSize: '30px', textAlign: 'center' }}
                    onChange={(e) => handleInputChange(e, i)}
                    onKeyDown={(e) => handleOnKeyDown(e, i)}
                    onPaste={handlePaste}
                  />

                })
              }
            </div>
            <div style={{ cursor: 'pointer', marginTop: 30, marginLeft: 280, fontWeight: 500, textTransform: 'none', fontWeight: 600, fontSize: '1.2rem', letterSpacing: -.72, lineHeight: 1.166666666, color: '#0a2885' }}>
              Resend OTP
            </div>
          </div>

        </Grid>

        <Grid item xs={12} sx={{ marginTop: 10, marginLeft: 2 }}>
          <Button onClick={handleSubmit} style={{ cursor: 'pointer', marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '95%', height: 50, border: `0.7px solid ${overState}`, background: '#0f3cc9', color: '#fff', fontSize: 18, fontWeight: 'bold', borderRadius: 30 }} /*onMouseUp={handleVerify}*/ fullWidth>
            Verify
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 2, marginLeft: 4.6, }}>
          <span style={{ padding: 1, marginLeft: '0rem', fontWeight: 500, textTransform: 'none', fontSize: '0.9rem', letterSpacing: -.06, lineHeight: 1.33333, color: 'rgba(0, 0, 0, .65)' }}>
            By continuing, you agree to our
            &nbsp;
            <span style={{ marginLeft: 5, marginRight: 5, width: 20, fontWeight: 500, textTransform: 'none', fontSize: '0.9rem', letterSpacing: -.06, lineHeight: 1.33333, color: '#0a2885' }}>
              Terms and Conditions of Use
            </span>,<span style={{ marginLeft: 5, marginRight: 5, width: 20, fontWeight: 500, textTransform: 'none', fontSize: '0.9rem', letterSpacing: -.06, lineHeight: 1.33333, color: '#0a2885' }}>
              Privacy Policy
            </span>and
            <span style={{ marginLeft: 5, marginRight: 5, width: 20, fontWeight: 500, textTransform: 'none', fontSize: '0.9rem', letterSpacing: -.06, lineHeight: 1.33333, color: '#0a2885' }}>
              Retail Account Privacy Policy
            </span>
          </span>
        </Grid>
      </Grid>
    </Paper>
  </div>)
}