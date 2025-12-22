import React from 'react'

function UserBox({children,className = ""}) {
  return (
    <div className={`w-full  p-6 bg-white border border-[0.5px] border-gray-100 rounded-xl shadow-md ${className}`}>
        {children}
    </div>
  )
}

export default UserBox