import React, { useState } from 'react'
import io from 'socket.io-client'

import Container from '../../components/Container'
import Button from '../../components/Button'

import * as S from './styles'

const socket = io('http://localhost:8080', { transports: ['websocket'] })
socket.on('connect', () => console.log('[SOCKET] [USER] => New Connection'))

const PasswordTerminal = () => {
  const [currentPassword, setCurrentPassword] = useState()

  const selectPassword = category => {
    socket.emit('password.send', category)
  }

  socket.on('object.passwords', data => {
    const allPasswords = data['all']
    setCurrentPassword(allPasswords[allPasswords.length - 1])
  })

  return (
    <Container>
      <S.Wrapper>
        <h1>Hi!👋 Select you password</h1>

        <S.WrapperButtons>
          <Button onClick={() => selectPassword('normal')}>Normal</Button>
          <Button onClick={() => selectPassword('prioritary')}>
            Prioritary
          </Button>
        </S.WrapperButtons>
        {currentPassword !== undefined && (
          <S.CurrentPassword>
            Your passoword: <span>{currentPassword}</span>
          </S.CurrentPassword>
        )}
      </S.Wrapper>
    </Container>
  )
}

export default PasswordTerminal
