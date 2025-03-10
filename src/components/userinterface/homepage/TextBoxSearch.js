import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import { Typography } from '@mui/material';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
export default function TextBoxSearch({ width = "40%" }) {
    const [open, setOpen] = useState(false)
    const [txt, setTxt] = useState("")

    function changeTxt(event) {
        setTxt(event.target.value);
        setOpen(true)
    }
    const clear = () => {

        //document.getElementById("txt").value = "";
        setTxt("");
        setOpen(false);
    }

    return (<div style={{ display: 'flex', alignItems: 'center', width: width, height: 50, background: '#0c5273', borderRadius: 25, opacity: 1 }}>
        <SearchIcon style={{ fontSize: 27, paddingLeft: 10 }} />
        <input value={txt} type='text' onChange={changeTxt} /* id="txt" */ style={{ width: '70%', height: 26, border: 0, borderWidth: 0, outline: 0, background: 'transparent', color: '#fff', fontSize: 18, marginLeft: 8 }} placeholder='Search Here...' />
        <style>
            {` 
                    ::placeholder { 
                        color: #fff; 
                        opacity: 0.92;
                    }`
            }
        </style>
        {/*<button onClick={clear}>Button</button>*/}
        {open ? <CancelIcon onClick={clear} style={{ fontSize: 25, padding: 12, marginLeft: 'auto' }} /> : <ListIcon style={{ fontSize: 30, padding: 12, marginLeft: 'auto' }} />}
    </div>)


}