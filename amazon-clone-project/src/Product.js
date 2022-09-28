import React from 'react'
import "./CSS/Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, rating, image }) {
  const [{ basket }, dispatch] = useStateValue();
  
  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  }

  return (
    <div className='product '>
      <div className='product__info'>
        <p>{title}</p>
      
      <p className='product__price'>
        <small><span>$</span></small>
        <strong>{price}</strong>
      </p>
      <div className='product__rating'>
          {Array(rating).fill().map((_, i) => (<span key={i}>⭐️</span>))}
      </div>
    </div>
    <div className='product__image'>
      <img src={image} alt='product__image'></img>
      </div>

   
      <button className='add__to__cart__btn' onClick={addToBasket}>Add to cart </button>
      
    </div>
  )
}

  export default Product;