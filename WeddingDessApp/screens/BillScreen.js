import { FlatList, StyleSheet, Text, View,TouchableOpacity, Image, ScrollView, Button } from 'react-native'
import React, {  useEffect, useState } from 'react'

const BillScreen = () => {
  const [databill, setdatabill] = useState([]);
  const [title, settite] = useState("Xác nhân");

  //lấy  danh sách bill
  const fetbill=async()=>{
    try {
      let res =await fetch('http://192.168.1.98:3000/Bill/list');
      let result = await res.json();
      setdatabill(result);
     
     
    } catch (error) {
      console.log("lấy không thành công")
    }
  }

  useEffect(()=>{
    fetbill();
    
  },[databill])

  //xac nhan 

  

  return (
    <View style={{alignItems:'center'}}>
      <Text>DANH SÁCH BIll</Text>
      <FlatList
        data={databill}
        keyExtractor={(item)=>item._id}
        renderItem={({item})=>{
         
          return(
           item.status ?

            <View style={styles.item}>
              <View><Image source={{uri:item.img}} style={{width:90,height:110}}></Image></View>
              <View style={{margin:10}}>
              <Text>Tên dịch vụ: {item.nameService}</Text>
              <Text>Tên nhân viên: {item.nameStaff}</Text>
              <Text>Tên khách hàng: {item.nameCustomer}</Text>
              <Text>số điện thoại khách hàng: {item.numberphone}</Text>
             
              </View>
              
            </View>
            :<></>
          )
        }}
      ></FlatList>
      
    </View>
    
  )
}

export default BillScreen

const styles = StyleSheet.create({
  item:{
    flex:1,
    alignItems:'center',
    borderRadius:10,
    borderColor:'blue',
    backgroundColor:'gray',
    margin:10,
    justifyContent:'space-around',
    flexDirection:'row'
  }
})