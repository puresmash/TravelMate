
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


export default class AccountingItem extends Component{

  static propTypes = {
    aid: PropTypes.string.isRequired,
    accounting: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);
    // console.log(typeof NavigatorHelper.getNav().pop);
  }
  render(){
    const { aid, accounting } = this.props;

    return(

      // <Image
      //   source={require('../burger.png')}
      //   resizeMode='contain'
      //   style={{height: null, width: null, flex: 1}}
      // >
      <TouchableHighlight onPress={()=>{
        NavigatorHelper.push({
          key: 'AccountingDetail',
          title: 'AccountingDetail',
          aid,
          index: 2
        });
      }}>

        <View style={styles.row}>
          <Text style={styles.title}>{accounting.title}</Text>
          <Icon name="ios-arrow-forward"
            color={Colors.light0}
            size={18}/>
        </View>

      </TouchableHighlight>

    );
  }
}

const rowHeight = 48;
const rowPadding = 15;
const dividerHeight = 30;
const styles = StyleSheet.create({
  divider: {
    height: dividerHeight,
    backgroundColor: '#DDDDDD',
  },
  row: {
    // flex: 1,
    paddingTop: rowPadding,
    paddingBottom: rowPadding,
    paddingRight: rowPadding,
    marginLeft: rowPadding,
    height: rowHeight,
    flexDirection: 'row',
    // borderColor: '#CCCCCC',
    // borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  // titleContainer: {
  //   flex: 5,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   alignSelf: 'stretch',
  // },
  title: {
    flex: 1,
    // backgroundColor: 'transparent',
    //
    // fontSize: 24,
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
