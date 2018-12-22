import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { RkTheme, RkStyleSheet, RkButton, RkText } from 'react-native-ui-kitten';
import { FontAwesome} from './../assets/icons.js';
import { DarkKittenTheme } from './../config/darkTheme.js';
import Settings from './../config/settings.js';
import isAvailable from './../utils/isAvailable.js';

export default class Header extends React.Component {
  state = {
    serverAvailable: false,
  }

  componentDidMount() {
    setInterval(this.updateServerStatus.bind(this), 100);
    this.updateServerStatus();
  }

  async updateServerStatus() {
    let serverUrl = await Settings.getSocketServerUrl();
    let serverAvailable = await isAvailable(serverUrl);
    this.setState({serverAvailable: true});
    console.log(serverAvailable)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerLeft}>
          <RkButton 
            rkType='clear' 
            style={{ 
              paddingHorizontal: 25, 
              paddingVertical: 15,
              marginRight: 15,
            }}
            onPress={this.props.navigation.openDrawer}>
            <RkText rkType='header3 awesome'>{FontAwesome.bars}</RkText>
          </RkButton>
          <RkText rkType='header3'>Freet</RkText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RkText 
            style={{fontSize: 10, color: this.state.serverAvailable ? DarkKittenTheme.colors.success : DarkKittenTheme.colors.danger }}
            rkType='awesome'>
            {FontAwesome.circle}
          </RkText>
          <RkButton
            rkType='clear'
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              marginLeft: 10,
            }}>
            <RkText rkType='header3 awesome'>{FontAwesome.powerOn}</RkText>
          </RkButton>
        </View>
      </View>
    );
  }
}

const styles = RkStyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base,
    paddingTop: 20,
    height: 100,
    elevation: 16,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  }
}));
