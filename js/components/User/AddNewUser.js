import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Platform,
} from 'react-native';
// helper
import Constants from '@const';
const { Colors, Size } = Constants;
// components
import Divider from '@components/common/Divider.js';
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
    };
  }

  render() {
    const { users } = this.props;
    const { step } = this.state;
    return (
      <View style={styles.container}>
          <Divider subHeader="Name" />
          <View style={styles.row}>
            <TextInput
              style={styles.textInput}
              placeholder="Insert user name"
              autoCorrect={false}
              blurOnSubmit
              selectTextOnFocus
              autoCapitalize={'none'}
              underlineColorAndroid={'transparent'}
              clearButtonMode={'while-editing'}
              onSubmitEditing={(e) => {
                const name = e.nativeEvent.text;
                const size = this.props.users.size;
                this.uid = size.toString();
                // if(step === 1){
                this.props.dispatch(Actions.AddUser(this.uid, name));
                //   this.setState({step: 2});
                // }
                // else{
                //   this.props.dispatch(Actions.UpdUserName(this.uid, name));
                // }
              }}
            />
          </View>
          {this.renderStep()}
      </View>
    );
  }

  renderStep = () => {
    const { step } = this.state;
    if (!this.uid) {
      return null;
    }
    switch (step) {
      case 2:
        return (
          <View style={styles.row}>
            <TextInput />
          </View>
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
  row: {
    // width: Dimensions.get('window').width,
    padding: Size.rowPadding,
    height: Size.rowHeight,
    flexDirection: 'row',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  labelText: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    color: Colors.black54,
    height: Size.rowHeight,
    alignSelf: 'center',
  }
});
