import React, { useState } from "react";
import "./App.scss";
import { authenticateUser } from "./DidHelper";
import { Button, Typography } from "@mui/material";
import StateProvider from "./Context";
import ProfileMobile from "./Components/ProfileMobile/Content";

function App() {
  const [did, setDid] = useState("None");

  const connectDidWallet = () => {
    authenticateUser().then(
      (id) => {
        console.log("ConnectWallet: Connected with DID:", id);
        setDid(id);
      },
      (err) => {
        console.error("ConnectWallet: Failed to authenticate:", err);
      }
    );
  };
  const [selected, setSelected] = useState(false);
  const [key, setKey] = useState(0);
  const toggleSelected = (value: boolean) => {
    setSelected(value);
  };
  const toggleKey = (value: number) => {
    setKey(value);
    setSelected(value ? true : false);
  };

  return (
    <>
      <Typography variant="h5" component="body" align="center">
        Connected: {did}
      </Typography>
      ;
      <Button variant="contained" onClick={connectDidWallet}>
        Click to connect your crypto wallet
      </Button>
      <StateProvider.Provider
        value={{ selected, key, toggleSelected, toggleKey }}
      >
        <ProfileMobile />
      </StateProvider.Provider>
    </>
  );
}

export default App;
