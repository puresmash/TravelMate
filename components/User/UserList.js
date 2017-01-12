
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
import Divider from '@components/common/Divider.js';
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
      <View style={{ flex: 1, backgroundColor: '#DDDDDD' }}>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          renderSectionHeader={this._renderHeader}
          enableEmptySections
        />
      </View>
    );
  }

  _renderRow = (user) => {
    if (!user.name)
      return null;
    const uid = user.id;
    return (
        <TouchableHighlight onPress={() => {
          NavigatorHelper.push({
            key: 'EditUser',
            title: 'EditUser',
            uid,
            index: 1
          });
        }}>
          <View style={styles.row}>
            <Text style={styles.title}>{user.name}</Text>
          </View>
        </TouchableHighlight>
    );
  }

  _renderHeader = (sectionData, sectionID) => {
    return (
      <Divider subHeader={sectionID} />
    );
  }

  _renderSeparator = (sectionID, rowID) => {
    if (rowID === this.props.users.size - 1) {
      return null;
    }
    // console.log(`${sectionID}-${rowID}`)
    return (
      <View
        key={`UL-${sectionID}-${rowID}`}
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
    borderTopWidth: 1,
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
