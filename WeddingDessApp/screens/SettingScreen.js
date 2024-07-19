import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fontsizes, Radius, Spacing} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../component/CustomButton';
import CustomTextInput from '../component/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [modalLogout, setModalLogout] = useState(false);
  const [modalChangePass, setModalChangePass] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [reNewPass, setReNewPass] = useState('');

  const link_api="http://192.168.1.98:3000/";

  const doLogout = () => {
    setModalLogout(true);
  };
  const doChangePass = () => {
    setModalChangePass(true);
  };

  const handleInputChange = (text, field) => {
    if (field === 'oldpass') {
      setOldPass(text);
    } else if (field === 'newpass') {
      setNewPass(text);
    } else if (field === 'renewpass') {
      setReNewPass(text);
    }
  };

  const getUser = async () => {
    try {
      let user = await AsyncStorage.getItem('data');
      const userData = await JSON.parse(user);
      setDataUser(userData);
      console.log(dataUser.email+"1");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePass = async () => {
    if (oldPass === '' || newPass === '' || reNewPass === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin');
      return;
    }

    if (newPass !== reNewPass) {
      Alert.alert('Thông báo', 'Mật khẩu không trùng nhau');
      return;
    }

    try {
      const response = await fetch(link_api + 'Login/change-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: dataUser.email,
          newPass: newPass,
          oldPass:oldPass
        }),
      });

      if(response.status===200){
        Alert.alert("Thông báo", "Đổi mật khẩu thành công")
        setOldPass("")
        setNewPass("")
        setReNewPass("")
        setModalChangePass(false)
      }else{
        Alert.alert("Thông báo", "Đổi mật khẩu thất bại")
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Setting</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('detailStaff')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="person-circle-outline"
              size={30}
              color="black"
              style={{padding: 10}}></Icon>
            <Text style={styles.text_btn}>Cá nhân</Text>
          </View>
          <Icon2
            name="right"
            size={Fontsizes.fs_20}
            color="black"
            style={{padding: 10}}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="person-circle-outline"
              size={30}
              color="black"
              style={{padding: 10}}></Icon>
            <Text style={styles.text_btn}>Đổi chủ đề</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => doChangePass()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="key"
              size={30}
              color="black"
              style={{padding: 10}}></Icon>
            <Text style={styles.text_btn}>Đổi mật khẩu</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            doLogout();
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon1
              name="logout"
              size={30}
              color="black"
              style={{padding: 10}}
            />
            <Text style={styles.text_btn}>Đăng xuất</Text>
          </View>
          <Icon2
            name="right"
            size={Fontsizes.fs_20}
            color="black"
            style={{padding: 10}}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalLogout}
          onRequestClose={() => {
            setModalLogout(!modalLogout);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center'}}>
                <Icon2
                  name="warning"
                  size={Fontsizes.fs_32}
                  color="black"
                  style={{padding: 10}}
                />
                <Text
                  style={{
                    fontSize: Fontsizes.fs_22,
                    color: Colors.Black,
                    fontWeight: '500',
                    marginBottom: Spacing.space_10,
                  }}>
                  Đăng xuất
                </Text>
                <Text
                  style={{
                    fontSize: Fontsizes.fs_15,
                    color: Colors.Black,
                    fontWeight: '400',
                    marginBottom: Spacing.space_16,
                  }}>
                  Bạn có chắc chắn muốn đăng xuất không ?
                </Text>
              </View>

              <View style={styles.viewModal}>
                <TouchableOpacity
                  style={styles.btnY}
                  onPress={() => {
                    setModalLogout(false);
                  }}>
                  <Text style={styles.textbtn}>Không</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnY}
                  onPress={() => navigation.navigate('login')}>
                  <Text style={styles.textbtn}>Có</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalChangePass}
          onRequestClose={() => {
            setModalChangePass(!modalChangePass);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: Fontsizes.fs_24,
                    color: Colors.Black,
                    fontWeight: '600',
                  }}>
                  Đổi mật khẩu
                </Text>
              </View>
              <CustomTextInput
                label={'Mật khẩu'}
                props={{secureTextEntry: true}}
                onChangeText={(txt) => handleInputChange(txt, 'oldpass')}
              />
              <CustomTextInput
                label={'Mật khẩu mới'}
                props={{secureTextEntry: true}}
                onChangeText={(txt) => handleInputChange(txt, 'newpass')}
              />
              <CustomTextInput
                label={'Nhập lại mật khẩu'}
                props={{secureTextEntry: true}}
                onChangeText={(txt) => handleInputChange(txt, 'renewpass')}
              />

              <View style={{paddingHorizontal: Spacing.space_20}}>
                <CustomButton label={'Đổi'} onPress={()=>handleChangePass()}/>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '35%',
    backgroundColor: Colors.Medium_pink,
  },
  footer: {
    width: '100%',
    paddingHorizontal: Spacing.space_35,
    borderTopEndRadius: Radius.rd_20,
  },
  btn: {
    borderBottomWidth: 1,
    borderColor: Colors.Gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.space_40,
  },
  text_btn: {
    color: Colors.Black,
    fontSize: Fontsizes.fs_15,
  },
  title: {
    fontSize: Fontsizes.fs_28,
    color: Colors.Black,
    fontWeight: '500',
    position: 'absolute',
    bottom: Spacing.space_28,
    left: Spacing.space_28,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: Spacing.space_16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: Spacing.space_35,
    width: '80%',
  },

  viewModal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.space_35,
  },
  btnY: {
    backgroundColor: Colors.Pink,
    padding: Spacing.space_10,
    borderRadius: Radius.rd_10,
    flex: 1,
    marginLeft: Spacing.space_12,
  },
  textbtn: {
    color: Colors.White,
    fontWeight: '400',
    textAlign: 'center',
  },
});
