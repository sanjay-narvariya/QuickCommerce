import { useEffect, useState } from "react"
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
export default function PlusMinusButton(props)
{     
    const [overState,setOverState]=useState('#b5b5b5')
    const [value,setValue]=useState(props.qty)
    //console.log(props.qty)

 useEffect(function(){
        setValue(props.qty)
    },[props.qty])
 
    const handlePlus=()=>{
       var v=value
        v++
        setValue(v)
        props.onChange(v)
    }

    const handleMinus=()=>{
       var v=value
        v--
        setValue(v)
        props.onChange(v)
    }


    return(<div>
        {value==0?<div onClick={handlePlus} onMouseLeave={()=>setOverState('#b5b5b5')} onMouseOver={()=>setOverState('#1f3d4c')} style={{cursor:'pointer',marginTop:20,display:'flex',justifyContent:'center',alignItems:'center',width:'80%',height:35,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5}}>
           Add
    </div>:
    <div style={{marginTop:20,marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',width:'80%',height:35,color:'#1f3d4c',fontSize:16,fontWeight:'bold'}}>
    
    <div onClick={handleMinus} style={{cursor:'pointer',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5}}><RemoveIcon/></div>
    <div>{value}</div>
    <div onClick={handlePlus} style={{cursor:'pointer',backgroundColor:'#0078ad',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,border:`0.7px solid ${overState}`,color:'#fff',fontSize:16,fontWeight:'bold',borderRadius:17.5}}><AddIcon/></div>
    </div>
}</div>)
}