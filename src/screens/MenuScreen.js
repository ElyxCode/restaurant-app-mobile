import React, {useEffect, useContext, useState} from 'react';
import {View, FlatList, Image, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'native-base';

import FirebaseContext from '../context/firebase/firebaseContext';
import OrderContext from '../context/order/orderContext';
import ActivityIndicatorApp from '../components/ActivityIndicatorApp';
import globalStyles from '../styles/globalStyles';

export const MenuScreen = () => {
  // context firebase
  const {menu, getProducts, isLoading} = useContext(FirebaseContext);

  // constext order
  const {selectSaucer} = useContext(OrderContext);

  // redirect hook
  const navigation = useNavigation();

  useEffect(() => {
    getProducts();
  }, []);

  const showHeading = (category, index) => {
    if (index > 0) {
      const beforeCategory = menu[index - 1].category;
      if (beforeCategory !== category) {
        return (
          <View style={styles.separator}>
            <Text style={styles.separatorText}>{category}</Text>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.separator}>
          <Text style={styles.separatorText}>{category}</Text>
        </View>
      );
    }
  };

  const ListItemRender = ({item, index}) => {
    const {name, category, description, existence, image, price, id} = item;

    return (
      <Pressable
        onPress={() => {
          const {existence, ...saucerObjWithoutExistence} = item;
          selectSaucer(saucerObjWithoutExistence);
          navigation.navigate('SaucerDetailsScreen');
        }}>
        {showHeading(category, index)}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#D8D8D8',
          }}>
          <Image source={{uri: image}} style={{width: 50, height: 50}} />
          <View
            style={{
              marginLeft: 5,

              flexShrink: 1,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
              }}>
              {name}
            </Text>
            <Text note numberOfLines={2}>
              {description}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Price: ${price}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{...globalStyles.container, backgroundColor: '#FFF'}}>
      {isLoading ? (
        <ActivityIndicatorApp />
      ) : (
        <View style={{backgroundColor: '#FFF'}}>
          <FlatList
            data={menu}
            keyExtractor={item => item.id}
            renderItem={ListItemRender}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#000',
    padding: 10,
  },
  separatorText: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
