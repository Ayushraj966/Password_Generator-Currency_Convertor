import React from 'react'
import { useId } from 'react';

function InputBox({
  label, 
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  }) 
  {
   const amountId = useId();
  return (

  <div className='p-3 rounded-lg text-sm flex mt-0' style={{backgroundColor: "#242424"}}>

    <div className='w-1/2'>
        <label htmlFor='amountId' className="text-white/40 mb-2 inline-block">{label}</label>

        <input id='amountId' type="number" placeholder='Amout' disabled={amountDisable}  value={amount} 
        onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} 
        className='outline-none w-full bg-gray-900 py-1.5'/>
    </div>


    <div className='w-1/2 flex flex-wrap justify-end text-right'>
        <p className='text-orange-500 mb-2 w-full'> Currency Type</p>

        <select className='rounded-lg px-1 py-1 bg-gray-800 cursor-pointer outline-none'
        value={selectCurrency} disabled={currencyDisable}
        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} >
           
            {currencyOptions.map((currency) => (<option key={currency} value={currency}>{currency.toUpperCase()}</option>))}

        </select>
    </div>

  
   
  </div>
  )
}

export default InputBox;