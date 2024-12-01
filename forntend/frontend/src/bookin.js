import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";








function Bookin() {
    const[bookcentre,setbookcentre]=useState([]);
    const[id,setid]=useState('');
    let navigate = useNavigate();
    


    



    


async  function select(){
  await axios.get(`http://localhost:8081/booking`)
    .then((res)=>{
        console.log(res.data[0].cid)
        setid(res.data[0].cid)
       
        
    })
    
    
   }
    useEffect(()=>{
            display(id)

        },[id])



   select()
   async function display(centreid){
    try {
        const res = await axios.get(`http://localhost:8081/display/${centreid}`)
        if(res.data==='fail'){
            alert("no reservation")
        }
        else{
            console.log(res.data[0]);
            setbookcentre(res.data[0])
        }
    } catch (error) {
        console.error('Error:', error);
      
    }
}

function mail(){
    const x = "adhanush.eee2021@citchennai.net"
    const name=  bookcentre.name;
    const address=  bookcentre.name;

   
    axios.post(`http://localhost:8081/mail/${x}/${name}/${address}`)
    .then((res)=>{
        console.log(res.data);
        alert("s")
    })
}



function send(){

}

  
 


  return (
    <div className="bookin">
        <h1>YOUR APPOINMENT</h1>
        <br></br>
        <div className="bookout">
        <div className='booktable'>
        
        <h2 id='name'>Name: {bookcentre.name}</h2>
    <h2 id='location'>location: {bookcentre.location}</h2>
    <h2 id='address'>address: {bookcentre.address}</h2>
    <h2 id='time'>time: {bookcentre.optime}AM - {bookcentre.cltime}PM</h2>
    
    <div className="bookbtns">
    <button onClick={()=>{
        navigate('/home')
    }}> back</button>

    <button onClick={()=>{
        mail()
    }
    }>mail</button>

    
    </div>
    
     
    </div>
        </div>
        
    </div>
  )
}

export default Bookin