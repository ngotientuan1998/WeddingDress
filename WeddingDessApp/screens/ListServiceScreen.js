import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CusomTextInputSearch from '../component/CusomTextInputSearch'
import { Colors, Fontsizes, Radius, Spacing } from '../constants'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../component/CustomTextInput';
import CustomButton from '../component/CustomButton';



const ListServiceScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceImg, setServiceImg] = useState('');
  const [serviceDes, setServiceDes] = useState('');
  const [modalUpdate, setModalUpdate] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');


  const handleTextInputChange = (text, field) => {
    if (field === "name") {
      setServiceName(text)
    } else if (field === "price") {
      setServicePrice(text)
    } else if (field === "img") {
      setServiceImg(text)
    } else if (field === "des") {
      setServiceDes(text)
    } else if (field === "search") {
      setSearchKeyword(text)
    }
  }

  // const filteredDataService=data.filter(item=>{
  //   return item.toLowerCase().includes(searchKeyword.toLowerCase());
  // })

  const link_api="http://192.168.1.98:3000/";


  const handleAddService = async () => {
    if (serviceName === "" || servicePrice === "" || serviceDes === "") {
      Alert.alert("Thông báo", 'Vui lòng nhập đủ thông tin')
      return;
    }

    let res = await fetch(link_api+'Service/add', {

      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          nameService: serviceName,
          descriptionService: serviceDes,
          priceService: servicePrice,
          img: serviceImg
        }
      )
    });

    if (res.status === 200) {
      Alert.alert("Thêm thành công");
      setModalAdd(false);
      fetchData();
    } else {
      Alert.alert("Thêm không thành công");

    }

  }

  const handleUpdateService = async (item) => {
    {

      if (serviceName === "" || servicePrice === "" || serviceDes === "") {
        Alert.alert("Thông báo", 'Vui lòng nhập đủ thông tin')
        return;
      }


      const res = await fetch(link_api+'Service/put/' + item._id, {

        method: "PUT",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          nameService: serviceName,
          descriptionService: serviceDes,
          priceService: servicePrice,
          img: serviceImg
        })
      })

      if (res.status === 200) {
        Alert.alert("Sửa thành công");
        setModalUpdate(false);
        fetchData()
      } else {
        Alert.alert("Sửa không thành công");
        setModalUpdate(false);
      }
    }
  }


  const fetchData = async () => {
    try {
      let res = await fetch(link_api+'Service/list');
      let result = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    fetchData();
    console.log(data);
  }, [])

  const doAddService = () => {
    setModalAdd(true);
  }

  const doUpdateService = () => {
    setModalUpdate(true);
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate('detailService', { item })
      }}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Image style={styles.img} source={{ uri: item.img }} />
          </View>
          <View style={styles.infoItem}>
            <View>
              <Text style={styles.textNameService}>{item.nameService}</Text>
              <Text style={styles.textPriceService}>{item.priceService}</Text>
            </View>

          </View>
        </View>
        <TouchableOpacity style={styles.xemthem} onPress={() => { doUpdateService(), setSelectedService(item) }}>
          <Text>Thay đổi dịch vụ</Text>
        </TouchableOpacity>

      </TouchableOpacity>
    )
  }

  const back = () => {
    {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => back()}>
        <Icon1 name="arrowleft" color={Colors.Black} size={Fontsizes.fs_22} />
      </TouchableOpacity>
      <CusomTextInputSearch onChangeText={(txt) => handleTextInputChange(txt, "search")} props={{ value: searchKeyword }} />

      <FlatList
        data={data.filter(item =>
          item.nameService &&
          typeof item.nameService === 'string' &&
          item.nameService.toLowerCase().includes(searchKeyword.toLowerCase())
        )}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />


      <TouchableOpacity style={styles.btnAdd} onPress={() => doAddService()}>
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
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: Colors.Black, fontWeight: '600', fontSize: Fontsizes.fs_28 }}>Thêm dịch vụ</Text>
            </View>
            <CustomTextInput label={'Tên dịch vụ'} onChangeText={(txt) => { handleTextInputChange(txt, "name") }} props={{ secureTextEntry: false, }} />
            <CustomTextInput label={'Giá dịch vụ'} props={{ keyboardType: 'numeric' }} onChangeText={(txt) => { handleTextInputChange(txt, "price") }} />
            <CustomTextInput label={'Ảnh'} onChangeText={(txt) => { handleTextInputChange(txt, "img") }} props={{ secureTextEntry: false }} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Mô tả sản phẩm:</Text>
              <TextInput
                onChangeText={(txt) => { handleTextInputChange(txt, "des") }}
                style={styles.descriptionInput}
                multiline={true}
                numberOfLines={4}

              />

              <CustomButton label={'Xác nhận'} onPress={handleAddService} />

            </View>
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
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: Colors.Black, fontWeight: '600', fontSize: Fontsizes.fs_28 }}>Sửa dịch vụ</Text>
            </View>
            <CustomTextInput label={'Tên dịch vụ'} onChangeText={(txt) => { handleTextInputChange(txt, "name") }} props={{ secureTextEntry: false, defaultValue: `${selectedService?.nameService}` }} />
            <CustomTextInput label={'Giá dịch vụ'} props={{ keyboardType: 'numeric', defaultValue: `${selectedService?.priceService}` }} onChangeText={(txt) => { handleTextInputChange(txt, "price") }} />
            <CustomTextInput label={'Ảnh'} onChangeText={(txt) => { handleTextInputChange(txt, "img") }} props={{ secureTextEntry: false, defaultValue: `${selectedService?.img}` }} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Mô tả sản phẩm:</Text>
              <TextInput
                onChangeText={(txt) => { handleTextInputChange(txt, "des") }}
                style={styles.descriptionInput}
                multiline={true}
                numberOfLines={4}
                defaultValue={`${selectedService?.descriptionService}`}
              />

              <CustomButton label={'Xác nhận'} onPress={() => handleUpdateService(selectedService)} />

            </View>
          </View>
        </View>
      </Modal>

    </View>


  )
}

export default ListServiceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.space_20,
    backgroundColor: Colors.Medium_Gray
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
    position: 'absolute'
  },
  img: {
    width: 80,
    height: 81
  },
  item: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    padding: Spacing.space_15,
    borderRadius: Radius.rd_10,
    margin: Spacing.space_10,
    justifyContent: 'space-between'
  },
  infoItem: {
    marginLeft: Spacing.space_32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textNameService: {
    fontSize: Fontsizes.fs_22,
    color: Colors.Black,
    fontWeight: '600'
  },
  textPriceService: {
    color: Colors.Black,
    marginTop: Spacing.space_8
  },
  xemthem: {
    justifyContent: 'flex-end'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionLabel: {
    color: Colors.Black,
    fontSize: Fontsizes.fs_18,
    fontWeight: '600',
    marginBottom: 5,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: Colors.Gray,
    borderRadius: Radius.rd_10,
    padding: 10,
    minHeight: 100, // Độ cao tối thiểu
  },
  back: {
    marginTop: Spacing.space_16
  }
})