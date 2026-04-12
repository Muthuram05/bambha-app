import styles from './orders.module.css';

const mockOrders = [
  { id: '#ORD001', customer: 'Revathi K.', items: 'Monkfruit 100gm x2', total: 318, status: 'Delivered', date: '02/01/2026' },
  { id: '#ORD002', customer: 'Anand M.', items: 'Moringa 250gm x1', total: 199, status: 'Processing', date: '03/01/2026' },
  { id: '#ORD003', customer: 'Priya S.', items: 'Monkfruit 500gm x1', total: 499, status: 'Shipped', date: '04/01/2026' },
  { id: '#ORD004', customer: 'Karthik R.', items: 'Monkfruit 250gm x2', total: 498, status: 'Pending', date: '05/01/2026' },
];

const statusColors = {
  Delivered: '#e8f5e9',
  Processing: '#fff8e1',
  Shipped: '#e3f2fd',
  Pending: '#fce4ec',
};

const statusTextColors = {
  Delivered: '#2e7d32',
  Processing: '#f57f17',
  Shipped: '#1565c0',
  Pending: '#c62828',
};

export default function OrdersPage() {
  return (
    <div>
      <h1 className={styles.heading}>Orders</h1>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((o) => (
              <tr key={o.id}>
                <td className={styles.orderId}>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.items}</td>
                <td>Rs. {o.total}</td>
                <td>
                  <span
                    className={styles.status}
                    style={{
                      background: statusColors[o.status],
                      color: statusTextColors[o.status],
                    }}
                  >
                    {o.status}
                  </span>
                </td>
                <td>{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
