import { useEffect, useState, useContext, createContext } from 'react'

import { apiPasswords } from '../api'

const PasswordsContext = createContext()

export default function PasswordsProvider({ children }) {
  const [allNormal, setAllNormal] = useState([])
  const [allPrioritary, setAllPrioritary] = useState([])

  const handlePasswords = () => {
    apiPasswords().then(response => {
      setAllNormal([...allNormal, response.data.normal])
      setAllPrioritary([...allPrioritary, response.data.prioritary])
      console.log('a')
    })
  }

  useEffect(() => {
    handlePasswords()
  }, [])

  return (
    <PasswordsContext.Provider
      value={{ allNormal, setAllNormal, allPrioritary, setAllPrioritary }}
    >
      {children}
    </PasswordsContext.Provider>
  )
}

export function usePassword() {
  const context = useContext(PasswordsContext)

  const { allNormal, setAllNormal, allPrioritary, setAllPrioritary } = context

  return { allNormal, setAllNormal, allPrioritary, setAllPrioritary }
}
