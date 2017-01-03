

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

export default class CollectionView extends Component{
  static propTypes = {
    aid: PropTypes.string.isRequired,
    renderBrick: PropTypes.func.isRequired,
    // items: array, or iterable object,
    // style of container
  };
  constructor(props){
    super(props);
  }
  render(){
    let data = this.arrangeCollection(this.props.items);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log(data)
    return(
      <View {...this.props}>
        <ListView
          style={{flex: 1}}
          renderRow={this.renderRow}
          dataSource={ds.cloneWithRows(data)}
        />
      </View>
    );
  }

  renderRow = (bricks)=> {
    let items = bricks.map((ele)=>{
      return this.props.renderBrick(ele);
    });
    return (
      <View style={styles.row}>
        {items}
      </View>
    );
  }

  // renderBrick = (brick)=>{
  //
  // }

  arrangeCollection = (collection)=>{
    const ROW_SIZE = 3;
    let ary = [];
    let row = [];
    collection.forEach((ele)=>{
      let brick = ele;

      if(row.length === ROW_SIZE){
        ary.push(row);
        row = [brick];
      }
      else {
        row.push(brick);
      }
    });

    if (row.length > 0) {
      ary.push(row);
    }

    return ary;
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 8,
  },
});
