import React, { useState } from "react";
import "./App.scss";
import { authenticateUser } from "./DidHelper";
import { Button, Typography } from "@mui/material";
import StateProvider from "./Context";
import Profile from "./Components/Profile/Content";
import Grid from "@material-ui/core/Grid";

function App() {
  const [selected, setSelected] = useState(false);
  const [optionIndex, setIndex] = useState(0);
  const [connectedDID, setConnectedDID] = useState(
    "Click to connect your crypto wallet"
  );

  const connectDidWallet = () => {
    authenticateUser().then(
      (did) => {
        console.log("ConnectWallet: Connected with DID:", did);
        setConnectedDID(did);
      },
      (err) => {
        console.error("ConnectWallet: Failed to authenticate:", err);
      }
    );
  };
  const toggleSelected = (value: boolean) => {
    setSelected(value);
  };
  const setOptionIndex = (value: number) => {
    setIndex(value);
    setSelected(value ? true : false);
  };

  return (
    <>
      <div className="classes.root">
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={9} justify="center" style={{textAlign: "center"}}>
            <Button variant="contained" onClick={connectDidWallet}>
              <Typography style={{ textTransform: "none" }} align="center">
                {connectedDID}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={9}>
            <StateProvider.Provider
              value={{ selected, optionIndex, toggleSelected, setOptionIndex }}
            >
              <Profile />
            </StateProvider.Provider>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
