import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DETAIL, STATISTICS } from '../../constants/path';
import { Detail, Statistics } from '../../components/pages';

const Stack = createStackNavigator();

const StatisticsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STATISTICS}>
      <Stack.Screen name={DETAIL} component={Detail} />
      <Stack.Screen name={STATISTICS} component={Statistics} />
    </Stack.Navigator>
  );
};

export default StatisticsNavigator;
