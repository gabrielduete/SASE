import React from 'react'

import { RedButton } from './styles'

const Button = ({ children, onClick }) => {
  return <RedButton onClick={onClick}>{children}</RedButton>
}

export default Button
