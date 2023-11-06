import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

// in this file we defined logout button component
function LogoutButton() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    // logoutHandler function is used to logout the user
    const logoutHandler=()=>{
        // call logout function from authService
        authService.logout()
        .then(()=>{
            // dispatch logout action from authSlice
            dispatch(logout())
            navigate('/login')
        })
    }
  return (
    <button
        className='inline-block px-6 py-2 duration-200  text-white
        bg-[#6f2232] hover:bg-[#950740] rounded-full'
        onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutButton