import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { GlobalStyles, Palette } from '../../styles/global'
import Api from '../../stores/api'

export class NotificationMenu extends Component {
  constructor(props) {
    super(props)
    console.log('called notifications menu')
    this.user = props.user
  }

  render() {
    // todo number of notifications
    return (
      <Icon
        name="notifications"
        style={[styles.notification, styles.notificationIcon]}/>
    )
  }
}

export class NotificationSwitch extends Component {
  constructor(props) {
    super(props)
    console.log('called notifications menu')
  }

  render() {
    // todo post to server state on touch
    return (
      <Icon 
        name="notifications-off"
        style={[styles.notification, styles.notificationSwitch]}/>
    )
  }
}

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 26,
    right: 6,
    fontSize: 18,
    padding: 8,
    borderRadius: 4,
  },
  notificationIcon: {
    color: Palette.focus,
    backgroundColor: Palette.accent,
  },
  notificationSwitchInactive: {
    color: Palette.accent,
    borderWidth: 1,
    borderColor: Palette.accent,
  },
  notificationSwitchActive: {
    color: Palette.focus,
    backgroundColor: Palette.accent,
  }
})
