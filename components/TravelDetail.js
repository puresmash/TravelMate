import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import NavigatorHelper from '@utils/NavigatorHelper.js';
import Divider from './Divider.js';
import AccountingList from './AccountingList.js';
// dispatch
import Actions from '@actions';
import {connect} from 'react-redux';

class TravelDetail extends Component{

  static propTypes = {
      tid: PropTypes.string.isRequired,
  };

  constructor(props){
    super(props);
    // this.state = {
    //   editName =
    // }
  }
  render(){
    const {tid, travels, dispatch} = this.props;
    const travel = travels.get(tid);

    return(
      <View style={styles.container}>
        <Divider />
        <View style={[styles.row]}>
          <Text style={styles.labelText}>Title</Text>
          <TextInput
            style={styles.textInput}
            value={travel.title}
            onChange={(event)=>{
              let title = event.nativeEvent.text;
              dispatch(Actions.UpdTravelTitle(tid, title));
            }}
          />
        </View>

        <AccountingList
          tid={tid}
          aidAry={travel.accounting}
        />
      </View>
    );
  }
}

function mapStateToProps(state){
  const { travels } = state.travelReducer;
  return {
    travels,
  };
}

export default connect(mapStateToProps)(TravelDetail);

const rowHeight = 48;
const rowPadding = 15;
const dividerHeight = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  row: {
    padding: rowPadding,
    height: rowHeight,
    flexDirection: 'row',
    borderColor: '#CCCCCC',
    // borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  labelText: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16
  }
});
