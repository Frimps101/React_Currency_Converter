import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

var myHeaders = new Headers();
myHeaders.append("apikey", "ahpfUB1U5gX3fQm30w6cQQX269cWbLb0");
const BASE_URL = "https://api.apilayer.com/currency_data/convert?to=GHS&from=USD&amount=10";
const SYMBOLS_URL = "https://api.apilayer.com/currency_data/list";


var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

function App() {
  const [currencySymbols, setCurrencySymbols] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()

  useEffect(()=>{
    fetch(SYMBOLS_URL, requestOptions)
    .then(res => res.json())
    .then(data=> setCurrencySymbols(Object.keys(data.currencies)))

    // fetch(BASE_URL, requestOptions)
    // .then(res=> res.json())
    // .then(data=>{
    //   const fromData = data.
    // })

  }, [])
  return (
    <>
      <h1>Convert<span>R</span></h1>
      <CurrencyRow currencySymbols={currencySymbols} />
      <div className="equal">=</div>
      <CurrencyRow currencySymbols={currencySymbols} />
    </>
  );
}

export default App;
