import {
  Alert,
  Button,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fontsizes, Spacing} from '../constants';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

import DatePicker from 'react-native-date-picker';
import CustomButton from '../component/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailServiceScreen = ({route}) => {
  const navigation = useNavigation();
  const [dataCustomer, setdataCustomer] = useState([]);
  const [visibleOrder, setvisibleOrder] = useState(false);
  const [staff, setStaff] = useState(null);
  const [idCustomer, setIdCustomer] = useState(null);
  const [dateBuy, setDateBuy] = useState(new Date());
  const [openDate, setopenDate] = useState(false);
  const [nhanVien, setNhanVien] = useState(null);
  const [khachHang, setKhachhang] = useState(null);

  const link_api = 'http://192.168.1.98:3000/';

  const {
    _id,
    nameService,
    statusService,
    descriptionService,
    priceService,
    img,
  } = route.params.item;

  const getUser = async () => {
    const user = await AsyncStorage.getItem('data');
    const staff = JSON.parse(user);
    setNhanVien(staff);
  };

  useEffect(() => {
    getUser();
    fetCustomer(); 
  }, []);

  const fetCustomer = async () => {
    try {
      let res = await fetch(link_api + 'Customer/list');
      let result = await res.json();
      setdataCustomer(result);
      console.log("Customer data: ", result); 
    } catch (error) {
      console.log('Lấy không thành công', error);
    }
  };

  const renderDate = () => {
    return (
      <View>
        <Text>Ngày đặt :</Text>
        <TouchableOpacity onPress={() => setopenDate(true)}>
          <Text style={styles.textDate}>{`${dateBuy.getDate()}- ${
            dateBuy.getMonth() + 1
          }- ${dateBuy.getFullYear()}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ondialogOrder = () => {
    setvisibleOrder(!visibleOrder);
  };


  const findCustomer = idCustomer => {
    let name = dataCustomer.find(customer => customer._id === idCustomer);
    setKhachhang(name);
    console.log(khachHang + 'dtt');
  };
  
  useEffect(()=>{
    findCustomer(idCustomer)
  },[idCustomer])

  const xacNhan = async (nhanvien, idkhachhang) => {

    if (idkhachhang== null) {
      Alert.alert("Thông báo", "Vui lòng chọn khách hàng")
      return
    }

    let res = await fetch(link_api + 'Bill/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idCustomer: idkhachhang,
        idStaff: nhanVien._id,
        dateBuy: dateBuy,
        nameService: nameService,
        nameCustomer: khachHang.nameCustomer,
        nameStaff: nhanVien.name,
        totalAmout: priceService,
        numberphone: khachHang.numberphone,
        img: img,
      }),
    });
    if (res.status === 200) {
      Alert.alert('Thông báo', 'Đặt hàng thành công');
      setvisibleOrder(false);
    } else {
      Alert.alert('Thông báo', 'Đặt hàng thất bại');
    }
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => back()}>
        <Icon1 name="arrowleft" color={Colors.White} size={Fontsizes.fs_22} />
      </TouchableOpacity>

      <StatusBar translucent={true} backgroundColor="transparent" />
      <Image style={styles.img} source={{uri: img}} />
      <View style={{paddingHorizontal: Spacing.space_18}}>
        <Text style={styles.nameService}>{nameService}</Text>
        <Text style={styles.priceService}>{priceService}</Text>
      </View>
      <View style={styles.space}></View>
      <View style={{paddingHorizontal: Spacing.space_18}}>
        <Text style={styles.des}>Mô tả sản phẩm</Text>
        <Text style={styles.contentDes}>{descriptionService}</Text>
      </View>
      <View style={{marginHorizontal: Spacing.space_20}}>
        <CustomButton label={'Đặt'} onPress={() => ondialogOrder()} />
      </View>

      {/* modal đặt hàng */}

      <Modal
        visible={visibleOrder}
        animationType="slide"
        transparent={true}
        onRequestClose={ondialogOrder}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Tên khách hàng</Text>
            <Picker
              selectedValue={idCustomer}
              onValueChange={(itemValue, itemIndex) =>
                setIdCustomer(itemValue)
              }>
              {dataCustomer.map(Customer => (
                <Picker.Item
                  label={Customer.nameCustomer}
                  value={Customer._id}
                  key={Customer._id}></Picker.Item>
              ))}
            </Picker>
            <View>{renderDate()}</View>
            <DatePicker
              title="ngày đặt dịch vụ"
              open={openDate}
              modal
              mode="date"
              date={dateBuy}
              onCancel={() => setopenDate(false)}
              onConfirm={a => setDateBuy(a)}></DatePicker>
            <CustomButton
              label={'Xác nhận'}
              onPress={() => xacNhan(staff, idCustomer)}
            />

            <CustomButton label={'Hủy'} onPress={() => ondialogOrder()} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailServiceScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  space: {
    backgroundColor: Colors.Medium_Gray,
    width: '100%',
    height: Spacing.space_4,
  },
  img: {
    width: '100%',
    height: '67%',
  },
  nameService: {
    color: Colors.Black,
    fontWeight: '700',
    fontSize: Fontsizes.fs_26,
    marginTop: Spacing.space_28,
  },
  priceService: {
    color: Colors.Red,
    fontSize: Fontsizes.fs_20,
    fontWeight: '400',
    marginBottom: Spacing.space_20,
    marginTop: Spacing.space_4,
  },
  des: {
    color: Colors.Black,
    fontWeight: '500',
    marginTop: Spacing.space_32,
  },
  contentDes: {
    color: Colors.Black,
    marginTop: Spacing.space_15,
  },
  back: {
    marginTop: Spacing.space_16,
    position: 'absolute',
    top: Spacing.space_16,
    left: Spacing.space_18,
    zIndex: 1000,
  },
});
