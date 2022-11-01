import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Creators as PlaylistActions } from '../../store/ducks/playlist';
import { Creators as PlayerActions } from '../../store/ducks/player';

import Loading from '../../components/Loading';
import { Container, Header, SongList, SongItem } from './styles';
import ClockIcon from '../../assets/images/clock.svg';
import PlusIcon from '../../assets/images/plus.svg';

function Playlist(props) {

  const [selectedSong, setSong] = useState(null);

  const { id } = props.match.params;
  const { data, loading } = props.playlist;

  useEffect(() => {
    props.getPlaylist(id);
  }, [id]);

  return (
    <Container loading={loading}>
      {
        loading ?
          <Loading />
          :
          <Fragment>
            <Header>
              <img
                src={data.thumbnail}
                alt={data.title}
              />
              <div>
                <span>Playlist</span>
                <h1>{data.title}</h1>
                {data.songs && <p>{data.songs.length} músicas</p>}
                <button>Play</button>
              </div>
            </Header>
            <SongList cellPadding={0} cellSpacing={0}>
              <thead>
                <tr>
                  <th />
                  <th>Título</th>
                  <th>Artista</th>
                  <th>Álbum</th>
                  <th><img src={ClockIcon} alt="Duration" /></th>
                </tr>
              </thead>
              <tbody>
                {
                  !data.songs ?
                    <tr>
                      <td colSpan={5}>Nenhuma música cadastrada</td>
                    </tr>
                    :
                    data.songs.map(song =>
                      <SongItem
                        key={song.id}
                        selected={selectedSong === song.id}
                        playing={props.currentSong && props.currentSong.id === song.id}
                        onClick={() => setSong(song.id)}
                        onDoubleClick={() => props.loadSong(song, data.songs)}>
                        <td><img src={PlusIcon} alt="Add" /></td>
                        <td>{song.title}</td>
                        <td>{song.author}</td>
                        <td>{song.album}</td>
                        <td>3:26</td>
                      </SongItem>
                    )
                }
              </tbody>
            </SongList>
          </Fragment>
      }
    </Container>
  );
}

const mapStateToProps = state => ({
  playlist: state.playlist,
  currentSong: state.player.currentSong
});

const mapDispatchToProps = {
  ...PlaylistActions,
  ...PlayerActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)