import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { getData, postData } from '../../../services/FetchNodeAdminServices'
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MyMenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh,setRefresh]=useState(false)
  const [category, setCategory] = useState([])
  const [Subcategory, setSubCategory] = useState([])
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate=useNavigate()

  const handleMouseLeave = () => {
    setIsOpen(false);
    setAnchorEl(null);
    setRefresh(true)
  };


const fatchAllProductDetailsBySubCategory = async (subcategoryid) => {
  setAnchorEl(null);
  var result = await postData('userinterface/user_display_product_details_by_subcategory', { subcategoryid })
         navigate('/pagecategorydisplay',{state:{productData:result.data}});
}


 const handleClick=(event) => {
            setAnchorEl(event.currentTarget);
           fatchAllSubCategory(event.currentTarget.value)
           };

const handleMouseEnter = () => {
            setIsOpen(true);
            setRefresh(true)
          };
        


  const fatchAllSubCategory = async (categoryid) => {
    var result = await postData('userinterface/user_get_all_subcategory_by_categoryid', { categoryid })
    setSubCategory(result.data)
  }

  const fatchAllCategory = async () => {
    var body = { status: 'limit' }
    var result = await postData('userinterface/user_display_all_category', body)
    setCategory(result.data)
  }

  useEffect(() => {
    fatchAllCategory()
  }, [])

  const showCategoryMenu = () => {
    return category.map((item) => {
      return <Button value={item.categoryid} onMouseEnter={handleClick} style={{ width: '50%', color: '#fff', fontWeight: 'bold' }}>{item.categoryname}</Button>
    })
  }

  const showSubCategoryMenu = () => {
    return Subcategory.map((item) => {
      return <MenuItem onClick={()=>fatchAllProductDetailsBySubCategory(item.subcategoryid)} >{item.subcategoryname}</MenuItem>
    })
  }

  return (<div>
    <Box >
      <AppBar position="static" style={{ height: 50, background: '#0c5273' }}>
        <Toolbar onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  style={{ width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {showCategoryMenu()} 
          <Button style={{ width: '50%', color: '#fff', fontWeight: 'bold', marginRight: 50 }}>All Categories</Button>

          {isOpen && (  <Menu
            anchorEl={anchorEl}
            open={open}
             onClose={handleMouseLeave}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
         <div onMouseLeave={handleMouseLeave}>{showSubCategoryMenu()}</div>
          </Menu>
           )}

        </Toolbar>
      </AppBar>
    </Box>
  </div>)

}