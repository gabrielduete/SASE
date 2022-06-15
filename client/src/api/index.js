import axios from 'axios'

export const apiPasswords = () => {
  const response = axios.get('http://localhost:8877/passwords')

  return response
}

module.export = { apiPasswords }
