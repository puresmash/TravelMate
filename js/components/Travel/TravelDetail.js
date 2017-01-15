import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
// helper
import Constants from '@const';
const { Colors, Size } = Constants;
import NavigatorHelper from '@utils/NavigatorHelper.js';
// components
import { Divider, Input } from '@components/common';
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
        <Divider subHeader="Travel Title" />
        <Input
          label={'Title'}
          value={travel.title}
          placeholder={'Taiwan 2016'}
          onChange={(event) => {
            const title = event.nativeEvent.text;
            dispatch(Actions.UpdTravelTitle(tid, title));
          }}
        />
        <AccountingList
          tid={tid}
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
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },

});
