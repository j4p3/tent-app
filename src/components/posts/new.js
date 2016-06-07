import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
var DeviceInfo = require('react-native-device-info')

import GlobalStyles from '../../styles/global'
import Break from '../util/break'

export default class PostsNew extends Component {
  constructor(props) {
    super(props);

    this._store = new Firebase('https://inthetent.firebaseio.com/')
                        .child('prod/v4/posts')
    this.state = {
      headline: '',
      content: '',
    };

  }

  _post () {
    // @todo keep user state, use actual user
    let post = {
      headline: this.state.headline,
      content: this.state.content,
      device: did,
      tent_id: this.props.tent.id,
      user_id: 1,
      created: Firebase.ServerValue.TIMESTAMP
    }

    this._store.push(post)
  }

  render() {
    return (
      <View style={GlobalStyles.wrapper}>
        <Text style={GlobalStyles.itemTitle}>
          Post Headline
        </Text>
        <TextInput
          style={GlobalStyles.input}
          value={this.state.headline}
          onChangeText={(t) => {
            this.setState({ headline: t })
          }}
        />
        <Break/>
        <Text style={[GlobalStyles.topSpace, GlobalStyles.itemTitle]}>
          Post Content
        </Text>
        <TextInput
          style={[GlobalStyles.input, styles.paragraphInput]}
          multiline={true}
          value={this.state.content}
          onChangeText={(t) => {
            this.setState({content: t })
          }}
        />
        <Button
          containerStyle={[GlobalStyles.buttonContainer, GlobalStyles.vSpace]}
          style={[GlobalStyles.text, GlobalStyles.buttonInterior]}
          onPress={() => {
            this._post();
            Actions.tentsshow({ tent: this.props.tent });
          }}
          >Create Post</Button>
      </View>
    )
  }
}

const did = DeviceInfo.getUniqueID()
const styles = StyleSheet.create({
  paragraphInput: {
    height: 80
  }
})