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


export default class TentsIndex extends Component {
  constructor(props) {
    super(props);
    var tents = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })

    this.state = {
      tents: tents
    }
  }

  componentDidMount() {
    this.setState({
      tents: this.state.tents.cloneWithRows(seeds),
    })
  }

  _item(item) {
    return (
      <TouchableHighlight onPress={Actions.tentsshow}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{item.desc}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.tents}
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
    marginTop: 64
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
   name: 'WeWork Labs',
   id: '0',
   desc: 'Labs members, CMs, advisors, and vendors.'
  }, {
   name: 'Dogs',
   id: '1',
   desc: 'Just a test record.'
  }, {
   name: 'Cats',
   id: '2',
   desc: 'Just a test record.'
  }, {
   name: 'Trad Climbing',
   id: '3',
   desc: 'Just a test record.'
  }, {
   name: 'Venezualen snail racing discussion',
   id: '4',
   desc: '¡Olé!'
  }
]
