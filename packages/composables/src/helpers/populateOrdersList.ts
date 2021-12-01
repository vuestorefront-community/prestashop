// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateOrdersList = (psOrders: Array<any>) => {
  const populateOrdersList = psOrders.map((order) => ({
    id: order.id_order,
    date: order.date_add,
    status: order.order_state,
    total: order.total_paid
  }));
  return populateOrdersList;
};

export default populateOrdersList;
