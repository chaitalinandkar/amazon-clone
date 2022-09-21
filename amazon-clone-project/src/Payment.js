
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./CSS/Payment.css";
import Header from './Header';
import { useStateValue } from './StateProvider';


function Payment() {

  const [{ basket, user }, dispatch] = useStateValue();
  
  
  return (
    <div className='payment'>

      <Header />
      <div className='payment__container'>
        <h1>
          Checkout(
          <Link to='/checkout'>{basket?.length} items</Link>
          )
        </h1>
          {/* payment-section ------ delivery address */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address : </h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 Random Dr</p>
            <p>San Jose, CA</p>
          </div>
        </div>

        {/* payment-section ------- review itemss */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery : </h3>
          </div>
          <div className='payment__items'>
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                rating={item.rating}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>

        {/* payment-section ----------- payment-method */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method : </h3>
          </div>
          <div className='payment__details'>
              {/* stripe */}
            
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Payment