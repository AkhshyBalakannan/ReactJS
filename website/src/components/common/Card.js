const Card = ({product}) => {
    let href = '/product/' + product.id
    return (
        <div className='product-card'>
            <h3>{product.title}</h3>
            <p>Price: {product.price}</p>
            {product.in_stock ? <p className='avail'>In Stock</p> : <p className='not-avail'>Out Of Stock</p>}
            <a href={href} className='product-read-more'>Read More</a>
        </div>
    )
}

export default Card