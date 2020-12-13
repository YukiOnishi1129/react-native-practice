import React from 'react';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { INITIAL, LOADING, HOME, CHOOSE_LOGIN, STATISTICS, USER_INFO } from '../../constants/path';
import { Initial, Loading, ChooseLogin } from '../../components/pages';
import Home from './Home';
import Statistics from './Statistics';
import UserInfo from './UserInfo';
import * as UiContext from '../../contexts/ui';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeDrawer = createDrawerNavigator();
const StatisticsDrawer = createDrawerNavigator();

/**
 * cardStyleInterpolatorに与える関数
 * @param param0
 */
const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress, // アニメーションをつける
  },
});

const HomeWithDrawer = () => {
  return (
    <HomeDrawer.Navigator>
      <HomeDrawer.Screen name={HOME} component={Home} />
      <HomeDrawer.Screen name={USER_INFO} component={UserInfo} />
    </HomeDrawer.Navigator>
  );
};

const StatisticsWithDrawer = () => {
  return (
    <StatisticsDrawer.Navigator>
      <StatisticsDrawer.Screen name={STATISTICS} component={Statistics} />
      <HomeDrawer.Screen name={USER_INFO} component={UserInfo} />
    </StatisticsDrawer.Navigator>
  );
};

/**
 * タブルーティング
 */
const TabRoutes = () => {
  return (
    <Tab.Navigator initialRouteName={HOME}>
      <Tab.Screen name={HOME} component={HomeWithDrawer} />
      <Tab.Screen name={STATISTICS} component={StatisticsWithDrawer} />
    </Tab.Navigator>
  );
};

/**
 * ルーティング判別関数
 * @param status
 */
const switchingAuthStatus = (status: UiContext.Status) => {
  switch (status) {
    case UiContext.Status.UN_AUTHORIZED:
      return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLogin} />;
    case UiContext.Status.AUTHORIZED:
      return <Stack.Screen name={HOME} component={TabRoutes} />;
    case UiContext.Status.FIRST_OPEN:
    default:
      return <Stack.Screen name={INITIAL} component={Initial} />;
  }
};

/**
 * ルーティング
 */
const AuthWithRoutes = () => {
  const uiContext = React.useContext(UiContext.Context);
  return (
    <Stack.Navigator
      initialRouteName={LOADING} // 初期ルーティング
      headerMode="none"
      screenOptions={{
        // アニメーションを定義
        cardStyleInterpolator: forFade,
      }}
    >
      {uiContext.applicationState !== UiContext.Status.LOADING ? (
        switchingAuthStatus(uiContext.applicationState)
      ) : (
        <Stack.Screen name={LOADING} component={Loading} />
      )}
    </Stack.Navigator>
  );
};

export default AuthWithRoutes;
