import React,{useState,useEffect} from 'react'
import axios from 'axios';

function Hdrop() {
    const [Hdrop, setHDrop] = useState([]);
    // console.log(Hdrop)
   useEffect(()=>{
    function hlocation(){
        axios.get('https://covid-4-lhxq.onrender.com/hlocation').then((res)=>{
            console.log(res.data)
            setHDrop(res.data)
        

            // console.log(Hdrop)
        }).catch((Err)=>{
            console.error(Err)
        })
    
    }
    hlocation()
   },[])
   
 
   
   
    
  return (
    <div style={{display:"flex", alignItems:'center'}}>
        <h2>HOSPITAL</h2>
       
        < select name="hlocation" id="hlocation" onChange={e=>setHDrop(e.target.value)}>
            
            {Hdrop.map((drops)=>(
                
                <option key={drops.centreid}  >{drops.name}</option>
            ))
                
            }
        </select>
        <button >search</button>
    </div>
    








  )
}

export default Hdrop