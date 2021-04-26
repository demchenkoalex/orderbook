import { useState } from 'react'
import { LayoutChangeEvent } from 'react-native'

import { ROW_HEIGHT } from '../constants'

export const useNumberOfRows = () => {
  const [numberOfRows, setNumberOfRows] = useState(0)

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setNumberOfRows(Math.floor(height / ROW_HEIGHT))
  }

  return { numberOfRows, onLayout }
}
