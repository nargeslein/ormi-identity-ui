import React, { useState } from 'react';
import './App.css';
import {authenticateUser} from './DidHelper';
import Button from "./components/Button";
function App() {
  const [did, setDid] = useState('None');

  const connectDidWallet = () => {
  authenticateUser().then(
    (id) => {
      console.log('ConnectWallet: Connected with DID:', id);
      setDid(id);
    },
    (err) => {
      console.error('ConnectWallet: Failed to authenticate:', err)
    }
  );
}

  return (
    <>
      <h4>Connected: {did} </h4>
      <Button 
        border="none"
        color="aqua"
        height = "200px"
        onClick={connectDidWallet}
        radius = "50%"
        width = "200px"
        children = "Click to connect your crypto wallet."
      />
    </>
  );
}

export default App;
