import React from 'react'
import io from 'socket.io-client'

import Container from '../../components/Container'
import Button from '../../components/Button'
import { usePassword } from '../../context/Passwords'

import * as S from './styles'

const socket = io('http://localhost:8080', { transports: ['websocket'] })
socket.on('connect', () => console.log('New Connection'))

const PasswordTerminal = () => {
  const selectPassword = category => {
    socket.emit('password.send', category)
  }

  const { allNormal, allPrioritary } = usePassword()

  console.log(allNormal[0])
  console.log(allPrioritary[0])

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
      </S.Wrapper>
    </Container>
  )
}

export default PasswordTerminal
