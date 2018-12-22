import React from 'react';
import { ScrollView, View, StyleSheet, Picker, KeyboardAvoidingView } from 'react-native';
import { RkText, RkTextInput, RkTheme, RkStyleSheet, RkButton, } from 'react-native-ui-kitten';
import Settings from './../config/settings.js';

export default class SettingsView extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
  };

  state = {
    baseUrl: '',
    serverUrl: '',
    imageBaseUrl: '',
    bitrate: '',
    isLoaded: false,
  }

  constructor(props) {
    super(props);
    this.initializeState();
  }

  async initializeState() {
    const baseUrl = await Settings.getBaseUrl();
    const serverUrl = await Settings.getSocketServerUrl();
    const imageBaseUrl = await Settings.getImageBaseUrl();
    const bitrate = await Settings.getBitrate();

    this.setState({
      baseUrl,
      serverUrl,
      imageBaseUrl,
      bitrate,
      isLoaded: true,
    });
  }

  changeBitrate(bitrate) {
    Settings.setBitrate(bitrate)
    this.setState({
      bitrate 
    });
  }

  changeBaseUrl(baseUrl) {
    Settings.setBaseUrl(baseUrl);
    this.setState({baseUrl});
  }

  changeServerUrl(serverUrl) {
    Settings.setSocketServerUrl(serverUrl);
    this.setState({serverUrl});
  }

  changeImageBaseUrl(imageBaseUrl) {
    Settings.setImageBaseUrl(imageBaseUrl);
    this.setState({imageBaseUrl});
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        { this.state.isLoaded ? (
        <KeyboardAvoidingView behavior='padding'>
          <View style={styles.section}>
            <View style={[ styles.row, {paddingRight: 0} ]}>
              <RkText>Quality</RkText>
              <View style={styles.pickerContainer}>
                <RkText style={styles.pickerIcon}></RkText>
                <Picker
                  mode='dropdown'
                  selectedValue={this.state.bitrate}
                  style={styles.qualityPicker}
                  onValueChange={this.changeBitrate.bind(this)} >
                  <Picker.Item label='Low' value='400' />
                  <Picker.Item label='High' value='600' />
                  <Picker.Item label='Very High' value='800' />
                  <Picker.Item label='Extreme' value='1200' />
                </Picker>
              </View>
            </View>
          </View>
          <View style={[ styles.section, {marginBottom: 500} ]}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType='header4 secondary'>Other Settings</RkText>
            </View>
            <View style={[ styles.row, styles.row2 ]}>
              <RkText rkType='header6 light'>Base URL</RkText>
              <RkTextInput
                style={styles.highlightedInput}
                value={this.state.baseUrl}
                rkType='rounded'
                onChangeText={this.changeBaseUrl.bind(this)}
              />
            </View>
            <View style={[ styles.row, styles.row2 ]}>
              <RkText rkType='header6 light'>Server URL</RkText>
              <RkTextInput
                style={styles.highlightedInput}
                value={this.state.serverUrl}
                rkType='rounded'
                onChangeText={this.changeServerUrl.bind(this)}
              />
            </View>
            <View style={[ styles.row, styles.row2 ]}>
              <RkText rkType='header6 light'>Image Base URL</RkText>
              <RkTextInput
                style={styles.highlightedInput}
                value={this.state.imageBaseUrl}
                rkType='clear rounded'
                onChangeText={this.changeImageBaseUrl.bind(this)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>) : null}
      </ScrollView>
    );
  }
}

const styles = RkStyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    backgroundColor: 'red',
    justifyContent: 'space-between',
    position: 'relative',
    marginRight: 12.5,
    overflow: 'hidden',
    backgroundColor: 'green',
    backgroundColor: theme.colors.screen.alter,
    borderRadius: 20,
    borderWidth: 0,
  },
  pickerIcon: {
    zIndex: 1500,
    fontFamily: 'fontawesome',
    fontSize: 12,
    color: theme.colors.text.hint,
    position: 'absolute',
    top:0,
    bottom: 0,
    right: 15,
    textAlignVertical: 'center',
  },
  qualityPicker: {
    color: theme.colors.text.hint,
    minWidth: '40%',
    marginLeft: 10,
  },
  highlightedInput: {
    backgroundColor: theme.colors.screen.alter,
    paddingVertical: 5,
    paddingRight: 15,
    overflow: 'hidden',
  },
  row2: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
}));
