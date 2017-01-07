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
// components
import Divider from '@components/common/Divider.js';
import TabView from '@components/common/TabView.js';
import Toolbar from '@components/common/Toolbar.js';
import ToolbarItem from '@components/common/ToolbarItem.js';
import AccountingList from '@components/Acc/AccountingList.js';
import AddNewAcc from '@components/Acc/AddNewAcc.js';
import TravelDetail from '@components/Travel/TravelDetail.js';
import Result from '@components/Result.js';
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

      // <ScrollableTabView
      //   style={styles.container}
      //   renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}>
      <TabView>
        <TravelDetail page={1} tid={tid} />
        <AddNewAcc page={2} tid={tid} />
        <Result page={3} tid={tid}/>
        <Toolbar>
          <ToolbarItem
            icon="ios-list-box"
            text="List"
            title="Travel Detail"
          />
          <ToolbarItem
            icon="ios-color-wand-outline"
            text="New"
            title="Add New Accounting"
          />
          <ToolbarItem
            icon="ios-calculator-outline"
            text="Result"
            title="Display Result"
          />
        </Toolbar>
      </TabView>
    );
  }
}
const rowHeight = 48;
const rowPadding = 15;
const dividerHeight = 30;
const styles = StyleSheet.create({
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
