import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    /******** application states *********/
    const [orders, setOrders] = useState([])
    /*************************************/
    /** fetch all the orders **/
    useEffect(() => {
        axios.get('/api/orders').then(res => {
            setOrders(res.data)
        })
    }, [])
    return (
        <Layout>
            <h1>Orders</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Paid</th>
                        <th>Recipient</th>
                        <th>Product</th>
                    </tr>
                </thead>
                {/* map through each order */}
                <tbody>
                    {
                        orders.length > 0 && orders.map((order) => (
                            // create a new row for every item in an array of objects
                            <tr key={order._id}>
                                <td>
                                    {
                                        new Date(order.createdAt).toLocaleString()
                                    }
                                </td>
                                <td className={order.isPaid ? 'text-green-600' : 'text-red-600'}>{order.isPaid ? 'Yes' : 'No'}</td>
                                <td>
                                    {order.name} {order.email}<br />
                                    {order.city} {order.postalCode} {order.streetAddress} <br />
                                    {order.province} {order.country}
                                </td>
                                {
                                    order.line_items.map((l, index) => (
                                        <td key={index}>{l.price_data.product_data.name} X{l.quantity}</td>
                                    ))

                                }

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Layout >
    )
}

