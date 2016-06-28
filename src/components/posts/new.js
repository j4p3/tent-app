import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import { MKButton, MKTextField } from 'react-native-material-kit'
var DeviceInfo = require('react-native-device-info')

import { Wrapper } from '../util/baseComponents'
import { GlobalStyles, Palette } from '../../styles/global'
import Break from '../util/break'
import Api from '../../stores/api'

export default class PostsNew extends Component {
  constructor(props) {
    super(props);

    this._store = new Api()

    this.tentId = this.props.tent.id
    this.state = {
      headline: '',
      content: '',
    }

  }

  _post () {
    // @todo keep user state, use actual user
    let post = {
      headline: this.state.headline,
      content: this.state.content,
      device: did,
      tent_id: this.props.tent.id,
      user_id: this.props.global.state.user.id,
      created_at: Firebase.ServerValue.TIMESTAMP,
    }

    this._store.post(post)
  }

  render() {
    return (
      <Wrapper>
        <Text style={GlobalStyles.itemTitle}>
          Post Headline
        </Text>
        <View style={GlobalStyles.vSpace}><MKTextField
          tintColor={Palette.text}
          textInputStyle={[GlobalStyles.text, { color: '#000' }]}
          highlightColor={Palette.accent}
          underlineSize={2}
          placeholder='Headline'
          value={this.state.headline}
          onChangeText={(t) => {
            this.setState({ headline: t })
          }}
        /></View>
        
        <Text style={[GlobalStyles.topSpace, GlobalStyles.itemTitle]}>
          Post Content
        </Text>
        <View style={GlobalStyles.vSpace}><MKTextField
          tintColor={Palette.text}
          textInputStyle={[GlobalStyles.text, { color: '#000' }]}
          highlightColor={Palette.accent}
          underlineSize={2}
          placeholder='Content'
          value={this.state.content}
          onChangeText={(t) => {
            this.setState({content: t })
          }}
        /></View>

        <View style={GlobalStyles.vSpace}><MKButton
          {...MKButton.coloredButton().toProps()}
          backgroundColor={Palette.accent}
          shadowOpacity={0}
          onPress={() => {
            this._post();
            Actions.pop();
          }}>
            <Text style={GlobalStyles.itemBody} style={[GlobalStyles.text, {color: '#fff', fontWeight: 'bold'}]}>Create Post</Text>
        </MKButton></View>
      </Wrapper>
    )
  }
}

const did = DeviceInfo.getUniqueID()
const styles = StyleSheet.create({
  paragraphInput: {
    height: 80
  }
})