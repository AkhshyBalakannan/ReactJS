import { useParams } from "react-router-dom";

import bookmark from '../../assets/icons/bookmark-heart.svg'
import bookmarked from '../../assets/icons/bookmark-heart-fill.svg'

import { addMyCart, removeMyCart, addWishList, removeWishList, products, fetchProductAsync } from '../../redux/productSlice'


import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import productImg from '../../assets/images/product.png'


const ProductDetail = () => {
    const [item, setItem] = useState(null)
    const [requestStatus, setRequestStatus] = useState('idle')

    let { id } = useParams();
    const productImage = {
        width: '200px',
        padding: '0px 96px 0px 0px'
    }

    const tdText = {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 900,
        background: 'white'
    }

    const actionButton = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'stretch',
        padding: '20px 0px'
    }

    const product = useSelector(products)
    const dispatch = useDispatch()

    const loadProducts = () => dispatch(fetchProductAsync(id))
    useEffect(() => loadProducts, [])


    useEffect(() => {
        setItem(product.product)
        setRequestStatus(product.status)
    }, [product])

    let pageLoading = requestStatus === 'loading'
    
    let inWishList = item && product && product.wishList.map(item => item.id).includes(item.id)
    let inMyCart = item && product && product.myCart.map(item => item.id).includes(item.id)


    const addToWishList = () => {
        dispatch(addWishList(item))
    }
    const removeFromWishList = () => {
        dispatch(removeWishList(item))
    }

    const addToMyCart = () => {
        if (!item.in_stock) {
            alert('Sorry you cannot add this item to cart')
        } else {
            dispatch(addMyCart(item))
        }
    }
    const removeFromMyCart = () => {
        dispatch(removeMyCart(item))
    }
    let wishListAlt = 'Wish List Icon'

    return (
    <>
        { pageLoading && <p>Loading...</p> }
        {
            !pageLoading &&
            <>
            <div className="product-detail-card">
                <img src={productImg} alt="Product Image" style={productImage} />
                <div className="product-detail-right">
                    <h3>{item && item.name.toUpperCase()}</h3>
                    <hr />
                    <table>
                        <tbody>
                            <tr>
                                <td>Date Of published</td>
                                <td>{item && item.created.split('T')[0]}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{item && item.price}</td>
                            </tr>
                            <tr>
                                <td colSpan='2' style={tdText}>
                                    {item && item.in_stock ? <p className='avail'>In Stock</p> : <p className='not-avail'>Out Of Stock</p>}
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                </div>
            </div>
            <div style={actionButton} className='product-action'>
                <>
                    {
                        inMyCart ?
                        (
                            <button className="add-to-cart" onClick={() => {removeFromMyCart()}}>Remove From Cart</button>
                        ):(
                            <button className="add-to-cart" onClick={() => {addToMyCart()}}>Add To Cart</button>
                        )
                    }
                </>
                <button className='wish-list-button'>
                    <>
                        {
                            inWishList ?
                            (
                                <img
                                    src={bookmarked}
                                    alt={wishListAlt}
                                    onClick={() => removeFromWishList()}
                                    />
                            ) : (
                                <img
                                    src={bookmark}
                                    alt={wishListAlt}
                                    onClick={() => addToWishList()}
                                    />
                            )
                        }
                    </>
                </button>
            </div>
            </>
        }
    </>
    )
}

export default ProductDetail;
