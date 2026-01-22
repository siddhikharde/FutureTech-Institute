import React from 'react'

function Input({type, placeholder, onChange, value}) {
  return (
  <input type={type} placeholder={placeholder} onChange={onChange} value={value} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-1 focus:ring-blue-500"/>
  )
}

export default Input
