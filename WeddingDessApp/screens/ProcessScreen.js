import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fontsizes, Radius, Spacing } from '../constants'

const renderItem = () => {
    return (
        <View style={styles.item}>
        <View style={{flexDirection:'row', alignItems:'center', marginBottom:Spacing.space_18}}>
            <View>
                <Image style={styles.img} source={require('../assets/images/dv.jpg')} />
            </View>
            <View style={{marginLeft:'36%'}}>
                <Text style={styles.nameService}>Dịch vụ trang điểm</Text>
                <Text style={styles.textInfo}>Đỗ Tuấn Thành</Text>
                <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                    <Text style={styles.textInfo}>0123456789</Text>
                    <Text style={styles.textInfo}>27/03/2024</Text>
                </View>
                <Text style={styles.textInfo}>Đơn giá: 200.000 Đ</Text>

            </View>
        </View>
        <View style={styles.footer_item}>
            <TouchableOpacity style={styles.btnAccept}>
                <Text style={styles.text_btn}>Xác nhận đơn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFail}>
                <Text style={styles.text_btn}>Hủy đơn hàng</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const ProcessScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{alignItems:'center'}}>
                <Text style={styles.title}>Xác nhận đơn</Text>
            </View>
        </View>

        
    )
}

export default ProcessScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Spacing.space_24
    },
    title: {
        fontSize: Fontsizes.fs_32,
        color: Colors.Black,
        fontWeight: '500'
    },
    img: {
        width: 100, height: 100,
    },
    footer_item: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnAccept: {
        backgroundColor: Colors.Green,
        borderRadius: Radius.rd_8,
        paddingHorizontal: Spacing.space_28,
        paddingVertical: Spacing.space_10
    },
    text_btn: {
        color: Colors.Black,
        textAlign: 'center',
        fontSize:Fontsizes.fs_20
    },
    btnFail: {
        backgroundColor: Colors.Red,
        borderRadius: Radius.rd_8,
        paddingHorizontal: Spacing.space_28,
        paddingVertical: Spacing.space_10

    },
    item: {
        borderWidth: 1,
        borderRadius: Radius.rd_8,
        padding: Spacing.space_28,
        margin: Spacing.space_16,
        paddingHorizontal:Spacing.space_40
    },
    nameService: {
        color:Colors.Black,
        fontWeight:'500',
        fontSize:Fontsizes.fs_24
    },
    textInfo: {
        color:Colors.Black,
        fontSize:Fontsizes.fs_16,
        marginTop:Spacing.space_3
    }
})