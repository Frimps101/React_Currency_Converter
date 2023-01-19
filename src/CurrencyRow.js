import React from 'react'

export default function CurrencyRow(props) {
    const {currencySymbols, selectedCurrency, OnChangeCurency, amt, onChangeAmt} = props
     
  return (
    <div>
      <input type="number" className="input" value={amt} onChange={onChangeAmt}/>
      <select 
        // value={selectedCurrency} 
        onChange={OnChangeCurency}
        >
        {currencySymbols.map((option)=>(
            <option key={option} value={option}>{option}</option>
        ))}  
      </select>
    </div>
  )
}
