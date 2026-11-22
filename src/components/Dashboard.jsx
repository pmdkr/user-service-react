import { useState, useEffect } from "react";
const Dashboard = () => {


    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        try {

            setLoading(true);
            setError("");
            const [userRes, productRes, orderRes] = await Promise.all(
                [
                    fetch("https://dummyjson.com/users"),
                    fetch("https://dummyjson.com/products"),
                    fetch("https://dummyjson.com/carts"),
                ]
            );


            if (!userRes.ok | !productRes.ok | !orderRes.ok) {
                throw new Error("API resopne is failed");
            }

            const [userData, productData, orderData] = await Promise.all([
                userRes.json(),
                productRes.json(),
                orderRes.json(),
            ]);

            console.log(userData);
            console.log(productData.products)

            setUsers(userData.users);
            setProducts(productData.products);
            setOrders(orderData.carts);

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    }




    useEffect(() => {

        fetchData();
    }, []);


    if (loading) return <h2>Loading data</h2>;
    if (error) return <h2>{error}</h2>



    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Products</th>
                        <th>Total</th>

                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.totalProducts}</td>
                            <td>{order.tatal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}


export default Dashboard