import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Browse from '../pages/Browse';
import Playlist from '../pages/Playlist';

export default function Router() {
  return (
    <Switch>
      <Route path="/" component={Browse} exact />
      <Route path="/playlists/:id" component={Playlist} />
    </Switch>
  );
}
