import * as React from 'react'
import { render } from '@testing-library/react'
import Home from '..'

describe('Home', () => {
  it('Should render the component', () => {
    const element = render(<Home />)   
    expect(element.getByText('Home component')).toBeInTheDocument()
  })
})
