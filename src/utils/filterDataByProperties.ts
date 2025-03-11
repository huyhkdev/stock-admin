import { OrderInfo, OrderMatch } from "../apis/orders.api";
import { UserInfo } from "../apis/users.api";
import { formatIdOrder } from "./formatIdOrder";

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
    if (!order) return false;

    if (key === "id" && value) {
      const formattedId = formatIdOrder(order.id, "o");
      if (fuzzySearch && typeof value === "string") {
        return formattedId.toLowerCase().includes(value.toLowerCase());
      }
      return formattedId === value;
    }
    
    const orderValue = order[key];

    if (fuzzySearch && typeof orderValue === 'string' && typeof value === 'string') {
      return orderValue.toLowerCase().includes(value.toLowerCase());
    } else {
      return orderValue === value;
    }
  }) : [];
};

export const filterOrdersMatchByKey = (
  orders: OrderMatch[] | undefined, 
  key: keyof OrderMatch, 
  value?: OrderMatch[keyof OrderMatch], 
  fuzzySearch?: boolean
): OrderMatch[] => {

  return orders ? orders.filter(order => {
    
    if (key === "id" && value) {
      const formattedId = formatIdOrder(order.id, "m");
      if (fuzzySearch && typeof value === "string") {
        return formattedId.toLowerCase().includes(value.toLowerCase());
      }
      return formattedId === value;
    }

    const orderValue = order[key];

    if (fuzzySearch && typeof orderValue === 'string' && typeof value === 'string') {
      return orderValue.toLowerCase().includes(value.toLowerCase());
    } else {
      return orderValue === value;
    }
  }) : [];
};