import React, { createContext, useContext } from 'react';
import './App.css';
import {authenticateUser} from './DidHelper';
import Button from "./components/Button";
import { DidContextProvider, DidContext } from './DidContext';


const ConnectWallet = () => {
  console.log('You clicked on the button!');
  const {setDid} = useContext(DidContext);
  authenticateUser().then(
    (id) => {
      console.log('ConnectWallet: Connected with DID:', id)
      // setDid(id);
    },
    (err) => {
      console.error('ConnectWallet: Failed to authenticate:', err)
    }
  );

}

const DidConnectionStatus = () => {
  const {did} = useContext(DidContext);
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    ConnectWallet();
    setDid(did);
    console.log('setDid connected, button, did:', did);
  };

  return (
    <>
        <h1>Connected: {did} </h1>
        <button onClick={handleOnClick}>Connect to wallet</button> */}
     </>
  );
}

function App() {
  console.log("App, window.idx=", window.idx);
  console.log("App, window.did=", window.did);
  return (
    <>
      <h1>Colorful Custom Button Components</h1>
      <DidContextProvider>
        <DidConnectionStatus/>

      <Button 
        border="none"
        color="pink"
        height = "200px"
        onClick={ConnectWallet}
        radius = "50%"
        width = "200px"
        children = "I'm a pink circle!"
      />
      </DidContextProvider>
    </>
  );
}

export default App;
