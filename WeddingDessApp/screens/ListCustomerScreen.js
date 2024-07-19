import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CusomTextInputSearch from '../component/CusomTextInputSearch';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {Colors, Fontsizes, Radius, Spacing} from '../constants';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../component/CustomTextInput';
import CustomButton from '../component/CustomButton';

const ListCustomerScreen = () => {
  const navigation = useNavigation();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [data, setData] = useState([]);

  const [name, setName] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [address, setAddress] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleInputChange = (text, field) => {
    if (field === 'name') {
      setName(text);
    } else if (field === 'numberPhone') {
      setNumberPhone(text);
    } else if (field === 'address') {
      setAddress(text);
    } else if (field === 'search') {
      setSearchKeyword(text);
    }
  };

  const link_api = 'http://192.168.1.98:3000/';

  const fetchData = async () => {
    try {
      let res = await fetch(link_api + 'Customer/list');
      let result = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCustomer = async () => {
    if (name === '' || numberPhone === '' || address === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin');
      return;
    }
    try {
      let res = await fetch(link_api + 'Customer/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameCustomer: name,
          numberphone: numberPhone,
          address: address,
        }),
      });

      if (res.status === 200) {
        Alert.alert('Thông báo', 'Thêm thành công');
        setModalAdd(false);
        fetchData();
      } else {
        Alert.alert('Thông báo', 'Thêm thất bại');
        setModalAdd(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCustomer = async item => {
    if (name === '' || numberPhone === '' || address === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin');
      return;
    }

    try {
      let res = await fetch(link_api + 'Customer/put/' + item._id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameCustomer: name,
          numberphone: numberPhone,
          address: address,
        }),
      });

      if (res.status === 200) {
        Alert.alert('Sửa thành công');
        setModalUpdate(false);
        fetchData();
      } else {
        Alert.alert('Sửa thất bại');
        setModalUpdate(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callCustomer = (numberPhone) => {
    let phoneNumber = normalizePhoneNumber(numberPhone);
  
    if (!isValidPhoneNumber(phoneNumber)) {
      console.log(phoneNumber);
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
      return;
    }
  
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url)
      .then(supported => {
        if (!supported) {
          console.log(supported);
          Alert.alert('Thông báo', 'Không thể gọi điện thoại từ thiết bị này');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('Lỗi khi mở URL', err));
  };
  
  const normalizePhoneNumber = phoneNumber => {
    if (phoneNumber.startsWith('0')) {
      return '+84' + phoneNumber.substring(1);
    }
    return phoneNumber;
  };
  
  const isValidPhoneNumber = phoneNumber => {
    return /^\+?\d{10,13}$/.test(phoneNumber);
  };
  
  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item1}
        onPress={() => {
          setModalUpdate(true), setSelectedItem(item);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              style={styles.img}
              source={require('../assets/images/customer.jpg')}
            />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.textNameService}>{item.nameCustomer}</Text>
            <Text style={styles.textPriceService}>
              Số điện thoại: {item.numberphone}
            </Text>
            <Text style={styles.textPriceService}>
              Quê quán: {item.address}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.xemthem}
          onPress={() => callCustomer(item.numberphone)}>
          <Icon2 name="phone" color={Colors.Black} size={Fontsizes.fs_32} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const back = () => {
    {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => back()}>
        <Icon1 name="arrowleft" color={Colors.Black} size={Fontsizes.fs_22} />
      </TouchableOpacity>
      <CusomTextInputSearch
        onChangeText={txt => handleInputChange(txt, 'search')}
      />
      <FlatList
        data={data.filter(
          item =>
            item.nameCustomer &&
            typeof item.nameCustomer === 'string' &&
            item.nameCustomer
              .toLowerCase()
              .includes(searchKeyword.toLowerCase()),
        )}
        keyExtractor={item => item._id}
        renderItem={item => renderItem(item)}
      />
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => {
          setModalAdd(true);
        }}>
        <Icon name="add" color={Colors.White} size={Fontsizes.fs_22} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAdd}
        onRequestClose={() => {
          setModalAdd(!modalAdd);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.Black,
                  fontWeight: '600',
                  fontSize: Fontsizes.fs_28,
                }}>
                Thêm khách hàng
              </Text>
            </View>
            <CustomTextInput
              label={'Tên khách hàng'}
              onChangeText={txt => handleInputChange(txt, 'name')}
            />
            <CustomTextInput
              label={'Địa chỉ'}
              onChangeText={txt => handleInputChange(txt, 'address')}
            />
            <CustomTextInput
              label={'Số điện thoại'}
              onChangeText={txt => handleInputChange(txt, 'numberPhone')}
            />
            <CustomButton
              label={'Xác nhận'}
              onPress={() => handleAddCustomer()}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalUpdate}
        onRequestClose={() => {
          setModalUpdate(!modalUpdate);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.Black,
                  fontWeight: '600',
                  fontSize: Fontsizes.fs_28,
                }}>
                Sửa khách hàng
              </Text>
            </View>
            <CustomTextInput
              label={'Tên khách hàng'}
              onChangeText={txt => handleInputChange(txt, 'name')}
              props={{defaultValue: selectedItem?.nameCustomer}}
            />
            <CustomTextInput
              label={'Địa chỉ'}
              onChangeText={txt => handleInputChange(txt, 'address')}
              props={{defaultValue: selectedItem?.address}}
            />
            <CustomTextInput
              label={'Số điện thoại'}
              onChangeText={txt => handleInputChange(txt, 'numberPhone')}
              props={{defaultValue: selectedItem?.numberphone}}
            />
            <CustomButton
              label={'Xác nhận'}
              onPress={() => handleUpdateCustomer(selectedItem)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.space_20,
    backgroundColor: Colors.Medium_Gray,
  },
  btnAdd: {
    backgroundColor: Colors.Pink,
    borderRadius: Radius.rd_50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: Spacing.space_20,
    bottom: Spacing.space_20,
    position: 'absolute',
  },
  img: {
    width: 80,
    height: 81,
  },
  item1: {
    flexDirection: 'row',
    padding: Spacing.space_10,
    borderRadius: Radius.rd_15,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Spacing.space_15,
    backgroundColor: Colors.White,
  },
  infoItem: {
    marginLeft: Spacing.space_32,
  },
  textNameService: {
    fontSize: Fontsizes.fs_22,
    color: Colors.Black,
    fontWeight: '600',
  },
  textPriceService: {
    color: Colors.Black,
    marginTop: Spacing.space_8,
  },
  xemthem: {},
  back: {
    marginTop: Spacing.space_16,
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
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%',
  },
});
