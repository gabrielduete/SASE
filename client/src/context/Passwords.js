import { useState, useContext, createContext } from 'react'

const PasswordsContext = createContext()

export default function PasswordsProvider({ children }) {
  const [allNormal, setAllNormal] = useState([])
  const [allPrioritary, setAllPrioritary] = useState([])
  const [allPasswords, setAllPasswords] = useState([])

  const getData = data => {
    setAllNormal(data['normal'])
    setAllPrioritary(data['prioritary'])
    setAllPasswords(data['all'])
  }

  return (
    <PasswordsContext.Provider
      value={{
        getData,
        allNormal,
        setAllNormal,
        allPrioritary,
        setAllPrioritary,
        allPasswords,
        setAllPasswords,
      }}
    >
      {children}
    </PasswordsContext.Provider>
  )
}

export function usePassword() {
  const context = useContext(PasswordsContext)

  const {
    getData,
    allNormal,
    setAllNormal,
    allPrioritary,
    setAllPrioritary,
    allPasswords,
    setAllPasswords,
    nextPassword,
  } = context

  return {
    getData,
    allNormal,
    setAllNormal,
    allPrioritary,
    setAllPrioritary,
    allPasswords,
    setAllPasswords,
    nextPassword,
  }
}
