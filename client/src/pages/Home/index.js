import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/Container'
import Button from '../../components/Button'

const Home = () => {
  const navigate = useNavigate()

  const handleNavigate = path => {
    navigate(path)
  }

  return (
    <Container>
      <Button onClick={() => handleNavigate('/password')}>
        Password Terminal
      </Button>
      <Button onClick={() => handleNavigate('/service')}>
        Service Terminal
      </Button>
      <Button onClick={() => handleNavigate('/display')}>
        Display Terminal
      </Button>
    </Container>
  )
}

export default Home
