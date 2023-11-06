import React, { useId } from 'react';

const InputFront = React.forwardRef(function Input({ label, type = 'text', className = '', ...props }, ref) {
  const id = useId();

  return (
    <div className='mb-4'>
      {label && (
        <label className='block text-white/80 mb-1' htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`block w-full px-4 py-3 rounded-lg bg-gray-900 text-white text-base font-medium
          outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
          border border-gray-600 ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default InputFront;
