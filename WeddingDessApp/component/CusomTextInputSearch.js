import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Fontisto';
import { Colors, Fontsizes, Radius, Spacing } from '../constants';

const CusomTextInputSearch = ({props, onChangeText}) => {
    return (
        <View style={styles.containerInput}>
            <Icon name="search" color={Colors.Gray} size={Fontsizes.fs_22} />
            <TextInput {...props} placeholder='Tìm kiếm' onChangeText={onChangeText}/>
        </View>
    )
}

export default CusomTextInputSearch

const styles = StyleSheet.create({
    containerInput:{
        borderWidth:1,
        borderRadius:Radius.rd_10,
        borderColor:Colors.Gray,
        alignItems:'center',
        flexDirection:'row',
        marginTop:Spacing.space_18,
        paddingHorizontal:Spacing.space_10,
        backgroundColor:Colors.White
    }
})