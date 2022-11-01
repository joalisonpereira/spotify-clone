import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, PodcastList, PageTitle, Podcast, Cover, Info, Title, Count } from './styles';
import { Creators as PodcastsActions } from '../../store/ducks/podcasts';

function Main(props) {

  useEffect(() => {
    props.fetchPodcasts()
  }, []);

  function handlePodcastPress(podcast) {
    props.navigation.navigate('Podcast', { podcast });
  }

  return (
    <Container>
      <PodcastList
        ListHeaderComponent={() => <PageTitle>Podcasts</PageTitle>}
        data={props.podcasts.data}
        keyExtractor={podcast => String(podcast.id)}
        renderItem={({ item: podcast }) =>
          <Podcast onPress={() => handlePodcastPress(podcast)}>
            <Cover source={{ uri: podcast.cover }} />
            <Info>
              <Title>{podcast.title}</Title>
              <Count>{`${podcast.tracks.length} episódios`}</Count>
            </Info>
          </Podcast>
        }
      />
    </Container>
  );
}

const mapStateToProps = state => ({
  podcasts: state.podcasts
});

const mapDispatchToProps = {
  ...PodcastsActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);