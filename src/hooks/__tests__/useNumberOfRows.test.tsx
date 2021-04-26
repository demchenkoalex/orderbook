import { act, renderHook } from '@testing-library/react-hooks'
import { LayoutChangeEvent } from 'react-native'

import { ROW_HEIGHT } from '../../constants'
import { useNumberOfRows } from '../useNumberOfRows'

const height = 896

const onLayoutEvent: LayoutChangeEvent = {
  bubbles: false,
  cancelable: false,
  currentTarget: undefined,
  defaultPrevented: false,
  eventPhase: 0,
  isDefaultPrevented: jest.fn(),
  isPropagationStopped: jest.fn(),
  isTrusted: false,
  nativeEvent: {
    layout: { height, width: 414, x: 0, y: 0 },
  },
  persist: jest.fn(),
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  target: undefined,
  timeStamp: 0,
  type: 'type',
}

describe('useNumberOfRows', () => {
  it('returns correct number of rows', () => {
    expect.assertions(1)
    const { result } = renderHook(() => useNumberOfRows())
    act(() => {
      result.current.onLayout(onLayoutEvent)
    })
    expect(result.current.numberOfRows).toStrictEqual(
      Math.floor(height / ROW_HEIGHT)
    )
  })
})
