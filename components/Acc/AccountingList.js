
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';

import AccountingItem from '@components/Acc/AccountingItem.js';
import Divider from '@components/common/Divider.js';

import Constants from '@const'
const { Colors, Size } = Constants;

class AccountingList extends Component {
  static propTypes = {
    tid: PropTypes.string.isRequired,
    aidAry: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({
        Accounting: this.gatheringData(props),
      }),
    };
  }
  gatheringData = (props) => {
    const { aidAry, accountingMap } = props;
    return ary = aidAry.map((aid) => {
      return accountingMap.get(aid);
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.accountingMap !== this.props.accountingMap) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections({
          Accounting: this.gatheringData(nextProps),
        }),
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'purple' }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderHeader}
          renderSeparator={this._renderSeparator}
          style={[styles.container]}
          enableEmptySections
          // {...this.props}
        />
      </View>
    );
  }
  _renderRow = (accounting) => {
    return(
      <AccountingItem
        aid={accounting.id}
        accounting={accounting}
      />
    );
  }
  _renderHeader = (sectionData, sectionID) => {
    return (
      <Divider subHeader={sectionID} />
    );
  }

  _renderSeparator = (sectionID, rowID) => {
    if (rowID === this.props.aidAry.length - 1) {
      return null;
    }
    return (
      <View
        key={`AL-${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: Colors.divider,
          marginLeft: Size.rowPadding,
        }}
      />
    );
  }
}

function mapStateToProps(state) {
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
    flex: 1,
    // width: Dimensions.get('window').width,
    backgroundColor: '#DDDDDD',
    borderColor: Colors.divider,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
