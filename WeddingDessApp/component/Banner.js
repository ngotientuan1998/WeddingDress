import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Radius, Spacing } from '../constants'

const Banner = () => {
  return (
    <View style={styles.containerBanner}>
      <Image style={styles.img} source={require('../assets/images/dv1.jpg')}/>
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({
    containerBanner:{
        marginTop:Spacing.space_18
    },
    img:{
        width:'100%',
        height:350,
        borderRadius:Radius.rd_10
    }
})