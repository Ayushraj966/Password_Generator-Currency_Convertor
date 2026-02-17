import { useState, useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import InputBox from './Hook/Component/InputBox'
import useCurrencyInfo from './Hook/useCurrencyInfo'
// import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  /////BackGround Convertor
  // const [count, setCount] = useState(0)
  const [colour, setColor] = useState('black');

  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");


  /////Password Generator
  const passwordGeneator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(number) str += "0123456789";
    if(char) str += "!@#$%^&*()";

    for(let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);

  },[length, number, char, password]);

  useEffect(() => {
    passwordGeneator();
  },[length, number, char])

  const passRef = useRef(null);
  const copytoClipboard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,10);
    const copy = passRef.current.value.substring(0,10);
    window.navigator.clipboard.writeText(copy);

  },[password])


  ///// Currency Convertor

  const [from , setFrom] = useState("usd");
  const [to , setTo] = useState("inr");
  const [amount , setamount] = useState();
  const [converted , setConverted] = useState();

  const currencyInfo = useCurrencyInfo(from); 

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConverted(amount)
    setamount(converted)
  }

  const convert = () => {
    setConverted(amount * currencyInfo[to]);
  }



 
  return (
    <>

  {/* BackGround Convertor */}
  <div className='w-full h-screen duration-200' style={{backgroundColor: colour}}>

      <h1 className= 'p-4 rounded text-center text-2xl font-bold'>TailWind Test</h1>

      <div className='flex flex-wrap justify-center bottom-12 inset-x-0 px-2 overflow-hidden'>

        <div className='flex flex-wrap justify-center gap-3 shadow-xl px-3 py-2  text-black'>
          <button onClick={() => setColor("red")} className='outline-none px-4 py-1 rounded-3xl' style={{backgroundColor:"red"}}>Red</button>
          <button onClick={() => setColor("yellow")} className='outline-none px-4 py-1 rounded-3xl' style={{backgroundColor:"yellow"}}>Yellow</button>
          <button onClick={() => setColor("pink")} className='outline-none px-4 py-1 rounded-3xl' style={{backgroundColor:"pink"}}>Pink</button>
        </div>

      </div>


      {/* Password Generator*/}
          <div className='h-32 w-full max-w-md mx-auto shadow-md rouded-lg px-4 my-8 text-orange-500' style={{backgroundColor:" #242424"}}>
            
                <h1 className='text-4xl text-center my-3 pt-1'>Password Generator</h1>

                <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                  <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref= {passRef}/>
                  <button className='outline-none bg-blue-700 px-3 py-0.5 shrink-0' onClick={copytoClipboard}>Copy</button>
                </div>  

                <div className='flex text-sm gap-x-2'>

                  <div className='flex items-center gap-x-2'>
                    <input type="range" min= '6' max='100' value={length}  className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
                    <label>Length: {length}</label>
                  </div>

                  <div className='flex items-center gap-x-1'>
                    <input type="checkbox" defaultChecked={setNumber} onChange={(e) => {setNumber((prev) => !prev)}} />
                    <label>Number </label>
                  </div>
                  
                  <div className='flex items-center gap-x-1'>
                    <input type="checkbox" defaultChecked={setChar} onChange={(e) => {setChar((prev) => !prev)}} />
                    <label>Characters </label>
                  </div>

                </div>

          </div>
      
          {/* Currency Convertor*/}
          <div className='h-auto max-w-md mx-auto w-full'style={{backgroundColor:" #242424"}} >
            <h1 className='pt-3 text-4xl text-center my-3 text-orange-500'>Currency Convertor</h1>

            <div className='w-full'>
              <div className='w-full max-w-md mx-auto rounded-lg p-0'>

                    <form onSubmit={(e) => {e.preventDefault(); convert()}}>
                            <div className='w-full mb-1'>
                            <InputBox 
                            label="From"
                            amount = {amount}
                            currencyOptions={options} 
                            onCurrencyChange={(currency) => setFrom(currency)}
                            onAmountChange={(amount) => setamount(amount)}
                            selectCurrency={from}
                            />
                            </div>

                            <div className='relative w-full h-0.5 mt-2'>
                              <button type='button' onClick={swap}
                              className ='mt-3  absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 bg-gray-700 text-orange-500'>
                                Swap
                              </button>
                            </div>


                            <div className='w-full mt-1 mb-4'>
                              <InputBox
                              label="To"
                              amount = {converted}
                              currencyOptions={options} 
                              onCurrencyChange={(currency) => setTo(currency)}
                              // onAmountChange={}
                              selectCurrency={to}
                              amountDisable
                              />
                            </div>

                            <button type='submit' className='w-full bg-gray-700 text-orange-500 px-4 py-3 rounded-lg'>Convert {from.toUpperCase()} To {to.toUpperCase()}</button>
                    </form>
              </div>

            </div>
            
          </div>

  </div>
  </>
  )
}

export default App
