import React from 'react'

interface IStateContext {
  selected: boolean;
  key: number;
  toggleSelected: (value: boolean) => void;
  toggleKey: (key: number) => void
}

const defaultStateContext : IStateContext = {
  selected: false,
  key: 0,
  toggleSelected: () => {console.log("default toggleSelected")},
  toggleKey: () => {console.log("default toggleKey")}
}

const StateContext = React.createContext<IStateContext>(defaultStateContext);

export default StateContext;