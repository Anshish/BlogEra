import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// this component is a protection layer
// this will be used in some other components to secure our flow
export default function Protected({children,authentication=true}) {
    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector(state=>state.auth.status)

    useEffect(()=>{
        // if(authStatus===true){
        //     navigate('/')
        // }else if(authStatus===false){
        //     navigate('/login')
        // }

        
        if(authentication && authStatus!==authentication){  // true && (false!==true)
            navigate('/login')
        }else if(!authentication && authStatus!==authentication){  // false && (true!==true)
            navigate('/')
        } 
        setLoader(false)
    },[authStatus,navigate,authentication])
  return (
    <div>
        {loader?<h1>Loading ... </h1>:<>{children}</>}
    </div>
  )
}

