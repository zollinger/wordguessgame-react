import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import WelcomePage from './containers/WelcomePage'
import PlayPage from './containers/PlayPage'
import GameOverPage from './containers/GameOverPage'
import ScoresPage from './containers/ScoresPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomePage} />
    <Route path="/play" component={PlayPage} />
    <Route path="/game-over" component={GameOverPage} />
    <Route path="/scores" component={ScoresPage} />
  </Route>
)
