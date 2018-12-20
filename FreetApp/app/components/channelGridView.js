import React from 'react';
import {
  ScrollView,
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

export default class ChannelGridView extends React.Component {
  state = {
    imagesLoaded: 0,
    isLoaded: false,
  }

  imagesPath = {}

  constructor(props) {
    super(props);
    this.handleImageLoad();
  }

  renderItems = () => this.props.items.map(this.renderItem);

  renderItem = (item) => {
    if(item.categoryId == this.props.selectedCategory || this.props.selectedCategory == '*')
      return (
        <RkButton
          rkType='tile'
          style={styles.child}
          key={item.id}
          categoryId={item.categoryId}
          onPress={() => this.onItemPressed(item)}>
          <View style={styles.icon} rkType='primary moon xxlarge'>
            <RNImage 
              style={{height: 100, width: 130}} 
              source={{isStatic: true, uri: this.imagesPath[item.id]}}
              uri={this.imagesPath[item.id]} 
            />
          </View>
          <RkText style={{textAlign: 'center'}} rkType='small'>{item.name.replace(/HD/, '')}</RkText>
        </RkButton>
      );
  };

  onItemPressed = (item) => {
    console.log('pressed', item)

  };

  async handleImageLoad() {
    for(let index in this.props.items) {
      let item = this.props.items[index];
      this.imagesPath[item.id] = (await CacheManager.get(item.logoUrl).getPath()) || '';
    }

    console.log('All done')
    this.setState({isLoaded: true});
    // this.setState({imagesLoaded: this.state.imagesLoaded + 1});
    // console.log(this.state.imagesLoaded)
    // if(this.state.imagesLoaded > 50) 
      // this.setState({isLoaded: true});
    // else 
      // this.setState({isLoaded: false});
  }

  render() {
    const items = this.renderItems()
    return this.state.isLoaded ? this.renderLoaded(items) : this.renderLoading();
  }


  renderLoading() {
    return (
      <ActivityIndicator size="large" />
    );
  }

  renderLoaded(items){
    return (
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.rootContainer}>
        {items}
      </ScrollView>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    width: '100%',
    flex: 1,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  child: {
    width: '50%',
    aspectRatio: 1,
  },
  icon: {
    marginBottom: 16,
  },
}));
