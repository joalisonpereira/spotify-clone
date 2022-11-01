import React, { Fragment } from 'react';
import Slider from 'rc-slider';
import Sound from 'react-sound';
import { connect } from 'react-redux';
import { Creators as PlayerActions } from '../../store/ducks/player';

import {
  Container,
  Current,
  Volume,
  Progress,
  Controls,
  sliderMusicStyle,
  sliderVolumeStyle,
  Time,
  ProgressSlider
} from './styles';

import VolumeIcon from '../../assets/images/volume.svg';
import ShuffleIcon from '../../assets/images/shuffle.svg';
import BackwardIcon from '../../assets/images/backward.svg';
import PlayIcon from '../../assets/images/play.svg';
import PauseIcon from '../../assets/images/pause.svg';
import ForwardIcon from '../../assets/images/forward.svg';
import RepeatIcon from '../../assets/images/repeat.svg';

function Player({
  player,
  play,
  pause,
  next,
  prev,
  playing,
  position,
  duration,
  handlePosition,
  setPosition,
  positionShown,
  progress,
  setVolume
}) {
  return (
    <Container>
      {
        player.currentSong &&
        <Sound
          url={player.currentSong.file}
          playStatus={player.status}
          onPlaying={playing}
          onFinishedPlaying={next}
          position={player.position}
          volume={player.volume}
        />
      }
      <Current>
        {
          !!player.currentSong &&
          <Fragment>
            <img
              src={player.currentSong.thumbnail}
              alt={player.currentSong.title}
            />
            <div>
              <span>{player.currentSong.title}</span>
              <small>{player.currentSong.author}</small>
            </div>
          </Fragment>
        }
      </Current>
      <Progress>
        <Controls>
          <button>
            <img src={ShuffleIcon} alt="Shuffle" />
          </button>
          <button onClick={prev}>
            <img src={BackwardIcon} alt="Backward" />
          </button>
          {
            !!player.currentSong && player.status === Sound.status.PLAYING ?
              <button onClick={pause}>
                <img src={PauseIcon} alt="Pause" />
              </button>
              :
              <button onClick={play}>
                <img src={PlayIcon} alt="Play" />
              </button>
          }
          <button onClick={next}>
            <img src={ForwardIcon} alt="Forward" />
          </button>
          <button>
            <img src={RepeatIcon} alt="Repeat" />
          </button>
        </Controls>
        <Time>
          <span>{positionShown ? positionShown : position}</span>
          <ProgressSlider>
            <Slider
              {...sliderMusicStyle}
              onChange={value => handlePosition(value / 1000)}
              onAfterChange={value => setPosition(value / 1000)}
              max={1000}
              value={progress}
            />
          </ProgressSlider>
          <span>{duration}</span>
        </Time>
      </Progress>
      <Volume>
        <img src={VolumeIcon} alt="Volume icon" />
        <Slider
          {...sliderVolumeStyle}
          onChange={setVolume}
          value={player.volume}
        />
      </Volume>
    </Container>
  );
}

const msToTime = duration => {
  if (!duration) return;
  let seconds = parseInt((duration / 1000) % 60, 10);
  let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

const mapStateToProps = state => ({
  player: state.player,
  position: msToTime(state.player.position),
  duration: msToTime(state.player.duration),
  positionShown: msToTime(state.player.positionShown),
  progress: parseInt(
    (state.player.positionShown || state.player.position) * (1000 / state.player.duration), 10) || 0
});

const mapDispatchToProps = PlayerActions;

export default connect(mapStateToProps, mapDispatchToProps)(Player)