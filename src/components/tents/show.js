import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';

import PostsIndex from '../posts/index'
import Container from '../../styles/global'

export default class TentsShow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // @todo use a non-push Action
    return (
      <View style={Container.wrapper}>
        <PostsIndex
          tentId={this.props.tent.id}/>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="New Post"
            onPress={() => { Actions.postsnew({ tent: this.props.tent }) }}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})
