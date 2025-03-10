import { useEffect,useState } from 'react'
import Footer from '../homepage/Footer'
import Header from '../homepage/Header'
import ShowCategory from './ShowCategory'
import ProductDetailsCategory from '../pagedisplay/ProductDetailsCategory'
import { postData,getData } from '../../../services/FetchNodeAdminServices'
import { useLocation } from 'react-router-dom'

export default function PageCategoryDisplay()
{         
              const [category,setCategory]=useState([])
              const [refresh,setRefresh]=useState(false)
               var location=useLocation()
               var productData=location?.state?.productData
           // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:",productData[0].subcategoryid)

const fatchAllCategory = async () => {
                var result = await getData('userinterface/user_display_all_subcategory')
                setCategory(result.data)
              }
            
      useEffect(() => {
                fatchAllCategory()
              }, [])

       return(<div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
              
              <div>
              <Header />
              </div>

              <div style={{marginTop: 50,display: 'flex',flexDirection:'column',position: 'relative',backgroundColor: '#fff'}}>
                <span style={{display:'flex',backgroundColor: '#fff'}}>
                  <ShowCategory data={category} scid={productData[0]?.subcategoryid} key={1}/>
                 <ProductDetailsCategory refresh={refresh} setRefresh={setRefresh} productData={productData}/>
                 </span>
              </div>
             
              <div>
              <Footer/>
              </div>
             
         </div>)
}  