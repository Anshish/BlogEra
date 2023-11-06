import React from 'react'

// in this file we defined logo component
// called in Header.jsx and Footer.jsx
function Logo({classname,src}) {
  return (
    <div className={`w-36 ${classname}`}>
      <img src={`${src}`} alt="logo" className='rounded-3xl' />
    </div>
  )
}

export default Logo