import React, { Component } from 'react';
import { Linking } from 'react-native';
import Expo from 'expo';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Root } from 'native-base';
import reducer from './src/reducers';
import NavigationService from './src/navigation';

// Views
import Card from './src/views/Card';
import Game from './src/views/Game';
import Home from './src/views/Home';
import Join from './src/views/Join';
import Lobby from './src/views/Lobby';
import Prepare from './src/views/Prepare';

const AppNavigator = createStackNavigator(
  {
    Card,
    Game,
    Home,
    Join,
    Lobby,
    Prepare,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      gesturesEnabled: false,
      headerLeft: null,
    },
  }
);
const AppContainer = createAppContainer(AppNavigator);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default class App extends Component {
  state = {
    fontsLoaded: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    Linking.addEventListener('url', ({ url }) => this.handleOpenURL(url));
    Linking.getInitialURL().then(this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (url) => {
    const partyId = Expo.Linking.parse(url).queryParams.id;

    if (partyId) {
      NavigationService.navigate('Join', { partyId });
    }

    return null;
  };

  render() {
    const { fontsLoaded } = this.state;
    if (!fontsLoaded) return null;
    return (
      <Provider store={store}>
        <Root>
          <AppContainer
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Root>
      </Provider>
    );
  }
}
