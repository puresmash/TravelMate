import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class Divider extends Component {
  static propTypes = {
    subHeader: PropTypes.string,
  };

  getSubHeader = () => {
    const { subHeader } = this.props;
    if (subHeader) {
      return (
        <View style={{ height: dividerHeight * 2 }}>
          <View style={{ flex: 1 }} />
          <View style={styles.subheader}>
            <Text style={styles.subheaderText}>{subHeader}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.divider}>
        {this.getSubHeader()}
      </View>
    );
  }
  
}

const rowPadding = 15;
const dividerHeight = 30;
const styles = StyleSheet.create({
  divider: {
    minHeight: dividerHeight,
    backgroundColor: '#DDDDDD',
  },
  subheader: {
    flex: 1,
    marginLeft: rowPadding,
    justifyContent: 'center',
  },
  subheaderText: {
    opacity: 0.54,
  },
});
