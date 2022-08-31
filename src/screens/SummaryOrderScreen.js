import React, {useEffect, useContext} from 'react';
import {View, Alert, FlatList, TouchableOpacity, Image} from 'react-native';
import {Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import firebase from '../firebase';

import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/globalStyles';

export const SummaryOrderScreen = () => {
  // Order context
  const {order, total, showSummary, deleteProduct, orderDone} =
    useContext(OrderContext);

  // Navigation hook
  const navigation = useNavigation();

  useEffect(() => {
    console.log(order);
    calculateTotal();
  }, [order]);

  // calculate total
  const calculateTotal = () => {
    let newTotalOrder = 0;
    newTotalOrder = order.reduce(
      (newTotalOrder, product) => newTotalOrder + product.totalAmount,
      0,
    );

    showSummary(newTotalOrder);
  };

  // navigate to progress ordern screen
  const progressOrder = () => {
    Alert.alert(
      'Restaurant App',
      'Once you place your order you cannot change it',
      [
        {
          text: 'Confirm',
          onPress: async () => {
            // create order object to send firebase
            const orderObj = {
              timeDelivery: 0,
              complete: false,
              total: Number(total),
              order,
              createAt: Date.now(),
            };

            // write the order in firebase
            try {
              const order = await firebase.db
                .collection('orders')
                .add(orderObj);
              orderDone(order.id);

              // navigate to orderProgress
              navigation.navigate('OrderProgressScreen');
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: 'Check',
          style: 'cancel',
        },
      ],
    );
  };

  // Delete product from order
  const confirmDelete = id => {
    Alert.alert('Restaurant App', 'Do you want to delete this article?', [
      {
        text: 'Confirm',
        onPress: () => {
          // Delete from state
          deleteProduct(id);
        },
      },
      {
        text: 'Check',
        style: 'cancel',
      },
    ]);
  };

  const orderListItemRender = ({item}) => {
    const {amount, name, image, id, price} = item;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Image style={{width: 75, height: 75}} source={{uri: image}} />
        <View
          style={{
            marginLeft: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#D3D3D3',
            width: '100%',
            paddingBottom: 5,
            flexShrink: 1,
          }}>
          <Text>{name}</Text>
          <Text>Amount: {amount}</Text>
          <Text>Price: ${price}</Text>
          <Button
            style={{backgroundColor: '#F00'}}
            onPress={() => confirmDelete(id)}>
            <Text style={{...globalStyles.buttonText, color: '#FFF'}}>
              Delete
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={{...globalStyles.content, flex: 0.9}}>
        <Text style={{...globalStyles.title, padding: 10}}>Summary Order</Text>
        <FlatList
          data={order}
          keyExtractor={(item, index) => item.id + index}
          renderItem={orderListItemRender}
        />
        <View>
          <Text style={{...globalStyles.amount, padding: 5}}>
            Total to pay: ${total}
          </Text>
          <Button
            style={{
              marginHorizontal: 20,
              backgroundColor: '#000',
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate('MenuScreen')}>
            <Text style={{...globalStyles.buttonText, color: '#FFF'}}>
              continue ordering
            </Text>
          </Button>
        </View>
      </View>

      <TouchableOpacity
        style={{
          flex: 0.1,
          backgroundColor: '#FFDA00',
          justifyContent: 'center',
        }}
        activeOpacity={0.7}
        onPress={() => progressOrder()}>
        <View style={globalStyles.footerButton}>
          <Text style={globalStyles.buttonText}>Go to Order</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
