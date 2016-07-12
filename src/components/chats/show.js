import React, { Component } from 'react'
import {
  Dimensions,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  ScrollView,
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

export default class PostsShow extends Component {
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
      if (messages[m].device == did) {
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
    // @todo put a user in here
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
    // @todo put headline in nav title, withdraw content on scroll down
    // @todo use native keyboard API for hideaway
    // @todo throw some actual design into this thing
    // @todo send arrow
    // @todo unfuck message flex alignment padding issue

    // just drop a big fat gridlist item into a bg-colored no-man's-land. Shrink to height=0 on scroll.
    // Then where's the damn detail view? Somewhere I need to be able to view this post in all its glory. Maybe posts#show shouldn't just be a chat. Maybe it should be an interaction button, the last few messages, and a blank space for me to type. Typing enters the chat.
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
          maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT - 42 - 60}
          loadEarlierMessagesButton={!this.state.allLoaded}
          onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}
          senderName={this.props.global.state.user.name}
          senderImage={{ uri: 'http://thecatapi.com/api/images/get' }}
          displayNames={true}
          parseText={false}
          isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}
          typingMessage={this.state.typingMessage}
        />
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    overflow: 'hidden'
  },
  auxButton: {
    width: 180
  },
  auxPrompt: {
    marginTop: 16,
    marginRight: 6
  }
})
const did = DeviceInfo.getUniqueID()
const STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight
if (Platform.OS === 'android') {
  var ExtraDimensions = require('react-native-extra-dimensions-android');
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
}
