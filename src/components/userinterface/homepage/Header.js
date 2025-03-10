import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../assets/logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextBoxSearch from './TextBoxSearch';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MyMenuBar from './MyMenuBar';
import MyDrawer from './MyDrawer';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  var cartData=useSelector(state=>state.cart)
  var user=useSelector(state=>state.user)
 
   var userData=Object.values(user)
   console.log('UUUUSSSEER:',userData)

  var keys=Object.keys(cartData)
  var navigate=useNavigate();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  
  const [open,setOpen]=useState(false)
const handleClick=()=>{
     setOpen(true)
    }
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >

        { matches?<div></div>:<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleClick} />
          </IconButton>}

         <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
          <Typography onClick={()=>navigate('/homepage')} variant="h6" component="div" style={{ cursor:'pointer', display:'flex', justifyContent:'center',alignItems:'center'}}>
            <div style={{width:62,height:62,borderRadius:15,background:'#81ecec',margin:8}}> <img src={logo} style={{width:65,height:65}} /> </div>
            <div style={{fontWeight:'bold', fontSize:25}}> Quickcomm</div>
          </Typography>

             {matches?<TextBoxSearch/>:<div></div>}

          <div >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={keys.length} color="secondary">
            <ShoppingCartIcon style={{fontSize:28}} onClick={()=>navigate('/mycart')} />
            </Badge>
          </IconButton>
    
          {matches?<IconButton
            //size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2}}
          >
            <AccountCircleIcon style={{fontSize:30}} />
            {userData?.length==0?<div style={{marginLeft:5,fontWeight:'bold',fontSize:18}}>Sign In</div>:<div style={{marginLeft:5,fontWeight:'bold',fontSize:18}}>{userData[0].firstname}</div>}
          </IconButton>:<div></div>}

          </div>
        </div>
        </Toolbar>
      </AppBar>

    {matches?<div></div>:
      <AppBar position="static" >
        <Toolbar>
          <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <TextBoxSearch width="90%"/>
          </div>
        </Toolbar>
      </AppBar>}

       
      { matches?<MyMenuBar/>:<div></div>}
       
       <MyDrawer open={open} setOpen={setOpen} />
    </Box>
  );
}
