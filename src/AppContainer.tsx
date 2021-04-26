import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import BTree from 'sorted-btree'

import App from './App'
import { colors } from './theme'

const AppContainer = () => {
  const wsRef = useRef<WebSocket | null>(null)

  const [asks, setAsks] = useState<BTree<number, number>>(
    new BTree<number, number>([], (a, b) => a - b)
  )

  const [bids, setBids] = useState<BTree<number, number>>(
    new BTree<number, number>([], (a, b) => b - a)
  )

  const [error, setError] = useState<string | undefined>()
  const [isClosed, setClosed] = useState(true)
  const [isLoading, setLoading] = useState(true)

  const handleClose = () => {
    resetData()
    setClosed(true)
    setLoading(false)
  }

  const handleError = (e: WebSocketErrorEvent) => {
    resetData()
    setClosed(true)
    setError(e.message)
    setLoading(false)
  }

  const handleMessage = (e: WebSocketMessageEvent) => {
    /* istanbul ignore next: not possible to send undefined data using WebSocket mock library */
    const data = JSON.parse(e.data ?? '')

    if (data?.asks?.length > 0) {
      setAsks((prevAsks) => {
        const newAsks = prevAsks.clone()
        for (const ask of data.asks as number[][]) {
          if (ask[1] === 0) {
            newAsks.delete(ask[0])
          } else {
            newAsks.set(ask[0], ask[1])
          }
        }

        return newAsks
      })
    }

    if (data?.bids?.length > 0) {
      setBids((prevBids) => {
        const newBids = prevBids.clone()
        for (const bid of data.bids as number[][]) {
          if (bid[1] === 0) {
            newBids.delete(bid[0])
          } else {
            newBids.set(bid[0], bid[1])
          }
        }

        return newBids
      })
    }
  }

  const handleOpen = () => {
    setClosed(false)
    setLoading(false)

    wsRef.current?.send(
      JSON.stringify({
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: ['PI_XBTUSD'],
      })
    )
  }

  const resetData = () => {
    asks.clear()
    bids.clear()
    wsRef.current?.close()
    wsRef.current = null
  }

  const setupWs = () => {
    setError(undefined)
    setLoading(true)

    wsRef.current = new WebSocket('wss://www.cryptofacilities.com/ws/v1')
    wsRef.current.onclose = handleClose
    wsRef.current.onerror = handleError
    wsRef.current.onmessage = handleMessage
    wsRef.current.onopen = handleOpen
  }

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true)

    setupWs()

    return resetData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color={colors.text} testID='activityIndicator' />
      </SafeAreaView>
    )
  }

  if (isClosed) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>
          {error
            ? /* istanbul ignore next: no option to set an error message using WebSocket mock library */
              `Connection closed with an error:\n${error}`
            : 'Connection closed'}
        </Text>
        <TouchableOpacity
          accessibilityRole='button'
          accessible
          onPress={setupWs}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  return <App asks={asks} bids={bids} />
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 16,
  },
  buttonText: {
    color: colors.bid,
    fontSize: 17,
    fontWeight: '500',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: colors.text,
    marginHorizontal: 24,
    textAlign: 'center',
  },
})

export default AppContainer
