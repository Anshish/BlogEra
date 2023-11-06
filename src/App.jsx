import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components/index'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import './App.css'


function App() {

  // use this state to show loading screen
  const [loading, setloading] = useState(true)

  // this will help us to call reducers
  const dispath=useDispatch()

  // this will check if user is logged in or not
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){ // if user is logged in
        dispath(login({userData}))
      }else{ // if user is not logged out
        dispath(logout())
      }
    })
    .finally(()=>setloading(false)) // finally set loading to false
  },[])

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-[#1a1a1d] text-white'>
      <div className='w-full block'>
        <Header />
          <Outlet />
        <Footer />
      </div>
    </div>
  ):(null)
}

export default App
