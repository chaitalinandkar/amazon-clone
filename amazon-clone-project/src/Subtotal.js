import React from 'react'
import "./CSS/Subtotal.css"
import { NumericFormat } from 'react-number-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer'; 
import { Link, useNavigate } from 'react-router-dom';

function Subtotal() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleCheckout = () => {

    if (basket?.length === 0) {
      alert('Basket is empty');
      navigate('/');
    } else if (user){
      navigate('/payment');
    } else {
      alert('Please Sign in before checkout, thanks!')
      navigate('/login');
    }
   
  }
  return (
    <div className='subtotal'>
      <NumericFormat
        renderText={(value) => (
          <div>
            <p>Subtotal ({basket?.length} items): <strong>{value}</strong></p>
            <small className='subtotal__gift'><input type='checkbox'></input> This order contains a gift</small>
          </div>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={'$'}
      />
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      
    </div>
  )
}

export default Subtotal;