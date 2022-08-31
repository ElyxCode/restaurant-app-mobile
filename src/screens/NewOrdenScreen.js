import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';
import globalStyles from '../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';

export const NewOrdenScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.content, styles.content]}>
        <Button
          style={globalStyles.button}
          borderRadius="full"
          onPress={() => navigation.navigate('MenuScreen')}>
          <Text style={globalStyles.buttonText}>Create new orden</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
