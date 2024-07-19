import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Fontsizes, Spacing } from '../constants';
import DatePicker from 'react-native-date-picker'
import CustomButton from '../component/CustomButton';
import Icon1 from 'react-native-vector-icons/AntDesign';




const AssignScreen = ({ route }) => {

  const { _id, name } = route.params.item;

  const [dataJob, setDataJob] = useState([]);
  const [dataAssign, setDataAssign] = useState([]);

  const [showStaffList, setShowStaffList] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openDateStart, setOpenDateStart] = useState(false);
  const [openDateEnd, setOpenDateEnd] = useState(false);

  const link_api="http://192.168.1.98:3000/";

  const fetchDateJob = async () => {
    try {
      const res = await fetch(link_api+'Job/list');
      const result = await res.json();
      setDataJob(result);
      console.log(result+"2");
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDateAssign = async () => {
    try {
      const res = await fetch(link_api+'Assign/list');
      const result = await res.json();
      setDataAssign(result);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchDateJob();
    fetchDateAssign();

    console.log(dataAssign+"2");
  }, [])

  const handleConfirmDate = (newDate, field) => {
    if (field === "start") {
      setStartDate(newDate)
      console.log(newDate);
      setOpenDateStart(false)
    } else if (field === "end") {
      setEndDate(newDate)
      console.log(newDate);
      setOpenDateEnd(false)
    }
  };


  const renderDateStart = () => {
    return (
      <View style={styles.containerDate}>
        <Text style={styles.textDate}>Ngày bắt đầu: </Text>
        <TouchableOpacity onPress={() => setOpenDateStart(true)}>
          <Text style={styles.textDate}>{`${startDate.getDate()}- ${startDate.getMonth() + 1}- ${startDate.getFullYear()}`}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderDateEnd = () => {
    return (
      <View style={styles.containerDate}>
        <Text style={styles.textDate}>Ngày kết thúc: </Text>
        <TouchableOpacity onPress={() => setOpenDateEnd(true)}>
          <Text style={styles.textDate}>{`${endDate.getDate()}- ${endDate.getMonth() + 1}- ${endDate.getFullYear()}`}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const toggleStaffList = () => {
    setShowStaffList(!showStaffList);
  };
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  //hàm giao việc
  const handleAddAssign = async () => {

    
    try {
      let res = await fetch(link_api+'Assign/add', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          idStaff:_id,
          idJob:selectedItem._id,
          dateStart: startDate.toISOString(),
          dateEnd: endDate.toISOString(),
        })
      });

      if (res.status===200) {
        Alert.alert("Thông báo", "Tạo thành công");
      }else{
        Alert.alert("Thông báo", "Tạo thất bại");
      }


    } catch (error) {
      console.log(error);
    }


  }


  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Giao công việc</Text>
      </View>

      <View>{renderDateStart()}</View>

      <DatePicker
        title={'Ngày bắt đầu'}
        open={openDateStart}
        modal
        mode='date'
        date={startDate}
        onCancel={() => setOpenDateStart(false)}
        onConfirm={(newDate) => handleConfirmDate(newDate, "start")}

      />
      <View>{renderDateEnd()}</View>
      <DatePicker
        title={'Ngày kết thúc'}
        open={openDateEnd}
        modal
        mode='date'
        date={endDate}
        onCancel={() => setOpenDateEnd(false)}
        onConfirm={(newDate) => handleConfirmDate(newDate, "end")}
      />

      <View>
        <TouchableOpacity onPress={toggleStaffList}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Spacing.space_18 }}>
            <Text style={{ marginRight: 10, fontSize: Fontsizes.fs_18, color: Colors.Black }}>Công việc</Text>
            <Icon1 name={showStaffList ? 'caretup' : 'caretdown'} size={Fontsizes.fs_15} color={Colors.Black} />
          </View>
        </TouchableOpacity>
        {showStaffList && (
          <ScrollView style={{ maxHeight: 150 }}>
            {dataJob.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelectItem(item)}>
                <Text style={{ color: Colors.Black, fontSize: Fontsizes.fs_15 }}>{item.nameJob}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {selectedItem !== '' && (
          <Text style={{ marginTop: 20, color: Colors.Black, fontSize: Fontsizes.fs_15 }}>Đã chọn: {selectedItem.nameJob}</Text>
        )}
      </View>
      <CustomButton label={'Xác nhận'} onPress={()=>handleAddAssign()}/>
    </View>
  )
}

export default AssignScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.space_15,
    paddingTop: Spacing.space_24
  },
  title: {
    color: Colors.Black,
    fontSize: Fontsizes.fs_32,
    fontWeight: '600'
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
})