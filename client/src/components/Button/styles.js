import styled from 'styled-components'

export const RedButton = styled.button`
  border-radius: 5px;
  text-transform: uppercase;

  padding: 0 10px;
  color: var(--white);
  height: 40px;
  width: 120px;
  background-color: var(--red-high);
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    background-color: var(--red-strong);
  }
`
