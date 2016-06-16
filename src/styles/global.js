import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'

const radius = 4
const palette = {
  bg: '#f4f4f6',
  focus: '#fff',
  accent: '#48a770',
  text:  '#333'
}

var GlobalStyles = StyleSheet.create({
  containerPadding: {
    paddingVertical: 4,
    paddingHorizontal: 6
  },

  wrapper: {
    // LAYOUT
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 64,
    paddingTop: 8,
    paddingHorizontal: 10,

    // PRESENTATION
    backgroundColor: palette.bg,
  },
  buttonContainer: {
    borderRadius: radius,
    padding:10,
    height:45,
    overflow:'hidden',
    backgroundColor: palette.accent
  },
  buttonMuted: {
    backgroundColor: palette.text
  },
  buttonInterior: {
    color: palette.focus
  },
  text: {
    fontSize: 20,
  },
  input: {
    backgroundColor: palette.focus,
    height: 40,
    paddingHorizontal: 6,
    borderColor: palette.accent,
    borderWidth: 1
  },
  vSpace: {
    marginVertical: 6
  },

  // GRID ITEM
  itemContainer: {
    margin: 10
  },
  item: {
    // LAYOUT
    overflow:'hidden',
    padding: 8,
    width: 150,
    height: 150,

    // PRESENTATION
    backgroundColor: palette.focus,
    borderColor: '#ededf0',
    borderBottomColor: '#dcdce0',
    borderRightColor: '#dcdce0',
    borderWidth: 1
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: palette.text
  },
  itemBody: {
    fontSize: 12,
    color: palette.text
  }
})

var input = null

var colors = null

module.exports = GlobalStyles