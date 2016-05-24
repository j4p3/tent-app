import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class ChatsIndex extends Component {
  constructor(props) {
    super(props);
    var chats = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })

    this.state = {
      chats: chats
    }
  }

  componentDidMount() {
    this.setState({
      chats: this.state.chats.cloneWithRows(seeds),
    })
  }

  _item(item) {
    return (
      <TouchableHighlight underlayColor={'#CCC'} onPress={Actions.chatsshow}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.author}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.chats}
          renderRow={this._item}/> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D6D6D6',
  },
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: '#CCC',
    margin: 10,
    width: 110,
    height: 110
  },
  title: {
    fontWeight: 'bold'
  }
})

const seeds = [
  {
   title: 'Fred Wilson Intro',
   author: 'JP',
   id: '0',
  }, {
   title: 'Beer, stumptown vice 90s shoreditch 3',
   author: 'JP',
   id: '1',
  }, {
   title: 'Wolf moon twee',
   author: 'JP',
   id: '2',
  }, {
   title: 'Readymade chia migas wolf post-ironic. Asymmetrical',
   author: 'JP',
   id: '3',
  }, {
   title: 'VHS meh, tumblr',
   author: 'JP',
   id: '4',
  }, {
   title: 'Typewriter semiotics farm-to-table taxidermy mixtape tacos',
   author: 'JP',
   id: '3',
  }, {
   title: 'Cred butcher blog',
   author: 'JP',
   id: '4',
  }, {
   title: 'Tattooed everyday carry.',
   author: 'JP',
   id: '3',
  }, {
   title: 'Ennui street art pinterest tumblr deep',
   author: 'JP',
   id: '4',
  }
]
