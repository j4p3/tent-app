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

export default class ChatsShow extends Component {
  constructor(props) {
    super(props);
  
    this._messages = this.getInitialMessages();

    this.state = {
      messages: this._messages, // not a listview datasource!
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false,
    };
  }

  getInitialMessages() {
    // @todo GET FB
    return [
      {
        text: 'The Tent lives!',
        name: 'React-Bot',
        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
        position: 'left',
        date: new Date(2016, 3, 14, 13, 0),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
      {
        text: "Drop the 'the', it's already been lampshaded",
        name: 'Awesome Developer',
        image: { uri: 'http://0.gravatar.com/avatar/fa4d287d26d7568219b3af5f268eb394' },
        position: 'right',
        date: new Date(2016, 3, 14, 13, 1),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
    ];
  }

  setMessages(messages) {
    this._messages = messages;
    this.setState({ messages: messages });
  }

  handleSend(message = {}) {
    // @todo POST FB

    // Your logic here
    // Send message.text to your server

    message.uniqueId = Math.round(Math.random() * 10000); // simulating server-side unique id generation
    this.setMessages(this._messages.concat(message));

    // mark the sent message as Seen
    setTimeout(() => {
      this.setMessageStatus(message.uniqueId, 'Seen'); // here you can replace 'Seen' by any string you want
    }, 1000);

    // if you couldn't send the message to your server :
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

  handleReceive(message = {}) {
    // @todo point FB listener here

    // REQ PARAMS:
    // text, name, image, position: 'left', date, uniqueId
    this.setMessages(this._messages.concat(message));
  }

  render() {
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}
        styles={styles.bubbleRight}
        autoFocus={true}
        messages={this.state.messages}
        handleSend={this.handleSend.bind(this)}
        maxHeight={400}
        loadEarlierMessagesButton={!this.state.allLoaded}
        onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}
        senderName='JP'
        senderImage={{url: 'http://0.gravatar.com/avatar/fa4d287d26d7568219b3af5f268eb394'}}
        displayNames={true}
        parseText={false}
        isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}
        typingMessage={this.state.typingMessage}
      />
    )
  }
}

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
  bubbleRight: {
    marginLeft: 70,
    backgroundColor: '#116611',
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

const seeds = [
  { name: 'foo', content: 'bar' },
  { name: 'hammock next', content: 'level cred' },
  { name: 'skateboard godard', content: 'thundercats gastropub' },
  { name: 'four loko', content: 'heirloom pabst' },
  { name: 'franzen chia', content: 'Authentic bitters' },
  { name: 'crucifix leggings', content: 'VHS Selvage' },
  { name: 'biodiesel twee', content: 'salvia dreamcatcher' },
  { name: 'food truck', content: 'venmo XOXO' },
  { name: 'Hashtag locavore', content: 'kogi roof' },
  { name: 'party wayfarers', content: 'fingerstache Disrupt' },
  { name: 'squid man', content: 'braid fixie' },
  { name: 'artisan freegan', content: 'tilde hashtag' },
  { name: 'poutine slow-carb', content: 'single-origin coffee' },
  { name: 'Lofi chartreuse', content: 'squid affogato' },
  { name: 'sriracha intelligentsia', content: 'man braid' },
  { name: 'messenger bag', content: 'four loko' },
  { name: 'yuccie sartorial', content: 'YOLO hashtag' },
  { name: 'tryhard Four', content: 'loko slow-carb' },
  { name: 'ethical chia', content: 'selvage mixtape' },
  { name: 'umami franzen', content: 'migas tousled' },
  { name: 'locavore offal', content: 'chicharrones' },
  { name: 'tryhard venmo', content: 'XOXO' },
  { name: 'biodiesel twee', content: 'salvia dreamcatcher' },
  { name: 'food truck', content: 'venmo XOXO' },
  { name: 'Hashtag locavore', content: 'kogi roof' },
  { name: 'party wayfarers', content: 'fingerstache Disrupt' },
  { name: 'squid man', content: 'braid fixie' },
  { name: 'artisan freegan', content: 'tilde hashtag' },
  { name: 'poutine slow-carb', content: 'single-origin coffee' },
  { name: 'skateboard godard', content: 'thundercats gastropub' },
  { name: 'four loko', content: 'heirloom pabst' },
  { name: 'franzen chia', content: 'Authentic bitters' },
  { name: 'crucifix leggings', content: 'VHS Selvage' },
  { name: 'biodiesel twee', content: 'salvia dreamcatcher' },
  { name: 'food truck', content: 'venmo XOXO' }
]

module.exports = ChatsShow