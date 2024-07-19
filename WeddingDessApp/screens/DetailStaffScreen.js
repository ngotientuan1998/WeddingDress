import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fontsizes, Spacing} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailStaffScreen = () => {
  const navigation = useNavigation();
  
  const [userLogin, setUserLogin] = useState({});

  const getUserLogin = async () => {
    const user = await AsyncStorage.getItem('data');
    const dataUser = await JSON.parse(user);
    setUserLogin(dataUser);
  };
  useEffect(() => {
    getUserLogin()
  }, []);


  const backhome2 = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={backhome2}>
          <Icon
            name="left"
            size={20}
            color="black"
            style={{padding: 10}}></Icon>
        </TouchableOpacity>
        <Text style={{color: Colors.Black, fontSize: Fontsizes.fs_22}}>
          Hồ sơ cá nhân
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Icon1 name="person" size={75} color="black"></Icon1>
        <Text style={styles.textname}>{userLogin.name}</Text>
        <Text>{userLogin.email}</Text>
        <Text>{userLogin.numberPhone}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          marginTop: 30,
        }}>
        <Text>Tên</Text>
        <Text>Chức vụ</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>{userLogin.name}</Text>
        <Text>{userLogin.status ?"Quản lí":"Nhân viên"}</Text>
      </View>

      <View style={styles.line}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          marginTop: 30,
        }}>
        <Text>Ngân hàng </Text>
        <Text>Số tài khoản</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>MB</Text>
        <Text>9999999999999</Text>
      </View>
      <View style={styles.line}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          marginTop: 30,
        }}>
        <Text>Số điện thoại</Text>
        <Text>Quê quán</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>{userLogin.numberPhone}</Text>
        <Text>{userLogin.address}</Text>
      </View>
    </View>
  );
};

export default DetailStaffScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.space_10,
    backgroundColor: Colors.White,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-between',
  },
  textname: {
    fontSize: Fontsizes.fs_20,
    color: Colors.Black,
    fontWeight: '500',
  },
  line: {
    height: 2,
    backgroundColor: Colors.Medium_Gray,
    width: '100%',
  },
});
