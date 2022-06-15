import React from 'react'
import Container from '../../components/Container'

import * as S from './style'

const DisplayTerminal = () => {
  return (
    <Container>
      <S.Wrapper>
        <S.Title>CURRENT PASSWORD</S.Title>
        <S.CurrentPassword>N1</S.CurrentPassword>
      </S.Wrapper>
    </Container>
  )
}

export default DisplayTerminal
