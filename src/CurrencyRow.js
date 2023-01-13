import React from 'react'

export default function CurrencyRow(props) {
    const {currencySymbols} = props
  return (
    <div>
      <input type="number" className="input"/>
      <select>
        {currencySymbols.map((option)=>(
            <option key={option} value={option}>{option}</option>
        ))}  
      </select>
    </div>
  )
}
