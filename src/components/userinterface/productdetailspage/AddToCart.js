import { useState } from "react"
export default function AddToCart()
{
    const [overState,setOverState]=useState('#b5b5b5')
    const [value,setValue]=useState(0)
 
    const handlePlus=()=>{
       var v=value
        v++
        setValue(v)
    }

    const handleMinus=()=>{
       var v=value
        v--
        setValue(v)
    }


    return(<div >
        {value==0?<div onClick={handlePlus} onMouseLeave={()=>setOverState('#b5b5b5')} onMouseOver={()=>setOverState('#1f3d4c')} style={{cursor:'pointer',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:'80%',height:40,border:`0.7px solid ${overState}`, backgroundColor:'#0984e3',color:'#fff',fontSize:16,fontWeight:'bold',borderRadius:17.5}}>
          Add To Cart
    </div>:
    <div style={{marginLeft:70,marginTop:6,marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',width:'50%',height:35,color:'#1f3d4c',fontSize:18,fontWeight:'bold'}}>
    
    <div onClick={handleMinus} style={{cursor:'pointer',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:50,fontWeight:300,borderRadius:17.5}}><div style={{marginBottom:10}}>-</div></div>
    <div>{value}</div>
    <div onClick={handlePlus} style={{cursor:'pointer',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:40,fontWeight:300,borderRadius:17.5}}><div style={{marginBottom:10}}>+</div></div>
    </div>
}</div>)
}