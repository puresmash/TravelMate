
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  ListView,
  ScrollView,
  Dimensions,
} from 'react-native';
// components
import bg from '@images/bg@1x.png';
import Icon from 'react-native-vector-icons/Ionicons'
import TabView from '@components/common/TabView.js';
import Toolbar from '@components/common/Toolbar.js';
import ToolbarItem from '@components/common/ToolbarItem.js';
import Divider from '@components/common/Divider.js';
import TravelItem from '@components/Travel/TravelItem.js';
// helper
import NavigatorHelper from '@utils/NavigatorHelper.js';
import EmitterUtils from '@utils/EmitterUtils.js';
// dispatch
import Actions from '@actions';
import { connect } from 'react-redux';

class TravelList extends Component {

  // static propTypes = {
  //   navigator: PropTypes.object.isRequired,
  // };
  constructor(props) {
    // console.log('init travel list');
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(this.gatheringData(props.travels)),
    };
  }

  // componentWillMount() {
  //
  // }

  componentDidMount() {
    this.subscription = EmitterUtils.on('AddNewTravel', () => {
      NavigatorHelper.push({
        key: 'AddNewTravel',
        title: 'AddNewTravel',
        index: 1
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('----------------')
    // console.log(nextProps.travels)
    if (nextProps.travels !== this.props.travels) {
      const ary = this.gatheringData(nextProps.travels);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(ary),
      });
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  gatheringData = (travels) => {
    // console.log('-----');
    // console.log(travels);
    const ary = [];
    for (const travel of travels.values()) {
      ary.push(travel);
    }
    return ary;
  }


  // shouldComponentUpdate(np, ns){ return true; }
  // onChangeVisibleRows = (visibleRows, changedRows)=>{}
  render() {
    return (

      // <ScrollView style={{flex:1}}>
        <ScrollView style={{ flex: 1 }}>
          <Image
            source={bg}
            resizeMode='cover'
            style={styles.image}
          />
          {/* <Divider /> */}
          <ListView
            // Force re-init listview when size change (unknown display problem)
            key={`TL-${this.props.travels.size}`}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            style={styles.travelList}
            enableEmptySections
            removeClippedSubviews={false}
          />
        </ScrollView>

      // </ScrollView>
    );
  }
  _renderRow = (travel, sectionID, rowID) => {
    console.log(`render row ${rowID}: ${travel.title}`);
    return (
      <TravelItem
        tid={travel.id}
        travel={travel}
      />
    );
  }


}

function mapStateToProps(state) {
  const { travels } = state.travelReducer;
  return {
    travels,
  };
}

export default connect(mapStateToProps)(TravelList);

const styles = StyleSheet.create({
  image: {
    marginTop: 1,
    marginBottom: 1,
    width: Dimensions.get('window').width,
  },
  travelList: {
    // flex: 1,
    // alignSelf: 'stretch',
    // backgroundColor: '#AAAAAA',
    // marginTop: 64,
  },
  touchableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  current: {
    color: '#FF0038',
  },
});
