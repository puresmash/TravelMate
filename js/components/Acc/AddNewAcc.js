import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  Platform,
} from 'react-native';
// import _ from 'lodash';
// helper
import Constants from '@const'
const { Colors, Size } = Constants;
// components
import { Divider, CollectionView, Input } from '@components/common';
import EditNewAcc from '@components/Acc/EditNewAcc.js';
// dispatch
import Actions from '@actions';
import { connect } from 'react-redux';

class AddNewAcc extends Component {

  static defaultProps = {};
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      aid: props.accountingMap.size.toString(),
      title: '',
      warning: false,
    };
  }

  // componentWillMount(){ console.log('addAcc cwm'); }

  render() {
    const { title, warning } = this.state;
    return (
      <View style={styles.container}>
        <Divider subHeader="New accounting" />
        <Input
          label={'Title'}
          value={title}
          placeholder="Dinner Bill"
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

  renderButton = () => {
    if (this.state.step === 1) {
      return (
        <View style={styles.btnContainer}>
          <Button
            onPress={this.addNewAcc}
            title={'Confirm'}
            color={'#007aff'}
          />
        </View>
      );
    }
    return null;
  }

  addNewAcc = () => {
    const { tid, travels } = this.props;
    const { aid, title } = this.state;
    if (!title) {
      this.setState({ warning: true });
      return;
    }
    this.setState({ warning: false });

    const aidAry = travels.get(tid).accounting;
    aidAry.push(aid);

    this.props.dispatch(Actions.AddAccounting(aid, title));
    this.props.dispatch(Actions.UpdAccountingList(tid, aidAry));
    this.setState({ step: 2 });
  }

  updAccTitle = () => {
    this.props.dispatch(Actions.UpdAccountingTitle(this.state.aid, this.state.title));
  }

  renderStep = () => {
    const { step, aid } = this.state;
    // const { travels, dispatch } = this.props;
    // const travel = travels.get(this.tid);
    // if (!aid) {
    //   return null;
    // }

    switch (step) {
      case 2:
        return (
          <EditNewAcc aid={aid} />
        );
      default:
        return null;

    }
  }

}

function mapStateToProps(state) {
  const { accountingMap } = state.accountingReducer;
  const { travels } = state.travelReducer;
  return {
    accountingMap,
    travels,
  };
}
export default connect(mapStateToProps)(AddNewAcc);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    marginTop: Platform.OS === 'ios' ? 64 : 56,
    backgroundColor: Colors.light0,
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
  btnContainer: {
    // flex: 1,
    // alignSelf: 'stretch',
    // backgroundColor: '#fff',
    // borderColor: '#007aff',
    // borderWidth: 1,
    // borderRadius: 5,
    // margin: 5,
  }
});
