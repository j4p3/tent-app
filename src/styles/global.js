import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'

const radius = 4
export const Palette = {
  text:  '#333',
  bg: '#f4f4f6',
  neutral: '#dcdce0',
  focus: '#fff',
  accent: '#48a770',
  accentDark: '#167740',
  accentLight: '70C294',
  offsetADark: '#901B48',
  offsetALight: '#CB5784',
  offsetBDark: '#A6681F',
  offsetBLight: '#EAAC65',
}

export var GlobalStyles = StyleSheet.create({
  containerPadding: {
    paddingVertical: 4,
    paddingHorizontal: 6
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: '#fff'
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
    backgroundColor: Palette.bg,
  },
  buttonContainer: {
    borderRadius: radius,
    padding:10,
    height:45,
    overflow:'hidden',
    backgroundColor: Palette.accent
  },
  buttonMuted: {
    backgroundColor: Palette.text
  },
  buttonInterior: {
    color: Palette.focus
  },
  text: {
    fontFamily: 'Lato'
  },
  input: {
    backgroundColor: Palette.focus,
    height: 40,
    paddingHorizontal: 6,
    borderColor: Palette.accent,
    borderWidth: 1
  },
  vSpace: {
    marginVertical: 12
  },

  // GRID ITEM
  itemContainer: {
    margin: 10
  },
  item: {
    // LAYOUT
    flex: 1,
    padding: 8,
    width: 150,
    height: 150,

    flexDirection: 'column',
    // PRESENTATION
    backgroundColor: Palette.focus,
    borderColor: '#ededf0',
    borderBottomColor: '#dcdce0',
    borderRightColor: '#dcdce0',
    borderWidth: 1
  },
  itemTitle: {
    alignSelf: 'flex-start'
  },
  itemContextRow: {
    flex: 2,
  },
  itemContextInterior: {
    flex: 1,
    width: 150,
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
  },
  rightItemContextInterior: {
    right: -15,
    alignItems: 'flex-end'
  },
  leftItemContextInterior: {
    left: -15,
    alignItems: 'flex-end'
  },
  itemContextText: {
    flex: 1,
    flexDirection: 'column',
    height: 30,
    paddingHorizontal: 6,
  },
  itemImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  itemContent: {
    flex: 2,
    overflow: 'hidden'
  },

  // GLOBAL TEXT
  titleText: {
    fontFamily: 'Lato-Black',
    fontSize: 16,
    lineHeight: 16,
    color: Palette.text
  },
  bodyText: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    color: Palette.text
  },
  subText: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    lineHeight: 15,
    color: Palette.accent
  }
})
