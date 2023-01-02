import Card from '../common/Card'

const ProductList = ({products}) => {

    return (
        <div className='list-product'>
            { products.map(element => (
                <Card product={element} key={element.id} />
            ))
            }
        </div>
    );
}

export default ProductList;







