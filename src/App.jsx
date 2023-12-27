import React, { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const passwordGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str +=  "!~`#$%^&*(){}[]@;>/|";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const passwordRef= useRef(null);


  const copyPasswordOnClipBoard= useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(()=>{
    passwordGenerate();
  }, [length,numberAllowed,characterAllowed,passwordGenerate])

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gray-800 my-8 p-5 rounded text-orange-500">
        <h1 className="text-white text-center my-4 text-4xl">
          Password Generate
        </h1>
        <div className="w-full flex items-center overflow-hidden rounded-lg mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-0.5 px-3 outline-none"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordOnClipBoard}
           className="bg-blue-500 text-white py-0.5 px-3 outline-none shrink-0">
            copy
          </button>
        </div>
        <div className="flex gap-x-2 text-sm">
          <div className="flex gap-x-1 items-center">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>length: ({length})</label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=> setNumberAllowed((prev)=> !prev)}
             />
            <label>Numbers</label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input type="checkbox" 
            defaultChecked={characterAllowed}
            id="characterInput"
            onChange={()=> setCharacterAllowed((prev)=> !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
