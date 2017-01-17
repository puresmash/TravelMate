import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  Platform,
} from 'react-native';
import Constants from '@const';
const { Colors, Size } = Constants;
// components
import { Divider, Input } from '@components/common';
// dispatch
import Actions from '@actions';
import { connect } from 'react-redux';

class AddNewTravel extends Component {

  // static defaultProps = {};
  // static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      tid: props.travels.size.toString(),
      title: '',
      warning: false,
    };
  }

  addNewTravel = () => {
    const { title, tid } = this.state;
    if (!title) {
      this.setState({ warning: true });
      return;
    }
    this.setState({ warning: false });

    this.props.dispatch(Actions.AddTravel(tid, title));
    this.setState({ step: 2 });
  }

  updTravelTitle = () => {
    this.props.dispatch(Actions.UpdTravelTitle(this.state.tid, this.state.title));
  }

  renderButton = () => {
    if (this.state.step === 1) {
      return (
        <View style={styles.btnContainer}>
          <Button
            onPress={this.addNewTravel}
            title={'Confirm'}
            color={'#007aff'}
          />
        </View>
      );
    }
    return null;
  }

  renderStep = () => {
    const { step, tid } = this.state;
    const { travels, dispatch } = this.props;
    const travel = travels.get(tid);
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
              dispatch(Actions.UpdTravelDate(tid, date));
            }}
          />
        </View>
      );
    }
    return;
  }

  render() {
    const { title, warning } = this.state;
    return (
      <View style={styles.container}>
        <Divider subHeader="New Travel" />
        <Input
          label={'Title'}
          value={title}
          placeholder={'2017 Spring'}
          warning={warning}
          onChangeText={(text) => {
            this.setState({ title: text });
          }}
        />
        {this.renderButton()}
        {this.renderStep()}
      </View>
    );
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
    marginTop: Platform.OS === 'ios' ? 64 : 56,
    backgroundColor: Colors.light0,
  },
  btnContainer: {
    marginTop: 30,
  }
});
