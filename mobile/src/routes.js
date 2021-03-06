import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: 'DevRadar'
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Perfil no Github'
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#6931ca'
        },
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
        headerTitleAlign: 'center'
      }
    }
  )
);

export default Routes;
