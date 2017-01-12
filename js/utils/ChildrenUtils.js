
import React from 'react';

export default class ChildrenUtils {
  static checkAmount(props) {
    if (!props.children || React.Children.count(props.children) < 2) {
      console.error('Number of ToolbarItem and Content must >= 2');
      return false;
    }
    return true;
  }
}
