import {
  SELECT_PRODUCT,
  CONFIRM_ORDER_SAUCER,
  SHOW_SUMMARY,
  DELETE_PRODUCT,
  ORDER_DONE,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        saucer: action.payload,
      };
    case CONFIRM_ORDER_SAUCER:
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    case SHOW_SUMMARY:
      return {
        ...state,
        total: action.payload,
      };
    case DELETE_PRODUCT:
      const newOrders = state.order.filter(
        product => product.id !== action.payload,
      );
      return {
        ...state,
        order: newOrders,
      };
    case ORDER_DONE:
      return {
        ...state,
        order: [],
        saucer: null,
        total: 0,
        orderId: action.payload,
      };
    default:
      return state;
  }
};
