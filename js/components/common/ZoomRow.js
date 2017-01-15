
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

const ZoomRow = ({ label, value, onPress, containerStyle }) => {

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.labelText}>{label}</Text>
        <Text
          style={[styles.valueText, styles.limitText]}
          numberOfLines={1}
        >
          {value}
        </Text>
        <Icon
          name="ios-arrow-forward"
          color={Colors.light0}
          style={{ marginLeft: 8 }}
          size={18}
        />
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
    borderColor: Colors.divider,
    borderBottomWidth: 1,
  },
  labelText: {
    flex: 1,
    fontSize: 16,
  },
  valueText: {
    color: Colors.black54,
    fontSize: 16,
  },
  limitText: {
    maxWidth: 150,
  }
});

export default ZoomRow;
