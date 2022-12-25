
export default function CurrencyInput({id, ownCurr, myVal, setVal, setCurr}){


    function handleChange(e){       //e = event (here: onChange, target here: input)
        setVal(e.target.value);     //set parent's state-var "value" to value in this input field
        setCurr(ownCurr);           //set parent's state-var "currency" to currency of this input field
    }
    //test:
    //console.log("coming from input with currency: ", ownCurr, " myVal is: ", myVal);

    return (
        <div>
            <label>Enter value in {ownCurr}: </label>
            <input id={id} type="text" value={myVal} onChange={handleChange}/>       
        </div>);
}











