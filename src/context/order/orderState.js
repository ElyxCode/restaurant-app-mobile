import React, {useReducer} from 'react';

import OrderReducer from './orderReducer';
import OrderContext from './orderContext';

import {
  SELECT_PRODUCT,
  CONFIRM_ORDER_SAUCER,
  SHOW_SUMMARY,
  DELETE_PRODUCT,
  ORDER_DONE,
} from '../../types';

const OrderState = ({children}) => {
  // Create initial state
  const initialState = {
    order: [],
    saucer: null,
    total: 0,
    orderId: '',
  };

  // useReducer with dispatch for run functions
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Select the product that the user wants to order
  const selectSaucer = saucer => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: saucer,
    });
  };

  // When user confirm a saucer
  const saveOrderUser = saucer => {
    dispatch({
      type: CONFIRM_ORDER_SAUCER,
      payload: saucer,
    });
  };

  // Show total to pay in SummaryOrderScreen
  const showSummary = total => {
    dispatch({
      type: SHOW_SUMMARY,
      payload: total,
    });
  };

  // delete product from order
  const deleteProduct = id => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
  };

  const orderDone = id => {
    dispatch({
      type: ORDER_DONE,
      payload: id,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        order: state.order,
        saucer: state.saucer,
        total: state.total,
        orderId: state.orderId,
        selectSaucer,
        saveOrderUser,
        showSummary,
        deleteProduct,
        orderDone,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
