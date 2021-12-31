import React from 'react';
import './App.css';
import {authenticateUser} from './DidHelper';
import Button from "./components/Button";

function connectWallet() : void {
  console.log('You clicked on the button!');
  authenticateUser().then(
    (id) => {
      console.log('ConnectWallet: Connected with DID:', id)
    },
    (err) => {
      console.error('ConnectWallet: Failed to authenticate:', err)
    }
  );
}

function App() {
  return (
    <>
      <h1>Colorful Custom Button Components</h1>
      <Button 
        border="none"
        color="pink"
        height = "200px"
        onClick={connectWallet}
        radius = "50%"
        width = "200px"
        children = "I'm a pink circle!"
      />
    </>
  );
}

export default App;
