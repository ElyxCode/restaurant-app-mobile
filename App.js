import React from 'react';
import 'react-native-gesture-handler';
import {RestaurantApp} from './src/RestaurantApp';
import FirebaseState from './src/context/firebase/firebaseState';
import OrderState from './src/context/order/orderState';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <FirebaseState>
      <OrderState>
        <NativeBaseProvider>
          <RestaurantApp />
        </NativeBaseProvider>
      </OrderState>
    </FirebaseState>
  );
};

export default App;
