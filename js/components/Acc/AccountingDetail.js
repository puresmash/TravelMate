import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import NavigatorHelper from '@utils/NavigatorHelper.js';
import { Divider, Input, ZoomRow } from '@components/common';
import Constants from '@const';
const { Colors, Size } = Constants;
// dispatch
import Actions from '@actions';
import { connect } from 'react-redux';

class AccountingDetail extends Component {

  static propTypes = {
      aid: PropTypes.string.isRequired,
  };

  render() {
    const { aid, dispatch, accountingMap } = this.props;
    // let travel = travels.get(tid);
    // let accounting = travel.accounting[parseInt(aid)];
    const accounting = accountingMap.get(aid);
    const amount = accounting.amount ? accounting.amount.toString() : '0';

    return (
      <View style={styles.container}>
        <Divider />
        <Input
          label={'Title'}
          value={accounting.title}
          placeholder="Dinner Bill"
          onChange={(event) => {
            const title = event.nativeEvent.text;
            dispatch(Actions.UpdAccountingTitle(aid, title));
          }}
        />
        <Divider subHeader="Datail" />
        <Input
          label={'Date'}
          value={accounting.date}
          placeholder={'2016.01.01'}
          onChange={(event) => {
            const date = event.nativeEvent.text;
            dispatch(Actions.UpdAccountingDate(aid, date));
          }}
        />
        <ZoomRow
          label={'Payment'}
          value={this.getUserName(accounting.payment)}
          onPress={() => {
            NavigatorHelper.push({
              key: 'EditPayment',
              title: 'EditPayment',
              aid,
              index: 3
            });
          }}
        />
        <Input
          label={'Amount'}
          value={amount}
          placeholder={'500'}
          keyboardType={'numeric'}
          containerStyle={{ borderTopWidth: 0 }}
          onChange={(event) => {
            const newAmount = event.nativeEvent.text;
            dispatch(Actions.UpdAccountingAmount(aid, newAmount));
          }}
        />
        <ZoomRow
          label={'Credit'}
          value={this.getMultiUserName(accounting.credit)}
          onPress={() => {
            NavigatorHelper.push({
              key: 'EditCredit',
              title: 'EditCredit',
              aid,
              index: 3
            });
          }}
        />
      </View>

    );
  }

  getMultiUserName = (idAry) => {
    if (!idAry) {
      return '';
    }
    const nameAry = idAry.map((id) => this.getUserName(id));
    return nameAry.join(', ');
  }

  getUserName = (id) => {
    if (id == null || id === '') {
      return '';
    }
    const { users } = this.props;
    return users.get(id).name;
  }
}
const rowHeight = 48;
const rowPadding = 15;
const dividerHeight = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 56,
    backgroundColor: '#DDDDDD',
  },
  row: {
    padding: rowPadding,
    height: Size.rowHeight,
    flexDirection: 'row',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    // borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  divider: {
    height: dividerHeight,
    backgroundColor: '#DDDDDD',
  },
  labelText: {
    flex: 1,
  },
  limitText: {
    maxWidth: 150,
  }
});

function mapStateToProps(state) {
  const { travels } = state.travelReducer;
  const { users } = state.userReducer;
  const { accountingMap } = state.accountingReducer;
  return {
    travels,
    users,
    accountingMap,
  };
}

export default connect(mapStateToProps)(AccountingDetail);
