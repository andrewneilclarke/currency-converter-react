
import './App.css';
import { useState, useEffect } from 'react'
import Currencyrow from './Currencyrow';


const App = () => {

  const URL_OPTION = 'EUR'
  const BASE_URL = `https://open.er-api.com/v6/latest/`;
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [baseCurrency, setBaseCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [fromCurrency, setFromCurrency] = useState('')
  const [amount, setAmount] = useState(1)
  const [fromTo, setFromTo] = useState(true)
  const [exchangeRate, setExchangeRate] = useState()

  useEffect(() => {
    try {
      fetch(`${BASE_URL}${URL_OPTION}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const nextCurrency = Object.keys(data.rates)[1]
          setCurrencyOptions([...Object.keys(data.rates)])
          setBaseCurrency(data.base_code)
          setFromCurrency(baseCurrency)
          setToCurrency(nextCurrency)
          setExchangeRate(data.rates[toCurrency])
        })
    }
    catch (err) {
      console.log('err')
    }
  },
    [])

  useEffect(() => {
    if (toCurrency != null && fromCurrency != null) {
      console.log(BASE_URL, fromCurrency)
      fetch(`${BASE_URL}${fromCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [toCurrency, fromCurrency])

  let toAmount, fromAmount;
  if (fromTo) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value)
    setFromTo(true)
  }
  const handleToAmountChange = (e) => {
    setAmount(e.target.value)
    setFromTo(false)
  }

  return (
    <>
      <h1>Convert</h1>
      <Currencyrow currencyOptions={currencyOptions} baseCurrency={baseCurrency} selectCurrency={fromCurrency} amount={fromAmount} handlechange={(e) => setFromCurrency(e.target.value)} onChangeAmount={handleFromAmountChange} />
      <h1 className="equals">=</h1>
      <Currencyrow currencyOptions={currencyOptions} baseCurrency={baseCurrency} selectCurrency={toCurrency} amount={toAmount} handlechange={(e) => setToCurrency(e.target.value)} onChangeAmount={handleToAmountChange} />
    </>
  );
}

export default App;
