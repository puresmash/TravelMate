import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
// import _ from 'lodash';
import NavigatorHelper from '@utils/NavigatorHelper.js';
import CollectionView from '@components/common/CollectionView.js';
import { Input, ZoomRow } from '@components/common';
// dispatch
import Actions from '@actions';
import { connect } from 'react-redux';

class EditNewAcc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 'payment',
    };
  }

  render() {
    const { aid, accountingMap, dispatch } = this.props;
    const accounting = accountingMap.get(aid);
    const payment = accounting ? accounting.payment : '';
    const credit = accounting ? accounting.credit : '';
    const amount = accounting ? accounting.amount.toString() : '0';
    return (
      <ScrollView style={styles.container}>
        <ZoomRow
          label={'Payment'}
          value={this.getUserName(payment)}
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
          // value={amount}
          placeholder={'Insert Amount for Each'}
          containerStyle={{ borderTopWidth: 0 }}
          keyboardType={'numeric'}
          onChangeText={(text) => {
            dispatch(Actions.UpdAccountingAmount(aid, amount));
          }}
        />
        <ZoomRow
          label={'Credit'}
          value={this.getMultiUserName(credit)}
          onPress={() => {
            NavigatorHelper.push({
              key: 'EditCredit',
              title: 'EditCredit',
              aid,
              index: 3
            });
          }}
        />
      </ScrollView>
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
export default connect(mapStateToProps)(EditNewAcc);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
});
