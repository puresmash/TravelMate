
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Dimensions,
} from 'react-native';

export default class CollectionView extends Component {
  static propTypes = {
    aid: PropTypes.string.isRequired,
    renderBrick: PropTypes.func.isRequired,
    // items: array, or iterable object,
    // style of container
  };

  render() {
    const data = this.arrangeCollection(this.props.items);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <View {...this.props}>
        <ListView
          style={{ paddingTop: 8 }}
          renderRow={this.renderRow}
          dataSource={ds.cloneWithRows(data)}
        />
      </View>
    );
  }

  renderRow = (bricks) => {
    const items = bricks.map((ele) => this.props.renderBrick(ele));
    return (
      <View style={styles.row}>
        {items}
      </View>
    );
  }

  // renderBrick = (brick)=>{
  //
  // }

  arrangeCollection = (collection) => {
    const ROW_SIZE = 3;
    const ary = [];
    let row = [];
    collection.forEach((ele) => {
      const brick = ele;

      if (row.length === ROW_SIZE) {
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

// const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  row: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginBottom: 8,
    paddingRight: 8,
    // paddingTop: 8,
  },
});
