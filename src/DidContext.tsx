import React, { FC, createContext, useState } from "react";

interface IDidContext {
  did: string;
  setDid?: (did: string) => void;
}

const defaultDid = {
  did: "None",
};

export const DidContext = createContext<IDidContext>(defaultDid);

export const DidContextProvider: FC = ({ children }) => {
  const [connectedDid, setConnectedDid] = useState(defaultDid.did);

  const renderDid = (did: string) => {
    setConnectedDid(did);
  };

  // did: typeof window.idx === "undefined" ? "None" : window.idx.id,
  return (
    <DidContext.Provider
      value={{
        did: connectedDid,
        setDid: renderDid,
      }}
    >
      {children}
    </DidContext.Provider>
  );
};
