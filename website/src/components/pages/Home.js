import ProductList from './ProductList'
import useFetch from "../../utils/useFetch";

const Home = () => {
  // const { error, isPending, data: products } = useFetch('http://localhost:8000/products/')
  const product = [
    {
        "id": 1,
        "created": "2023-01-02T13:05:39.106097+05:30",
        "name": "watch",
        "price": 10,
        "in_stock": true
    },
    {
        "id": 2,
        "created": "2023-01-02T13:05:47.132114+05:30",
        "name": "bag",
        "price": 5,
        "in_stock": true
    },
    {
        "id": 3,
        "created": "2023-01-02T14:59:22.785217+05:30",
        "name": "laptop",
        "price": 1000,
        "in_stock": false
    }
]
  return (
    <div className="home">
      {/* { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> } */}
      { product && <ProductList products={product} /> }
    </div>
  );
}
 
export default Home;
