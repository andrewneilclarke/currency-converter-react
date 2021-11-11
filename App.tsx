import { useState, useEffect } from 'react'
import Currencyrow from './Currencyrow';
import './App.css';

interface CurrencyRowProps {
  currencyRowProps: {
    currencyOptions: string[];
    baseCurrency: string;
    toCurrency?: string;
    fromCurrency?: string;
    amount: number;
  }

}

const App: React.FC = (props: CurrencyRowProps) => {

  const URL_OPTION = 'EUR'
  const BASE_URL = `https://open.er-api.com/v6/latest/`;
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([])
  const [baseCurrency, setBaseCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [fromCurrency, setFromCurrency] = useState('')
  const [amount, setAmount] = useState(1)
  const [fromTo, setFromTo] = useState(true)
  const [exchangeRate, setExchangeRate] = useState<number | undefined>()

  useEffect(
    () => {
      fetch(`BASE_URL${URL_OPTION}`)
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
    },
    [])

  useEffect(() => {
    if (toCurrency != null && fromCurrency != null) {
      fetch(`${BASE_URL}${fromCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [toCurrency, fromCurrency])

  let toAmount, fromAmount;
  if (fromTo) {
    fromAmount = amount
    toAmount = amount * exchangeRate!
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate!
  }

  const handleFromAmountChange = (e: any) => {
    setAmount(e.target.value)
    setFromTo(true)
  }
  const handleToAmountChange = (e: any) => {
    setAmount(e.target.value)
    setFromTo(false)
  }

  return (
    <>
      {/* <h1>Convert</h1>
      <Currencyrow currencyOptions={currencyOptions} baseCurrency={baseCurrency} selectCurrency={fromCurrency} amount={fromAmount} handlechange={(e: any) => setFromCurrency(e.target.value)} onChangeAmount={handleFromAmountChange} />
      <h1 className="equals">=</h1>
      <Currencyrow currencyOptions={currencyOptions} baseCurrency={baseCurrency} selectCurrency={toCurrency} amount={toAmount} handlechange={(e: any) => setToCurrency(e.target.value)} onChangeAmount={handleToAmountChange} /> */}

      <Currencyrow currencyRowProps={data} />
    </>
  );
}

export default App;
