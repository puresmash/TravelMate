import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '@const';
const { Colors } = Constants;
import { Divider, CollectionView } from '@components/common';
import _ from 'lodash';
// dispatch
import Actions from '@actions';
import { connect } from 'react-redux';

class EditPayment extends Component {
  static defaultProps = {
    callback: () => {},
  };
  static propTypes = {
    aid: PropTypes.string.isRequired,
  };

  render() {
    const { aid, users } = this.props;

    return (
      <View style={styles.container}>
        <Divider subHeader={'Single Choice'}/>
        <CollectionView
          style={[styles.collectContainer, this.props.style]}
          aid={aid}
          items={users}
          renderBrick={this.renderBrick}
        />
      </View>
    );
  }

  renderBrick = (brick) => {
    let iconName = 'ios-checkmark-circle-outline';

    const { aid, accountingMap } = this.props;
    const acc = accountingMap.get(aid);
    if (acc && acc.payment === brick.id) {
      iconName = 'ios-checkmark-circle';
    }
    return (
      <TouchableHighlight key={brick.id} onPress={() => {
        this.fnOnPress(aid, brick.id);
      }}>
        <View style={styles.brick}>
          <Text style={styles.text}>{brick.name}</Text>
          <Icon name={iconName}
            style={styles.checkmark}
            color={'green'}
            size={18} />
        </View>
      </TouchableHighlight>
    );
  }

  fnOnPress = (aid, selectId) => {
    const { dispatch, callback } = this.props;
    dispatch(Actions.UpdAccountingPayment(aid, selectId));
    callback();
  }
}

function mapStateToProps(state) {
  const { users } = state.userReducer;
  const { accountingMap } = state.accountingReducer;

  return {
    users,
    accountingMap,
  };
}

export default connect(mapStateToProps)(EditPayment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 56,
    backgroundColor: Colors.light0,
  },
  collectContainer: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
  },
  brick: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 96,
    minWidth: 96,
    marginLeft: 8,
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
  },
  checkmark: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  }
});
