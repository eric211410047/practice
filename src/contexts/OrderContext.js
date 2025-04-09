import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

const ORDER_STORAGE_KEY = 'healthcare_shop_orders';

const orderReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_ORDER':
      newState = {
        ...state,
        orders: [action.payload, ...state.orders],
      };
      break;

    case 'UPDATE_ORDER_STATUS':
      newState = {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? {
                ...order,
                status: action.payload.status,
                statusHistory: [
                  {
                    status: action.payload.status,
                    date: new Date().toISOString(),
                    note: action.payload.note || '',
                  },
                  ...(order.statusHistory || []),
                ],
              }
            : order
        ),
      };
      break;

    case 'LOAD_ORDERS':
      newState = {
        ...state,
        orders: action.payload,
      };
      break;

    default:
      return state;
  }

  // 保存到 localStorage
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(newState.orders));
  return newState;
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { orders: [] });
  const { user } = useAuth();

  // 初始化時從 localStorage 加載訂單數據
  useEffect(() => {
    const savedOrders = localStorage.getItem(ORDER_STORAGE_KEY);
    if (savedOrders) {
      dispatch({ type: 'LOAD_ORDERS', payload: JSON.parse(savedOrders) });
    }
  }, []);

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      userId: user?.id,
      date: new Date().toISOString(),
      status: '待處理',
      statusHistory: [
        {
          status: '待處理',
          date: new Date().toISOString(),
          note: '訂單已建立',
        },
      ],
      ...orderData,
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    return newOrder;
  };

  const updateOrderStatus = (orderId, status, note = '') => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId, status, note },
    });
  };

  const getUserOrders = () => {
    return state.orders.filter(order => order.userId === user?.id);
  };

  const getOrderById = (orderId) => {
    return state.orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        createOrder,
        updateOrderStatus,
        getUserOrders,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}; 