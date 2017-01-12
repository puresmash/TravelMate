import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import ToolbarItem from '@components/common/ToolbarItem.js';
import ChildrenUtils from '@utils/ChildrenUtils.js';

export default class Toolbar extends Component {
  static defaultProps = {
    activeColor: '#FF0038',
    currentPage: 1,
    goToPage: () => {},
  };

  renderToolbarItem = () => {
    if (!ChildrenUtils.checkAmount(this.props)) {
      return null;
    }

    let itemProps = {
      activeColor: this.props.activeColor,
      goToPage: this.props.goToPage,
    };
    let count = 1;
    return this.props.children.map((child, index) => {
      if (child.type !== ToolbarItem) {
        return null;
      }
      itemProps.key = `TI-${index}`;
      itemProps.pageIndex = count;
      itemProps.active = this.props.currentPage === itemProps.pageIndex;
      count++;
      return React.cloneElement(child, itemProps);
    });
  }
  renderScrollableContent = () => {
    return this.props.children.map((child) => {
      if (child.type === ScrollView) {
        return child;
      }
      return null;
    });
  }
  render() {
    return (
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
