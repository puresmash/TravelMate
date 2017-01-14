import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  Platform,
} from 'react-native';
// helper
import Constants from '@const';
const { Colors, Size } = Constants;
// components
import { Divider, Input } from '@components/common';
// dispatch
import Actions from '@actions';
import { connect } from 'react-redux';

class EditUser extends Component {

  static defaultProps = {};
  static propTypes = {
    uid: PropTypes.string.isRequired,
  };

  render() {
    const { uid, users } = this.props;
    const user = users.get(uid);

    return (
      <View style={styles.container}>
        <Divider />
        <Input
          label={'Name'}
          value={user.name}
          placeholder={'Username'}
          onChangeText={(text) => {
            const name = text;
            this.props.dispatch(Actions.UpdUserName(uid, name));
          }}
        />
        {/* <Button /> */}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state.userReducer;
  return {
    users,
  };
}
export default connect(mapStateToProps)(EditUser);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#DDDDDD',
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
});
