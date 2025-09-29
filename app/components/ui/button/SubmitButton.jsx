import React, { Children } from 'react'

function SubmitButton({children,ClassName}) {
  return (
    <div className='flex justify-center'>
        <button 
        type='submit' 
        className={` bg-[var(--primary-color)] hover:bg-[#9e60d1;] cursor-pointer text-white font-bold py-3 px-6 rounded-full w-full shadow-md  ${ClassName}`}

        >
            {children}
        </button>
    </div>
  )
}

export default SubmitButton