import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native'
import GiftedMessenger from 'react-native-gifted-messenger'
import Firebase from 'firebase'
var DeviceInfo = require('react-native-device-info')

export default class ChatsShow extends Component {
  constructor(props) {
    super(props);

    var _this = this
  
    this._messages = []
    this._store = new Firebase('https://inthetent.firebaseio.com/')
      .child('dev/v1/tents/0/messages')

    this._store
      .limitToLast(25)
      .on('value', function (d) {
        _this.setMessages(_this.handleReceive(d.val()))
    })

    this.state = {
      messages: this._messages,
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false
    };
  }

  handleReceive(messages = {}) {
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
      msgArr.push(Object.assign({ uniqueId: m }, base, messages[m], { image: { uri: messages[m].image.uri }}))
    }

    return msgArr
  }

  setMessages(messages) { 
    this._messages = messages;
    this.setState({ messages: messages });
  }

  handleSend(message = {}) {
    message.device = did
    message.date = new Date()
    this._store.push(message)

    // @todo flag outbound message for update on successful push()
    // message.uniqueId = 0
    // message.pending = true
    // this.setMessages(this._messages.concat(message))

    // this.setMessageStatus(message.uniqueId, 'ErrorButton');
  }

  onLoadEarlierMessages() {
    // @todo GET FB/<page-1>

    // display a loader until you retrieve the messages from your server
    this.setState({
      isLoadingEarlierMessages: true,
    });

    // Your logic here
    // Eg: Retrieve old messages from your server

    // IMPORTANT
    // Oldest messages have to be at the begining of the array
    var earlierMessages = [
      {
        text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. https://github.com/facebook/react-native',
        name: 'React-Bot',
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        position: 'left',
        date: new Date(2016, 0, 1, 20, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      }, {
        text: 'This is a touchable phone number 0606060606 parsed by taskrabbit/react-native-parsed-text',
        name: 'Awesome Developer',
        image: null,
        position: 'right',
        date: new Date(2016, 0, 2, 12, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
    ];

    setTimeout(() => {
      this.setMessages(earlierMessages.concat(this._messages)); // prepend the earlier messages to your list
      this.setState({
        isLoadingEarlierMessages: false, // hide the loader
        allLoaded: true, // hide the `Load earlier messages` button
      });
    }, 1000); // simulating network
  }

  render() {
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}
        styles={{
          bubbleRight: {
            marginLeft: 70,
            backgroundColor: '#116611'
          }
        }}
        autoFocus={true}
        messages={this.state.messages}
        handleSend={this.handleSend.bind(this)}
        maxHeight={400}
        loadEarlierMessagesButton={!this.state.allLoaded}
        onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}
        senderName='JP'
        senderImage={{ uri: 'http://0.gravatar.com/avatar/fa4d287d26d7568219b3af5f268eb394' }}
        displayNames={true}
        parseText={false}
        isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}
        typingMessage={this.state.typingMessage}
      />
    )
  }
}

const did = DeviceInfo.getUniqueID()

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row'
  },
  name: {
    fontWeight: 'bold'
  },
  chat: {
    height: 300
  },
  input: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    marginBottom: 5,
    height: 20
  }
})
