import React from 'react'
import {Link} from 'react-router-dom'
import appwriteService from '../appwrite/config'
 
// this component is used to display the post card in the home page
// when use click on the post card it will redirect to the post page
function PostCard({$id,title,image}) {  // NOTE: we use $id because id is a syntax in appwrite
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-[#4e4e50] hover:bg-[#363637] rounded-xl overflow-hidden'>
        <div className='relative h-0' style={{ paddingBottom: '75%' }}>
          {/* Use a padding percentage for aspect ratio, e.g., 75% for a 4:3 aspect ratio */}
          <img
            src={appwriteService.getFilePreview(image)}
            alt={title}
            className='absolute inset-0 w-full h-full object-cover rounded-t-xl'
          />
        </div>
        <div className='p-4'>
          <h2 className='text-2xl font-bold postcard'>{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard