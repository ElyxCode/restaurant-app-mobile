import React, {useReducer, useState} from 'react';

import _ from 'lodash';

import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import {GET_PRODUCTS_SUCCESS} from '../../types';

const FirebaseState = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  // Create initial state
  const initialState = {
    menu: [],
  };

  // useReducer with dispatch for run functions
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const getProducts = () => {
    setIsLoading(true);
    // Call products
    firebase.db.settings({experimentalForceLongPolling: true});
    firebase.db
      .collection('products')
      .where('existence', '==', true)
      .onSnapshot(snapshot => handleSnapshot(snapshot));

    function handleSnapshot(snapshot) {
      let saucers = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // sort for category
      saucers = _.sortBy(saucers, 'category');

      // db results
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: saucers,
      });
      setIsLoading(false);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{menu: state.menu, firebase, getProducts, isLoading}}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
