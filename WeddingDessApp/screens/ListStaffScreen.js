import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CusomTextInputSearch from '../component/CusomTextInputSearch';
import {Colors, Fontsizes, Radius, Spacing} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/AntDesign';


const ListStaffScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const[userLogin, setUserLogin]=useState({})
  const [searchKeyword, setSearchKeyword] = useState('');
  const link_api = 'http://192.168.1.98:3000/';

  const fetchData = async () => {
    try {
      let res = await fetch(link_api + 'User/list');
      let result = await res.json();
      setData(result);

      const user=await AsyncStorage.getItem('data')
      if(user!== null){
        const userData=JSON.parse(user)
        setUserLogin(userData)
        console.log(userLogin.status+"1");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('chat');
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              style={styles.img}
              source={require('../assets/images/customer.jpg')}
            />
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.textNameService}>{item.name}</Text>
            <Text style={styles.textPriceService}>
              Số điện thoại: {item.numberPhone}
            </Text>
            <Text style={styles.textPriceService}>
              Quê quán: {item.address}
            </Text>
          </View>
        </View>
        {userLogin.status &&(
          <TouchableOpacity
          style={styles.xemthem}
          onPress={() => {
            navigation.navigate('assign', {item});
          }}>
          <Text>Giao việc</Text>
        </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const handleTextInputChange = (text, field) => {
    if (field === 'search') {
      setSearchKeyword(text);
    }
  };
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Icon1 name="arrowleft" color={Colors.Black} size={Fontsizes.fs_22} />
      </TouchableOpacity>
      <CusomTextInputSearch
        onChangeText={txt => handleTextInputChange(txt, 'search')}
        props={{value: searchKeyword}}
      />
      <FlatList
        data={data.filter(
          item =>
            !item.status &&
            item.name &&
            typeof item.name === 'string' &&
            item.name.toLowerCase().includes(searchKeyword.toLowerCase()), // Check if item.name includes searchKeyword
        )}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.btnAdd}>
        <Icon name="add" color={Colors.White} size={Fontsizes.fs_22} />
      </TouchableOpacity>
    </View>
  );
};

export default ListStaffScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.space_20,
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
    height: 80,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    padding: Spacing.space_10,
    borderRadius: Radius.rd_10,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Spacing.space_12,
  },
  infoItem: {
    marginLeft: Spacing.space_15,
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
    marginTop: Spacing.space_16
  }
});
