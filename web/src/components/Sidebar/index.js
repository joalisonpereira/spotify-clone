import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Creators as PlaylistsActions } from '../../store/ducks/playlists';

import Loading from '../../components/Loading';
import { Container, NewPlaylist, Nav } from './styles';
import newPlaylist from '../../assets/images/add_playlist.svg';

function Sidebar(props) {

  useEffect(() => {
    props.getPlaylists();
  }, [])

  return (
    <Container>
      <div>
        <Nav main>
          <li>
            <Link to="/">Navegar</Link>
          </li>
          <li>
            <a href="#">Radio</a>
          </li>
        </Nav>
        <Nav>
          <li>
            <span>SUA BIBLIOTECA</span>
          </li>
          <li>
            <a href="#">Seu Daily Mix</a>
          </li>
          <li>
            <a href="#">Músicas</a>
          </li>
          <li>
            <a href="#">Álbuns</a>
          </li>
          <li>
            <a href="#">Artistas</a>
          </li>
          <li>
            <a href="#">Estações</a>
          </li>
          <li>
            <a href="#">Arquivos locais</a>
          </li>
          <li>
            <a href="#">Vídeos</a>
          </li>
          <li>
            <a href="#">Podcasts</a>
          </li>
        </Nav>
        <Nav>
          <li>
            <span>Platlists</span>
            {props.playlists.loading && <Loading />}
          </li>
          {
            props.playlists.data.map(playlist =>
              <li key={playlist.id}>
                <Link to={`/playlists/${playlist.id}`}>
                  {playlist.title}
                </Link>
              </li>
            )
          }
        </Nav>
      </div>
      <NewPlaylist>
        <img src={newPlaylist} alt="New playlist" />
        Nova playlist
      </NewPlaylist>
    </Container>
  );
}

const mapStateToProps = state => ({
  playlists: state.playlists
});

const mapDispatchToProps = PlaylistsActions

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)