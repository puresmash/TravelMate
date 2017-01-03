import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import _ from 'lodash';

import CollectionView from './CollectionView.js';
import EditPayment from './EditPayment.js';
import EditCredit from './EditCredit.js';
import EditAmount from './EditAmount.js';
import Divider from './Divider.js';
import NavigatorHelper from '@utils/NavigatorHelper.js';
// dispatch
import Actions from '@actions';
import {connect} from 'react-redux';

class AddAccounting extends Component{

  constructor(props){
    super(props);
  }

  componentWillMount(){
    // const { tid, travels, accountingMap } = this.props;

    // let size = this.props.accountingMap.size;
    // this.aid = size.toString();
    // console.log(this.props.accountingMap)
    // console.log(this.aid);
    // let aidAry = travels.get(tid).accounting;
    // aidAry.push(this.aid);
    // this.aidAry = aidAry;
  }

  render(){
    const { tid, travels, accountingMap } = this.props;
    return(
      <View style={styles.container}>
        <Divider />
        <TouchableHighlight>
          <View style={styles.row}>
            <TextInput
              style={{flex: 1, }}
              placeholder="insert accounting title"
              onEndEditing={(event)=>{
                let size = this.props.accountingMap.size;
                this.aid = size.toString();
                let aidAry = travels.get(tid).accounting;
                aidAry.push(this.aid);
                let title = event.nativeEvent.text;
                this.props.dispatch(Actions.AddAccounting(this.aid, title));
                this.props.dispatch(Actions.UpdAccountingList(tid, aidAry));
                // TODO: UpdACCList -> InitAcc (updTitle, UpdAmount=0)
                NavigatorHelper.push({
                  key: 'EditNewAcc',
                  title: 'EditNewAcc',
                  aid: this.aid,
                  index: 2
                })
              }}
            />
          </View>
        </TouchableHighlight>
        <Divider />
      </View>
    );
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
export default connect(mapStateToProps)(AddAccounting);

const rowHeight = 48;
const rowPadding = 15;
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
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  labelText: {
    flex: 1,
  },
});
