import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

export default class Group extends Component{
  constructor(props){
    super(props);
  }
  render(){
    <View style={styles.container}>

    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#AAAAAA',
  },
  container: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
