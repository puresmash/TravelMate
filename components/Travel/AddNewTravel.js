import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import Constants from '@const';
const { Colors, Size } = Constants;

import Divider from '@components/common/Divider.js';
import NavigatorHelper from '@utils/NavigatorHelper.js';
// dispatch
import Actions from '@actions';
import { connect } from 'react-redux';

class AddNewTravel extends Component {

  static defaultProps = {};
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }
  render() {
    const { step } = this.state;
    return (
      <View style={styles.container}>
        <Divider subHeader="Title" />
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            placeholder="Insert travel title"
            autoCorrect={false}
            blurOnSubmit
            selectTextOnFocus
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            clearButtonMode={'while-editing'}
            onSubmitEditing={(event) => {
              const title = event.nativeEvent.text;
              if (step === 1) {
                const size = this.props.travels.size;
                this.tid = size.toString();
                this.props.dispatch(Actions.AddTravel(this.tid, title));
                this.setState({ step: 2 });
              }
              else {
                this.props.dispatch(Actions.UpdTravelTitle(this.tid, title));
              }
            }}
          />
        </View>
        {this.renderStep()}
      </View>
    );
  }

  renderStep = () => {
    const { step } = this.state;
    const { travels, dispatch } = this.props;
    const travel = travels.get(this.tid);
    if (step === 2) {
      return (
        <View>
          <Divider subHeader="Detail" />
          <View style={styles.row}>
            <Text style={styles.labelText}>Date</Text>
            <TextInput
              style={styles.textInput}
              value={travel ? travel.date : ''}
              placeholder='Insert travel date'
              autoCorrect={false}
              blurOnSubmit
              selectTextOnFocus
              autoCapitalize={'none'}
              underlineColorAndroid={'transparent'}
              clearButtonMode={'while-editing'}
              onChange={(event) => {
                const date = event.nativeEvent.text;
                dispatch(Actions.UpdTravelDate(this.tid, date));
              }}
            />
          </View>
        </View>
      );
    }
    return;
  }

}

function mapStateToProps(state) {
  const { travels } = state.travelReducer;
  return {
    travels,
  };
}

export default connect(mapStateToProps)(AddNewTravel);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.light0,
  },
  row: {
    padding: Size.rowPadding,
    height: Size.rowHeight,
    flexDirection: 'row',
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
  },
});
