import { OrderInfo } from "../apis/orders.api";
import { UserInfo } from "../apis/users.api";

export const filterUsersByKey = (
  users: UserInfo[], 
  key: keyof UserInfo, 
  value: UserInfo[keyof UserInfo], 
  fuzzySearch?: boolean
): UserInfo[] => {

  return users.filter(user => {
    const userValue = user[key];

    if (fuzzySearch && typeof userValue === 'string' && typeof value === 'string') {
      return userValue.toLowerCase().includes(value.toLowerCase());
    } else {
      return userValue === value;
    }
  });
};

export const filterOrdersByKey = (
  orders: OrderInfo[] | undefined, 
  key: keyof OrderInfo, 
  value?: OrderInfo[keyof OrderInfo], 
  fuzzySearch?: boolean
): OrderInfo[] => {

  return orders ? orders.filter(order => {
    const orderValue = order[key];

    if (fuzzySearch && typeof orderValue === 'string' && typeof value === 'string') {
      return orderValue.toLowerCase().includes(value.toLowerCase());
    } else {
      return orderValue === value;
    }
  }) : [];
};