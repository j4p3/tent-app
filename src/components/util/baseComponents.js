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

function applyStyle(style, classStyle) {
  if (typeof(style) == "object" && style.length) {
    style = [classStyle].concat(style)
  } else if (style) {
    style = [classStyle, style];
  } else {
    style = classStyle;
  }
  return style
}

export class BodyText extends Text {
  constructor(props) {
    super(props);
    let style = styles.bodyText
    props.style = applyStyle(props.style, style)   
  }

  render() {
    return super.render()
  }
}

export class HeaderText extends Text {
  constructor(props) {
    super(props);
    let style = styles.headerText
    props.style = applyStyle(props.style, style)
  }

  render() {
    return super.render()
  }
}

export class Wrapper extends View {
  constructor(props) {
    super(props)  
    this.state = {
      loaded: props.loaded || true,
      visibleHeight: Dimensions.get('window').height - STATUS_BAR_HEIGHT
    }
  }

  componentDidMount() {
    let height = Dimensions.get('window').height - STATUS_BAR_HEIGHT
    this.setState({
      height: Dimensions.get('window').height - STATUS_BAR_HEIGHT
    })

    this.showListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    this.hideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
  }

  componentWillUnmount() {
    Keyboard.removeSubscription(this.showListener)
    Keyboard.removeSubscription(this.hideListener)
  }

  _keyboardWillShow(e) {
    let height = Dimensions.get('window').height - STATUS_BAR_HEIGHT - e.endCoordinates.height
    this.setState({visibleHeight: height})
  }

  _keyboardWillHide(e) {
    this.setState({
      visibleHeight: Dimensions.get('window').height - STATUS_BAR_HEIGHT
    })
  }

  render() {
    if (this.state.loaded) {
      return (
        <View style={{ height: this.state.visibleHeight, marginTop: STATUS_BAR_HEIGHT }}>
          <View style={styles.wrapper}>
            {super.render()}
          </View>
        </View>
      )
    } else {
      return (
        <View><Text>Loading</Text></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    color: Palette.text
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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

const STATUS_BAR_HEIGHT = 64
if (Platform.OS === 'android') {
  var ExtraDimensions = require('react-native-extra-dimensions-android')
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT')
}
