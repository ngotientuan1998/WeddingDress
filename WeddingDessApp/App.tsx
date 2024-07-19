import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ListCustomerScreen from './screens/ListCustomerScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomScreen from './screens/WelcomScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CartScreen from './screens/CartScreen';
import ListServiceScreen from './screens/ListServiceScreen';
import ListStaffScreen from './screens/ListStaffScreen';
import BillScreen from './screens/BillScreen';
import ListJob from './screens/ListJob';
import DetailStaffScreen from './screens/DetailStaffScreen';
import DetailServiceScreen from './screens/DetailServiceScreen';
import BottomTab from './navigation/BottonTab';
import AssignScreen from './screens/AssignScreen';
import ChatScreen from './screens/ChatScreen';





const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='login' component={LoginScreen}/>
        <Stack.Screen name='cart' component={CartScreen}/>
        <Stack.Screen name='signup' component={SignupScreen}/>
        <Stack.Screen name='welcom' component={WelcomScreen}/>
        <Stack.Screen name='Service' component={ListServiceScreen}/>
        <Stack.Screen name='staff' component={ListStaffScreen}/>
        <Stack.Screen name='home2' component={BottomTab}/>
        <Stack.Screen name='job' component={ListJob}/>
        <Stack.Screen name='detailStaff' component={DetailStaffScreen}/>
        <Stack.Screen name='detailService' component={DetailServiceScreen}/>
        <Stack.Screen name='Customer' component={ListCustomerScreen}/>
        <Stack.Screen name='assign' component={AssignScreen}/>
        <Stack.Screen name='bill' component={BillScreen}/>
        <Stack.Screen name='chat' component={ChatScreen}/>
      </Stack.Navigator>
     </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})