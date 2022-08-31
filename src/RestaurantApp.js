import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigator/StackNavigator';

export const RestaurantApp = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
