import { createContext, useState } from "react";

export const EscortContext = createContext({
  escortId: null,
  setEscortId: () => {},
  escortName: null,
  setEscortName: () => {},
  escortEmail: null,
  setEscortEmail: () => {}
})

export const EscortProvider = ({children}) => {

  const [escortId, setEscortId ] = useState(null)
  const [escortName, setEscortName ] = useState(null)
  const [escortEmail, setEscortEmail ] = useState(null)

  return <EscortContext.Provider value={{ escortId, setEscortId, escortName, setEscortName, escortEmail, setEscortEmail }} >{children}</EscortContext.Provider>
}