import React, { memo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const rows = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['.', 0, 'X'],
]

const Numpad = memo(function Numpad({ width, height, onKeyPress }) {
  const horizontalPadding = 8
  const keyGap = 8
  const keyWidth = (width - horizontalPadding * 2 - keyGap * 2) / 3
  const keyHeight = (height - horizontalPadding * 2 - keyGap * 3) / 4

  return (
    <View style={[styles.pad, { width, height, padding: horizontalPadding }]}>
      {rows.map((row, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={[styles.row, { height: keyHeight, marginBottom: rowIndex < rows.length - 1 ? keyGap : 0 }]}
        >
          {row.map((value) => (
            <Pressable
              className = "w-28 h-13 z-19 pt-1 rounded-lg bg-white/20 items-center"
              key={value}
              accessibilityRole="button"
              accessibilityLabel={value === 'X' ? 'Delete' : `Enter ${value}`}
              onPress={() => onKeyPress(value)}
              android_ripple={{ color: 'rgba(255,255,255,0.18)' }}
              style={({ pressed }) => [
                styles.key,
                { width: keyWidth, height: keyHeight, borderRadius: Math.min(10, keyHeight / 3) },
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.keyText, { fontSize: Math.min(24, Math.max(18, keyHeight * 0.62)) }]}>
                {value}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  )
})

export default Numpad

const styles = StyleSheet.create({
  pad: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pressed: {
    opacity: 0.72,
  },
  keyText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
})
