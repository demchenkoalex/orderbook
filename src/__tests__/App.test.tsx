import { render } from '@testing-library/react-native'
import React from 'react'
import BTree from 'sorted-btree'

import App from '../App'

jest.mock('../hooks', () => ({
  useNumberOfRows: () => ({ onLayout: jest.fn(), numberOfRows: 2 }),
}))

const defaultAsks = new BTree<number, number>(
  [
    [10, 500],
    [20, 1000],
  ],
  (a, b) => a - b
)

const defaultBids = new BTree<number, number>(
  [
    [1, 200],
    [2, 400],
  ],
  (a, b) => a - b
)

describe('app', () => {
  it('renders total correctly', () => {
    expect.assertions(1)
    const { getByText } = render(<App asks={defaultAsks} bids={defaultBids} />)
    const price = getByText('1,500')
    expect(price).toBeDefined()
  })
})
