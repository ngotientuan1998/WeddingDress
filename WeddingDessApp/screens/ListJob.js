import { ActivityIndicator, Alert, Button, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CusomTextInputSearch from '../component/CusomTextInputSearch';
import { Colors, Fontsizes, Radius, Spacing } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../component/CustomButton';
import CustomTextInput from '../component/CustomTextInput';
import DatePicker from 'react-native-date-picker'
import Icon1 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';




const ListJob = () => {
  
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [showStaffList, setShowStaffList] = useState(false);


  const [nameJob, setNameJob] = useState('');
  const [desJob, setDesJob] = useState('');

  const link_api="http://192.168.1.98:3000/";


  const fetchData = async () => {
    try {
      const res = await fetch(link_api+'Job/list');
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);


  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const toggleStaffList = () => {
    setShowStaffList(!showStaffList);
  };


  const renderItem = ({ item }) => {
    return (
      <View style={styles.item1}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textItem}>Tên công việc: </Text>
          <Text style={styles.textItem}>{item.nameJob}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textItem}>Mô tả công việc: </Text>
          <Text style={styles.textItem}>{item.descriptionJob}</Text>
        </View>

        {/* <Text style={styles.textItem}>Trạng thái: {item.statusJob ? 'Hoàn thành' : 'Đang làm'}</Text> */}
        {/* <Text style={styles.textItem}>Ngày bắt đầu: {`${(new Date(item.dateStart)).getDate()}-${(new Date(item.dateStart)).getMonth() + 1}-${(new Date(item.dateStart)).getFullYear()}`}</Text>
          <Text style={styles.textItem}>Ngày kết thúc: {`${(new Date(item.endEnd)).getDate()}-${(new Date(item.endEnd)).getMonth() + 1}-${(new Date(item.endEnd)).getFullYear()}`}</Text> */}

      </View>
    )
  }

  const handleTextInputChange = (text, field) => {
    if (field === "name") {
      setNameJob(text)
    } else if (field === "des") {
      setDesJob(text)
    }
  }

  const handleAddJob = async () => {
    if (nameJob === "" || desJob === "") {
      Alert.alert("Thông báo", "Vui lòng nhập đủ thông tin");
      return;
    }

    try {
      const res = await fetch(link_api+'Job/add', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameJob: nameJob,
          descriptionJob: desJob,
        })
      });

      if (res.status === 200) {
        Alert.alert("Thông báo", "Thêm thành công");
        setModalAdd(false);
        fetchData();
      } else {
        Alert.alert("Thông báo", "Thêm thất bại");
        setModalAdd(false);
      }
    } catch (error) {
      console.log(error);
    }

  }

  const back = () => {
    navigation.goBack()
  }


  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.back} onPress={() => back()}>
        <Icon1 name="arrowleft" color={Colors.Black} size={Fontsizes.fs_22} />
      </TouchableOpacity>
      <CusomTextInputSearch />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={(item) => renderItem(item)}
      />
      <TouchableOpacity style={styles.btnAdd} onPress={() => setModalAdd(true)}>
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
              <Text style={{ color: Colors.Black, fontWeight: '600', fontSize: Fontsizes.fs_28 }}>Tạo công việc</Text>
            </View>
            <CustomTextInput label={'Tên công việc'} onChangeText={(txt) => handleTextInputChange(txt, "name")} props={styles.inputc} />

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Mô tả công việc</Text>
              <TextInput
                onChangeText={(txt) => handleTextInputChange(txt, "des")}
                style={styles.descriptionInput}
                multiline={true}
                numberOfLines={4}
              />
            </View>

            {/* <View>
              <TouchableOpacity onPress={toggleStaffList}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Spacing.space_18 }}>
                  <Text style={{ marginRight: 10, fontSize: Fontsizes.fs_18, color: Colors.Black }}>Nhân viên</Text>
                  <Icon1 name={showStaffList ? 'caretup' : 'caretdown'} size={Fontsizes.fs_15} color={Colors.Black} />
                </View>
              </TouchableOpacity>
              {showStaffList && (
                <ScrollView style={{ maxHeight: 150 }}>
                  {dataStaff.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSelectItem(item)}>
                      <Text style={{ color: Colors.Black, fontSize: Fontsizes.fs_15 }}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
              {selectedItem !== '' && (
                <Text style={{ marginTop: 20, color: Colors.Black, fontSize: Fontsizes.fs_15 }}>Đã chọn: {selectedItem.name}</Text>
              )}
            </View> */}

            <CustomButton label={'Xác nhận'} onPress={() => handleAddJob()} />


          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ListJob

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.space_20

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
    minHeight: 100,
  },
  inputc: {
    width: '100%',

  },
  containerDate: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.space_10,
    marginTop: Spacing.space_10
  },
  textDate: {
    color: Colors.Black,
    fontSize: Fontsizes.fs_16
  },
  item1: {
    borderRadius: Radius.rd_10,
    borderWidth: 1,
    borderColor: Colors.Black,
    padding: Spacing.space_10,
    margin: Spacing.space_12,
    paddingVertical: Spacing.space_12
  },
  nameStaff: {
    fontSize: Fontsizes.fs_18,
    color: Colors.Black,
    fontWeight: '500'
  },
  textItem: {
    color: Colors.Black,
    fontSize: Fontsizes.fs_15,
    margin: Spacing.space_3
  },
  back: {
    marginTop: Spacing.space_16
  },
})