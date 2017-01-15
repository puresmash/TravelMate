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

class AddNewUser extends Component {

  static defaultProps = {};
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      uid: props.users.size.toString(),
      name: '',
      warning: false,
    };
  }

  render() {
    const { users } = this.props;
    const { name, warning } = this.state;
    return (
      <View style={styles.container}>
          <Divider subHeader="New Member" />
          <Input
            label={'Name'}
            value={name}
            placeholder={'Member Name'}
            warning={warning}
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
          />
          {this.renderButton()}
          {this.renderStep()}
      </View>
    );
  }
  renderButton = () => {
    if (this.state.step === 1) {
      return (
        <Button
          onPress={this.addNewUser}
          title={'Confirm'}
          color={'#007aff'}
        />
      );
    }
    return null;
  }
  addNewUser = () => {
    const { uid, name } = this.state;
    if (!name) {
      this.setState({ warning: true });
      return;
    }
    this.setState({ warning: false });

    this.props.dispatch(Actions.AddUser(this.uid, name));
    this.setState({ step: 2 });
  }
  renderStep = () => {
    const { step } = this.state;
    if (!this.uid) {
      return null;
    }
    switch (step) {
      case 2:
        return (
          <View style={styles.row} />
        );
      default:
        return null;
    }
  }

}

function mapStateToProps(state) {
  const { users } = state.userReducer;
  return {
    users,
  };
}
export default connect(mapStateToProps)(AddNewUser);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#DDDDDD',
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
});
