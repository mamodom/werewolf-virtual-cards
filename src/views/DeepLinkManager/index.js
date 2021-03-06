import React, { Component } from 'react';
import { Linking as ExpoLink } from 'expo';
import { connect } from 'react-redux';
import { Linking, Image } from 'react-native';
import propTypes from 'prop-types';
import * as Actions from '../../actions';
import NavigationService from '../../navigation';
import styles from './styles';

class DeepLinkManager extends Component {
  componentDidMount() {
    Linking.addEventListener('url', ({ url }) => this.handleOpenURL(url));
    Linking.getInitialURL().then(this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (url) => {
    const { joinParty } = this.props;
    const partyId = ExpoLink.parse(url).queryParams.id;

    if (partyId) {
      joinParty(partyId);
    } else {
      NavigationService.navigate('Lobby');
    }

    return null;
  };

  render() {
    return <Image style={styles.img} source={require('../../assets/icon.png')} />;
  }
}

DeepLinkManager.propTypes = {
  navigation: propTypes.shape({
    navigate: propTypes.func,
  }).isRequired,
  joinParty: propTypes.func.isRequired,
};

const mapDispatchToProps = { joinParty: Actions.joinParty };

export default connect(
  null,
  mapDispatchToProps
)(DeepLinkManager);
