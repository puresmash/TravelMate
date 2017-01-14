import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
// helper
import Constants from '@const';
const { Colors, Size } = Constants;

const Input = (props) => {
  const {
    label,
    value,
    containerStyle,
    onChange,
    onChangeText,
    placeholder,
    keyboardType,
    onSubmitEditing
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        keyboardType={keyboardType || 'default'}
        autoCorrect={false}
        autoCapitalize={'none'}
        blurOnSubmit
        // selectTextOnFocus
        underlineColorAndroid={'transparent'}
        // clearButtonMode={'while-editing'}
        value={value}
        onChange={onChange || null}
        onChangeText={onChangeText || null}
        onSubmitEditing={onSubmitEditing || null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Size.rowHeight,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 2,
    color: Colors.black54,
    borderColor: '#000',
    // borderWidth: 1,
    padding: 0,
    paddingTop: 3,
    marginRight: 15,
    paddingLeft: 5,
    fontSize: 16,
    ...Platform.select({
      ios: {
        height: Size.rowHeight - 2,
        lineHeight: Size.rowHeight - 2,
      },
      android: {
        height: Size.rowHeight - 2 - 5,
        textAlignVertical: 'center',
        paddingBottom: 3,
        // includeFontPadding: 'false', // rn 0.40
      },
    }),
    textAlign: 'right',
    // backgroundColor: 'orange',
  },
  labelText: {
    paddingLeft: Size.rowPadding,
    fontSize: 16,
    flex: 1,
  },

});

export default Input;
