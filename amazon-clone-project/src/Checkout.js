import React from 'react'
import Header from './Header'
import offer_checkout_page from "./Images/offer_checkout_page.png";
import "./CSS/Checkout.css"
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className=''>
      <div><Header /></div>
      <div className='checkout'>
        <div className='checkout__left'>
        <img src={offer_checkout_page} className='checkout__ad' alt='offer on cards' />
        
          <div>
            <h3>Hello, &nbsp;{user?.email}</h3>
            <h2 className='checkout__title'>Your Shopping Cart</h2>
            {basket.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
        </div>

      </div>
      <div className='checkout__right'>
        <Subtotal />
      </div>
      </div>
    </div>
  )
}

export default Checkout