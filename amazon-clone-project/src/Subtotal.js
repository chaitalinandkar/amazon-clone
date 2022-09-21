import React from 'react'
import "./CSS/Subtotal.css"
import { NumericFormat } from 'react-number-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer'; 
import { Link } from 'react-router-dom';

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
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
      <Link to='/payment'>
        <button>Proceed to Checkout</button>
      </Link>
      
    </div>
  )
}

export default Subtotal;