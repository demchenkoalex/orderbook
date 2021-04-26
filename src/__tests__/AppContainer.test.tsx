import { render } from '@testing-library/react-native'
import WS from 'jest-websocket-mock'
import React from 'react'
import { act } from 'react-test-renderer'

import AppContainer from '../AppContainer'

const deltaInsertMessage = {
  asks: [
    [10, 1000],
    [20, 1000],
  ],
  bids: [
    [1, 1000],
    [2, 1000],
  ],
}

const deltaRemoveMessage = {
  asks: [[10, 0]],
  bids: [[2, 0]],
}

const subscribeMessage = {
  event: 'subscribe',
  feed: 'book_ui_1',
  product_ids: ['PI_XBTUSD'],
}

describe('app container', () => {
  it('connects to the WebSocket and responds to different events', async () => {
    expect.assertions(8)
    const server = new WS('wss://www.cryptofacilities.com/ws/v1', {
      jsonProtocol: true,
    })

    const client = new WebSocket('wss://www.cryptofacilities.com/ws/v1')
    const { getByText, getByTestId, findByText } = render(<AppContainer />)

    const activityIndicator = getByTestId('activityIndicator')
    expect(activityIndicator).toBeDefined()

    const spread = await findByText('Spread')
    expect(spread).toBeDefined()

    client.send(JSON.stringify(subscribeMessage))
    await expect(server).toReceiveMessage(subscribeMessage)

    act(() => {
      server.send(deltaInsertMessage)
    })

    const ask = getByText('10.00')
    expect(ask).toBeDefined()

    const bid = getByText('2.00')
    expect(bid).toBeDefined()

    const newSpread = getByText('8.00 Spread')
    expect(newSpread).toBeDefined()

    act(() => {
      server.send(deltaRemoveMessage)
    })

    const updatedSpread = getByText('19.00 Spread')
    expect(updatedSpread).toBeDefined()

    act(() => {
      server.send(null)
    })

    await act(async () => {
      server.error()
    })

    const closed = getByText('Connection closed')
    expect(closed).toBeDefined()
  })
})
