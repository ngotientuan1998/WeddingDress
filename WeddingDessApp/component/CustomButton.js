import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fontsizes, Radius, Spacing } from '../constants'

const CustomButton = ({props, onPress, label}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text {...props} style={styles.ladel}>{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  btn:{
    borderRadius: Radius.rd_10,
    paddingVertical: Spacing.space_15,
    backgroundColor: Colors.Pink,
    marginTop:Spacing.space_24
  },
  ladel:{
    fontSize: Fontsizes.fs_20,
    color: Colors.White,
    alignSelf: 'center'
  }
})