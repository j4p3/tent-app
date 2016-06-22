import React, { Component } from 'react'
import {
  StyleSheet,
  Navigator,
  View,
  Text,
  Keyboard,
  Dimensions,
  Platform
} from 'react-native'

import { GlobalStyles, Palette } from '../../styles/global'

export class TText extends Text {
  constructor(props) {
    super(props);
    props.style = [props.style, {fontFamily: 'Open Sans'}]
  }

  render() {
    return super.render()
  }
}

export class Wrapper extends View {
  constructor(props) {
    super(props)  
    this.state = {
      visibleHeight: Dimensions.get('window').height - STATUS_BAR_HEIGHT
    }
  }

  componentDidMount() {
    let height = Dimensions.get('window').height - STATUS_BAR_HEIGHT
    this.setState({
      height: Dimensions.get('window').height - STATUS_BAR_HEIGHT
    })

    Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
  }

  _keyboardWillShow(e) {
    let height = Dimensions.get('window').height - STATUS_BAR_HEIGHT - e.endCoordinates.height
    console.log(STATUS_BAR_HEIGHT)
    this.setState({visibleHeight: height})
  }

  _keyboardWillHide(e) {
    this.setState({
      visibleHeight: Dimensions.get('window').height - STATUS_BAR_HEIGHT
    }) 
  }

  render() {
    return (
      <View style={{ height: this.state.visibleHeight}}>
        <View style={styles.wrapper}>
          {super.render()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Open Sans',
    color: Palette.text
  },
  wrapper: {
    // LAYOUT
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,

    // PRESENTATION
    backgroundColor: Palette.bg,
  },
})

const STATUS_BAR_HEIGHT = 0
if (Platform.OS === 'android') {
  var ExtraDimensions = require('react-native-extra-dimensions-android');
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
}
