import { UserOrderGetters } from '@vue-storefront/core';
import type { Order, OrderItem } from '@vue-storefront/prestashop-api';
import { populateOrdersList, populateOrderDetails } from '../helpers';
import { PsProduct } from '@vue-storefront/prestashop-api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getOrdersListFiltered(orders:any) {
  if (!orders || orders.total === 0) {
    return [];
  }
  orders = Array.isArray(orders) ? orders : [orders];
  return populateOrdersList(orders);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getOrderDetailsFiltered(details:any) {
  if (!details) {
    return [];
  }
  return populateOrderDetails(details);
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
  if (order) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    return order.products;
  } else return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(product: PsProduct): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product: PsProduct): string {
  if (product) {
    return product.slug;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: OrderItem): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return item.name;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: OrderItem): number {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return item.quantity;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: OrderItem): number {

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return item.price;
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
  getOrderDetailsFiltered,
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getSlug,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal
};
