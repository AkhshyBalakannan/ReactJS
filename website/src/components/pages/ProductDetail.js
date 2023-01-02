import { useParams } from "react-router-dom";

const ProductDetail = () => {
    let { id } = useParams();

    return (
        <>Hello I am Product Detail Page for {id}</>
    )
}

export default ProductDetail;
