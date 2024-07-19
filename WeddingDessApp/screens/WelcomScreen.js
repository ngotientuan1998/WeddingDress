import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../component/CustomButton';
import { Colors } from '../constants';

const WelcomScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 5000)
  }, [])
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.jpg')} style={styles.img} ></Image>
    </View>
  )
}

export default WelcomScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.White
  },
  img:{
    width: 300,
     height: 300 
  }

})



