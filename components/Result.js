import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';

import Divider from './Divider.js';
import TransUtils from '@utils/TransUtils.js';

class Result extends Component{
  static propTypes = {
    tid: PropTypes.string.isRequired,
  };
  constructor(props){
    super(props);
  }
  render(){
    let ary = this.getAccList();
    return(
      <View style={styles.container}>
        {ary}
      </View>
    );
  }
  getAccList = ()=>{
    const { tid, travels, users } = this.props;
    const { accountingMap } = this.props;

    const uidAry = TransUtils.keysArray(users);
    let userAccMap = TransUtils.genMapWithZeroVal(uidAry);

    let accs = travels.get(tid).accounting;
    accs.forEach((aid)=>{
      let acc = accountingMap.get(aid);
      let { payment, credit, amount } = acc;
      if ( !payment || !credit || !amount)
        return;
      let totalAmount = amount * credit.length;
      let last = 0;

      // payment
      last = userAccMap.get(payment);
      userAccMap.set(payment, (last-totalAmount));

      // credit
      credit.forEach((uid)=>{
        last = userAccMap.get(uid);
        userAccMap.set(uid, (last+amount));
      });
    });

    let ary = [];
    userAccMap.forEach((value, key)=>{
      ary.push(this.renderRow(key, value));
    });

    return ary;
  }
  renderRow = (uid, value)=>{
    const { users } = this.props;
    let name = users.get(uid).name;
    return(
      <View key={uid} style={styles.row}>
        <Text style={styles.labelText}>{name}</Text>
        <Text >{value}</Text>
      </View>
    );
  }
}

function mapStateToProps(state){
  const { users } = state.userReducer;
  const { accountingMap } = state.accountingReducer;
  const { travels } = state.travelReducer;

  return {
    users,
    accountingMap,
    travels,
  };
}
export default connect(mapStateToProps)(Result);

const rowHeight = 48;
const rowPadding = 15;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
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
  valueText: {
    flex: 1,
    textAlign: 'right',
  }
});
