import React, { Component, PropTypes } from 'react';
import {} from 'react-native';
// components
import TabView from '@components/common/TabView.js';
import Toolbar from '@components/common/Toolbar.js';
import ToolbarItem from '@components/common/ToolbarItem.js';
import TravelList from '@components/Travel/TravelList.js';
import AddNewTravel from '@components/Travel/AddNewTravel.js';
import UserList from '@components/User/UserList.js';

export default class Home extends Component {

  render() {
    return (
      <TabView>
        {/* items here must set {width: Dimensions.get('window').width} */}
        <TravelList page={1} />
        <AddNewTravel page={2} />
        <UserList page={3} />
        <Toolbar>
          <ToolbarItem
            icon="ios-list-box"
            text="List"
            title="Travel List"
          />
          <ToolbarItem
            icon="ios-color-wand-outline"
            text="New"
            title="Add New Travel"
          />
          <ToolbarItem
            icon="ios-contacts-outline"
            text="Member"
            title="Manage Member"
          />
        </Toolbar>
      </TabView>
    );
  }
}
