import moment from "moment";
import { OrderInfo, OrderMatch } from "../apis/orders.api";
import {
  DAILY_DATA,
  WEEKLY_DATA,
  MONTHLY_DATA,
  YEARLY_DATA,
} from "../tabs/management/order/constants";
import { IntervalType } from "../tabs/management/order/type";

export const filterOrdersByInterval = (
  orders: OrderInfo[],
  interval: IntervalType,
  dateFilter: [moment.Moment, moment.Moment] | null
) => {
  let filteredOrders = orders;
  
  if (dateFilter && dateFilter[0] && dateFilter[1]) {
    const startDate = dateFilter[0].startOf('day').format("YYYY-MM-DD HH:mm:ss");
    const endDate = dateFilter[1].endOf('day').format("YYYY-MM-DD HH:mm:ss");
    return filteredOrders?.filter((order) => {
      const orderDate = moment(order.createdAt);
      return orderDate.isBetween(startDate, endDate, undefined, '[]');
    });
}

  switch (interval) {
    case DAILY_DATA:
      return filteredOrders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY-MM-DD");
        return orderDate === moment().format("YYYY-MM-DD");
      });
    case WEEKLY_DATA:
      return filteredOrders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY-WW");
        return orderDate === moment().format("YYYY-WW");
      });
    case MONTHLY_DATA:
      return filteredOrders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY-MM");
        return orderDate === moment().format("YYYY-MM");
      });
    case YEARLY_DATA:
      return filteredOrders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY");
        return orderDate === moment().format("YYYY");
      });
    default:
      return filteredOrders;
  }
};

export const filterOrdersMatchByInterval = (
  orders: OrderMatch[],
  interval: IntervalType,
  dateFilter: [moment.Moment, moment.Moment] | null
) => {
  let filteredOrders = orders;
  
  if (dateFilter && dateFilter[0] && dateFilter[1]) {
    const startDate = dateFilter[0].startOf('day').format("YYYY-MM-DD HH:mm:ss");
    const endDate = dateFilter[1].endOf('day').format("YYYY-MM-DD HH:mm:ss");
    return filteredOrders?.filter((order) => {
      const orderDate = moment(order.createdAt);
      return orderDate.isBetween(startDate, endDate, undefined, '[]');
    });
}

  switch (interval) {
    case DAILY_DATA:
      return filteredOrders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY-MM-DD");
        return orderDate === moment().format("YYYY-MM-DD");
      });
    case WEEKLY_DATA:
      return filteredOrders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY-WW");
        return orderDate === moment().format("YYYY-WW");
      });
    case MONTHLY_DATA:
      return filteredOrders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY-MM");
        return orderDate === moment().format("YYYY-MM");
      });
    case YEARLY_DATA:
      return filteredOrders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY");
        return orderDate === moment().format("YYYY");
      });
    default:
      return filteredOrders;
  }
};
