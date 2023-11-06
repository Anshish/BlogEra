import React,{useId} from 'react'

// in this file we defined input component
// here we used forwardRef to get the ref from parent component
// we use forwardRef when parent component wants to access the
// states of child component
const Input=React.forwardRef(function Input({
    label,
    type='text',
    className='',
    ...props
},ref){
    const id=useId()
    return (
        <div className='w-full '>
            {
                label && <label 
                    className='inline-block mb-1 pl-1'
                    htmlFor={id}
                >
                    {label}    
                </label>
            }
            <input 
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black text-lg font-lg
                    outline-none focus:bg-gray-50 duration-200 border
                    border-rose-800 border-2 w-full ${className}`}
                ref={ref}
                id={id}  
                {...props}  
            />
        </div>
    )
})

export default Input