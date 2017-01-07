
import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  Navigator,
  TouchableHighlight
} from 'react-native'
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import EventEmitter from 'EventEmitter';
import EmitterUtils from '@utils/EmitterUtils.js';

class NavButton extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const { fnPress, text, icon } = this.props;
    return(
      <TouchableHighlight
        onPress={() => {
          if(fnPress){
            fnPress();
            return;
          }
          EmitterUtils.emit(this.props.target);
        }}
        style={[styles.header, styles.headerButton]}>
        { text ?
          <Text style={styles.buttonText}>{text}</Text> :
          <Icon
            name={icon ? icon : 'ios-arrow-back'}
            style={styles.icon}
            size={24}
          />
        }

      </TouchableHighlight>
    );
  }
}

function mapStateToProps(state){
  return {

  };
}
function mapDispatchToProps(dispatch){
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavButton);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  headerButton: {
    marginLeft: 8,
    marginRight: 8,
  },
  buttonText: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 1,
  },
  icon: {
    paddingLeft: 8,
    paddingRight: 8,
  }
});
