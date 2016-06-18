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

import { GlobalStyles } from '../../styles/global'
import Api from '../../stores/api'

export default class PostsShow extends Component {
  constructor(props) {
    super(props);
  
    this.postId = props.post.id
    this._messages = []
    this._api = new Api()
    this._store = this._api.store().child('tents/' + props.post.tent_id + '/posts/' + this.postId + '/stream')

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
    message.device = did
    message.date = new Date()
    message.post_id = this.postId
    message.created_at = Firebase.ServerValue.TIMESTAMP
    this._store.push(message)

    // @todo flag outbound message for update on successful push()
    // message.uniqueId = 0
    // message.pending = true
    // this._setMessages(this._messages.concat(message))

    // this._setMessageStatus(message.uniqueId, 'ErrorButton');
  }

  onLoadEarlierMessages() {
    // @todo GET FB/<page-1>
  }

  _respond() {
    // @todo create Interaction
    this.setState({responded: true})
    this._api.interact({
      user_id: this.props.global.store.id
    })
    Actions.flash({message: 'Thanks! The post author will be notified.', nextAction: Actions.back})
  }

  _close() {
   this.setState({closed: true})
   Actions.flash({message: 'Thanks! Voice has been awarded to you and participants.', nextAction: Actions.back})
  }

  _footer() {
    // @todo set up auth for user's ID
    if (this.props.post.device == did) {
      return this._closer()
    } else {
      return this._responder()
    }
  }

  _responder() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={styles.auxPrompt}>Or just say:</Text>
        <Button
          containerStyle={[GlobalStyles.buttonContainer, styles.auxButton]}
          style={[GlobalStyles.text, GlobalStyles.buttonInterior]} 
          onPress={() => { this._respond() }}>
          I can help!</Button>
      </View>
    )
  }

  _closer() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={styles.auxPrompt}>All finished?</Text>
        <Button
          containerStyle={[GlobalStyles.buttonContainer, styles.auxButton]}
          style={[GlobalStyles.text, GlobalStyles.buttonInterior]} 
          onPress={() => { this._close() }}>
          Thanks & Close</Button>
      </View>
    )
  }

  render() {
    // @todo put headline in nav title, withdraw content on scroll down
    // @todo use native keyboard API for hideaway
    return (
      <View style={styles.wrapper}>

        <View style={styles.header}>
        <ScrollView>
        <View style={GlobalStyles.containerPadding}>
          <Text style={styles.headline}>{this.props.post.headline}</Text>
          <Text>{this.props.post.content}</Text>
        </View>
        </ScrollView>
        </View>

        <GiftedMessenger
          ref={(c) => this._GiftedMessenger = c}
          styles={{
            bubbleRight: {
              marginLeft: 70,
              backgroundColor: '#116611'
            }
          }}
          messages={this.state.messages}
          handleSend={this.handleSend.bind(this)}
          maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT - 42 - 60}
          loadEarlierMessagesButton={!this.state.allLoaded}
          onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}
          senderName={this.props.global.state.store.name}
          senderImage={{ uri: 'http://thecatapi.com/api/images/get' }}
          displayNames={true}
          parseText={false}
          isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}
          typingMessage={this.state.typingMessage}
        />

        <View style={[GlobalStyles.containerPadding, styles.footer]}>
          {this._footer()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    marginTop:  64
  },
  header: {
    height: 42,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#828287'
  },
  footer: {
    height: 52
  },
  headline: {
    fontWeight: 'bold',
    overflow: 'hidden'
  },
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
