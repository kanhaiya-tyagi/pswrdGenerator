import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [num, setNum] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState('')

  const pswrdRef = useRef(null)
  const copyPassword = useCallback(()=>{
    pswrdRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback( ()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(num) {
      str +='1234567890'
    }
    if(char) {
      str +='/-.,&%@!#$^*(){}[]~=<>?\|'
    }

    for(let i=0; i<length; i++) {
      let c = Math.floor(Math.random() * str.length +1)

      pass += str.charAt(c)
    }

    setPassword(pass)

  }, [length, num, char, setPassword])

  useEffect(()=>{passwordGenerator()},[length, num, char, passwordGenerator])

  return (
    <>
      <div className="container">
        <h1>PASSWORD GENERATOR</h1>
        <div className='ln1'>
          <input type="text" value={password} className='password' placeholder='PASSWORD' ref={pswrdRef} readOnly/>
          <button onClick={copyPassword}>COPY</button>
        </div>
        <div className="ln2">
          <div>
            <input type="range" value={length} onChange={(e)=>{setLength(e.target.value)}} name="length" className='length' min={6} max={20 }/>
            <label htmlFor="length">length: {length}</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={num} onChange={()=>{setNum((prev)=>!prev)}} name="numbers"/>
            <label htmlFor="numbers">numbers</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={char} onChange={()=>{setChar((prev)=>!prev)}} name="characters"/>
            <label htmlFor="characters">characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
