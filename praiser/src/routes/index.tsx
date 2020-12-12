import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoute from './Main/';

export default function LoggingRoutes() {
  return (
    <NavigationContainer>
      <MainRoute />
    </NavigationContainer>
  );
}
