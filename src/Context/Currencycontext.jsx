import {  createContext, useContext, useState } from "react";

export const Currencycontext = createContext();

export const CurrencyProvider = ({ children }) =>{
   
   const [isLoding, setLoding] = useState(false)
   const [convertedBalance, setConvertedBalance] = useState(0)
    
      const convert = (from, to, amount) => {

        if (from === to) {
          setConvertedBalance(amount);
          return;
        }
    
        setLoding(true)
        
        fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
          .then((resp) => resp.json())
          .then((data) => {
            const convertedAmount = (amount * data.rates[to]).toFixed(2);
            setConvertedBalance(convertedAmount)
            setLoding(false)
          });
        }

    return (
        <Currencycontext.Provider value={{convert, isLoding, convertedBalance,}}>
            {children}
        </Currencycontext.Provider>
    );
};

export default function useCurrency(){
    return useContext(Currencycontext);
}