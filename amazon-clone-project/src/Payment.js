
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./CSS/Payment.css";
import Header from './Header';
import { useStateValue } from './StateProvider';
import { NumericFormat } from 'react-number-format';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer'; 
import axios from './axios';

function Payment() {

  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  //to catch error
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secrect which allows us to charge a customer
    const getClientSecret = async() => {
      const response = await axios({
        method: 'post',
        //stripe expects the total in currencies subunits
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    }
    getClientSecret();
  }, [basket])

  console.log('THE SECRET IS >>>>>', clientSecret);

  const handleSubmit = async(e) => {
    // styling the stripe stuff
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {

    
      //paymentIntent = payment confirmation
      setSucceeded(true)
      setError(null)
      setProcessing(false)
      dispatch({
        type: 'EMPTY_BASKET'
      })
      // navigate('/orders', {replace:true})
      navigate("/orders")
    })
  }
  const handleChange = e => {
    //Listen for changes in the CardElement
    //and display any error as the customer types their card details
    setDisabled(e.error);
    setError(e.error ? e.error.message : "");
  }

  
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
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <NumericFormat
                  renderText={(value) => (
                    <div>
                      <h3>Order Total: <strong>{value}</strong></h3>
                    </div>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* If this is an error only then show the div with the error in */}
              {error && <div>{error}</div>}
              
            </form>
   
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Payment