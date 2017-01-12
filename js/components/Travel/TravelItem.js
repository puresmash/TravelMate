
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigatorHelper from '@utils/NavigatorHelper.js';
import Constants from '@const';
const { Colors, Size } = Constants;

export default class TravelItem extends Component {

  static propTypes = {
      // For StaticRender needed, won't get it at the first time
      // tid: PropTypes.string.isRequired,
      travel: PropTypes.object.isRequired,
  };

  // componentWillUpdate(nextProps, nextState){ console.log('travelItem cwu'); }
  // componentWillReceiveProps(nextProps){ console.log('travelItem cwrp'); }
  // shouldComponentUpdate(nextProps){ console.log('travelItem scu'); return true; }
  // componentWillUnmount(){ console.log('travelItem cwum'); }

  render() {
    const { tid, travel } = this.props;

    console.log(`ren: ${tid}`);
    console.log(`ren: ${travel.title}`);
    return (

      // <Image
      //   source={require('../burger.png')}
      //   resizeMode='contain'
      //   style={{height: null, width: null, flex: 1}}
      // >
      <TouchableHighlight onPress={() => {
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
              {/* <View style={styles.titleContainer}> */}
                <Text style={styles.title}>{travel.title}</Text>
              {/* </View> */}
              {/* <View style={styles.arrowContainer}> */}
                <Icon
                  style={styles.arrow}
                  name="ios-arrow-forward"
                  color={Colors.light0}
                  size={18}
                />
              {/* </View> */}
            </View>
        </View>
      </TouchableHighlight>

    );
  }
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    // opacity: 0.5,
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    padding: Size.rowPadding,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  // titleContainer: {
  //   flex: 5,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   alignSelf: 'stretch',
  //   // paddingLeft: 16,
  //   // paddingTop: 32,
  //   // paddingBottom: 32,
  // },
  title: {
    flex: 1,
    // backgroundColor: 'transparent',
    // backgroundColor: 'rgba(255,255,255,0.5)',
    alignSelf: 'center',
    fontSize: 18,
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
    // textAlign: 'right',
    alignSelf: 'center',
    fontSize: 18,
  }
});
