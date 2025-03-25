import moment from "moment";
import { OrderInfo, OrderMatch } from "../apis/orders.api";
import {
  DAILY_DATA,
  WEEKLY_DATA,
  MONTHLY_DATA,
  YEARLY_DATA,
} from "../tabs/management/order/constants";
import { IntervalType } from "../tabs/management/order/type";
import { Contest } from "../apis/contests.api";

export const filterOrdersByInterval = (
  orders: OrderInfo[],
  interval: IntervalType,
  dateFilter: [moment.Moment, moment.Moment] | null
) => {
  
  if (dateFilter && dateFilter[0] && dateFilter[1]) {
    const startDate = dateFilter[0].startOf('day').format("YYYY-MM-DD HH:mm:ss");
    const endDate = dateFilter[1].endOf('day').format("YYYY-MM-DD HH:mm:ss");
    return orders?.filter((order) => {
      const orderDate = moment(order.createdAt);
      return orderDate.isBetween(startDate, endDate, undefined, '[]');
    });
}

  switch (interval) {
    case DAILY_DATA:
      return orders?.filter((order) => {
        if (!order) return false;
        const orderDate = moment(order.createdAt).format("YYYY-MM-DD");
        return orderDate === moment().format("YYYY-MM-DD");
      });
    case WEEKLY_DATA:
      return orders?.filter((order) => {
        if (!order) return false;
        const orderDate = moment(order.createdAt).format("YYYY-WW");
        return orderDate === moment().format("YYYY-WW");
      });
    case MONTHLY_DATA:
      return orders?.filter((order) => {
        if (!order) return false;
        const orderDate = moment(order.createdAt).format("YYYY-MM");
        return orderDate === moment().format("YYYY-MM");
      });
    case YEARLY_DATA:
      return orders?.filter((order) => {
        if (!order) return false;
        const orderDate = moment(order.createdAt).format("YYYY");
        return orderDate === moment().format("YYYY");
      });
    default:
      return orders;
  }
};

export const filterOrdersMatchByInterval = (
  orders: OrderMatch[],
  interval: IntervalType,
  dateFilter: [moment.Moment, moment.Moment] | null
) => {
  
  if (dateFilter && dateFilter[0] && dateFilter[1]) {
    const startDate = dateFilter[0].startOf('day').format("YYYY-MM-DD HH:mm:ss");
    const endDate = dateFilter[1].endOf('day').format("YYYY-MM-DD HH:mm:ss");
    return orders?.filter((order) => {
      const orderDate = moment(order.createdAt);
      return orderDate.isBetween(startDate, endDate, undefined, '[]');
    });
}

  switch (interval) {
    case DAILY_DATA:
      return orders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY-MM-DD");
        return orderDate === moment().format("YYYY-MM-DD");
      });
    case WEEKLY_DATA:
      return orders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY-WW");
        return orderDate === moment().format("YYYY-WW");
      });
    case MONTHLY_DATA:
      return orders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY-MM");
        return orderDate === moment().format("YYYY-MM");
      });
    case YEARLY_DATA:
      return orders?.filter((order) => {
        const orderDate = moment(order.createdAt).format("YYYY");
        return orderDate === moment().format("YYYY");
      });
    default:
      return orders;
  }
};
export const filterContestByInterval = (data: Contest[], activeInterval: string) => {
  const countByInterval: Record<string, number> = {};
  data.forEach((item) => {
      if (!item.startDateTime) return; 
      const dateObj = new Date(item.startDateTime); 
      if (isNaN(dateObj.getTime())) return; 
      let key: string;
      if (activeInterval === MONTHLY_DATA) {
          key = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
      } else if (activeInterval === YEARLY_DATA) {
          key = dateObj.getFullYear().toString(); 
      } else {
          return;
      }
      countByInterval[key] = (countByInterval[key] || 0) + 1;
  });

  return {
      categories: Object.keys(countByInterval),
      data: Object.values(countByInterval),
  };
};
