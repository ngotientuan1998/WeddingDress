import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../component/CustomTextInput'
import { Colors, Fontsizes, Radius, Spacing } from '../constants'
import CustomButton from '../component/CustomButton'
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage"


const LoginScreen = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const navigation = useNavigation();


  const link_api="http://192.168.1.98:3000/";


  const handleInputChange = (text, field) => {
    if (field === 'email') {
      setEmail(text);
    } else if (field === 'password') {
      setPassword(text);
    }
  }


  const login = async () => {

    if (email === "" || password === "") {
      showMessage({
        message: "Vui lòng nhập đủ thông tin",
        type: 'warning',
        position: 'center'
      });
      return;
    }
    if (password.length < 6) {
      showMessage({
        message: "Mật khẩu phải có ít nhất 6 kí tự",
        type: 'warning',
        position: 'center'
      });
      return;
    }

    try {

      const response = await fetch(link_api+'Login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });

      // Kiểm tra mã trạng thái của phản hồi
      if (response.status === 200) {
        const responseData = await response.json();
        const user = responseData.user;
        console.log(user);

        // navigation.navigate('home', { role: user.role })

        showMessage({
          message: 'Đăng nhập thành công',
          type: 'success',
          position: 'center'
        });

        navigation.navigate('home2');

        await AsyncStorage.setItem('data', JSON.stringify(user));


      } else {
        showMessage({
          message: 'Tài khoản hoặc mật khẩu không chính xác',
          type: 'danger',
          position: 'center',
        });
      }
    } catch (error) {
      console.log("Lỗi:", error);
    }
  };

  const replaceSignup = () => {
    navigation.navigate('signup')
  }


  return (
    <View style={styles.container}>
      <View style={styles.text_welcom}>
        <Text style={{ fontSize: Fontsizes.fs_28, color: Colors.Black, fontWeight: 'bold' }}>Chào mừng bạn</Text>
        <Text style={{ fontWeight: 'bold', color: Colors.Gray, marginTop: Spacing.space_10, fontSize: Fontsizes.fs_16 }}>Đăng nhập để tiếp tục</Text>
      </View>
      {/* <CustomTextInput style={styles.input} label={'Tên đăng nhập'} props={text =>{setemail(text)}} value={email} />
        <CustomTextInput label={'Mật khẩu'} value={passWord} props={text=>{setpassWord(text)}}/> */}


      <CustomTextInput
        label={'Tên đăng nhập'}
        props={{ secureTextEntry: false }}
onChangeText={(txt) => handleInputChange(txt, 'email')}
      />

      <CustomTextInput
        label={'Mật khẩu'}
        props={{ secureTextEntry: true }}
        onChangeText={(txt) => handleInputChange(txt, 'password')}
      />

      <View style={styles.forgotPass}>
        <Text>Quên mật khẩu ?</Text>
      </View>

      <CustomButton label={'Đăng nhập'} onPress={() => login()} />

      <View style={styles.loginOther}>
        <Text>-Hoặc-</Text>
        <TouchableOpacity style={styles.btnOther}>
          <Image source={require('../assets/images/googleIcon.png')} style={styles.iconButton} />
          <Text style={styles.labelButton}>Đăng nhập với Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOther}>
          <Image source={require('../assets/images/facebookIcon.png')} style={styles.iconButton} />
          <Text style={styles.labelButton}>Đăng nhập với Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={{ color: Colors.Black }}>Bạn chưa có tài khoản ?</Text>
        <TouchableOpacity onPress={() => { replaceSignup() }}>
          <Text style={styles.text_register}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position={'bottom'} />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.space_20
  },
  text_welcom: {
    marginTop: Spacing.space_50,
    marginBottom: Spacing.space_50
  },
  input: {
    marginTop: Spacing.space_20
  },
  forgotPass: {
    marginTop: Spacing.space_15,
    alignItems: 'flex-end'
  },
  btnOther: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.rd_10,
    borderWidth: 1,
    paddingVertical: Spacing.space_15,
    position: 'relative',
    marginTop: Spacing.space_24
  },
  labelButton: {
    flex: 1,
    textAlign: 'center',
    fontSize: Fontsizes.fs_16,
    color: Colors.Black
  },
  iconButton: {
    position: 'absolute',
    left: Spacing.space_15
  },
  loginOther: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.space_20
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
  },



  inputContainer: {
    position: "relative",
    justifyContent: 'center',
    marginTop: Spacing.space_24
  },
  label: {
    color: Colors.Gray,
    fontSize: Fontsizes.fs_20,
    fontWeight: '600'
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: Spacing.space_15,
    fontSize: Fontsizes.fs_18
  }
})