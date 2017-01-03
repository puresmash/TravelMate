
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import {connect} from 'react-redux';

import AccountingItem from './AccountingItem.js';
import Divider from './Divider.js';

import Constants from '@const'
const {Colors, Size} = Constants;

class AccountingList extends Component{
  static propTypes = {
    tid: PropTypes.string.isRequired,
    aidAry: PropTypes.array.isRequired,
  };

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({
        Accounting: this.gatheringData(props),
      }),
    }
  }
  gatheringData = (props)=>{
    const { aidAry, accountingMap } = props;
    console.log(accountingMap)
    console.log(aidAry)
    return ary = aidAry.map((aid)=>{
      return accountingMap.get(aid);
    });
  }
  componentWillReceiveProps(nextProps){
    console.log('OXOXOXO');
    // console.log(nextProps.aidAry);
    if(nextProps.accountingMap != this.props.accountingMap){
      console.log('GOGOGOG');
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections({
          Accounting: this.gatheringData(nextProps),
        }),
      });
    }
  }

  render(){
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderHeader}
          renderSeparator={this._renderSeparator}
          style={[styles.container]}
          // {...this.props}
        />
      </View>
    );
  }
  _renderRow = (accounting)=>{
    console.log('renderRow');
    console.log(accounting)
    return(
      <AccountingItem
        aid={accounting.id}
        accounting={accounting}
      />
    );
  }
  _renderHeader = (sectionData, sectionId) => {
    return (
      <Divider subHeader={sectionId}/>
    );
  }
  _renderSeparator = (sectionID, rowID) => {
    if(rowID == this.props.aidAry.length-1)
      return;
    return(
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: Colors.divider,
          marginLeft: Size.rowPadding,
        }}
      />
    );
  }
}

function mapStateToProps(state){
  const { accountingMap } = state.accountingReducer;
  return {
    accountingMap,
  };
}

export default connect(mapStateToProps)(AccountingList);

const styles = StyleSheet.create({
  accountingList: {
    // flex: 1,
    // alignSelf: 'stretch',
    // backgroundColor: '#AAAAAA',
  },
  container: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: Colors.divider,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
