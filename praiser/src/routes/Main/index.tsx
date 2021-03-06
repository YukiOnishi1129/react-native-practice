import React from 'react';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
  INITIAL,
  LOADING,
  HOME,
  CHOOSE_LOGIN,
  STATISTICS,
  USER_INFO,
  INPUT,
  SIGN_IN,
  SIGN_UP,
} from '../../constants/path';
import { Initial, Loading, ChooseLogin, Input, SignIn, SignUp } from '../../components/pages';
import Home from './Home';
import Statistics from './Statistics';
import UserInfo from './UserInfo';
import * as UiContext from '../../contexts/ui';
import { COLOR } from '../../constants/theme';
import { headerStyle, headerTintColor } from '../Header';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const ChooseLoginStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeDrawer = createDrawerNavigator();
const StatisticsDrawer = createDrawerNavigator();

const cardStyle = {
  backgroundColor: COLOR.MAIN,
};

const drawerStyle = {
  backgroundColor: COLOR.MAIN,
};

const drawerContentOptions = {
  activeTintColor: COLOR.PRIMARY,
  inactiveTintColor: COLOR.WHITE,
};

/**
 * cardStyleInterpolatorに与える関数
 * @param param0
 */
const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress, // アニメーションをつける
  },
});

/**
 * Home画面のDrawerルーティング
 */
const HomeWithDrawer = () => {
  return (
    <HomeDrawer.Navigator initialRouteName={HOME} drawerStyle={drawerStyle} drawerContentOptions={drawerContentOptions}>
      <HomeDrawer.Screen name={HOME} component={Home} />
      <HomeDrawer.Screen name={USER_INFO} component={UserInfo} />
    </HomeDrawer.Navigator>
  );
};

/**
 * Statistics画面のDrawerルーティング
 */
const StatisticsWithDrawer = () => {
  return (
    <StatisticsDrawer.Navigator
      initialRouteName={STATISTICS}
      drawerStyle={drawerStyle}
      drawerContentOptions={drawerContentOptions}
    >
      <StatisticsDrawer.Screen name={STATISTICS} component={Statistics} />
      <HomeDrawer.Screen name={USER_INFO} component={UserInfo} />
    </StatisticsDrawer.Navigator>
  );
};

/**
 * 画面名を取得する関数
 * NOTE: props.route.stateは非推奨なため、getFocusedRouteNameFromRouteを使う
 * @param state
 */
// const getActiveRouteName = (state: any): string => {
//   if (!state || !state.routes) {
//     return '';
//   }
//   const route = state.routes[state.index];
//   if (route.state) {
//     return getActiveRouteName(route.state);
//   }
//   return route.name;
// };

/**
 * タブルーティング
 */
const TabRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME}
      tabBarOptions={{
        inactiveTintColor: COLOR.WHITE,
        activeTintColor: COLOR.PRIMARY,
        style: {
          backgroundColor: COLOR.MAIN,
        },
      }}
      screenOptions={(props: any) => {
        const routeName = getFocusedRouteNameFromRoute(props.route);
        return {
          // Tabの表示・非表示を制御
          tabBarVisible: routeName !== USER_INFO,
        };
      }}
    >
      <Tab.Screen name={HOME} component={HomeWithDrawer} />
      <Tab.Screen name={STATISTICS} component={StatisticsWithDrawer} />
    </Tab.Navigator>
  );
};

/**
 * モーダルタブのルーティング
 */
const TabWithModalRoutes = () => {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none" screenOptions={{ cardStyle }}>
      <Stack.Screen name={HOME} component={TabRoutes} />
      <Stack.Screen name={INPUT} component={Input} />
    </ModalStack.Navigator>
  );
};

/**
 * ログイン、会員登録ページのルーティング
 */
const ChooseLoginNavigator = () => {
  return (
    <ChooseLoginStack.Navigator
      initialRouteName={CHOOSE_LOGIN}
      screenOptions={{ cardStyle, headerStyle, headerTintColor }}
    >
      <ChooseLoginStack.Screen name={CHOOSE_LOGIN} component={ChooseLogin} />
      <ChooseLoginStack.Screen name={SIGN_IN} component={SignIn} />
      <ChooseLoginStack.Screen name={SIGN_UP} component={SignUp} />
    </ChooseLoginStack.Navigator>
  );
};

/**
 * ルーティング判別関数
 * @param status
 */
const switchingAuthStatus = (status: UiContext.Status) => {
  switch (status) {
    case UiContext.Status.UN_AUTHORIZED:
      return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLoginNavigator} />;
    case UiContext.Status.AUTHORIZED:
      return <Stack.Screen name={HOME} component={TabWithModalRoutes} />;
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
