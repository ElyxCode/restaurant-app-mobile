import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Countdown from 'react-countdown';

import firebase from '../firebase';
import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/globalStyles';

export const OrderProgressScreen = () => {
  const [timeDelivery, setTimeDelivery] = useState(0);
  const [completeOrder, setCompleteOrder] = useState(false);

  // order context
  const {orderId} = useContext(OrderContext);

  // navigation
  const navigation = useNavigation();

  useEffect(() => {
    const getProduct = () => {
      firebase.db
        .collection('orders')
        .doc(orderId)
        .onSnapshot(function (doc) {
          setTimeDelivery(doc.data().timeDelivery);
          setCompleteOrder(doc.data().complete);
        });
    };

    getProduct();
  }, []);

  // show countdown in the screen
  const CountdownRender = ({minutes, seconds}) => {
    return (
      <Text style={styles.time}>
        {minutes}:{seconds}
      </Text>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 50,
        marginHorizontal: '2.5%',
      }}>
      {timeDelivery == 0 && (
        <>
          <Text style={{textAlign: 'center'}}>We have received your order</Text>
          <Text style={{textAlign: 'center'}}>
            We are calculating the delivery time...
          </Text>
        </>
      )}
      {!completeOrder && timeDelivery > 0 && (
        <>
          <Text style={{textAlign: 'center'}}>
            Your order will be ready in:
          </Text>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Countdown
              date={Date.now() + timeDelivery * 60000}
              renderer={CountdownRender}
            />
          </View>
        </>
      )}
      {completeOrder && (
        <>
          <Text
            style={[
              styles.textCompleted,
              {fontWeight: 'bold', padding: 10, fontSize: 20},
            ]}>
            Order Ready!
          </Text>
          <Text style={[styles.textCompleted, {padding: 10, fontSize: 18}]}>
            Please come pick up your order!
          </Text>
          <Button
            style={[globalStyles.button, {marginTop: 100}]}
            borderRadius="full"
            onPress={() => navigation.navigate('NewOrdenScreen')}>
            <Text style={globalStyles.buttonText}>Start a new order!</Text>
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
    padding: 50,
  },
  textCompleted: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});
