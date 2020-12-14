import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DETAIL, STATISTICS } from '../../constants/path';
import { Detail, Statistics } from '../../components/pages';
import { HeaderLeft, headerStyle, headerTintColor } from '../Header';
import { COLOR } from '../../constants/theme';
const cardStyle = {
  backgroundColor: COLOR.MAIN,
};
const Stack = createStackNavigator();

const StatisticsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STATISTICS} screenOptions={{ cardStyle, headerStyle, headerTintColor }}>
      <Stack.Screen
        name={DETAIL}
        component={Detail}
        options={{
          headerLeft: () => <HeaderLeft />,
          title: 'Home',
        }}
      />
      <Stack.Screen
        name={STATISTICS}
        component={Statistics}
        options={{
          title: 'Statistics',
        }}
      />
    </Stack.Navigator>
  );
};

export default StatisticsNavigator;
