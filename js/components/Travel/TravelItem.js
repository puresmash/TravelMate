
import React, { Component, PropTypes } from 'react';

import NavigatorHelper from '@utils/NavigatorHelper.js';
import { ZoomRow } from '@components/common';

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
    return (
      <ZoomRow
        label={travel.title}
        onPress={() => {
          NavigatorHelper.push({
            key: 'TravelTabView',
            title: 'TravelTabView',
            tid,
            travel,
            index: 1
          });
        }}
      />
    );
  }
}
