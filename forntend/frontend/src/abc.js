import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Abc() {
    const[value,setvalue]=useState('')
    const navigate = useNavigate();
  return (
    <>
    <div className='first'>
    <button style={{marginLeft:'80%'}}  id='abcbtn' onClick={()=>{
        navigate('/login')
    }}>login</button>
    <button style={{marginLeft:'0px'}} id='abcbtn' onClick={()=>{
      navigate('/signup')
    }}  >signup</button>

    </div>
    
   

    </>
  )
}

export default Abc