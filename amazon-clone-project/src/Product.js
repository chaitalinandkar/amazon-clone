import React from 'react'
import "./CSS/Product.css";

function Product({ id, title, price, rating, image }) {
  
  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
      
      <p className='product__price'>
        <small><span>$</span></small>
        <strong>{price}</strong>
      </p>
      <div className='product__rating'>
          {Array(rating).fill().map((_, i) => (<span>⭐️</span>))}
      </div>
    </div>
    <div className='product__image'>
      <img src={image} alt='product__image'></img>
      </div>

   
      <button className='add__to__cart__btn'>Add to cart </button>
      
    </div>
  )
}

  export default Product;