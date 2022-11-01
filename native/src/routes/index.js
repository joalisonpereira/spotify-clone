import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from '../pages/Main';
import Podcast from '../pages/Podcast';

const Router = createAppContainer(
  createStackNavigator({
    Main,
    Podcast
  },
    {
      headerMode: 'none'
    })
)

export default Router;