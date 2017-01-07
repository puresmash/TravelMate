import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
// helper
import Constants from '@const'
const {Colors, Size} = Constants;
import NavigatorHelper from '@utils/NavigatorHelper.js';
// components
import CollectionView from '@components/common/CollectionView.js';
import EditNewAcc from '@components/Acc/EditNewAcc.js';
import EditPayment from '@components/Acc/EditPayment.js';
import EditCredit from '@components/Acc/EditCredit.js';
import EditAmount from '@components/Acc/EditAmount.js';
import Divider from '@components/common/Divider.js';
// dispatch
import Actions from '@actions';
import {connect} from 'react-redux';

class AddNewAcc extends Component{

  static defaultProps = {};
  static propTypes = {};

  constructor(props){
    super(props);
    this.state = {
      step: 1,
    }
  }

  // componentWillMount(){ console.log('addAcc cwm'); }

  render(){
    const { tid, travels, accountingMap } = this.props;
    const { step } = this.state;
    return(
      <View style={styles.container}>
        <Divider subHeader="Title"/>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            placeholder="Insert accounting title"
            autoCorrect={false}
            blurOnSubmit={true}
            selectTextOnFocus={true}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            clearButtonMode={'while-editing'}
            onSubmitEditing={(event)=>{
              let title = event.nativeEvent.text;
              if(step === 1){
                let size = this.props.accountingMap.size;
                this.aid = size.toString();
                let aidAry = travels.get(tid).accounting;
                aidAry.push(this.aid);
                this.props.dispatch(Actions.AddAccounting(this.aid, title));
                this.props.dispatch(Actions.UpdAccountingList(tid, aidAry));
                this.setState({step: 2})
              }
              else{
                this.props.dispatch(Actions.UpdAccountingTitle(this.aid, title));
              }
              // TODO: UpdACCList -> InitAcc (updTitle, UpdAmount=0)
              // NavigatorHelper.push({
              //   key: 'EditNewAcc',
              //   title: 'EditNewAcc',
              //   aid: this.aid,
              //   index: 2
              // })
            }}
          />
        </View>
        {this.renderStep()}
      </View>
    );
  }

  renderStep = ()=>{
    const { step } = this.state;
    // const { travels, dispatch } = this.props;
    // const travel = travels.get(this.tid);
    if(!this.aid)
      return;

    switch (step) {
      case 2:
        return(
          <EditNewAcc aid={this.aid} />
        );
        break;

    }
    return;
  }

}

function mapStateToProps(state){
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
  textInput: {
    flex: 1,
    color: Colors.black54,
    height: Size.rowHeight,
    alignSelf: 'center',
  }
});
