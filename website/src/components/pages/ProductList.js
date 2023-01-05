import Card from '../common/Card'
import { products, fetchAllProductAsync } from '../../redux/productSlice'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ProductList = () => {
    const [item, setItem] = useState([])
    const [requestStatus, setRequestStatus] = useState('idle')

    const productList = useSelector(products)

    const dispatch = useDispatch()

    const loadProducts = () => dispatch(fetchAllProductAsync())

    useEffect(() => loadProducts, [])

    useEffect(() => {
        setItem(productList.products)
        setRequestStatus(productList.status)
    }, [productList])

    let pageLoading = requestStatus === 'loading'

    return (
        <>
            { pageLoading && <p>Loading...</p> }
            {
                !pageLoading && 
                <>
                    {/* <button className='refresh-page' onClick={()=>loadProducts()}>Refresh</button> */}
                    <div className='list-product'>
                        { item && 
                            item.map(element => (
                            <Card product={element} key={element.id} />
                        ))
                        }
                    </div>
                </>
            }
        </>
    );
}

export default ProductList
