import React, { Component } from 'react'
import {
  Dimensions,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  ListView,
  View,
  Platform,
} from 'react-native'
import GiftedMessenger from 'react-native-gifted-messenger'
import Firebase from 'firebase'
import Button from 'react-native-button';
var DeviceInfo = require('react-native-device-info')
import { Actions } from 'react-native-router-flux';
import { MKButton } from 'react-native-material-kit'

import { Wrapper } from '../util/baseComponents'
import { Palette, GlobalStyles } from '../../styles/global'
import Api from '../../stores/api'

export default class PostsShow extends Component {
  constructor(props) {
    super(props);
  
    this._messages = []
    var messages = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.text !== r2.text,
    })
    this._api = new Api()
    this._store = this._api.store().child('tents/' + props.post.tent_id + '/posts/' + props.post.id + '/stream')

    this.state = {
      messages: messages.cloneWithRows(this._messages),
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false
    };
  }

  componentDidMount() {
    var _this = this

    this._store
      .orderByChild('created_at')
      .limitToLast(3)
      .on('value', function (d) {
        _this._setMessages(_this._handleReceive(d.val()))
    })
  }

  /***************************************************************************/
  // State manipulation utilities
  /***************************************************************************/

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
    this._messages = messages
    this.setState({ messages: this.state.messages })
  }

  _handleSend(message = {}) {
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
    Actions.chatsshow({ post: this.props.post })

    // @todo flag outbound message for update on successful push()
    // message.uniqueId = 0
    // message.pending = true
    // this._setMessages(this._messages.concat(message))

    // this._setMessageStatus(message.uniqueId, 'ErrorButton');
  }

  onLoadEarlierMessages() {
    // @todo GET FB/<page-1>
  }

  /***************************************************************************/
  // Server actions
  /***************************************************************************/

  _respond() {
    this.setState({responded: true})
    this._api.interact({
      origin_user_id: this.props.global.state.user.id,
      post_id: this.props.post.id
    })
    Actions.flash({message: 'Thanks! The post author will be notified.', nextAction: Actions.back})
  }

  _close() {
   this.setState({closed: true})
   Actions.flash({message: 'Thanks! You and the post participants have earned some voice in this community.', nextAction: Actions.back})
  }

  _interactor(item) {
    if (item.user.id == this.props.global.state.user.id) {
      return this._closer(item)
    } else {
      return this._responder(item)
    }
  }

  /***************************************************************************/
  // Templates & rendering
  /***************************************************************************/

  _responder(item) {
    return (
      <View style={{ flex: 1, marginHorizontal: 10 }}><MKButton
        {...MKButton.coloredButton().toProps()}
        backgroundColor={Palette.accent}
        shadowOpacity={0}
        onPress={() => { this._respond() }}>
          <Text style={[GlobalStyles.titleText, { color: Palette.focus, textAlign: 'center' }]}>
          tell {item.user.name} to hit me up
          </Text></MKButton></View>
    )
  }

  _closer(item) {
    return (
      <View style={{ flex: 1, marginHorizontal: 10 }}><MKButton
        {...MKButton.coloredButton().toProps()}
        backgroundColor={Palette.accent}
        shadowOpacity={0}
        onPress={() => { this._close() }}>
          <Text style={[GlobalStyles.titleText, { color: Palette.focus, textAlign: 'center' }]}>
          close
          </Text></MKButton></View>
    )
  }

  _item(item) {
    return (
        <View style={[GlobalStyles.itemPresentation, styles.item]}>
          <View style={{flex: 1 }}>
            <Text style={GlobalStyles.titleText}>
              {item.headline}</Text>
          </View>

          <View style={{ flex: 1, marginVertical: 12, height: 30  }}>
            <View style={[GlobalStyles.itemContextInterior,
                          GlobalStyles.leftItemContextInterior]}>
              <Image source={{ uri: item.user.avatar || null }}
                style={GlobalStyles.itemImage} />
              <View style={GlobalStyles.itemContextText}>
                <Text style={GlobalStyles.subText}>{item.user.name}</Text>
                <Text style={GlobalStyles.subText}>
                  {item.friendly_created_at} ago</Text>
              </View>
            </View>
          </View>

          <View style={{flex: 1 }}>
            <Text style={GlobalStyles.bodyText}>
              {item.content}</Text>          
          </View>

        </View>
    )
  }

  render() {
    // @todo use native keyboard API for hideaway
    // @todo send arrow https://github.com/FaridSafi/react-native-gifted-messenger/pull/127
    // @todo multiline input https://github.com/FaridSafi/react-native-gifted-messenger/issues/117
    // @todo unfuck message flex alignment padding issue

    return (
      <Wrapper>
        <ScrollView
          keyboardShouldPersistTaps={true}
          style={[
          styles.itemContainer,
          { height: Dimensions.get('window').height - STATUS_BAR_HEIGHT - 64
        }]}>

          {this._item(this.props.post)}

          <View style={styles.itemFooter}>

            <View style={styles.itemInteractions}>
              {this._interactor(this.props.post)}

              <View style={{ flex: 1, marginHorizontal: 10 }}><MKButton
                {...MKButton.coloredButton().toProps()}
                backgroundColor={Palette.accent}
                shadowOpacity={0}
                onPress={() => {
                  Actions.chatsshow({ post: this.props.post }) }}>
                  <Text style={[GlobalStyles.titleText, { color: Palette.focus, textAlign: 'center' }]}>
                  chat
                  </Text></MKButton></View>
            </View>

            <ListView
              enableEmptySections={true}
              dataSource={this.state.messages}
              renderRow={(i) => {
                <View style={styles.bubble}>
                  <Text style={{color: Palette.focus}}>{i.text}</Text>
                </View>
              }}
            >
            </ListView>

            <GiftedMessenger
              ref={(c) => this._GiftedMessenger = c}
              styles={{
                bubbleRight: {
                  backgroundColor: Palette.accent
                },
                bubbleLeft: {
                  backgroundColor: Palette.focus
                },
                container: {
                  backgroundColor: Palette.bgLight,
                },
                date: {
                  height: 0
                },
                sendButton: {
                  marginTop: 11,
                  marginLeft: 10,
                  color: Palette.neutral
                },
                loadEarlierMessagesButton: {
                  fontSize: 14,
                  color: Palette.accent
                },
              }}
              autoFocus={false}
              alwaysBounceVertical={false}
              scrollAnimated={false}
              messages={this.state.messages}
              handleSend={this._handleSend.bind(this)}
              maxHeight={100}
              onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}
              senderName={this.props.global.state.user.name}
              senderImage={{ uri: this.props.global.state.user.avatar }}
              loadEarlierMessagesButton={!this.state.messages.length}
              loadEarlierMessagesButtonText={'No messages yet.'}
              displayNames={true}
              parseText={false}
              isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}
              typingMessage={this.state.typingMessage}
            />

          </View>
        </ScrollView>
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    overflow: 'visible'
  },
  item: {
    flex: 1,
    paddingVertical: 12,
    marginTop: 12
  },
  itemFooter: {
    flex: 1,
    backgroundColor: Palette.bgLight,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#dcdce0'
  },
  itemInteractions: {
    marginTop: 4,
    padding: 8,
    flexDirection: 'row'
  },
  bubble: {
    color: Palette.accent,
    borderRadius: 15,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 10,
    paddingTop: 8,
  },
})
const did = DeviceInfo.getUniqueID()
const STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight
if (Platform.OS === 'android') {
  var ExtraDimensions = require('react-native-extra-dimensions-android');
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
}
