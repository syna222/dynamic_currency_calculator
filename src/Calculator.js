import { useState, useEffect } from 'react';
import CurrencyInput from './CurrencyInput';

export default function Calculator(){

    const [value, setValue ] = useState("");
    const [currency, setCurrency] = useState("");   //declares where current input is coming from (which currency input)
    const [exchangeRates, setExchangeRates] = useState([]);     //better use useRef-Hook?

    function fetchRates(){
        const arrOfObjs = [{from: "EUR", to: "USD"}, {from: "EUR", to: "GBP"}, {from: "USD", to: "EUR"}, {from: "USD", to: "GBP"}, {from: "GBP", to: "EUR"}, {from: "GBP", to: "USD"}];
        for(let i in arrOfObjs){
            let from = arrOfObjs[i].from;
            let to = arrOfObjs[i].to;
            let fromTo = from + to;       //key for object to append to exchangeRates
            let URL = `https://api.exchangerate.host/convert?from=${from}&to=${to}`;
            //console.log(fromTo);
            //console.log(URL);
            //fetch stuff:
            fetch(URL)
            .then(response => response.json())   //turn response text to json and then to js object
            .then(json => {let arraySaved = exchangeRates; arraySaved.push({[fromTo] : json.result}); setExchangeRates(arraySaved)})   //save json.result (this is the current exchange rate) //fromTo needs to be in [] in order to set key of object with variable!
            .catch(error => console.log(error));
        }
    }

    useEffect(() => {
        fetchRates();
        console.log("these are the current exchange rates: ", exchangeRates);
    }, []);



    function convert(value, convertTo){
        const key = currency + convertTo;       //e.g. "EURUSD"
        //check if key is valid currency-expression:
        const validCurrencies = ["EURUSD", "EURGBP", "USDEUR", "USDGBP", "GBPEUR", "GBPUSD"];
        if(validCurrencies.includes(key)){
            //console.log("test, der key in convert() ist: ", key);
            //console.log("test, die exchangeRates sind: ", exchangeRates);
            const rate = exchangeRates.find(obj => obj[key])[key];     //returns value in exchangeRates in object like in {EURUSD: } 
            return value * rate;
        } else{
            return "";
        }
    }

    function handleClick(){                                //nicht die feine, englische, oder??
        const input_1 = document.getElementById("1");
        const input_2 = document.getElementById("2");
        const input_3 = document.getElementById("3");
        input_1.value = "";
        input_2.value = "";
        input_3.value = "";
    }

    //test:
    //console.log("state-var value: ", value);
    //console.log("state-var currency: ", currency);

    const euro = currency !== "EUR" ? convert(value, "EUR") : value;
    //console.log("euro:", euro);
    const usd = currency !== "USD" ? convert(value, "USD") : value;
    //console.log("usd: ", usd);
    const gbp = currency !== "GBP" ? convert(value, "GBP") : value;
    //console.log("gbp: ", gbp);

    return(
        <>
            <h1>Currency Converter: </h1>
            <CurrencyInput id="1" ownCurr="EUR" myVal={euro} setVal={setValue} setCurr={setCurrency}/>
            <br/>
            <CurrencyInput id="2" ownCurr="USD" myVal={usd} setVal={setValue} setCurr={setCurrency}/>
            <br/>
            <CurrencyInput id="3" ownCurr="GBP" myVal={gbp} setVal={setValue} setCurr={setCurrency}/>
            <br/>
            <button onClick={handleClick}>clear</button>
        </>
    );
}














