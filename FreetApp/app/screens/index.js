import React from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Picker } from 'react-native';
import { RkStyleSheet, RkChoice, RkChoiceGroup, RkText, RkTextInput } from 'react-native-ui-kitten';
import _ from 'lodash';
import { FontAwesome } from './../assets/icons.js';
import ChannelGridView from './../components/channelGridView.js';
import Settings from './../config/settings.js';

export default class Index extends React.Component {
  state = {
    isLoaded: false,
    channelsLoaded: false,
    selectedCategory: '*',
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
      this.setState({channels: parsedChannels.slice(-10), channelsLoaded: true});
    } catch(error) {
      console.log(error, 'While fetching channels');
    }
  }


  onInputChanged = (event) => {
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const channels = _.filter(this.state.channels, channel => {
      const filterResult = {
        name: channel.name.search(pattern),
        category: channel.categoryId,
      };

      if( filterResult.name !== -1 && (
          filterResult.category === this.state.selectedCategory || 
          this.state.selectedCategory === '*'
      )) 
        return channel;
      else
        return undefined;
    });

    this.setState({
      filteredChannels: channels
    });
  };

  onCategoryChange = (categoryId) => {
    this.setState({
      filteredChannels: this.state.channels.filter(channel => {
        return channel.categoryId == categoryId || categoryId === '*'
      }),
      selectedCategory: categoryId
    });
  }

  renderLoading() {
    return (
      <ActivityIndicator style={styles.loader} size="large" />
    );
  }

  renderLoaded() {
    return (
      <View>
        {this.renderHeader()}
        <ChannelGridView style={{width: '100%', backgroundColor: 'red'}} onLoad={this.onLoad} items={this.state.filteredChannels || this.state.channels} />
      </View>
    );
  }

  renderInputLabel = () => (
    <RkText rkType='awesome'>{FontAwesome.search}</RkText>
  );

  renderHeader = () => (
    <View style={styles.header}>
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
      <View style={styles.pickerContainer}>
        <RkText style={styles.pickerIcon}></RkText>
        <Picker
          mode='dropdown'
          selectedValue={this.state.selectedCategory}
          style={styles.categoryPicker}
          onValueChange={this.onCategoryChange.bind(this)} >
          {
            Object.entries(Settings.getCategoryMap())
              .map(([categoryName, categoryId]) => {
                return (
                  <Picker.Item key={categoryId} label={categoryName} value={categoryId} />
                );
              })
          }
        </Picker>
      </View>
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
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    height: 80,
    width: '100%',
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    minWidth: '55%',
    marginRight: 25,
  },
  pickerContainer: {
    flex: 1,
    marginLeft: -5,
    position: 'relative',
    borderColor: theme.colors.screen.info,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pickerIcon: {
    zIndex: 1500,
    fontFamily: 'fontawesome',
    fontSize: 12,
    color: theme.colors.screen.info,
    position: 'absolute',
    top:0,
    bottom: 0,
    right: 5,
    textAlignVertical: 'center',
  },
  categoryPicker: {
    color: theme.colors.screen.info,
    backgroundColor: theme.colors.screen.base,
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
