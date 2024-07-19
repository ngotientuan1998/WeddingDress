import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fontsizes, Spaces, Spacing } from '../constants'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomTextInput = ({ label, props, onChangeText }) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const eye = isPasswordVisible ? 'eye-off' : 'eye-outline';
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  if (props && props.secureTextEntry) {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          {...props}
          secureTextEntry={isPasswordVisible}
          onChangeText={onChangeText}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}>
          <Icons name={eye} size={Spacing.space_24} />
        </TouchableOpacity>

  
      </View>
    );
  }
  return (
    <View style={styles.inputContainer} >
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} onChangeText={onChangeText}/>
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    justifyContent: 'center',
    marginTop: Spacing.space_24
  },
  label: {
    color: Colors.Black,
    fontSize: Fontsizes.fs_20,
    fontWeight: '600'
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: Spacing.space_15,
    fontSize: Fontsizes.fs_18,
    

  },
  eyeIcon: {
    position: 'absolute',
    right: Spacing.space_10,
    bottom:Spacing.space_12
  },

})