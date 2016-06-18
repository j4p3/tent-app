import React, { Component } from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'

import { GlobalStyles, Palette } from '../../styles/global'

export class TText extends Text {
  render() {
    return (
      <Text style={styles.text}>{super.render()}</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Open Sans',
    color: Palette.text
  }
})
