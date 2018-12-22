import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { AppLoading, Font } from 'expo';
import { RkTheme, RkStyleSheet, RkButton, RkText } from 'react-native-ui-kitten';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import { FontAwesome} from './app/assets/icons.js';
import { DarkKittenTheme } from './app/config/darkTheme.js';
import { bootstrap } from './app/config/bootstrap.js';
import IndexView from './app/screens/index.js';
import SettingsView from './app/screens/settings.js';
import Header from './app/components/header.js';
import 'react-native-gesture-handler'; 

bootstrap();

export default class App extends React.Component {
  state = {
    isLoaded: false,
  }

  constructor(props) {
    super(props);

    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(DarkKittenTheme.colors.screen.base);
    }
    RkTheme.setTheme(DarkKittenTheme);

    this.loadAssets();
  } 
  
  loadAssets = async () => {
    await Font.loadAsync({
      fontawesome: require('./app/assets/fonts/fontawesome.ttf'),
      icomoon: require('./app/assets/fonts/icomoon.ttf'),
      'Righteous-Regular': require('./app/assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./app/assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./app/assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./app/assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./app/assets/fonts/Roboto-Light.ttf'),
    });
    this.setState({ isLoaded: true });
  };

  renderLoading() {
    return (
      <AppLoading />
    );
  }

  renderApp() {
    const DrawerNavigator = createDrawerNavigator(
      {
        Home: IndexView,
        Settings: SettingsView,
      },
      {
        drawerBackgroundColor: DarkKittenTheme.colors.screen.base,
        contentOptions: {
          inactiveTintColor: 'white',
        },
      }
    );

    const StackNavigator = createStackNavigator(
      {
        Main: {
          screen: DrawerNavigator,
          navigationOptions: ({ navigation }) => ({
            header: (props) => <Header navigation={navigation} headerProps={props} />,
          }),
        }
      }
    );

    const AppContainer = createAppContainer(StackNavigator);

    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    )
  }

  render = () => (this.state.isLoaded ? this.renderApp() : this.renderLoading());
}

const styles = RkStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: theme.colors.screen.base,
  },
}));
