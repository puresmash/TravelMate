
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import NavigatorHelper from '@utils/NavigatorHelper.js'
import Constants from '@const'
const {Colors} = Constants;

export default class TravelItem extends Component{

  static propTypes = {
      tid: PropTypes.string.isRequired,
      travel: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);
    // console.log(typeof NavigatorHelper.getNav().pop);
  }
  render(){
    const {tid, travel} = this.props;

    console.log(`ren: ${travel.title}`)
    // console.log(`ren: ${travel.title}`)
    return(

      // <Image
      //   source={require('../burger.png')}
      //   resizeMode='contain'
      //   style={{height: null, width: null, flex: 1}}
      // >
      <TouchableHighlight onPress={()=>{
        console.log('pressing TravelItem');
        // TODO: Press to show ACCOUNTING ListView and Item
        NavigatorHelper.push({
          key: 'TravelTabView',
          title: 'TravelTabView',
          tid,
          travel,
          index: 1
        })
      }}>
        <View style={[styles.divider, styles.container]}>
            <View style={styles.overlay}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{travel.title}</Text>
              </View>
              <View style={styles.arrowContainer}>
              <Icon name="ios-arrow-forward"
                color={Colors.light0}
                size={24}/>
              </View>
            </View>
        </View>
      </TouchableHighlight>

    );
  }
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 8,
    borderBottomColor: '#EEEEEE',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    // opacity: 0.5,
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  titleContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    // paddingLeft: 16,
    // paddingTop: 32,
    // paddingBottom: 32,
    // fontSize: 24,
  },
  title: {
    // flex: 5,
    paddingLeft: 16,
    marginTop: 32,
    marginBottom: 32,
    backgroundColor: 'transparent',
    // backgroundColor: 'rgba(255,255,255,0.5)',
    fontSize: 24,
  },
  arrowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  arrow: {
    textAlign: 'right',
    fontSize: 24,
  }
});
