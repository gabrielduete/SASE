import React from 'react'
import Container from '../../components/Container'
import Button from '../../components/Button'

import * as S from './styles'

const PasswordTerminal = () => {
  return (
    <Container>
      <S.Wrapper>
        <h1>Hi!👋 Select you password</h1>
        <S.WrapperButtons>
          <Button>Normal</Button>
          <Button>Prioritary</Button>
        </S.WrapperButtons>
      </S.Wrapper>
    </Container>
  )
}

export default PasswordTerminal
