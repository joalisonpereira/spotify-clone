import { takeLatest, put, call, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { Types as PodcastTypes } from '../ducks/podcasts';
import { Types as PlayerTypes, Creators as PlayerActions } from '../ducks/player';
import TrackPlayer from 'react-native-track-player';

function* trackChanged() {
  const channel = eventChannel(emitter => {
    const onTrackChange = TrackPlayer.addEventListener('playback-track-changed', emitter);
    return () => onTrackChange.remove()
  });

  try {
    while (true) {
      const { nextTrack } = yield take(channel)
      yield put(PlayerActions.setCurrent(nextTrack))
    }
  } finally {
    channel.close()
  }
}

function* init() {
  yield call(TrackPlayer.setupPlayer)

  TrackPlayer.updateOptions({
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
    notificationCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE
    ]
  })
}

function* setPodcast({ podcast, episodeId }) {
  try {
    const currentPodcast = yield select(state => state.player.podcast);

    if (!currentPodcast || episodeId !== currentPodcast.id) {
      yield call(TrackPlayer.stop);
      yield call(TrackPlayer.reset);
      yield call(TrackPlayer.add, [...podcast.tracks]);
      yield put(PlayerActions.setPodcastSuccess(podcast));
    }

    if (episodeId) {
      yield call(TrackPlayer.skip, episodeId);
      yield put(PlayerActions.setCurrent(episodeId));
    }

    yield put(PlayerActions.play());
    yield call(trackChanged)
  } catch (error) {
    console.tron.log("Error setPodcast");
  }
}

function* play() {
  yield call(TrackPlayer.play);
}

function* pause() {
  yield call(TrackPlayer.pause);
}

function* next() {
  const player = yield select(state => state.player);
  const currentIndex = player.podcast.tracks.findIndex(episode => episode.id === player.current)
  if (player.podcast.tracks[currentIndex + 1]) {
    yield call(TrackPlayer.skipToNext);
    yield put(PlayerActions.play());
  }
}

function* prev() {
  const player = yield select(state => state.player);
  const currentIndex = player.podcast.tracks.findIndex(episode => episode.id === player.current)
  if (player.podcast.tracks[currentIndex - 1]) {
    yield call(TrackPlayer.skipToPrevious);
    yield put(PlayerActions.play());
  }
}

function* reset() {
  yield call(TrackPlayer.stop);
  yield call(TrackPlayer.reset);
}

export default [
  takeLatest(PodcastTypes.FETCH_PODCASTS, init),
  takeLatest(PlayerTypes.SET_PODCAST, setPodcast),
  takeLatest(PlayerTypes.PLAY, play),
  takeLatest(PlayerTypes.PAUSE, pause),
  takeLatest(PlayerTypes.NEXT, next),
  takeLatest(PlayerTypes.PREV, prev),
  takeLatest(PlayerTypes.RESET, reset)
]