import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fontsizes, Radius, Spacing} from '../constants';
import CustomButton from '../component/CustomButton';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [dataAssign, setDataAssign] = useState([]);
  const [userLogin, setUserLogin] = useState({});
  const [assign, setAssign] = useState([]);
  const [job, setJob] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [role, setRole] = useState('');
  const [isLoadingStaff, setIsLoadingStaff] = useState(true);

  const getUserLogin = async () => {
    try {
      const user = await AsyncStorage.getItem('data');
      const userData = JSON.parse(user);
      setRole(userData.status ? 'manager' : 'staff');
      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLogin().then(user => {
      setUserLogin(user);
    });
  }, []);

  const link_api = 'http://192.168.1.98:3000/';

  const fetchStaff = async () => {
    try {
      let res = await fetch(link_api + 'User/list');
      let result = await res.json();
      setStaff(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingStaff(false);
    }
  };

  const fetchAssign = async () => {
    try {
      let res = await fetch(link_api + 'Assign/list');
      let result = await res.json();
      setDataAssign(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchlistJob();
    fetchStaff();
  }, []);

  useEffect(() => {
    fetchAssign();
  }, [dataAssign]);

  const userJobs = Array.isArray(dataAssign)
    ? dataAssign.filter(
        item => item.idStaff === userLogin._id && item.statusJob === false,
      )
    : [];

  const getJobDesById = jobId => {
    const foundJob = job.find(item => item._id === jobId);
    return foundJob ? foundJob.descriptionJob : '';
  };

  const complete = async id => {
    try {
      let res = await fetch(link_api + 'Assign/put/' + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusJob: true,
        }),
      });
      if (res.status === 200) {
        Alert.alert('Thông báo', 'Xác nhận');
        fetchAssign();
      } else {
        Alert.alert('Thông báo', 'Thất bại');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchlistJob = async () => {
    try {
      const res = await fetch(link_api + 'Job/list');
      const result = await res.json();
      setJob(result);
    } catch (error) {
      console.log(error);
    }
  };

  const renderManagerScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Danh sách nhân viên</Text>
        {isLoadingStaff ? (
          <ActivityIndicator size={'large'} />
        ) : (
          staff.map(item => (
            <View key={item._id} style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require('../assets/images/customer.jpg')}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>
                  Số điện thoại: {item.numberPhone}
                </Text>
                <Text style={styles.address}>Quê quán: {item.address}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('assign', {item})}>
                <Text>Giao việc</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    );
  };

  const renderStaffScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Danh sách công việc</Text>
        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          userJobs.map(ass => (
            <View key={ass._id} style={styles.jobContainer}>
              <Text>Công việc: {getJobDesById(ass.idJob)}</Text>
              <Text>
                Ngày bắt đầu:{' '}
                {`${new Date(ass.dateStart).getDate()}-${
                  new Date(ass.dateStart).getMonth() + 1
                }-${new Date(ass.dateStart).getFullYear()}`}
              </Text>
              <Text>
                Ngày kết thúc:{' '}
                {`${new Date(ass.dateEnd).getDate()}-${
                  new Date(ass.dateEnd).getMonth() + 1
                }-${new Date(ass.dateEnd).getFullYear()}`}
              </Text>
              <CustomButton
                label={'Hoàn thành'}
                onPress={() => complete(ass._id)}
              />
            </View>
          ))
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      {role === 'manager' ? renderManagerScreen() : renderStaffScreen()}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.space_18,
    paddingTop: Spacing.space_10,
  },
  title: {
    fontSize: Fontsizes.fs_28,
    fontWeight: '700',
    color: Colors.Black,
    marginBottom: Spacing.space_12,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    padding: Spacing.space_15,
    borderRadius: Radius.rd_10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.space_12,
  },
  imageContainer: {
    flex: 1,
    marginRight: Spacing.space_12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: Radius.rd_8,
  },
  infoContainer: {
    flex: 3,
  },
  name: {
    fontSize: Fontsizes.fs_22,
    fontWeight: '600',
    color: Colors.Black,
  },
  phone: {
    color: Colors.Black,
    marginTop: Spacing.space_8,
  },
  address: {
    color: Colors.Black,
    marginTop: Spacing.space_8,
  },
  button: {
    marginLeft: Spacing.space_12,
    padding: Spacing.space_12,
    backgroundColor: Colors.Primary,
    borderRadius: Radius.rd_8,
  },
  jobContainer: {
    borderRadius: Radius.rd_8,
    borderWidth: 1,
    borderColor: Colors.Black,
    padding: Spacing.space_10,
    marginBottom: Spacing.space_12,
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
    fontWeight: '500',
  },
});
