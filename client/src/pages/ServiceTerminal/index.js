import React from 'react'
import Container from '../../components/Container/index'
import Button from '../../components/Button/index'
import * as S from './styles'

const ServiceTerminal = () => {
  return (
    <Container>
      <S.Wrapper>
        <h1>Hi!👋 You are answering the password</h1>
        <S.CurrentPassword>N1</S.CurrentPassword>
        <p>Click to the next service!</p>
        <Button>Next Password</Button>
      </S.Wrapper>
    </Container>
  )
}

export default ServiceTerminal
