import React, { Component, PropTypes } from 'react';
// components
import TabView from '@components/common/TabView.js';
import Toolbar from '@components/common/Toolbar.js';
import ToolbarItem from '@components/common/ToolbarItem.js';
import AddNewAcc from '@components/Acc/AddNewAcc.js';
import TravelDetail from '@components/Travel/TravelDetail.js';
import Result from '@components/Result.js';

export default class TravelTabView extends Component {

  static propTypes = {
      tid: PropTypes.string.isRequired,
  };

  componentDidMount() {
    // EmitterUtils.on('TravelTabView', () => {
    //   console.log('!!!!!!!aloha aloha');
    // });
  }

  render() {
    const { tid } = this.props;

    return (

      // <ScrollableTabView
      //   style={styles.container}
      //   renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}>
      <TabView>
        <TravelDetail page={1} tid={tid} />
        {/* <AddNewAcc page={2} tid={tid} /> */}
        <Result page={2} tid={tid} />
        <Toolbar>
          <ToolbarItem
            icon="ios-list-box"
            text="List"
            title="Travel Detail"
          />
          {/* <ToolbarItem
            icon="ios-color-wand-outline"
            text="New"
            title="Add New Accounting"
          /> */}
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
