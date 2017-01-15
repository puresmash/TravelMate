
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';
// components
import AccountingItem from '@components/Acc/AccountingItem.js';
import { Divider, IconRow } from '@components/common';
// helper
import NavigatorHelper from '@utils/NavigatorHelper.js';
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
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderHeader}
          renderSeparator={this._renderSeparator}
          style={[styles.container]}
          enableEmptySections
          removeClippedSubviews={false}
          // {...this.props}
        />
      </View>
    );
  }
  _renderRow = (accounting) => {
    if (accounting && accounting.id) {
      return (
        <AccountingItem
          aid={accounting.id}
          accounting={accounting}
        />
      );
    }
    return null;
  }

  _renderHeader = (sectionData, sectionID) => {
    return (
      <View>
        <Divider subHeader={sectionID} />
        <IconRow
          label={'Push to add new acc...'}
          containerStyle={{ borderWidth: 1, elevation: 1 }}
          backgroundColor={Colors.orange200}
          onPress={() => {
            NavigatorHelper.push({
              key: 'AddNewAcc',
              title: 'AddNewAcc',
              tid: this.props.tid,
              index: 2
            });
          }}
        />
      </View>
    );
  }

  _renderSeparator = (sectionID, rowID) => {
    // rowID is a string
    if (rowID == this.props.aidAry.length - 1) {
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

function mapStateToProps(state, ownProps) {
  const { accountingMap } = state.accountingReducer;
  const { travels } = state.travelReducer;
  const aidAry = travels.get(ownProps.tid).accounting;
  return {
    accountingMap,
    aidAry,
  };
}

export default connect(mapStateToProps)(AccountingList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: Dimensions.get('window').width,
    backgroundColor: '#FFF',
    borderColor: Colors.divider,
    borderBottomWidth: 1,
    // borderTopWidth: 1,
  },
});
