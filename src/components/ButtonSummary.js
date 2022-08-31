import React, {useContext} from 'react';
import {Button, Text} from 'native-base';

import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';
import OrderContext from '../context/order/orderContext';

export const ButtonSummary = () => {
  const {order} = useContext(OrderContext);
  const navigation = useNavigation();

  if (order.length === 0) return null;

  return (
    <Button
      style={globalStyles.button}
      onPress={() => navigation.navigate('SummaryOrderScreen')}>
      <Text style={globalStyles.buttonText}>Go to Summary</Text>
    </Button>
  );
};
