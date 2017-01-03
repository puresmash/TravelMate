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
import AddAccounting from './AddAccounting.js';
import TravelDetail from './TravelDetail.js';
import Result from './Result.js';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
// dispatch
import Actions from '@actions';
import EmitterUtils from '@utils/EmitterUtils.js';

export default class TravelTabView extends Component{

  static propTypes = {
      tid: PropTypes.string.isRequired,
      travel: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);
    // this.state = {
    //   editName =
    // }

  }

  componentDidMount(){
    EmitterUtils.on('TravelTabView', ()=>{
      console.log('!!!!!!!aloha aloha');
    });
  }

  render(){
    const {tid, travel} = this.props;

    return(

      <ScrollableTabView
        style={styles.container}
        renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}>
        <TravelDetail tabLabel="Detail" tid={tid} travel={travel}></TravelDetail>
        <AddAccounting tabLabel="Add" tid={tid}></AddAccounting>
        <Result tabLabel="Result" tid={tid}/>
      </ScrollableTabView>
    );
  }
}
const rowHeight = 48;
const rowPadding = 15;
const dividerHeight = 30;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
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
