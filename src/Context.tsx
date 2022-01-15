import React from 'react'

interface IStateContext {
  selected: boolean;
  optionIndex: number;
  toggleSelected: (value: boolean) => void;
  setOptionIndex: (optionIndex: number) => void
}

const defaultStateContext : IStateContext = {
  selected: false,
  optionIndex: 0,
  toggleSelected: () => {console.log("default toggleSelected")},
  setOptionIndex: () => {console.log("default setOptionIndex")}
}

const StateContext = React.createContext<IStateContext>(defaultStateContext);

export default StateContext;