import React, { Component } from 'react'
import {
  Dimensions,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native'
import GiftedMessenger from 'react-native-gifted-messenger'
import Firebase from 'firebase'
import Button from 'react-native-button';
var DeviceInfo = require('react-native-device-info')
import { Actions } from 'react-native-router-flux';

import { Wrapper } from '../util/baseComponents'
import { Palette, GlobalStyles } from '../../styles/global'
import Api from '../../stores/api'

export default class ChatsShow extends Component {
  constructor(props) {
    super(props);
  
    this._messages = []
    this._api = new Api()
    this._store = this._api.store().child('tents/' + props.post.tent_id + '/posts/' + props.post.id + '/stream')

    console.log('initializing post show for tent ' + props.post.tent_id)

    this.state = {
      messages: this._messages,
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false
    };
  }

  componentDidMount() {
    var _this = this

    this._store
      .orderByChild('created_at')
      .limitToLast(25)
      .on('value', function (d) {
        _this._setMessages(_this._handleReceive(d.val()))
    })
  }

  _handleReceive(messages = {}) {
    var base = {
      date: new Date()
    }
    var msgArr = []

    for (m in messages) {
      if (messages[m].user.id == this.props.global.state.user.id) {
        messages[m].position = 'right'
      } else {
        messages[m].position = 'left'
      }

      // @todo merge message with its pending twin (reduce?)
      // convert object to array for chat component
      msgArr.push(Object.assign({ uniqueId: m }, base, messages[m], { image: { uri: messages[m].user.avatar }}))
    }

    return msgArr
  }

  _setMessages(messages) {
    // @todo are we killing messages on receipt?
    this._messages = messages;
    this.setState({ messages: messages });
  }

  handleSend(message = {}) {
    if (message.text && message.text.length > 0) {    
      message.device = did
      message.date = new Date()
      message.post_id = this.props.post.id
      message.user = this.props.global.state.user
      message.created_at = Firebase.ServerValue.TIMESTAMP
      this._store.push(message)
      this._api.subscribe({
        user_id: this.props.global.state.user.id,
        post_id: this.props.post.id
      })
    }

    // @todo flag outbound message for update on successful push()
    // message.uniqueId = 0
    // message.pending = true
    // this._setMessages(this._messages.concat(message))

    // this._setMessageStatus(message.uniqueId, 'ErrorButton');
  }

  onLoadEarlierMessages() {
    // @todo GET FB/<page-1>
  }


  render() {
    // @todo weird chat margins
    // @todo proper full-height utility
    return (
      <Wrapper omitPadding={true}>
        <GiftedMessenger
          ref={(c) => this._GiftedMessenger = c}
          styles={{
            bubbleRight: {
              marginLeft: 20,
              backgroundColor: Palette.accent
            },
            bubbleLeft: {
              backgroundColor: Palette.focus
            },
            container: {
              flex: 1,
              backgroundColor: Palette.bg
            }
          }}
          messages={this.state.messages}
          handleSend={this.handleSend.bind(this)}
          maxHeight={Dimensions.get('window').height - STATUS_BAR_HEIGHT - 64 - 36}
          loadEarlierMessagesButton={!this.state.allLoaded}
          onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}
          senderName={this.props.global.state.user.name}
          senderImage={{ uri: this.props.global.state.user.avatar }}
          displayNames={true}
          parseText={false}
          isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}
          typingMessage={this.state.typingMessage}
        />
      </Wrapper>
    )
  }
}

const did = DeviceInfo.getUniqueID()
const STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight
if (Platform.OS === 'android') {
  var ExtraDimensions = require('react-native-extra-dimensions-android');
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
}
