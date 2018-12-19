import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import {
  RkText,
  RkButton,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export default class GridView extends React.Component {
  state = {
    dimensions: undefined,
    items: [
      {id: 1, title: 'Sab Tv'},
      {id: 2, title: 'Sab Tv'},
      {id: 3, title: 'Sab Tv'},
      {id: 4, title: 'Sab Tv'},
      {id: 5, title: 'Sab Tv'},
      {id: 6, title: 'Sab Tv'},
      {id: 7, title: 'Sab Tv'},
      {id: 8, title: 'Sab Tv'},
      {id: 9, title: 'Sab Tv'},
      {id: 10, title: 'Sab Tv'},
      {id: 11, title: 'Sab Tv'},
      {id: 12, title: 'Sab Tv'},
      {id: 13, title: 'Sab Tv'},
      {id: 14, title: 'Sab Tv'},
      {id: 15, title: 'Sab Tv'},
      {id: 16, title: 'Sab Tv'},
      {id: 17, title: 'Sab Tv'},
      {id: 18, title: 'Sab Tv'},
      {id: 19, title: 'Sab Tv'},
      {id: 20, title: 'Sab Tv'},
      {id: 21, title: 'Sab Tv'},
      {id: 22, title: 'Sab Tv'},
      {id: 23, title: 'Sab Tv'},
      {id: 24, title: 'Sab Tv'},
      {id: 25, title: 'Sab Tv'},
      {id: 26, title: 'Sab Tv'},
      {id: 27, title: 'Sab Tv'},
      {id: 28, title: 'Sab Tv'},
      {id: 29, title: 'Sab Tv'},
    ]
  };

  onContainerLayout = (event) => {
    if (this.state.height) {
      return;
    }
    const dimensions = event.nativeEvent.layout;
    this.setState({ dimensions });
  };

  renderItems = () => this.state.items.map(this.renderItem);

  renderItem = (item) => (
    <RkButton
      rkType='tile'
      style={styles.child}
      key={item.id}
      onPress={() => this.onItemPressed(item)}>
      <RkText style={styles.icon} rkType='primary moon xxlarge'>
        Hi
      </RkText>
      <RkText rkType='small'>{item.title}</RkText>
    </RkButton>
  );

  onItemPressed = (item) => {
    // this.props.navigation.navigate(item.id);
  };

  render() {
    const items = this.state.dimensions === undefined ? <View /> : this.renderItems();
    return (
      <ScrollView
        style={styles.root}
        onLayout={this.onContainerLayout}
        contentContainerStyle={styles.rootContainer}>
        {items}
      </ScrollView>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  child: {
    width: '33%',
    aspectRatio: 1,
  },
  icon: {
    marginBottom: 16,
  },
}));
