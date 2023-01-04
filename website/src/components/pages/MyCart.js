import Card from '../common/Card'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { products } from '../../redux/productSlice'

const MyCart = () => {
    const [item, setItem] = useState([])

    const productList = useSelector(products)

    useEffect(() => {
        setItem(productList.myCart)
    }, [productList])

    return (
        <>
            { item &&
                <div className='list-product'>
                        {item.map(element => (
                        <Card product={element} key={element.id} />
                    ))}
                </div>
            }
            {
                !item.length && <h2>No Items Found in My Cart</h2>
            }
        </>
    )
}

export default MyCart;