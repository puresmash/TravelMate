
import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  Navigator,
  TouchableHighlight
} from 'react-native'
import {connect} from 'react-redux';
import EventEmitter from 'EventEmitter';
import EmitterUtils from '@utils/EmitterUtils.js';

class NavButton extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableHighlight
        onPress={() => {
          EmitterUtils.emit(this.props.name);
        }}
        style={[styles.header, styles.headerButton]}>
        <Text style={styles.buttonText}>Done</Text>
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
  }
});
