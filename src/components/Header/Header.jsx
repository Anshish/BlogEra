import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Container,LogoutButton,Logo,} from '../index'


function Header() {
  // useSelector is used to get the state from redux store
  const authStatus =useSelector(state=>state.auth.status)

  // useNavigate is used to navigate to different routes
  const navigate = useNavigate()

  // navItems is used to store the navigation items
  // instead of hard coding individual button we made an array 
  // of objects and map over it to display the buttons who have 
  // active property trues
  const navItems=[
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {
      name:'Login',
      slug:'/login',
      active:!authStatus
    },
    {
      name:'Signup',
      slug:'/signup',
      active:!authStatus
    },
    {
      name:'All Posts',
      slug:'/all-posts',
      active:authStatus
    },
    {
      name:'Add Post',
      slug:'/add-post',
      active:authStatus
    },
  ]
  return (
    <header className='header py-3 shadow bg-[#1a1a1d] text-lg border-b-4'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' src='../../public/static/logo.png' />
            </Link>
          </div>
          <ul className='flex ml-auto mt-6'>
            {
              navItems.map((item)=>
                item.active?(
                  <li key={item.name}>
                    <button
                      onClick={()=>navigate(item.slug)}
                      className='inline-block px-6 py-2 duration-200
                        bg-[#6f2232] hover:bg-[#950740] rounded-full mx-2'
                    >
                      {item.name}
                    </button>
                  </li>
                ):null
              )
            }

            {/* if user is logged in then show logout button */}
            {
              authStatus && (
                <li>
                  <LogoutButton />
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header