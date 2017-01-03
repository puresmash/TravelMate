
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux';
import TravelItem from './TravelItem.js';
import NavigatorHelper from '@utils/NavigatorHelper.js';
import EmitterUtils from '@utils/EmitterUtils.js';

class TravelList extends Component{

  // static propTypes = {
  //   navigator: PropTypes.object.isRequired,
  // };
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentWillMount(){
    console.log('cwm');
  }

  componentDidMount(){
    EmitterUtils.on('TravelList', ()=>{
      console.log('~~~~~~~aloha aloha');
    });
  }
  gatheringData = (travels)=>{
    let ary = [];
    for (var travel of travels.values()) {
      ary.push(travel);
    }
    return ary;
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.travels != this.props.travels){
      let ary = this.gatheringData(nextProps.travels);
      console.log(ary)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(ary),
      });
    }
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            style={styles.travelList}
            enableEmptySections={true}
            // {...this.props}
            />
        </ScrollView>
        <View style={styles.footer}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name="ios-color-wand-outline"
              style={{}}
              size={24}
            />
            <Text style={{fontSize: 10, paddingLeft: 1}}>New</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name="ios-list-box"
              style={{color: '#FF0038'}}
              size={24}
            />
            <Text style={{fontSize: 10, paddingLeft: 1, color: '#FF0038'}}>List</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name="ios-contacts-outline"
              style={{}}
              size={24}
            />
            <Text style={{fontSize: 10, paddingLeft: 1}}>Member</Text>
          </View>



        </View>
      </View>
    );
  }
  _renderRow = (travel)=>{
    console.log(`render row ${travel.title}`)
    return(
      <TravelItem
        tid={travel.id}
        travel={travel}
      />
    );
  }


}

function mapStateToProps(state){
  const { travels } = state.travelReducer;
  // if (travels.get('0')){
  //   console.log(`mstp: ${travels.get('0').title}`);
  // }
  return {
    travels,
  };
}

export default connect(mapStateToProps)(TravelList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 49,
    borderTopWidth: 1,
    borderColor: '#DDDDDD',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  travelList: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#AAAAAA',
    marginTop: 64,
  }
});
