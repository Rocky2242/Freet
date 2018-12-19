import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { RkStyleSheet, } from 'react-native-ui-kitten';
import GridView from './../components/gridView.js';
import Settings from './../config/settings.js';

export default class Index extends React.Component {
  state = {
    isLoaded: false,
  }

  constructor(props) {
    super(props);
    this.loadChannels();
  }

  async loadChannels() {
    try {
      let baseUrl = await Settings.getBaseUrl();
      let response = await fetch(`${baseUrl}/gdcsite.cdnsrv.jio.com/jiotv.data.cdn.jio.com/apis/v1.3/getMobileChannelList/get/?os=android&devicetype=phone`);
      let channels = (await response.json()).result;
      let parsedChannels = [];

      channels.map(({channelCategoryId, channelLanguageId, channel_id, channel_name, logoUrl}) => {
        parsedChannels.push({
          id: channel_id,
          name: channel_name,
          categoryId: channelCategoryId,
          languageId: channelLanguageId,
          logoUrl
        });
      });

      this.setState({channels: parsedChannels, isLoaded: true});

    } catch(error) {
      console.log(error, 'While fetching channels');
    }
  }

  renderLoading() {
    return (
      <ActivityIndicator size="large" />
    );
  }

  renderLoaded() {
    return (
        <GridView />
    );
  }

  render() {
    return(
      <View style={styles.container}>
        {this.state.isLoaded ? this.renderLoaded() : this.renderLoading() }
      </View>
    )
  }
}

const styles = RkStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.screen.base,
  },
}));
