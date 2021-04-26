import { render } from '@testing-library/react-native'
import React from 'react'

import { colors } from '../../theme'
import { Row } from '../Row'

describe('row', () => {
  it('renders ask with a correct color, format and fill', () => {
    expect.assertions(2)
    const { getByTestId, getByText } = render(
      <Row
        key={50}
        maxTotal={1000}
        price={50}
        size={100}
        total={100}
        type='ASK'
      />
    )
    const fill = getByTestId('fill')
    const price = getByText('50.00')
    expect(fill).toHaveProperty('props.style.width', '10%')
    expect(price).toHaveProperty('props.style.color', colors.ask)
  })

  it('renders bid with a correct color, format and fill', () => {
    expect.assertions(2)
    const { getByTestId, getByText } = render(
      <Row
        key={50000}
        maxTotal={1000}
        price={50000}
        size={2}
        total={2}
        type='BID'
      />
    )
    const fill = getByTestId('fill')
    const price = getByText('50,000.00')
    expect(fill).toHaveProperty('props.style.width', '0%')
    expect(price).toHaveProperty('props.style.color', colors.bid)
  })
})
