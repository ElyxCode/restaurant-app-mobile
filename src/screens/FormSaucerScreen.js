import React, {useState, useContext, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {HStack, Text, VStack, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/globalStyles';

export const FormSaucerScreen = () => {
  // State for amount
  const [amount, setAmount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  // order context
  const {saucer, saveOrderUser} = useContext(OrderContext);
  const {price} = saucer;

  // navigation
  const navigation = useNavigation();

  // calculate pay amount
  useEffect(() => {
    calculateTotalSaucer();
  }, [amount]);

  // calculate total saucer for your amount
  const calculateTotalSaucer = () => {
    const totalPay = price * amount;
    setTotalAmount(totalPay);
  };

  const calculateAmount = amount => {
    if (amount.includes('-') || amount.includes('.') || amount === '0') return;
    setAmount(amount);
  };

  const addAmount = () => {
    if (amount === '') {
      return setAmount(1);
    }
    const value = parseInt(amount);
    setAmount(value + 1);
  };
  const substractAmount = () => {
    const value = parseInt(amount);
    if (value <= 1) return;
    setAmount(value - 1);
  };

  const confirmOrder = () => {
    Alert.alert(
      'Restaurant App',
      'Do you want to confirm your order?\nA confirmed order can no longer be modified',
      [
        {
          text: 'Confirm',
          onPress: () => {
            // Save order to main order.
            const saucerOrder = {
              ...saucer,
              amount,
              totalAmount,
            };

            saveOrderUser(saucerOrder);

            // Navegate to summary
            navigation.navigate('SummaryOrderScreen');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={{flex: 0.9}}>
        <View>
          <Text style={{...globalStyles.title, padding: 10}}>Amount</Text>
          <HStack justifyContent="space-between">
            <VStack>
              <Button
                style={{
                  height: 80,
                  width: 100,
                  justifyContent: 'center',
                  backgroundColor: '#000',
                }}
                onPress={() => substractAmount()}>
                <Icon name="remove-outline" size={30} color="#FFF" />
              </Button>
            </VStack>
            <VStack
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
              }}>
              <TextInput
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                }}
                value={amount.toString()}
                onChangeText={amount => calculateAmount(amount)}
                keyboardType="numeric"
              />
            </VStack>
            <VStack>
              <Button
                style={{
                  height: 80,
                  width: 100,
                  justifyContent: 'center',
                  backgroundColor: '#000',
                }}
                onPress={() => addAmount()}>
                <Icon name="add-outline" size={30} color="#FFF" />
              </Button>
            </VStack>
          </HStack>
          <Text style={{...globalStyles.amount, padding: 10}}>
            Subtotal ${totalAmount}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flex: 0.1,
          backgroundColor: '#FFDA00',
          justifyContent: 'center',
        }}
        activeOpacity={0.7}
        onPress={() => confirmOrder()}>
        <View style={globalStyles.footerButton}>
          <Text style={globalStyles.buttonText}>Add to Order</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
