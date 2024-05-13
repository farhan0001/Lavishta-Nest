import React, { Fragment } from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Cart = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const increaseQuantity = (id, quantity, stock) => {
        if (stock <= quantity)
            return;
        dispatch(addItemsToCart(id, quantity + 1));
    }

    const decreaseQuantity = (id, quantity) => {
        if (quantity <= 1)
            return;
        dispatch(addItemsToCart(id, quantity - 1));
    }

    const deleteCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    }

    return (
        <Fragment>
            <MetaData title='Cart' />
            {
                cartItems.length === 0 ? 
                <div className='emptyCart'>
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to='/products'>View Products</Link>
                </div>
                :
                    <Fragment>
                        <div className='cartPage'>
                            <div className='cartHeader'>
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>

                            {
                                cartItems && cartItems.map((item) => (
                                    <div key={item.product} className='cartContainer'>
                                        <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                                        <div className='cartInput'>
                                            <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                            <input type='number' value={item.quantity} readOnly />
                                            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                        </div>
                                        <p className='cartSubtotal'>{item.quantity * item.price}</p>
                                    </div>
                                ))
                            }

                            <div className='cartGrossTotal'>
                                <div></div>
                                <div className='cartGrossTotalBox'>
                                    <p>Gross Total</p>
                                    <p>{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</p>
                                </div>
                                <div></div>
                                <div className='checkOutBtn'>
                                    <button onClick={checkoutHandler}>Check Out</button>
                                </div>
                            </div>

                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Cart