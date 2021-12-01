import { UserOrderGetters } from '@vue-storefront/core';
import type { Order, OrderItem } from '@vue-storefront/prestashop-api';
import { populateOrdersList } from '../helpers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getOrdersListFiltered(orders:any) {
  if (!orders) {
    return [];
  }
  orders = Array.isArray(orders) ? orders : [orders];
  return populateOrdersList(orders);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDate(order: Order): string {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return order.date;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(order: Order): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return order.id;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStatus(order: Order): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return order.status;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(order: Order): number | null {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return order.total;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(order: Order): OrderItem[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: OrderItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: OrderItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: OrderItem): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: OrderItem): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line
function getOrdersTotal(orders: any): number {
  return orders ? orders.length : 0;
}

export const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getOrdersListFiltered,
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal
};
