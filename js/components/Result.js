import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
// dispatch
import { connect } from 'react-redux';
// components
import Divider from '@components/common/Divider.js';
// helper
import TransUtils from '@utils/TransUtils.js';

class Result extends Component {
  static propTypes = {
    tid: PropTypes.string.isRequired,
  };

  render() {
    const ary = this.getAccList();
    return (
      <View>
        <Divider subHeader="Result List" />
        <ScrollView style={styles.container}>
          {ary}
        </ScrollView>
      </View>
    );
  }
  getAccList = () => {
    const { tid, travels, users, accountingMap } = this.props;

    const uidAry = TransUtils.keysArray(users);
    const userAccMap = TransUtils.genMapWithZeroVal(uidAry);

    const accs = travels.get(tid).accounting;

    accs.forEach((aid) => {
      const acc = accountingMap.get(aid);
      const { payment, credit, amount } = acc;
      if (payment == null || !credit || !amount) {
        return null;
      }

      const totalAmount = amount * credit.length;
      let last = 0;

      // payment
      last = userAccMap.get(payment);
      userAccMap.set(payment, (last - totalAmount));

      // credit
      credit.forEach((uid) => {
        last = userAccMap.get(uid);
        userAccMap.set(uid, (last + amount));
      });
    });

    const ary = [];

    userAccMap.forEach((value, key) => {
      ary.push(this.renderRow(key, value));
    });

    return ary;
  }
  renderRow = (uid, value) => {
    const { users } = this.props;
    const name = users.get(uid).name;
    return (
      <View key={uid} style={styles.row}>
        <Text style={styles.labelText}>{name}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
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
    width: Dimensions.get('window').width,
    backgroundColor: '#DDDDDD',
    flexDirection: 'column',
  },
  row: {
    width: Dimensions.get('window').width,
    padding: rowPadding,
    height: rowHeight,
    flexDirection: 'row',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
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
