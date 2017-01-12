import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigatorHelper from '@utils/NavigatorHelper.js';

export default class Toolbar extends Component {
  static propTypes = {

  };
  static defaultProps = {
    active: false,
    page: -1,
    goToPage: () => {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active && nextProps.title) {
        NavigatorHelper.replaceCurrentTitle(nextProps.title);
      }
    }
  }

  renderChild = () => {
    let itemProps = {
      style: { color: this.props.activeColor },
    };
    // console.log('GOGOGOGO'+activeColor)
    return this.props.children.map((child, index) => {
      if (this.props.active !== true) {
        return child;
      }
      itemProps.key = `TIC-${index}`;
      return React.cloneElement(child, itemProps);
    });
  }

  render() {
    const { active, activeColor, pageIndex, goToPage } = this.props;
    const color = active ? { color: activeColor } : {};
    return (
      <TouchableHighlight
        style={{ flex: 1 }}
        onPress={() => {
          goToPage(pageIndex);
      }}>
        <View style={{ alignItems: 'center' }}>
          {this.props.icon &&
            <Icon
              name={this.props.icon}
              style={[color]}
              size={24}
            />}
          {this.props.text &&
            <Text style={[styles.footerText, color]}>
              {this.props.text}
            </Text>}
        </View>
      </TouchableHighlight>
    );
  }
  renderScrollableContent = () => {
    return this.props.children.map((child) => {
      if (child.type === ScrollView) {
        return child;
      }
    });
  }
}

const styles = StyleSheet.create({
  footerText: {
    fontSize: 10,
    // paddingLeft: 1,
  },
});
