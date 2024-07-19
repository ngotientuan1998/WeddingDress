import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Spacing} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ListScreen = () => {
  const navigation = useNavigation();

  const [userLogin, setUserLogin] = useState({});
  const staff = () => {
    navigation.navigate('staff');
  };

  const getUserLogin = async () => {
    const user = await AsyncStorage.getItem('data');
    const dataUser = await JSON.parse(user);
    return dataUser
  };
  if (!userLogin) {
    return (
      <View  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  useEffect(() => {
    getUserLogin().then(user=>{
      setUserLogin(user)
    });
    console.log('Thanh' + userLogin.name);
  }, []);
  return (
    <View style={styles.container}>
      <CustomButton
        label={'Danh sách nhân viên'}
        onPress={staff}></CustomButton>
      <CustomButton
        label={'Danh sách dịch vụ'}
        onPress={() => {
          navigation.navigate('Service');
        }}></CustomButton>
      <CustomButton
        label={'Danh sách khách hàng'}
        onPress={() => {
          navigation.navigate('Customer');
        }}>
        {' '}
      </CustomButton>
      {userLogin.status && (
        <CustomButton
          label={'Danh sách công việc'}
          onPress={() => {
            navigation.navigate('job');
          }}></CustomButton>
      )}
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.space_18,
    paddingVertical: Spacing.space_15,
  },
});
