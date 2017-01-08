import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Navigator,
  TouchableHighlight,
  Platform,
  AppState,
} from 'react-native'

// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { getStoredState, persistStore, autoRehydrate } from 'redux-persist';

// import * as reducers from '@reducers';
// const reducer = combineReducers(reducers);
// const store = createStore(
//   reducer, applyMiddleware(thunk), autoRehydrate()
// );
// const persistor = persistStore(store, {
//   storage: AsyncStorage
// });

// const whitelist = ['userReducer', 'travelReducer', 'accountingReducer'];
// const persistConfig = {
//     storage: AsyncStorage,
//     skipRestore: true,
//     whitelist
// };
// // let store;
// // let persistor;
// getStoredState(persistConfig, (err, initialState) => {
//     const initialImmutableState = {};
//     whitelist.forEach((key) => {
//       if (initialState[key]) initialImmutableState[key] = fromJS(initialState[key]);
//     });
//     const store = createStore(reducer, applyMiddleware(thunk), initialImmutableState);
//     const persistor = persistStore(store, persistConfig);
//     this.setState({store: store, persistor: persistor});
// });

import Actions from '@actions';
// components
import HomeTabView from './HomeTabView.js';
import TravelDetail from '@components/Travel/TravelDetail.js';
import TravelTabView from '@components/Travel/TravelTabView.js';
import AddNewTravel from '@components/Travel/AddNewTravel.js';
import NavButton from '@components/common/NavButton.js';
import AccountingDetail from '@components/Acc/AccountingDetail.js';
import EditPayment from '@components/Acc/EditPayment.js';
import EditCredit from '@components/Acc/EditCredit.js';
import EditNewAcc from '@components/Acc/EditNewAcc.js';
import AddNewUser from '@components/User/AddNewUser.js';
import EditUser from '@components/User/EditUser.js';
// utils
import NavigatorHelper from '@utils/NavigatorHelper.js'
import EmitterUtils from '@utils/EmitterUtils.js'
import Data from '../testdata.json';
import Constants from '@const'
const {Colors} = Constants;
const routes = [
  {key: 'Home', title: 'Travel List', index: 0, right: 'AddNewUser'}
];

export default class AppNavigator extends Component{

  constructor() {
    super();
    this.state = {
      isStoreLoading: true,
    }
  }

  componentDidMount(){
    // const self = this;
    // AppState.addEventListener('change', this._handleAppStateChange)
    // this.setState({isStoreLoading: true});
    // AsyncStorage.getItem('redux_store').then((value)=>{
    //   if(value && value.length){
    //     console.log('Loading Store From AsyncStorage');
    //     const initStore = JSON.parse(value);
    //     // console.log(initStore)
    //     store.dispatch(Actions.LoadTravel(initStore.travelReducer));
    //     store.dispatch(Actions.LoadUser(initStore.userReducer));
    //     store.dispatch(Actions.LoadAccounting(initStore.accountingReducer));
    //     self.setState({isStoreLoading: false});
    //     // NavigatorHelper.push({key: 'Home', title: 'Travel List', index: 0, right: 'AddNewUser'});
    //   }
    //   else{
    //     store.dispatch(Actions.LoadTravel(Data));
    //     store.dispatch(Actions.LoadUser(Data));
    //     store.dispatch(Actions.LoadAccounting(Data));
    //     self.setState({isStoreLoading: false});
    //     // NavigatorHelper.push({key: 'Home', title: 'Travel List', index: 0, right: 'AddNewUser'});
    //   }
    // }).catch((err)=>{
    //   console.log(err);
    //   store.dispatch(Actions.LoadTravel(Data));
    //   store.dispatch(Actions.LoadUser(Data));
    //   store.dispatch(Actions.LoadAccounting(Data));
    //   self.setState({isStoreLoading: false});
    //   // NavigatorHelper.push({key: 'Home', title: 'Travel List', index: 0, right: 'AddNewUser'});
    // });
  }

  _handleAppStateChange = (currentAppState)=>{
    // console.log('TESTING');
    // console.log(currentAppState);
    // console.log(store.getState());
    // let json = JSON.stringify(store.getState());
    // AsyncStorage.setItem('redux_store', json);
  }

  componentWillUnmount(){
    AppState.removeEventListener('change', this.__handleAppStateChange)
  }

  render() {
    return (
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
                  let icon = Platform.OS === 'ios' ? 'ios-arrow-back':'md-arrow-back'
                  return (
                    <NavButton fnPress={() => navigator.pop()} icon={icon} />
                  );
                }
              },
              RightButton: (route, navigator, index, navState) => {
                  if(!route.right){
                    return null;
                  }

                  let btnRight = <NavButton target={route.right} text={'+User'}/>;
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
            style={{ flex: 1, flexDirection: 'row', backgroundColor: 'orange', justifyContent: 'center' }}
          />
        }
      />
    );

  }

  _renderScene(route, navigator) {

    NavigatorHelper.setNav(navigator);

    // if(!this.state || !this.state.isStoreLoading)
    //   return;

    let component = null

    switch(route.key) {
      case 'Home' :
        return (
          <HomeTabView />
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

      case 'EditUser':
        return(
          <EditUser uid={route.uid}/>
        );
      break;

      case 'AddNewUser':
        return(
          <AddNewUser />
        );
      break;
      // case 'EditNewAcc':
      //   return(
      //     <EditNewAcc aid={route.aid} />
      //   );
      // break;
    }

    // return component ? React.createElement(component, navProps) : null
  }

}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'stretch',
    // backgroundColor: 'gray',
  },
  headerText: {
    ...Platform.select({
      ios: {
      },
      android: {
        color: Colors.black87,
        fontSize: 20,
      },
    }),
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
