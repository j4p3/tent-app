import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  Image,
  TouchableHighlight,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import GridList from '../util/gridlist'
import { Palette, GlobalStyles } from '../../styles/global'
import Api from '../../stores/api'
import { Wrapper } from '../util/baseComponents'

export default class PostsIndex extends Component {
  constructor(props) {
    super(props);

    this.tentId = props.tentId
    this._posts = []
    this._store = new Api()

    var postData = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
    this.state = {
      posts: postData.cloneWithRows(this._posts),
    };

  }

  componentDidMount() {
    var _this = this
    this._store.posts(this.tentId).then(function (s) {
      _this.setState({ posts: _this.state.posts.cloneWithRows(s) })
      _this.setState({ loaded: true })
    })
  }

  _item(item, sectionID, rowID, hlRow) {
    var itemContext
    if (rowID % 2 == 0) {
      itemContext = <View style={[GlobalStyles.vSpace,
                      GlobalStyles.itemContextRow]}>
        <View style={[GlobalStyles.itemContextInterior,
                      GlobalStyles.leftItemContextInterior]}>
          <Image source={{ uri: item.user.avatar }}
            style={GlobalStyles.itemImage} />
          <View style={GlobalStyles.itemContextText}>
            <Text style={GlobalStyles.subText}>{item.user.name}</Text>
            <Text style={GlobalStyles.subText}>
              {item.friendly_created_at} ago</Text>
          </View>
        </View></View>
    } else {
      itemContext = <View style={[GlobalStyles.vSpace,
                      GlobalStyles.itemContextRow]}>
        <View style={[GlobalStyles.itemContextInterior,
                      GlobalStyles.rightItemContextInterior]}>
          <View style={GlobalStyles.itemContextText}>
            <Text style={[GlobalStyles.subText, {textAlign: 'right'}]}>
            {item.user.name}</Text>
            <Text style={[GlobalStyles.subText, {textAlign: 'right'}]}>
              {item.friendly_created_at} ago</Text>
          </View>
          <Image source={{ uri: item.user.avatar }}
            style={GlobalStyles.itemImage} />
        </View></View>
    }

    return (
      <TouchableHighlight
        style={GlobalStyles.itemContainer}
        onPress={() => { Actions.postsshow({ post: item, title: item.user.name + '\'s post' }) }}>
        <View style={[GlobalStyles.itemLayout, GlobalStyles.itemPresentation]}>

          <View style={GlobalStyles.itemTitle}>
            <Text style={GlobalStyles.titleText}
              numberOfLines={3}>
              {item.headline}</Text>
          </View>

          {itemContext}

          <View style={GlobalStyles.itemContent}>
            <Text style={GlobalStyles.bodyText}
              numberOfLines={1}>
              {item.content}</Text>          
          </View>

        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <Wrapper style={{flex: 1}} parent={this}>
        <GridList
          dataSource={this.state.posts}
          parent={this}
          item={this._item}/>
        <ActionButton buttonColor="rgba(72, 167, 112, 1)">
          <ActionButton.Item
            buttonColor={Palette.offsetBLight}
            title="New Tent"
            onPress={() => { Actions.postsnew({ tentId: this.tentId }) }}>
            <Icon name="md-create" style={GlobalStyles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Palette.offsetALight}
            title="New Post"
            onPress={() => { Actions.postsnew({ tentId: this.tentId }) }}>
            <Icon name="md-create" style={GlobalStyles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Wrapper> 
    )
  }
}

