import React, { useState } from 'react'
import Container from '../../components/Container/index'
import Button from '../../components/Button/index'
import { usePassword } from '../../context/Passwords'
import io from 'socket.io-client'

import * as S from './styles'

const socket = io('http://localhost:8080', { transports: ['websocket'] })
socket.on('connect', () => console.log('[SOCKET] => New Connection'))

const ServiceTerminal = () => {
  const [password, setPassword] = useState()

  const { getData, allPasswords } = usePassword()

  const getPassword = () => {
    setPassword(allPasswords[allPasswords.length - 1])
  }

  const handleNextPassword = () => {
    socket.on('object.passwords', data => {
      getData(data)
    })

    socket.emit('password.next', true)

    getPassword()
  }

  return (
    <Container>
      <S.Wrapper>
        <h1>Hi!👋 You are answering the password</h1>
        <S.CurrentPassword>{password}</S.CurrentPassword>
        <p>Click to the next service!</p>
        <Button onClick={() => handleNextPassword()}>Next Password</Button>
      </S.Wrapper>
    </Container>
  )
}

export default ServiceTerminal
