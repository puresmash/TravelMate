import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import _ from 'lodash';

import CollectionView from './CollectionView.js';
import EditPayment from './EditPayment.js';
import EditCredit from './EditCredit.js';
import EditAmount from './EditAmount.js';
import Divider from './Divider.js';
// dispatch
import Actions from '@actions';
import {connect} from 'react-redux';

class EditNewAcc extends Component{

  constructor(props){
    super(props);

    this.state = {
      step: 'payment',
    }
  }

  render(){
    const { aid, accountingMap, users } = this.props;
    let accounting = accountingMap.get(this.props.aid);
    let payment = accounting ? accounting.payment : '';
    let credit = accounting ? accounting.credit : '';
    let amount = accounting ? accounting.amount : '';
    return(
      <ScrollView style={styles.container}>
        <View style={styles.row}>
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
        </View>
        <Divider subHeader={this.state.step}/>
        {this.renderEditor()}
      </ScrollView>
    );
  }

  renderEditor = ()=> {
    const {step} = this.state;
    switch(step){
      case 'payment':
        return (
          <EditPayment
            // style={styles.container}
            aid={this.props.aid}
            style={{marginTop: 0, paddingTop: 8}}
            callback={()=>{
              this.setState({step: 'amount'});
            }}
          />
        );
        break;
      case 'amount':
        return(
          <EditAmount
            aid={this.props.aid}
            callback={()=>{
              this.setState({step: 'credit'});
            }}
          />
        );
        break;
      case 'credit':
        return(
          <EditCredit
            aid={this.props.aid}
            style={{marginTop: 0, paddingTop: 8}}
          />
        );
        break;
    }

  }

  getMultiUserName = (idAry)=>{
    if(!idAry)
      return '';

    let nameAry = idAry.map((id)=>{
      return this.getUserName(id)
    });
    return nameAry.join(', ');
  }

  getUserName = (id)=>{
    if(!id)
      return '';

    const {users} = this.props;
    return users.get(id).name;
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
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  labelText: {
    flex: 1,
  },
});
