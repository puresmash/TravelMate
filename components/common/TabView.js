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
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import Toolbar from '@components/common/Toolbar.js';
import ChildrenUtils from '@utils/ChildrenUtils.js';

export default class TabView extends Component{
  static defaultProps = {
    initialPage: 1,
    onScroll: () => {},
    onChangeTab: ()=>{},
  };
  constructor(props){
    super(props);
    this.state = {
      containerWidth: Dimensions.get('window').width,
      currentPage: 1,
      scrollValue: new Animated.Value(this.props.initialPage),
    }
  }
  render(){
    return(
      <View style={styles.container} onLayout={this._handleLayout}>
        {Platform.OS !== 'ios' && this._renderToolbar()}
        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }}
          style={{flex: 1, width: Dimensions.get('window').width}}
          horizontal
          pagingEnabled
          keyboardDismissMode="on-drag"
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
          onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
          // onScroll={(e) => {
          //   const offsetX = e.nativeEvent.contentOffset.x;
          //   this._updateScrollValue(offsetX / this.state.containerWidth);
          // }}
        >
          {this._renderScrollableContent()}
        </ScrollView>
        {Platform.OS === 'ios' && this._renderToolbar()}
      </View>
    );
  }
  _renderToolbar = () => {
    if(!ChildrenUtils.checkAmount(this.props)){
      return null;
    }
    return this.props.children.map((child)=>{
      if(child.type === Toolbar){
        const itemProps = {
          key: 'TabView-0',
          currentPage: this.state.currentPage,
          goToPage: this.goToPage,
        }
        return React.cloneElement(child, itemProps);
      }
    });
  }
  _renderScrollableContent = ()=>{
    if(!ChildrenUtils.checkAmount(this.props)){
      return null;
    }
    return this.props.children.map((child)=>{
      if(child.type !== Toolbar && child.props.page){
        return child;
      }
    });
  }
  _handleLayout = (e) =>{
    const { width } = e.nativeEvent.layout;
    if (Math.round(width) !== Math.round(this.state.containerWidth)) {
      this.setState({ containerWidth: width, });
      // this.requestAnimationFrame(() => {
      //   this.goToPage(this.state.currentPage);
      // });
    }
  }
  goToPage = (pageNumber)=>{
    console.log('goToPage: ' + pageNumber)
    const offset = (pageNumber-1) * this.state.containerWidth;
    if (this.scrollView) {
      this.scrollView.scrollTo({x: offset, y: 0, animated: true, });
      this._updateSelectedPage(pageNumber);
    }
  }
  // _updateScrollValue = (value)=>{
  //   this.state.scrollValue.setValue(value);
  //   this.props.onScroll(value);
  // }
  _onMomentumScrollBeginAndEnd = (e)=>{
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / this.state.containerWidth) + 1;
    if (this.state.currentPage !== page) {
      this._updateSelectedPage(page);
    }
  }
  _updateSelectedPage = (nextPage) =>{
    this.setState({currentPage: nextPage});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
});
