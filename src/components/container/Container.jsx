import React from 'react'

// in this file we defined container component
// in container we will just display children components 
// this component is used to add styling to the children components

function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
        {children}
    </div>
  )
}

export default Container