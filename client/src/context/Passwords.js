import { useState, useContext, createContext } from 'react'

const PasswordsContext = createContext()

export default function PasswordsProvider({ children }) {
  let normal = 1
  let prioritary = 1

  const [allPass, setAllPass] = useState({
    normal: [],
    prioritary: [],
  })

  return (
    <PasswordsContext.Provider
      value={{ normal, prioritary, allPass, setAllPass }}
    >
      {children}
    </PasswordsContext.Provider>
  )
}

export function usePassword() {
  const context = useContext(PasswordsContext)

  const { normal, prioritary, allPass, setAllPass } = context

  return { normal, prioritary, allPass, setAllPass }
}
