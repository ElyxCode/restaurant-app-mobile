import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import {MenuScreen} from '../screens/MenuScreen';
import {NewOrdenScreen} from '../screens/NewOrdenScreen';
import {SaucerDetailsScreen} from '../screens/SaucerDetailsScreen';
import {FormSaucerScreen} from '../screens/FormSaucerScreen';
import {SummaryOrderScreen} from '../screens/SummaryOrderScreen';
import {OrderProgressScreen} from '../screens/OrderProgressScreen';

// Components
import {ButtonSummary} from '../components/ButtonSummary';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFDA00',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#000',
      }}
      initialRouteName="NewOrdenScreen">
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{title: 'Menu', headerRight: props => <ButtonSummary />}}
      />

      <Stack.Screen
        name="NewOrdenScreen"
        component={NewOrdenScreen}
        options={{title: 'New Orden'}}
      />

      <Stack.Screen
        name="SaucerDetailsScreen"
        component={SaucerDetailsScreen}
        options={{title: 'Saucer Details'}}
      />

      <Stack.Screen
        name="FormSaucerScreen"
        component={FormSaucerScreen}
        options={{title: 'Saurcer Order'}}
      />

      <Stack.Screen
        name="SummaryOrderScreen"
        component={SummaryOrderScreen}
        options={{title: 'Summary Order'}}
      />

      <Stack.Screen
        name="OrderProgressScreen"
        component={OrderProgressScreen}
        options={{title: 'Progress Order'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
