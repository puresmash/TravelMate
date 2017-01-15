
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '@const';
const { Colors, Size } = Constants;

const IconRow = (props) => {
  const {
    label,
    onPress,
    containerStyle,
    labelStyle,
    backgroundColor
  } = props;
  return (
    <TouchableHighlight
      style={{ backgroundColor: backgroundColor || '#FFF' }}
      onPress={onPress}
    >
      <View style={[styles.container, containerStyle, { backgroundColor: backgroundColor || '#FFF' }]}>
        <Icon
          name="ios-add-circle-outline"
          color={'black'}
          style={{ marginRight: 8 }}
          size={18}
        />
        <Text style={[styles.labelText, labelStyle]}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: Size.rowPadding,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderStyle: 'solid',
    borderColor: Colors.divider,
    borderBottomWidth: 1,
  },
  labelText: {
    flex: 1,
    fontSize: 16,
  },
  limitText: {
    maxWidth: 150,
  }
});

export default IconRow;
