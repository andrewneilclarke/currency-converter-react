const Currencyrow = ({ currencyOptions, selectCurrency, amount, onChangeAmount, handlechange }) => {
    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount} />
            <select value={selectCurrency} onChange={handlechange}>
                {currencyOptions.map(option => (
                    <option value={option} key={option}>{option}</option>

                ))}
            </select>
        </div>
    )
}

export default Currencyrow
