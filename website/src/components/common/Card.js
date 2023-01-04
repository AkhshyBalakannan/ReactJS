import bookmark from '../../assets/icons/bookmark-heart.svg'
import bookmarked from '../../assets/icons/bookmark-heart-fill.svg'
import { Link } from "react-router-dom";

import { addWishList, removeWishList, products } from '../../redux/productSlice'

import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Card = ({product}) => {
    let href = '/product/' + product.id

    const wishListAlt = 'Wish List Icon'

    const productId = product.id

    const item = useSelector(products)
    const dispatch = useDispatch()

    const removeFromWishList = () => {
        dispatch(removeWishList(product))
    }

    const addToWishList = () => {
        dispatch(addWishList(product))
    }

    let inWishList = item.wishList.map(item=>item.id).includes(productId)

    return (
        <div className='product-card'>
            <h3>{product.name.toUpperCase()}</h3>
            <hr />
            <p>Price: {product.price}</p>
            {product.in_stock ? <p className='avail'>In Stock</p> : <p className='not-avail'>Out Of Stock</p>}
            <hr />
            <div className='card-bottom'>
                <button className='product-read-more'>
                    <Link to={href}>View</Link>
                </button>
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
        </div>
    )
}

export default Card