import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DETAIL, HOME } from '../../constants/path';
import { Detail, Home } from '../../components/pages';

const Stack = createStackNavigator();

const StatisticsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={HOME}>
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={DETAIL} component={Detail} />
    </Stack.Navigator>
  );
};

export default StatisticsNavigator;
