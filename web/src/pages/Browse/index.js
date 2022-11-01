import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';

import Loading from '../../components/Loading';
import { Container, Title, List, Playlist } from './styles';

function Browse(props) {

  useEffect(() => {
    props.getPlaylists();
  }, [])

  return (
    <Container>
      <Title>
        Navegar
        {props.playlists.loading && <Loading />}
      </Title>
      <List>
        {
          props.playlists.data.map(playlist =>
            <Playlist key={playlist.id} to={`playlists/${playlist.id}`}>
              <img src={playlist.thumbnail} alt={playlist.title} />
              <strong>{playlist.title}</strong>
              <p>{playlist.description}</p>
            </Playlist>
          )
        }
      </List>
    </Container>
  );
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

const mapDispatchToProps = PlaylistsActions

export default connect(mapStateToProps, mapDispatchToProps)(Browse)