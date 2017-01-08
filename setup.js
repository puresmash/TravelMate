
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppNavigator from './components/AppNavigator.js';
import Data from './testdata.json';

function setup(){
  class Root extends Component{
    constructor(){
      super();
      this.state = {
        isLoading: true,
        store: configureStore(()=> this.setState({isLoading: false})),
      }
    }

    // componentDidMount(){
    //   store.dispatch(Actions.LoadTravel(Data));
    //   store.dispatch(Actions.LoadUser(Data));
    //   store.dispatch(Actions.LoadAccounting(Data));
    // }

    render(){
      if(this.state.isLoading){
        return null;
      }
      return (
        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
      );
    }
  }
  return Root;
}

module.exports = setup;
