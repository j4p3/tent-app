import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native'

export default class ChatsShow extends Component {
  constructor(props) {
    super(props);

    var items = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })

    this.state = {
      items: items.cloneWithRows(seeds)
    }

  }

  render() {
    return (
      <View>
        <Text>Chats: show</Text>
        <ListView
          style={styles.chat}
          dataSource={this.state.items}
          renderRow={this.item}/>
        <TextInput
          style={styles.input}/>
      </View>
    )
  }

  item(item) {
    return (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}: </Text>
        <Text>{item.content}</Text>
      </View>
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