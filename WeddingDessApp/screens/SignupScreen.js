import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors, Fontsizes, Spacing } from '../constants';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../component/CustomTextInput';
import CustomButton from '../component/CustomButton';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from "react-native-flash-message";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [rePass, setRePass] = useState('');
  const [numberPhone, setNumberPhone] = useState('');




  const goBack = () => {
    navigation.goBack();
  }

  const replaceLogin = () => {
    navigation.navigate('login');
  }

  const handleInputChange = (text, field) => {
    if (field === 'name') {
      setName(text);
    } else if (field === 'email') {
      setEmail(text);
    } else if (field === 'pass') {
      setPassword(text);
    } else if (field === 'rePass') {
      setRePass(text);
    } else if (field === 'numberPhone') {
      setNumberPhone(text);
    } else if (field === 'address') {
      setAddress(text);
    }
  }

  const handleSignUp = async () => {
    if (name === "" || email === "" || numberPhone === "" || password === "" || rePass === "" || address === "") {
      Alert.alert("Thông báo", "Vui lòng nhập đủ thông tin");
      return;
    }

    if (password !== rePass) {
      Alert.alert("Thông báo", "Mật khẩu phải trùng nhau");
      return;
    }

    try {
      const res = await fetch('http://192.168.1.98:3000/User/add', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          address: address,
          numberPhone: numberPhone,
        })
      });

      if (res.status === 200) {
        Alert.alert("Thông báo", "Đăng kí thành công");
        navigation.navigate('login')
      }else{
        Alert.alert("Đăng kí thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => goBack()}>
        <Icon name="arrowleft" color={Colors.Black} size={Fontsizes.fs_22} />
      </TouchableOpacity>
      <Text style={styles.title_reg}>Đăng ký</Text>
      <CustomTextInput label={'Họ tên'} props={{ secureTextEntry: false }} onChangeText={(txt) => { handleInputChange(txt, 'name') }} />
      <CustomTextInput label={'Email'} props={{ secureTextEntry: false }} onChangeText={(txt) => { handleInputChange(txt, 'email') }} />
      <CustomTextInput label={'Quê quán'} props={{ secureTextEntry: false }} onChangeText={(txt) => { handleInputChange(txt, 'address') }} />
      <CustomTextInput label={'Số điện thoại'} props={{ secureTextEntry: false }} onChangeText={(txt) => { handleInputChange(txt, 'numberPhone') }} />
      <CustomTextInput label={'Mật khẩu'} props={{ secureTextEntry: true }} onChangeText={(txt) => { handleInputChange(txt, 'pass') }} />
      <CustomTextInput label={'Nhập lại mật khẩu'} props={{ secureTextEntry: true }} onChangeText={(txt) => { handleInputChange(txt, 'rePass') }} />
      <CustomButton label={'Đăng ký'} onPress={handleSignUp} />
      <View style={styles.registerContainer}>
        <Text style={{ color: Colors.Black }}>Đã có tài khoản ?</Text>
        <TouchableOpacity onPress={() => { replaceLogin() }}>
          <Text style={styles.text_register}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position={'center'} />
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  back: {
    marginTop: Spacing.space_28
  },
  title_reg: {
    fontSize: Fontsizes.fs_28,
    color: Colors.Black,
    fontWeight: "600",
    marginTop: Spacing.space_24
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#EEEAEA',
    width: '100%',
    padding: 10,
    justifyContent: 'center'
  },
  text_register: {
    color: Colors.Black,
    fontWeight: "700",
    marginLeft: 4
  }
})
