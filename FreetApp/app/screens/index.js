import React from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RkStyleSheet, RkChoice, RkChoiceGroup, RkText, RkTextInput } from 'react-native-ui-kitten';
import _ from 'lodash';
import { FontAwesome } from './../assets/icons.js';
import ChannelGridView from './../components/channelGridView.js';
import Settings from './../config/settings.js';

export default class Index extends React.Component {
  state = {
    isLoaded: false,
    channelsLoaded: false,
  }

  constructor(props) {
    super(props);
    this.loadChannels();
  }

  onLoad = () => {
    this.setState({isLoaded: true});
  }

  async loadChannels() {
    try {
      let channelListUrl = await Settings.getChannelListUrl();
      let imageBaseUrl = await Settings.getImageBaseUrl();
      let response = await fetch(channelListUrl);
      let channels = (await response.json()).result;
      let parsedChannels = [];

      channels.map(({channelCategoryId, channelLanguageId, channel_id, channel_name, logoUrl}) => {
        if(
          Object.values(Settings.getCategoryMap()).includes(channelCategoryId)
          &&
          !Object.values(Settings.getDisabledLanguages()).includes(channelLanguageId)
        )
          parsedChannels.push({
            id: channel_id,
            name: channel_name,
            categoryId: channelCategoryId,
            languageId: channelLanguageId,
            logoUrl: `${imageBaseUrl}/${logoUrl}`
          });
      });
      this.setState({channels: parsedChannels, channelsLoaded: true});
    } catch(error) {
      console.log(error, 'While fetching channels');
    }
  }


  onInputChanged = (event) => {
    console.log('filtered fired')
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const channels = _.filter(this.state.channels, channel => {
      const filterResult = {
        name: channel.name.search(pattern),
      };
      return filterResult.name !== -1 ? channel : undefined;
    });
    this.setState({
      filteredChannels: channels
    });
    console.log('filtered ready')
  };

  renderLoading() {
    return (
      <ActivityIndicator style={styles.loader} size="large" />
    );
  }

  renderLoaded() {
    return (
      <View>
        {this.renderHeader()}
        <ChannelGridView onLoad={this.onLoad} selectedCategory={'*'} items={this.state.filteredChannels || this.state.channels} />
      </View>
    );
  }

  renderInputLabel = () => (
    <RkText rkType='awesome'>{FontAwesome.search}</RkText>
  );

  renderHeader = () => (
    <View style={styles.searchContainer}>
      <RkTextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChange={this.onInputChanged}
        label={this.renderInputLabel()}
        rkType='row'
        placeholder='Search'
      />
    </View>
  );

  render() {
    return(
      <View style={styles.container}>
        {this.state.isLoaded ? undefined : this.renderLoading()}
        {this.state.channelsLoaded ? this.renderLoaded() : undefined}
      </View>
    )
  }
}

const styles = RkStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    flexGrow: 1,
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.screen.base,
    position: 'relative',
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center',
    width: '100%',
  },
  loader: {
    position: 'absolute',
    backgroundColor: theme.colors.screen.base,
    minWidth: '100%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 999,
  }
}));
