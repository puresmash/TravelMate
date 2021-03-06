
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
// dispatch
import { connect } from 'react-redux';
// components
import { Divider, ZoomRow, IconRow } from '@components/common';
// helper
import NavigatorHelper from '@utils/NavigatorHelper.js'
import EmitterUtils from '@utils/EmitterUtils.js';
import Constants from '@const';
const { Colors, Size } = Constants;

class UserList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({
        UserList: this.gatheringData(props),
      }),
    };
  }

  componentWillMount() {
    this.subscription = EmitterUtils.on('AddNewUser', () => {
      NavigatorHelper.push({
        key: 'AddNewUser',
        title: 'AddNewUser',
        index: 1
      });
    });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  gatheringData = (props) => {
    const ary = [];
    for (const user of props.users.values()) {
      ary.push(user);
    }
    return ary;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users !== this.props.users) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections({
          UserList: this.gatheringData(nextProps),
        })
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          renderSectionHeader={this._renderHeader}
          enableEmptySections
          removeClippedSubviews={false}
        />
      </View>
    );
  }

  _renderRow = (user) => {
    if (!user.name) {
      return null;
    }
    return (
        <ZoomRow
          label={user.name}
          containerStyle={{ borderBottomWidth: 0 }}
          onPress={() => {
            NavigatorHelper.push({
              key: 'EditUser',
              title: 'EditUser',
              uid: user.id,
              index: 1
            });
          }}
        />
    );
  }

  _renderHeader = (sectionData, sectionID) => {
    return (
      <View>
        <Divider subHeader={sectionID} />
        <IconRow
          label={'Push to add new user...'}
          containerStyle={{ borderWidth: 1, elevation: 1 }}
          backgroundColor={Colors.orange200}
          onPress={() => {
            NavigatorHelper.push({
              key: 'AddNewUser',
              title: 'AddNewUser',
              index: 1
            });
          }}
        />
      </View>
    );
  }

  _renderSeparator = (sectionID, rowID) => {
    // rowID is a string
    // if (rowID == this.props.users.size - 1) {
    //   return null;
    // }
    // console.log(`${sectionID}-${rowID}`)
    return (
      <View
        key={`UL-${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: Colors.divider,
          // marginLeft: Size.rowPadding,
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  const { users } = state.userReducer;
  return {
    users,
  };
}
export default connect(mapStateToProps)(UserList);

const rowHeight = 48;
const rowPadding = 15;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#DDDDDD',
    borderColor: Colors.divider,
    borderBottomWidth: 1,
    // borderTopWidth: 1,
  },
  listview: { },
  row: {
    // flex: 1,
    paddingTop: rowPadding,
    paddingBottom: rowPadding,
    paddingRight: rowPadding,
    paddingLeft: rowPadding,
    height: rowHeight,
    flexDirection: 'row',
    // borderColor: '#CCCCCC',
    // borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    flex: 1,
  }
});
