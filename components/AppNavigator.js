import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Navigator,
  TouchableHighlight
} from 'react-native'

import {createStore, applyMiddleware, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from '@reducers';
const reducer = combineReducers(reducers);
const store = createStore(
  reducer, applyMiddleware(thunk)
);

import TravelList from './TravelList.js';
import TravelDetail from './TravelDetail.js';
import TravelTabView from './TravelTabView.js';
import AccountingDetail from './AccountingDetail.js';
import EditPayment from './EditPayment.js';
import EditCredit from './EditCredit.js';
import NavButton from './NavButton.js';
import EditNewAcc from './EditNewAcc.js';


import NavigatorHelper from '@utils/NavigatorHelper.js'
import EmitterUtils from '@utils/EmitterUtils.js'
import Data from '../testdata.json';
import Actions from '@actions';

export default class AppNavigator extends Component{

  constructor() {
    super()
    this._renderScene = this._renderScene.bind(this)
  }

  componentDidMount(){
    store.dispatch(Actions.LoadTravel(Data));
    store.dispatch(Actions.LoadUser(Data));
    store.dispatch(Actions.LoadAccounting(Data));
  }

  render() {
    const routes = [
      {key: 'TravelList', title: 'TravelList', index: 0}
    ];
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={this._renderScene}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                  if (route.index === 0) {
                    return null;
                  } else {
                    return (
                      <TouchableHighlight onPress={() => navigator.pop()} style={[styles.header, styles.headerButton]}>
                        <Text style={styles.buttonText}>Back</Text>
                      </TouchableHighlight>
                    );
                  }
                },
                RightButton: (route, navigator, index, navState) => {

                    let btnRight = <NavButton name={route.key} />;
                    return (
                      btnRight
                    );

                },
                Title: (route, navigator, index, navState) => {
                  return (
                    <View style={styles.header}>
                      <Text style={styles.headerText}>{route.title}</Text>
                    </View>
                  );
                },
              }}
              style={{ backgroundColor: 'orange' }}
            />
          }
        />
      </Provider>
    );
  }

  _renderScene(route, navigator) {

    NavigatorHelper.setNav(navigator);


    // let navProps = {
    //   routeState : route,
    //   navigator : navigator
    // }
    let component = null

    switch(route.key) {
      case 'TravelList' :
        return (
          <TravelList />
        );
      break

      case 'TravelTabView' :
        return(
          <TravelTabView tid={route.tid} travel={route.travel}/>
        );
      break

      case 'AccountingDetail':
        return(
          <AccountingDetail tid={route.tid} aid={route.aid}/>
        );
      break;

      case 'EditPayment':
        return(
          <EditPayment aid={route.aid} />
        );
      break

      case 'EditCredit':
        return(
          <EditCredit aid={route.aid} />
        );
      break

      case 'EditNewAcc':
        return(
          <EditNewAcc aid={route.aid} />
        );
      break;
    }

    // return component ? React.createElement(component, navProps) : null
  }

}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {

  },
  headerButton: {
    marginLeft: 8,
    marginRight: 8,

  },
  buttonText: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 1,
  }
});
