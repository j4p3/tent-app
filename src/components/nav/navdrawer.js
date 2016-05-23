import React, { Component, PropTypes } from "react"
import Drawer from "react-native-drawer"
import { DefaultRenderer } from "react-native-router-flux";

import TabView from "./tabview"

const propTypes = {
  navigationState: PropTypes.object,
};

export default class NavDrawer extends Component {
  render(){
    const children = this.props.navigationState.children;
    return (
      <Drawer
        ref="navigation"
        type="overlay"
        content={<TabView/>}
        tapToClose={true}
        openDrawerOffset={0.2}
        closedDrawerOffset={-3}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenDuration={100}
        styles={{
          drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
          main: {paddingLeft: 3},
        }}
        tweenHandler={(ratio) => ({
         main: { opacity:Math.max(0.54,1-ratio) }
      })}>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

NavDrawer.propTypes = propTypes;
