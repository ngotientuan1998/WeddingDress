import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const link_api = 'http://192.168.1.98:3000/';

  const [databill, setdatabill] = useState([]);
  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetbill = async () => {
    try {
      let res = await fetch(link_api + 'Bill/list');
      let result = await res.json();
      setdatabill(result);
    } catch (error) {
      console.log('lấy không thành công');
    }
  };

  const getUserLogin = async () => {
    const user = await AsyncStorage.getItem('data');
    const dataUser = JSON.parse(user);
    return dataUser;
  };

  useEffect(() => {
    getUserLogin().then(user => {
      setUserLogin(user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetbill()
  }, [databill]);

  const xacnhan = async item1 => {
    console.log(item1._id);
    try {
      let res = await fetch(link_api + 'Bill/put/' + item1._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: true,
        }),
      });
      if (res.status === 200) {
        fetbill();
        Alert.alert("Thông báo",'Xác nhận thành công');
      } else {
        Alert.alert("Thông báo",'Xác nhận thất bại');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!userLogin) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const filteredBills = userLogin.status
    ? databill.filter(bill => !bill.status)
    : databill.filter(bill => !bill.status && bill.idStaff === userLogin._id);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DANH SÁCH GIỎ HÀNG</Text>

      <ScrollView>
        {filteredBills.length === 0 ? (
          <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Text style={styles.empty}>Giỏ hàng trống</Text>
          </View>
        ) : (
          filteredBills.map(bill => (
            <View key={bill._id} style={styles.item}>
              <Image source={{uri: bill.img}} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.text}>Tên dịch vụ: {bill.nameService}</Text>
                <Text style={styles.text}>Tên nhân viên: {bill.nameStaff}</Text>
                <Text style={styles.text}>
                  Tên khách hàng: {bill.nameCustomer}
                </Text>
                <Text style={styles.text}>
                  Số điện thoại: {bill.numberphone}
                </Text>
                <Button title={'Xác nhận'} onPress={() => xacnhan(bill)} />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 9,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  image: {
    width: 90,
    height: 110,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
    fontWeight: '500',
  },
});
