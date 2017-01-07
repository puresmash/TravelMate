import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Dimensions,
  Platform,
} from 'react-native';
// helper
import Constants from '@const'
const {Colors, Size} = Constants;
// components
import Divider from '@components/common/Divider.js';
// dispatch
import Actions from '@actions';
import {connect} from 'react-redux';

class EditUser extends Component{

  static defaultProps = {};
  static propTypes = {
    uid: PropTypes.number.isRequired,
  };

  constructor(props){
    super(props);
  }

  render(){
    const { uid, users } = this.props;
    const user = users.get(uid);

    return(
      <View style={styles.container}>
        <Divider subHeader="Name"/>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            placeholder="Insert user name"
            autoCorrect={false}
            blurOnSubmit={true}
            selectTextOnFocus={true}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            value={user.name}
            onChange={(e)=>{
              const name = e.nativeEvent.text;
              this.props.dispatch(Actions.UpdUserName(uid, name));
            }}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
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
