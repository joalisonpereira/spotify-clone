import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { Creators as PlayerActions } from '../../store/ducks/player';

import {
  Container, EpisodeList, Episode,
  Title, Author, PodcastDetails,
  Background, Cover, PodcastTitle,
  PlayButton, PlayButtonText, BackButton
} from './styles';

function Podcast(props) {

  function handleBack() {
    props.navigation.navigate('Main')
  }

  function handlePlay(episodeId) {
    const podcast = props.navigation.getParam('podcast');
    props.setPodcast(podcast, episodeId);
  }

  const podcast = props.navigation.getParam('podcast');

  return (
    <Container>
      <EpisodeList
        data={podcast.tracks}
        keyExtractor={episode => String(episode.id)}
        renderItem={({ item: episode }) =>
          <Episode onPress={() => handlePlay(episode.id)}>
            <Title active={props.currentEpisode && props.currentEpisode.id === episode.id}>
              {episode.title}
            </Title>
            <Author>{episode.artist}</Author>
          </Episode>
        }
        ListHeaderComponent={() =>
          <PodcastDetails>
            <Background source={{ uri: podcast.cover }} blurRadius={5} />
            <BackButton onPress={handleBack}>
              <Icon name="arrow-back" size={24} color="#FFF" />
            </BackButton>
            <Cover source={{ uri: podcast.cover }} />

            <PodcastTitle>{podcast.title}</PodcastTitle>
            <PlayButton onPress={() => handlePlay()}>
              <PlayButtonText>Reproduzir</PlayButtonText>
            </PlayButton>
          </PodcastDetails>
        }
      />
    </Container>
  );
}

const mapStateToProps = state => ({
  podcast: state.podcast,
  currentEpisode: state.player.podcast && state.player.podcast.tracks.find(episode => episode.id === state.player.current)
});

const mapDispatchToProps = {
  ...PlayerActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Podcast);