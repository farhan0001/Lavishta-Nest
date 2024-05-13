import React from 'react'
import { Link } from "react-router-dom";
import { Rating } from '@mui/material';

const ProductCard = ({ product }) => {

  const options = {
    size: 'normal',
    value: product.rating,
    readOnly: true,
    precision: 0.5
  }

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} /> <span className='productCard-span'>({product.numOfReviews === 0 ? "No Review" : (product.numOfReviews === 1 ? "1 Review" : product.numOfReviews + " Reviews")})</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard