import React, { memo, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'

import { ROW_HEIGHT } from '../constants'
import { colors } from '../theme'

interface Props {
  maxTotal: number
  price: number
  size: number
  total: number
  type: 'ASK' | 'BID'
}

export const Row = memo(({ maxTotal, price, size, total, type }: Props) => {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      toValue: 1,
      useNativeDriver: true,
    }).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.container}>
      <View
        style={StyleSheet.flatten([
          styles.fill,
          {
            backgroundColor:
              type === 'ASK' ? `${colors.ask}33` : `${colors.bid}33`,
            width: `${Math.round((total * 100) / maxTotal)}%`,
          },
        ])}
        testID='fill'
      />
      <Animated.View
        style={StyleSheet.flatten([
          styles.animated,
          {
            opacity: opacity.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 0.1, 0],
            }),
          },
        ])}
      />
      <Text
        style={StyleSheet.flatten([
          styles.row,
          { color: type === 'ASK' ? colors.ask : colors.bid },
        ])}
      >
        {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </Text>
      <Text style={styles.row}>{size.toLocaleString()}</Text>
      <Text style={styles.row}>{total.toLocaleString()}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  animated: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.text,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: ROW_HEIGHT,
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
})
