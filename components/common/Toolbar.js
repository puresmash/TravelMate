import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import ToolbarItem from '@components/common/ToolbarItem.js';

export default class Toolbar extends Component{
  static defaultProps = {
    activeColor: '#FF0038',
    currentPage: 1,
    goToPage: ()=>{},
  };
  constructor(props){
    super(props);
  }
  renderToolbarItem = ()=>{
    let itemProps = {
      activeColor: this.props.activeColor,
      goToPage: this.props.goToPage,
    }
    let count = 1;
    return this.props.children.map((child, index)=>{
      if(child.type !== ToolbarItem){
        return;
      }
      itemProps.key = `TI-${index}`;
      itemProps.pageIndex = count;
      itemProps.active = this.props.currentPage === itemProps.pageIndex ? true : false;
      count++;
      return React.cloneElement(child, itemProps);
    });
  }
  renderScrollableContent = ()=>{
    return this.props.children.map((child)=>{
      if(child.type === ScrollView){
        return child;
      }
    })
  }
  render(){
    return(
      <View style={[styles.toolbarContainer, this.props.style]}>
        {this.renderToolbarItem()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  toolbarContainer: {
    // flex: 1,
    flexDirection: 'row',
    maxHeight: 49,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});
