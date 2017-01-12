import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import NavigatorHelper from '@utils/NavigatorHelper.js';
import Divider from '@components/common/Divider.js';
import Constants from '@const'
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
        <View style={[styles.row]}>
          <Text style={styles.labelText}>Title</Text>
          <TextInput
            style={styles.textInput}
            value={accounting.title}
            autoCorrect={false}
            blurOnSubmit
            selectTextOnFocus
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            onChange={(event) => {
              const title = event.nativeEvent.text;
              dispatch(Actions.UpdAccountingTitle(aid, title));
            }}
          />
        </View>

        <Divider subHeader="Datail" />
        <View style={styles.row}>
          <Text style={styles.labelText}>Date</Text>
          <TextInput
            style={styles.textInput}
            value={accounting.date}
            autoCorrect={false}
            blurOnSubmit
            selectTextOnFocus
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            onChange={(event) => {
              const date = event.nativeEvent.text;
              dispatch(Actions.UpdAccountingDate(aid, date));
            }}
          />
        </View>

        <TouchableHighlight onPress={() => {
          NavigatorHelper.push({
            key: 'EditPayment',
            title: 'EditPayment',
            aid,
            index: 3
          });
        }}>
          <View style={styles.row}>
            <Text style={styles.labelText}>Payment</Text>
            <Text>{this.getUserName(accounting.payment)}</Text>
            <Icon name="ios-arrow-forward"
              color={Colors.light0}
              style={{ marginLeft: 8 }}
              size={18} />
          </View>
        </TouchableHighlight>

        <View style={styles.row}>
          <Text style={styles.labelText}>Amount</Text>
          <TextInput
            style={styles.textInput}
            value={amount}
            autoCorrect={false}
            blurOnSubmit
            selectTextOnFocus
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            onChange={(event) => {
              const newAmount = event.nativeEvent.text;
              dispatch(Actions.UpdAccountingAmount(aid, newAmount));
            }}
          />
        </View>

        <TouchableHighlight onPress={() => {
          NavigatorHelper.push({
            key: 'EditCredit',
            title: 'EditCredit',
            aid,
            index: 3
          })
        }}>
          <View style={styles.row}>
            <Text style={styles.labelText}>Credit</Text>
            <Text numberOfLines={1} style={styles.limitText}>
              {this.getMultiUserName(accounting.credit)}
            </Text>
            <Icon name="ios-arrow-forward"
              color={Colors.light0}
              style={{ marginLeft: 8 }}
              size={18}/>
          </View>
        </TouchableHighlight>

      </View>

    );
  }

  getMultiUserName = (idAry) => {
    if (!idAry)
      return '';

    let nameAry = idAry.map((id) => {
      return this.getUserName(id);
    });
    return nameAry.join(', ');
  }

  getUserName = (id) => {
    if (id == null || id === '')
      return '';

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
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  divider: {
    height: dividerHeight,
    backgroundColor: '#DDDDDD',
  },
  labelText: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    textAlign: 'right',
    color: Colors.black54,
    // necessary
    height: rowHeight,
    alignSelf: 'center',
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
