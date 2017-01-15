
import React, { Component, PropTypes } from 'react';

import NavigatorHelper from '@utils/NavigatorHelper.js'
import { ZoomRow } from '@components/common';

export default class AccountingItem extends Component{

  static propTypes = {
    aid: PropTypes.string.isRequired,
    accounting: PropTypes.object.isRequired,
  };

  render() {
    const { aid, accounting } = this.props;

    return (
      <ZoomRow
        label={accounting.title}
        containerStyle={{ borderBottomWidth: 0 }}
        onPress={() => {
          NavigatorHelper.push({
            key: 'AccountingDetail',
            title: 'AccountingDetail',
            aid,
            index: 2
          });
        }}
      />
    );
  }
}
