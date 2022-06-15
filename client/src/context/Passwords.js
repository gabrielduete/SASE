import { useState, useContext, createContext } from 'react'

const PasswordsContext = createContext()

export default function PasswordsProvider({ children }) {
  const [allPass, setAllPass] = useState()

  return (
    <PasswordsProvider.Provider value={{ allPass, setAllPass }}>
      {children}
    </PasswordsProvider.Provider>
  )
}

export function usePassword() {
  const context = useContext(PasswordsContext)

  const { allPass, setAllPass } = context

  return { allPass, setAllPass }
}
