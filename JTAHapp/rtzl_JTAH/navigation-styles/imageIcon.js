import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import styles from './style.js';
import iconTable from './icons/iconTable';

import {connect} from 'react-redux';

const checkName = (name) => {
  switch (name) {
    case 'm1':
      return 'mainMenuBadge1';
    case 'm2':
      return 'mainMenuBadge2';
    case 'm3':
      return 'mainMenuBadge3';
    case 'm4':
      return 'mainMenuBadge4';
    case 'm5':
      return 'mainMenuBadge5';
    default:
      return 'mainMenuBadge1';
  }
};

class II extends React.Component {
  componentDidMount() {}

  render() {
    const {name, focused, badgeName} = this.props;
    const img = iconTable[name].normal;
    const imgFocused = iconTable[name].active;

    const _Name = checkName(badgeName);
    const badgeCount = this.props[_Name];

    return (
      <View>
        {typeof badgeCount === 'number' && badgeCount > 0 ? (
          <View style={styles.menuBadge}>
            <Text style={styles.menuBadgeText}>{badgeCount}</Text>
          </View>
        ) : badgeCount <= 0 ? undefined : (
          badgeName &&
          this.context[badgeName] > 0 && (
            <View style={styles.menuBadge}>
              <Text style={styles.menuBadgeText}>
                {this.context[badgeName]}
              </Text>
            </View>
          )
        )}
        {<Image style={styles.menuIcon} source={focused ? imgFocused : img} />}
      </View>
    );
  }
}

export default connect((state) => ({
  mainMenuBadge1: state.mainMenuBadge1,
  mainMenuBadge2: state.mainMenuBadge2,
  mainMenuBadge3: state.mainMenuBadge3,
  mainMenuBadge4: state.mainMenuBadge4,
  mainMenuBadge5: state.mainMenuBadge5,
}))(II);
