import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import BTree from 'sorted-btree'

import { Row } from './components'
import { useNumberOfRows } from './hooks'
import { colors } from './theme'

interface Props {
  asks: BTree<number, number>
  bids: BTree<number, number>
}

const App = ({ asks, bids }: Props) => {
  const { onLayout, numberOfRows } = useNumberOfRows()
  const totalAsksRef = useRef(0)
  const totalBidsRef = useRef(0)

  const renderAsks = () => {
    return asks.toArray(numberOfRows - 1).map((_, index, array) => {
      const ask = array[array.length - 1 - index]
      const total = array
        .slice(0, array.length - 1 - index)
        .reduce((acc, curr) => acc + curr[1], ask[1])

      if (index === 0) {
        totalAsksRef.current = total
      }

      return (
        <Row
          key={ask[0]}
          maxTotal={Math.max(totalAsksRef.current, totalBidsRef.current)}
          price={ask[0]}
          size={ask[1]}
          total={total}
          type='ASK'
        />
      )
    })
  }

  const renderBids = () => {
    let total = 0

    return bids.toArray(numberOfRows - 1).map((bid, index) => {
      total += bid[1]

      if (index === numberOfRows - 1) {
        totalBidsRef.current = total
      }

      return (
        <Row
          key={bid[0]}
          maxTotal={Math.max(totalAsksRef.current, totalBidsRef.current)}
          price={bid[0]}
          size={bid[1]}
          total={total}
          type='BID'
        />
      )
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Orderbook</Text>
      <View style={styles.sectionsContainer}>
        <Text style={styles.section}>Price</Text>
        <Text style={styles.section}>Size</Text>
        <Text style={styles.section}>Total</Text>
      </View>
      <View onLayout={onLayout} style={styles.asksContainer}>
        {renderAsks()}
      </View>
      <View style={styles.dividerContainer}>
        <Text style={styles.text}>
          {`${((asks.minKey() ?? 0) - (bids.minKey() ?? 0)).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
            }
          )} `}
          <Text style={styles.secondaryText}>Spread</Text>
        </Text>
        <Text style={styles.text}>
          <Text style={styles.secondaryText}>Group</Text> 0.50
        </Text>
      </View>
      <View style={styles.flex}>{renderBids()}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  asksContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  dividerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
  },
  flex: {
    flex: 1,
  },
  header: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
    marginLeft: 28,
  },
  secondaryText: {
    color: colors.secondaryText,
  },
  section: {
    color: colors.secondaryText,
    flex: 1,
    textAlign: 'center',
  },
  sectionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: colors.text,
  },
})

export default App
