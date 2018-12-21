import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Image as RNImage,
} from 'react-native';
import {
  RkText,
  RkButton,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import {Image, CacheManager} from "react-native-expo-image-cache";
import SocketIOClient from 'socket.io-client';
import Settings from '../config/settings.js'

export default class ChannelGridView extends React.Component {
  state = {
    imagesLoaded: 0,
    isLoaded: false,
    imagesPath: {}
  }

  constructor(props) {
    super(props);
    this.initSocketAndLoadImages();
  }

  renderItems = () => this.props.items.map(this.renderItem);

  renderItem = (item) => (
    <RkButton
      rkType='tile'
      style={styles.child}
      key={item.id}
      categoryId={item.categoryId}
      onPress={() => this.onItemPressed(item)}>
      <View style={styles.icon} rkType='primary moon xxlarge'>
        <RNImage 
          style={{height: 100, width: 130}} 
          source={{isStatic: true, uri: this.state.imagesPath[item.id]}}
        />
      </View>
      <RkText style={{textAlign: 'center'}} rkType='small'>{item.name.replace(/HD/, '')}</RkText>
    </RkButton>
  );

  onItemPressed = async (item) => {
    const base = await(Settings.getBaseUrl()) + '/jiotv.live.cdn.jio.com';
    const quality = await(Settings.getBitrate());
    const streamUrl = `${base}/${item.streamUrl}/${item.streamUrl}_${quality}.m3u8`;
    this.socket.emit('updateSrc', streamUrl);
  };

  async initSocketAndLoadImages() {
    //Initialize Socket.IO connection
    this.socket = SocketIOClient(await Settings.getSocketServerUrl());

    //Load Images
    let imagesPath = {}
    for(let index in this.props.items) {
      let item = this.props.items[index];
      imagesPath[item.id] = (await CacheManager.get(item.logoUrl).getPath()) || '';
    }
    this.setState({imagesPath});
    this.props.onLoad();
  }

  render() {
    return (
      <FlatList
        extraData={[this.state, this.props]}
        numColumns={2}
        data={this.props.items}
        renderItem={({ item }) => this.renderItem(item)} 
        keyExtractor={(item, index) => item.id.toString()}
      />
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    backgroundColor: 'red',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  child: {
    width: '50%',
    aspectRatio: 1,
  },
  icon: {
    marginBottom: 16,
  },
}));
