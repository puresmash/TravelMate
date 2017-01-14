import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Constants from '@const';
const { Colors, Size } = Constants;
// components
import { Divider, Input } from '@components/common';
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
        <Divider subHeader="New Travel" />
        <Input
          label={'Title'}
          placeholder={'Taiwan 2017'}
          onSubmitEditing={(event) => {
            const title = event.nativeEvent.text;
            if (step === 1) {
              const size = this.props.travels.size;
              this.tid = size.toString();
              this.props.dispatch(Actions.AddTravel(this.tid, title));
              this.setState({ step: 2 });
            } else {
              this.props.dispatch(Actions.UpdTravelTitle(this.tid, title));
            }
          }}
        />
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
          <Input
            label={'Date'}
            value={travel ? travel.date : ''}
            placeholder='2017.01.01'
            onChange={(event) => {
              const date = event.nativeEvent.text;
              dispatch(Actions.UpdTravelDate(this.tid, date));
            }}
          />
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
});
