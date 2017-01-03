import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import Divider from './Divider.js';
// dispatch
import Actions from '@actions';
import {connect} from 'react-redux';

class EditAmount extends Component{
  static defaultProps = {
    callback: ()=>{},
  };
  static propTypes = {
    aid: PropTypes.string.isRequired,
  };
  constructor(props){
    super(props);
  }
  render(){
    const { aid, accountingMap, callback, dispatch } = this.props;
    let accounting = accountingMap.get(aid);
    return(
      <View style={styles.container}>
        <Divider />
        <View style={[styles.row]}>
          <Text style={styles.labelText}>Amount</Text>
          <TextInput
            style={styles.textInput}
            value={accounting.amount}
            keyboardType="numeric"
            placeholder="insert amount"
            onEndEditing={(event)=>{
              let amount = event.nativeEvent.text;
              dispatch(Actions.UpdAccountingAmount(aid, amount));
              callback();
            }}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  const { accountingMap } = state.accountingReducer;

  return {
    accountingMap,
  };
}

export default connect(mapStateToProps)(EditAmount);

const rowHeight = 48;
const rowPadding = 15;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  row: {
    padding: rowPadding,
    height: rowHeight,
    flexDirection: 'row',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  labelText: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    textAlign: 'right',
  },
});
