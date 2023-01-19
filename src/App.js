import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

var myHeaders = new Headers();
myHeaders.append("apikey", "ahpfUB1U5gX3fQm30w6cQQX269cWbLb0");
const BASE_URL = "https://api.exchangerate.host/"; 


// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow',
//   headers: myHeaders
// };

function App() {
  const [currencySymbols, setCurrencySymbols] = useState([])
  const [fromCurrency, setFromCurrency] =useState()
  const [toCurrency, setToCurrency] =useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amt, setAmt] = useState(0)
  const [amtInFromCurrency, setAmtInFromCurrency] = useState(true)

  let fromAmt, toAmt;

  if(amtInFromCurrency){
    fromAmt = amt
    toAmt = amt * exchangeRate
  }else{
    toAmt = amt
    fromAmt = amt/exchangeRate
  }

  useEffect(()=>{
    fetch(`${BASE_URL}/latest`)
    .then(res => res.json())
    .then(data=> {
      const firstCurrency = Object.keys(data.rates)[0]
      console.log(data)
      console.log(firstCurrency)
      setCurrencySymbols([...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })

  }, [])

  useEffect(()=>{
    if(fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}convert?from=${fromCurrency}&to=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (e)=>{
    setAmt(e.target.value)
    setAmtInFromCurrency(true)
  }

  const handleToAmountChange = (e)=>{
    setAmt(e.target.value)
    setAmtInFromCurrency(false)
  }

  return (
    <>
      <h1>Convert<span>R</span></h1>
      <CurrencyRow 
        currencySymbols={currencySymbols}
        // selectedCurrency={fromCurrency}
        onChangeCurrency={e=>setFromCurrency(e.target.value)}
        amt={fromAmt}
        onChangeAmt={handleFromAmountChange}
      />
      <div className="equal">=</div>
      <CurrencyRow 
        currencySymbols={currencySymbols} 
        // selectedCurrency={toCurrency}
        onChangeCurrency={e=>setToCurrency(e.target.value)}
        amt={toAmt}
        onChangeAmt={handleToAmountChange}
      />
    </>
  );
}

export default App;
