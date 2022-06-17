import React, { useState } from 'react'
import Container from '../../components/Container'
import io from 'socket.io-client'
import { usePassword } from '../../context/Passwords'

import * as S from './style'

const socket = io('http://localhost:8080', { transports: ['websocket'] })
socket.on('connect', () => console.log('[SOCKET] [DISPLAY] => New Connection'))

const DisplayTerminal = () => {
  const [password, setPassword] = useState()

  const { getData, allPasswords } = usePassword()

  const getPassword = () => {
    setPassword(allPasswords[allPasswords.length - 1])
  }

  socket.on('object.passwords', data => {
    getData(data)
  })

  socket.on('password.next', data => {
    getPassword()
  })

  return (
    <Container>
      <S.Wrapper>
        <S.Title>CURRENT PASSWORD</S.Title>
        <S.CurrentPassword>{password}</S.CurrentPassword>
      </S.Wrapper>
    </Container>
  )
}

export default DisplayTerminal
