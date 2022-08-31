import React, {useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import OrderContext from '../context/order/orderContext';
import globalStyles from '../styles/globalStyles';

export const SaucerDetailsScreen = () => {
  // order context
  const {saucer} = useContext(OrderContext);
  const {name, image, description, price} = saucer;

  // navigation hook
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{...globalStyles.container, flex: 0.9}}>
        <View style={globalStyles.content}>
          <Text style={{...globalStyles.title, padding: 10}}>{name}</Text>
          <View style={{...styles.card, marginBottom: 20}}>
            <Image style={globalStyles.imagen} source={{uri: image}} />
            <Text style={{marginTop: 20}}>{description}</Text>
            <Text style={{...globalStyles.amount, padding: 5}}>
              Price: ${price}
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          flex: 0.1,
          backgroundColor: '#FFDA00',
          justifyContent: 'center',
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('FormSaucerScreen')}>
        <View style={globalStyles.footerButton}>
          <Text style={globalStyles.buttonText}>Order Saucer</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    elevation: 1,
    padding: 10,
  },
});
