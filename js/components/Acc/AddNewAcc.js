import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
// import _ from 'lodash';
// helper
import Constants from '@const'
const { Colors, Size } = Constants;
import NavigatorHelper from '@utils/NavigatorHelper.js';
// components
import {Divider, CollectionView, Input} from '@components/common';
import EditNewAcc from '@components/Acc/EditNewAcc.js';
import EditPayment from '@components/Acc/EditPayment.js';
import EditCredit from '@components/Acc/EditCredit.js';
import EditAmount from '@components/Acc/EditAmount.js';
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
    };
  }

  // componentWillMount(){ console.log('addAcc cwm'); }

  render() {
    const { tid, travels, accountingMap } = this.props;
    const { step } = this.state;
    return (
      <View style={styles.container}>
        <Divider subHeader="New accounting" />
        <Input
          label={'Title'}
          placeholder="Dinner Bill"
          onSubmitEditing={(event) => {
            const title = event.nativeEvent.text;
            if (step === 1) {
              const size = accountingMap.size;
              this.aid = size.toString();
              const aidAry = travels.get(tid).accounting;
              aidAry.push(this.aid);
              this.props.dispatch(Actions.AddAccounting(this.aid, title));
              this.props.dispatch(Actions.UpdAccountingList(tid, aidAry));
              this.setState({ step: 2 });
            } else {
              this.props.dispatch(Actions.UpdAccountingTitle(this.aid, title));
            }
          }}
        />
        {this.renderStep()}
      </View>
    );
  }

  renderStep = () => {
    const { step } = this.state;
    // const { travels, dispatch } = this.props;
    // const travel = travels.get(this.tid);
    if (!this.aid) {
      return null;
    }

    switch (step) {
      case 2:
        return (
          <EditNewAcc aid={this.aid} />
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
    // backgroundColor: '#DDDDDD',
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
});