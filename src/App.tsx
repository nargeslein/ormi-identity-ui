import React, { useState } from "react";
import "./App.scss";
import { authenticateUser, updateProfile } from "./DidHelper";
import { Button, Typography } from "@mui/material";
import StateProvider from "./Context";
import Profile from "./Components/Profile/Content";

function App() {
  const [did, setDid] = useState("None");

  const connectDidWallet = () => {
    authenticateUser().then(
      (id) => {
        console.log("ConnectWallet: Connected with DID:", id);
        setDid(id);
        // await updateProfile();
      },
      (err) => {
        console.error("ConnectWallet: Failed to authenticate:", err);
      }
    );
  };
  const [selected, setSelected] = useState(false);
  const [optionIndex, setIndex] = useState(0);
  const toggleSelected = (value: boolean) => {
    setSelected(value);
  };
  const setOptionIndex = (value: number) => {
    setIndex(value);
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
        value={{ selected, optionIndex, toggleSelected, setOptionIndex }}
      >
        <Profile />
      </StateProvider.Provider>
    </>
  );
}

export default App;
