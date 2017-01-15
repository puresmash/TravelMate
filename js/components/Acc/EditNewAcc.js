import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
// import _ from 'lodash';
import NavigatorHelper from '@utils/NavigatorHelper.js';
import CollectionView from '@components/common/CollectionView.js';
import EditPayment from '@components/Acc/EditPayment.js';
import EditCredit from '@components/Acc/EditCredit.js';
import EditAmount from '@components/Acc/EditAmount.js';
import { Divider, Input, ZoomRow } from '@components/common';
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
    const amount = accounting ? accounting.amount.toString() : '';
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
              index: 2
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
              index: 2
            });
          }}
        />
        {/* <View style={styles.row}>
          <Text style={styles.labelText}>Payment</Text>
          <Text>{this.getUserName(payment)}</Text>
        </View>
        <View style={[styles.row]}>
          <Text style={styles.labelText}>Amount</Text>
          <Text>{amount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.labelText}>Credit</Text>
          <Text>{this.getMultiUserName(credit)}</Text>
        </View> */}
        {/* <Divider subHeader={this.state.step} />
        {this.renderEditor()} */}
      </ScrollView>
    );
  }

  renderEditor = () => {
    const { step } = this.state;
    switch (step) {
      case 'payment':
        return (
          <EditPayment
            // style={styles.container}
            aid={this.props.aid}
            style={{ marginTop: 0, paddingTop: 8 }}
            callback={() => {
              this.setState({ step: 'amount' });
            }}
          />
        );

      case 'amount':
        return (
          <EditAmount
            aid={this.props.aid}
            callback={() => {
              this.setState({ step: 'credit' });
            }}
          />
        );

      case 'credit':
        return (
          <EditCredit
            aid={this.props.aid}
            style={{ marginTop: 0, paddingTop: 8 }}
          />
        );
    }

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
    // borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  labelText: {
    flex: 1,
  },
});
