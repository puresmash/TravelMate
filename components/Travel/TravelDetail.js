import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
// helper
import Constants from '@const';
const { Colors, Size } = Constants;
import NavigatorHelper from '@utils/NavigatorHelper.js';
// components
import Divider from '@components/common/Divider.js';
import AccountingList from '@components/Acc/AccountingList.js';
// dispatch
import Actions from '@actions';
import { connect } from 'react-redux';

class TravelDetail extends Component {

  static propTypes = {
      tid: PropTypes.string.isRequired,
  };

  // componentWillUnmount() { console.log('td cwunmount'); }

  render() {
    const { tid, travels, dispatch } = this.props;
    const travel = travels.get(tid);

    return (
      <ScrollView style={styles.container}>
        <Divider subHeader="Title" />
        <View style={[styles.row]}>
          {/* <Text style={styles.labelText}>Title</Text> */}
          <TextInput
            style={styles.textInput}
            value={travel.title}
            placeholder="Insert travel title"
            autoCorrect={false}
            blurOnSubmit
            selectTextOnFocus
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            onChange={(event) => {
              const title = event.nativeEvent.text;
              dispatch(Actions.UpdTravelTitle(tid, title));
            }}
          />
        </View>

        <AccountingList
          tid={tid}
          aidAry={travel.accounting}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { travels } = state.travelReducer;
  return {
    travels,
  };
}

export default connect(mapStateToProps)(TravelDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    backgroundColor: '#DDDDDD',
  },
  row: {
    width: Dimensions.get('window').width,
    padding: Size.rowPadding,
    height: Size.rowHeight,
    flexDirection: 'row',
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  labelText: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    // textAlign: 'right',
    color: Colors.black54,
    height: Size.rowHeight,
    alignSelf: 'center',
  }
});
