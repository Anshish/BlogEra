import React,{useId} from 'react'

function Select({
    options,
    label,
    className='',
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select 
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black text-lg font-lg 
                outline-none focus:bg-gray-50 duration-200 border
                border-rose-800 border-2 w-full ${className}`}
        >
            {/* here we are mapping over the options and creating options values*/}
            {options?.map((option)=>(
                <option className='bg-[#e9d3c0] hover:bg-white' key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)